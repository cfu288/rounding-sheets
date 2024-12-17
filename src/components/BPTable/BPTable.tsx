import debounce from "lodash.debounce";
import { markdownTable } from "markdown-table";
import React, { useCallback, useEffect, useState } from "react";

import { LineChart } from "@/components/LineChart/LineChart";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CellContext,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  RowData,
  useReactTable,
} from "@tanstack/react-table";
import { AppLayout } from "../AppLayout";
import { NewSingleEntryForm } from "./NewSingleEntryForm";
import { BPLogRow } from "./BPLogRow";
import { Table as TanstackTable } from "@tanstack/table-core";

export type BPLog = {
  id: string;
  dateTime: string; // Store as string
  systolic: string;
  diastolic: string;
};

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

function calculateMean(data: number[]) {
  return data.reduce((acc, curr) => acc + curr, 0) / data.length;
}

const sessionStorageKey = "reverb_bp-log-data";

function generateDefaultDatetime() {
  const now = new Date();
  now.setHours(9, 0, 0, 0);
  return now.toISOString();
}

// Mean Arterial Pressure = 1/3*(SBP) + 2/3*(DBP)
function calculateMAP(systolic: number, diastolic: number) {
  return ((systolic + 2 * diastolic) / 3).toFixed(0);
}

function classifyHypertension(systolic: number, diastolic: number) {
  if (systolic > 180 || diastolic > 120) {
    return "Hypertensive Urgency|Emergency";
  } else if (systolic >= 140 || diastolic >= 90) {
    return "Stage 2 Hypertension";
  } else if (
    (systolic >= 130 && systolic <= 139) ||
    (diastolic >= 80 && diastolic <= 89)
  ) {
    return "Stage 1 Hypertension";
  } else if (systolic >= 120 && systolic <= 129 && diastolic < 80) {
    return "Elevated";
  } else if (systolic < 120 && diastolic < 80) {
    return "Normal";
  }
  return "Unknown";
}

const DateCell = ({
  getValue,
  row,
  column,
  table,
}: CellContext<BPLog, string>) => {
  const initialValue = getValue();
  const [dateValue, setDateValue] = useState(
    new Date(initialValue).toLocaleDateString("en-CA")
  );
  const [timeValue, setTimeValue] = useState(
    new Date(initialValue)
      .toLocaleTimeString("en-US", { hour12: false })
      .slice(0, 5)
  );

  const onBlur = () => {
    const combinedDateTime = `${dateValue}T${timeValue}:00`;
    table.options.meta?.updateData(row.index, column.id, combinedDateTime);
  };

  useEffect(() => {
    setDateValue(new Date(initialValue).toLocaleDateString("en-CA"));
    setTimeValue(
      new Date(initialValue)
        .toLocaleTimeString("en-US", { hour12: false })
        .slice(0, 5)
    );
  }, [initialValue]);

  return (
    <div>
      <input
        type="date"
        value={dateValue}
        onChange={(e) => setDateValue(e.target.value)}
        onBlur={onBlur}
      />
      <input
        type="time"
        value={timeValue}
        onChange={(e) => setTimeValue(e.target.value)}
        onBlur={onBlur}
      />
    </div>
  );
};

const SystolicCell = ({
  getValue,
  row: { index },
  column: { id },
  table,
}: CellContext<BPLog, string>) => {
  const initialValue = getValue();
  const [value, setValue] = useState<number>(Number(initialValue));

  const onBlur = () => {
    table.options.meta?.updateData(index, id, value.toString());
  };

  useEffect(() => {
    setValue(Number(initialValue));
  }, [initialValue]);

  return (
    <input
      type="number"
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      onBlur={onBlur}
    />
  );
};

const DiastolicCell = ({
  getValue,
  row: { index },
  column: { id },
  table,
}: CellContext<BPLog, string>) => {
  const initialValue = getValue();
  const [value, setValue] = useState<number>(Number(initialValue));

  const onBlur = () => {
    table.options.meta?.updateData(index, id, value.toString());
  };

  useEffect(() => {
    setValue(Number(initialValue));
  }, [initialValue]);

  return (
    <input
      type="number"
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      onBlur={onBlur}
    />
  );
};

