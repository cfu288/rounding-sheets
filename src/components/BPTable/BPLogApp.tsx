import debounce from "lodash.debounce";
import { useCallback, useState, useMemo } from "react";

import {
  CellContext,
  ColumnDef,
  getCoreRowModel,
  RowData,
  useReactTable,
} from "@tanstack/react-table";
import { AppLayout } from "../AppLayout";
import { NewSingleEntryForm } from "./NewSingleEntryForm/NewSingleEntryForm";
import { Table as TanstackTable } from "@tanstack/table-core";
import { DiastolicCell } from "./DiastolicCell";
import { SystolicCell } from "./SystolicCell";
import { DateCell } from "./DateCell";
import { generateDefaultDatetime } from "./helpers/generateDefaultDatetime";
import { BPLog } from "./BPLog";
import { useMeanAndClassification } from "./hooks/useMeanAndClassification";
import { useFutureEntryDate } from "./hooks/useFutureEntryDate";
import { useSaveDataToSession } from "./hooks/useSaveDataToSession";
import { ReviewEntries } from "./ReviewEntries/ReviewEntries";
import { Header } from "./Header";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

export const sessionStorageKey = "reverb_bp-log-data";

const BPLogApp = () => {
  // Variable declarations
  const [data, setData] = useState<BPLog[]>(() => {
    const savedData = sessionStorage.getItem(sessionStorageKey);
    return savedData ? JSON.parse(savedData) : [];
  });

  const [futureEntry, setFutureEntry] = useState<BPLog>({
    id: "",
    dateTime: generateDefaultDatetime(),
    systolic: "",
    diastolic: "",
  });

  const [activeTab, setActiveTab] = useState("table");

  const { meanSystolic, meanDiastolic, hypertensionClassification } =
    useMeanAndClassification(data);

  // Function declarations
  const saveDataToSession = useCallback(
    debounce((data: BPLog[]) => {
      if (data.length !== 0) {
        console.log("Saving data to session storage");
        sessionStorage.setItem(sessionStorageKey, JSON.stringify(data));
      }
    }, 100),
    []
  );

  const updateData = useCallback(
    (rowIndex: number, columnId: string, value: unknown) => {
      setData((old) =>
        old.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...old[rowIndex]!,
              [columnId]: value,
            };
          }
          return row;
        })
      );
    },
    []
  );

  const deleteRow = useCallback((rowIndex: number) => {
    setData((old) => old.filter((_, index) => index !== rowIndex));
  }, []);

  const addRow = useCallback(() => {
    setData((prevData) => [
      ...prevData,
      { ...futureEntry, id: new Date().toLocaleString() },
    ]);
    setFutureEntry({
      id: "",
      dateTime: generateDefaultDatetime(),
      systolic: "",
      diastolic: "",
    });
  }, [futureEntry]);

  const updateFutureEntry = useCallback(
    (field: "systolic" | "diastolic" | "dateTime", value: string) => {
      setFutureEntry((prevEntry) => ({ ...prevEntry, [field]: value }));
    },
    []
  );

  const columns: ColumnDef<BPLog>[] = useMemo(
    () => [
      {
        accessorKey: "dateTime",
        header: "Date",
        cell: (props: CellContext<BPLog, unknown>) =>
          DateCell(props as CellContext<BPLog, string>),
      },
      {
        accessorKey: "systolic",
        header: "Systolic",
        cell: (props: CellContext<BPLog, unknown>) =>
          SystolicCell(props as CellContext<BPLog, string>),
      },
      {
        accessorKey: "diastolic",
        header: "Diastolic",
        cell: (props: CellContext<BPLog, unknown>) =>
          DiastolicCell(props as CellContext<BPLog, string>),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }: CellContext<BPLog, unknown>) => (
          <button onClick={() => deleteRow(row.index)}>
            <span role="img" aria-label="delete">
              🗑️
            </span>
          </button>
        ),
      },
    ],
    [deleteRow]
  );

  // Hook calls

  const table: TanstackTable<BPLog> = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData,
    },
  });
  useFutureEntryDate(data, setFutureEntry);
  useSaveDataToSession(data, saveDataToSession);

  return (
    <AppLayout>
      <div className="container mx-auto py-10">
        <Header />
        <NewSingleEntryForm
          futureEntry={futureEntry}
          updateFutureEntry={updateFutureEntry}
          addRow={addRow}
        />
        <ReviewEntries
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          data={data}
          table={table}
          columns={columns}
          meanSystolic={meanSystolic}
          meanDiastolic={meanDiastolic}
          hypertensionClassification={hypertensionClassification}
          setData={setData}
        />
      </div>
    </AppLayout>
  );
};

export default BPLogApp;
