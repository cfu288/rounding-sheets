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
  Cell,
  CellContext,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  RowData,
  useReactTable,
} from "@tanstack/react-table";

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
  const [markdownRepresentation, setMarkdownRepresentation] =
    useState<string>("");

  const [meanSystolic, setMeanSystolic] = useState<number>(0);
  const [meanDiastolic, setMeanDiastolic] = useState<number>(0);
  const [hypertensionClassification, setHypertensionClassification] =
    useState<string>("");

  // https://www.heart.org/-/media/files/health-topics/high-blood-pressure/hypertension-guideline-highlights-flyer.pdf
  const classifyHypertension = (systolic: number, diastolic: number) => {
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
  };

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

    // Save to state variable
    setMeanSystolic(meanSystolic);
    setMeanDiastolic(meanDiastolic);
    setHypertensionClassification(hypertensionClassification);
  }, [data]);

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
  }, [data]);

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

  useEffect(() => {
    saveDataToSession(data);
  }, [data, saveDataToSession]);

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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData,
    },
  });

  const [copied, setCopied] = useState(false);

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
  }, [copied]);

  const [activeTab, setActiveTab] = useState("table");

  return (
    <div className="container mx-auto py-10">
      <FutureEntryForm
        futureEntry={futureEntry}
        updateFutureEntry={updateFutureEntry}
        addRow={addRow}
      />
      <div className="p-4 border-gray-300 border rounded mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Review Entries
        </label>
        <div className="relative mt-4">
          <div
            className="flex space-x-2"
            style={{ position: "relative", top: "1px", left: "0" }}
          >
            <button
              className={`tab px-4 py-1 rounded-t-md transition-colors duration-150 text-sm ${
                activeTab === "table"
                  ? "bg-black text-white border-t border-l border-r border-black"
                  : "bg-white text-black hover:bg-gray-50 border-t border-l border-r border-gray-300"
              }`}
              onClick={() => setActiveTab("table")}
            >
              Table
            </button>
            <button
              className={`tab px-4 py-1 rounded-t-md transition-colors duration-150 text-sm ${
                activeTab === "graph"
                  ? "bg-black text-white border-t border-l border-r border-black"
                  : "bg-white text-black hover:bg-gray-50 border-t border-l border-r border-gray-300"
              }`}
              onClick={() => setActiveTab("graph")}
            >
              Graph
            </button>
            <button
              className={`tab px-4 py-1 rounded-t-md transition-colors duration-150 text-sm ${
                activeTab === "markdown"
                  ? "bg-black text-white border-t border-l border-r border-black"
                  : "bg-white text-black hover:bg-gray-50 border-t border-l border-r border-gray-300"
              }`}
              onClick={() => setActiveTab("markdown")}
            >
              Copy Table Results
            </button>
          </div>
          <div className="border rounded-b-md border-gray-300">
            {activeTab === "table" && (
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
                        <TableCell
                          colSpan={columns.length}
                          className="h-12 text-center"
                        >
                          Start entering blood pressure entries to see data
                          here.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                {data.length > 0 && (
                  <div className="p-2 border-t border-gray-300 flex justify-between">
                    <p className="text-sm">
                      <strong>Classification:</strong>{" "}
                      {hypertensionClassification}
                    </p>
                    <p className="text-sm">
                      <strong>Average:</strong> {meanSystolic.toFixed(0)}/
                      {meanDiastolic.toFixed(0)}
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "graph" && (
              <LineChart
                className="h-80 mt-8"
                data={data.map((entry) => ({
                  date: entry.dateTime,
                  Systolic: parseInt(entry.systolic, 0),
                  Diastolic: parseInt(entry.diastolic, 0),
                  MAP: calculateMAP(
                    parseInt(entry.systolic),
                    parseInt(entry.diastolic)
                  ),
                }))}
                index="date"
                categories={["Systolic", "Diastolic", "MAP"]}
                valueFormatter={(number: number) => `${number} mmHg`}
                onValueChange={(v) => console.log(v)}
              />
            )}

            {activeTab === "markdown" && (
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
            )}
          </div>
          <div className="flex justify-end mt-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Delete All</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will delete the log data.
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
        </div>
      </div>
    </div>
  );
};

const BPLogRow = <TData extends RowData>({ row }: { row: Row<TData> }) => {
  return (
    <TableRow data-state={row.getIsSelected() && "selected"}>
      {row.getVisibleCells().map((cell: Cell<TData, unknown>) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
};

const FutureEntryForm = ({
  futureEntry,
  updateFutureEntry,
  addRow,
}: {
  futureEntry: BPLog;
  updateFutureEntry: (
    field: "systolic" | "diastolic" | "dateTime",
    value: string
  ) => void;
  addRow: () => void;
}) => {
  const systolicInputRef = React.useRef<HTMLInputElement>(null);

  const handleSystolicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFutureEntry("systolic", e.target.value);
  };

  const handleDiastolicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFutureEntry("diastolic", e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    const currentDateTime = new Date(futureEntry.dateTime);
    currentDateTime.setFullYear(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    updateFutureEntry("dateTime", currentDateTime.toISOString());
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(":").map(Number);
    const currentDateTime = new Date(futureEntry.dateTime);
    currentDateTime.setHours(hours, minutes, 0, 0);
    updateFutureEntry("dateTime", currentDateTime.toISOString());
  };

  return (
    <div className="p-4 border-gray-300 border rounded">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Add New Entry
      </label>
      <form
        className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
        onSubmit={(e) => {
          e.preventDefault();
          addRow();
          if (systolicInputRef.current) {
            systolicInputRef.current.focus();
          }
        }}
      >
        <input
          type="date"
          value={
            new Date(futureEntry.dateTime)
              .toLocaleString("sv", {
                timeZoneName: "short",
              })
              .split(" ")[0]
          }
          onChange={handleDateChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="time"
          value={new Date(futureEntry.dateTime)
            .toLocaleTimeString("en-US", { hour12: false })
            .slice(0, 5)}
          onChange={handleTimeChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          ref={systolicInputRef}
          type="number"
          placeholder="Systolic"
          value={futureEntry.systolic}
          onChange={handleSystolicChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Diastolic"
          value={futureEntry.diastolic}
          onChange={handleDiastolicChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button type="submit" className="h-auto">
          +
        </Button>
      </form>
    </div>
  );
};

export default BPLogTable;