const useMeanAndClassification = (data: BPLog[]) => {
  const [meanSystolic, setMeanSystolic] = useState<number>(0);
  const [meanDiastolic, setMeanDiastolic] = useState<number>(0);
  const [hypertensionClassification, setHypertensionClassification] =
    useState<string>("");

  useEffect(() => {
    const meanSystolic = calculateMean(
      data.map((entry) => parseInt(entry.systolic, 10))
    );
    const meanDiastolic = calculateMean(
      data.map((entry) => parseInt(entry.diastolic, 10))
    );

    const hypertensionClassification = classifyHypertension(
      meanSystolic,
      meanDiastolic
    );

    setMeanSystolic(meanSystolic);
    setMeanDiastolic(meanDiastolic);
    setHypertensionClassification(hypertensionClassification);
  }, [data]);

  return { meanSystolic, meanDiastolic, hypertensionClassification };
};

const useFutureEntryDate = (
  data: BPLog[],
  setFutureEntry: React.Dispatch<React.SetStateAction<BPLog>>
) => {
  useEffect(() => {
    if (data.length > 0) {
      const lastDate = new Date(data[data.length - 1].dateTime);
      const newDate = new Date(lastDate);
      newDate.setDate(newDate.getDate() + 1);
      setFutureEntry((prevEntry) => ({
        ...prevEntry,
        dateTime: newDate.toLocaleString("en-US", { hour12: true }),
      }));
    } else {
      setFutureEntry((prevEntry) => ({
        ...prevEntry,
        dateTime: generateDefaultDatetime(),
      }));
    }
  }, [data, setFutureEntry]);
};

const useSaveDataToSession = (
  data: BPLog[],
  saveDataToSession: (data: BPLog[]) => void
) => {
  useEffect(() => {
    saveDataToSession(data);
  }, [data, saveDataToSession]);
};

const BPLogTable = () => {
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

  useFutureEntryDate(data, setFutureEntry);

  const saveDataToSession = useCallback(
    debounce((data: BPLog[]) => {
      if (data.length !== 0) {
        console.log("Saving data to session storage");
        sessionStorage.setItem(sessionStorageKey, JSON.stringify(data));
      }
    }, 100),
    []
  );

  const updateData = (rowIndex: number, columnId: string, value: unknown) => {
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
  };

  useSaveDataToSession(data, saveDataToSession);

  const deleteRow = (rowIndex: number) => {
    setData((old) => old.filter((_, index) => index !== rowIndex));
  };

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

  const updateFutureEntry = (
    field: "systolic" | "diastolic" | "dateTime",
    value: string
  ) => {
    setFutureEntry((prevEntry) => ({ ...prevEntry, [field]: value }));
  };

  const columns: ColumnDef<BPLog>[] = [
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
  ];

  const table: TanstackTable<BPLog> = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData,
    },
  });

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

const Header = () => (
  <>
    <h1 className="text-3xl font-semibold text-gray-900 mb-4">
      Blood Pressure Log
    </h1>
    <p className="text-gray-700 text-base mb-4">
      This tool enables fast data entry of blood pressure logs, with tools to
      help you analyze trends. Handles formatting for easy copy and paste into
      your EMR of choice.
    </p>
  </>
);

const ReviewEntries = ({
  activeTab,
  setActiveTab,
  data,
  table,
  columns,
  meanSystolic,
  meanDiastolic,
  hypertensionClassification,
  setData,
}: {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  data: BPLog[];
  table: TanstackTable<BPLog>;
  columns: ColumnDef<BPLog>[];
  meanSystolic: number;
  meanDiastolic: number;
  hypertensionClassification: string;
  setData: React.Dispatch<React.SetStateAction<BPLog[]>>;
}) => {
  return (
    <div className="p-4 border-gray-300 border rounded mt-4">
      <label className="block text-md font-medium text-gray-700 mb-2">
        Review Entries
      </label>
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="border rounded-b-md border-gray-300">
        {activeTab === "table" && (
          <TableView
            table={table}
            columns={columns}
            data={data}
            meanSystolic={meanSystolic}
            meanDiastolic={meanDiastolic}
            hypertensionClassification={hypertensionClassification}
          />
        )}
        {activeTab === "graph" && <GraphView data={data} />}
        {activeTab === "markdown" && <MarkdownView data={data} />}
      </div>
      <DeleteAllButton setData={setData} />
    </div>
  );
};

const TabNavigation = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) => (
  <div className="relative mt-4">
    <div
      className="flex space-x-2"
      style={{ position: "relative", top: "1px", left: "0" }}
    >
      {["table", "graph", "markdown"].map((tab) => (
        <button
          key={tab}
          className={`tab px-4 py-1 rounded-t-md transition-colors duration-150 text-sm active:scale-[99%] ${
            activeTab === tab
              ? "bg-white text-black hover:bg-gray-50 border-t border-l border-r border-gray-300"
              : "bg-gray-50 text-black hover:bg-gray-50 border-t border-l border-r border-b border-gray-300"
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  </div>
);

const TableView = ({
  table,
  columns,
  data,
  meanSystolic,
  meanDiastolic,
  hypertensionClassification,
}: {
  table: TanstackTable<BPLog>;
  columns: ColumnDef<BPLog>[];
  data: BPLog[];
  meanSystolic: number;
  meanDiastolic: number;
  hypertensionClassification: string;
}) => (
  <div className="">
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table
            .getRowModel()
            .rows.map((row) => <BPLogRow key={row.id} row={row} />)
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-12 text-center">
              Start entering blood pressure entries to see data here.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
    {data.length > 0 && (
      <div className="p-2 border-t border-gray-300 flex justify-between">
        <p className="text-sm">
          <strong>Classification:</strong> {hypertensionClassification}
        </p>
        <p className="text-sm">
          <strong>Average:</strong> {meanSystolic.toFixed(0)}/
          {meanDiastolic.toFixed(0)}
        </p>
      </div>
    )}
  </div>
);

const GraphView = ({ data }: { data: BPLog[] }) => (
  <LineChart
    className="h-80 mt-8"
    data={data.map((entry) => ({
      date: entry.dateTime,
      Systolic: parseInt(entry.systolic, 0),
      Diastolic: parseInt(entry.diastolic, 0),
      MAP: calculateMAP(parseInt(entry.systolic), parseInt(entry.diastolic)),
    }))}
    index="date"
    categories={["Systolic", "Diastolic", "MAP"]}
    valueFormatter={(number: number) => `${number} mmHg`}
    onValueChange={(v) => console.log(v)}
  />
);

const MarkdownView = ({ data }: { data: BPLog[] }) => {
  const [copied, setCopied] = useState(false);
  const [markdownRepresentation, setMarkdownRepresentation] =
    useState<string>("");

  const { meanSystolic, meanDiastolic, hypertensionClassification } =
    useMeanAndClassification(data);

  const storeMarkdownRepresentation = useCallback(
    (data: BPLog[]) => {
      const groupedData: { [key: string]: string[] } = {};

      data.forEach((entry) => {
        console.log(entry.dateTime);
        const localDateTime = new Date(entry.dateTime).toLocaleString("en-US", {
          hour12: true,
        });
        if (!groupedData[localDateTime]) {
          groupedData[localDateTime] = [];
        }
        groupedData[localDateTime].push(`${entry.systolic}/${entry.diastolic}`);
      });

      const markdownData = Object.entries(groupedData).map(([date, bps]) => [
        date,
        ...bps,
      ]);

      const markdownString = markdownTable([
        ["Date", "Blood Pressures"],
        ...markdownData,
        ["Average", `${meanSystolic.toFixed(0)}/${meanDiastolic.toFixed(0)}`],
        ["Classification", hypertensionClassification],
      ]);

      setMarkdownRepresentation(markdownString);
    },
    [hypertensionClassification, meanDiastolic, meanSystolic]
  );

  useEffect(() => {
    storeMarkdownRepresentation(data);
  }, [data, storeMarkdownRepresentation]);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
    return undefined;
  }, [copied, setCopied]);

  return (
    <div className="relative m-2">
      <div className="text-center text-black">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600"> </span>
          <button
            className={`bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-md ${
              copied
                ? "cursor-not-allowed bg-green-700 hover:bg-green-600 text-white"
                : "cursor-pointer"
            }`}
            onClick={() => {
              navigator.clipboard.writeText(markdownRepresentation);
              setCopied(true);
            }}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="overflow-x-auto">
          <pre id="markdown-code" className="text-black">
            <code>
              {data.length > 0
                ? markdownRepresentation
                : "Start entering blood pressure entries to see data here."}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

const DeleteAllButton = ({
  setData,
}: {
  setData: React.Dispatch<React.SetStateAction<BPLog[]>>;
}) => (
  <div className="flex justify-end mt-2">
    <Dialog>
      <DialogTrigger asChild>
        <Button>Delete All</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This will delete the log data. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end mt-4">
          <DialogClose asChild>
            <Button
              variant="destructive"
              onClick={() => {
                setData([]);
                sessionStorage.removeItem(sessionStorageKey);
              }}
            >
              Confirm Delete
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="ml-2">
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  </div>
);

export default BPLogTable;
