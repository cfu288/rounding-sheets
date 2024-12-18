import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { BPLog } from "../BPLog";

export const NewSingleEntryForm = ({
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
  const diastolicInputRef = React.useRef<HTMLInputElement>(null);
  const [errors, setErrors] = React.useState<{
    systolic: boolean;
    diastolic: boolean;
  }>({
    systolic: false,
    diastolic: false,
  });

  React.useEffect(() => {
    if (systolicInputRef.current) {
      systolicInputRef.current.focus();
    }
  }, []);

  const validateRange = (value: string) => {
    const num = Number(value);
    return num >= 0 && num <= 999;
  };

  const handleSystolicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateFutureEntry("systolic", value);
    if (value && validateRange(value)) {
      setErrors((prev) => ({ ...prev, systolic: false }));
    } else {
      setErrors((prev) => ({ ...prev, systolic: true }));
    }
  };

  const handleDiastolicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateFutureEntry("diastolic", value);
    if (value && validateRange(value)) {
      setErrors((prev) => ({ ...prev, diastolic: false }));
    } else {
      setErrors((prev) => ({ ...prev, diastolic: true }));
    }
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hasErrors =
      !futureEntry.systolic ||
      !futureEntry.diastolic ||
      !validateRange(futureEntry.systolic) ||
      !validateRange(futureEntry.diastolic);
    setErrors({
      systolic: !futureEntry.systolic || !validateRange(futureEntry.systolic),
      diastolic:
        !futureEntry.diastolic || !validateRange(futureEntry.diastolic),
    });
    if (!hasErrors) {
      addRow();
      if (systolicInputRef.current) {
        systolicInputRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "/") {
      e.preventDefault();
      diastolicInputRef.current?.focus();
    }
  };

  const [activeTab, setActiveTab] = useState<"single" | "batch">("single");
  const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedPhoto(e.target.files[0]);
    }
  };

  return (
    <div className="p-4 border-gray-300 border rounded">
      <label className="block text-md font-medium text-gray-700 mb-2">
        Add New Entry
      </label>
      <p className="text-gray-700 mb-4 italic">
        Tip: To navigate quicker, hit{" "}
        <kbd className="hover:bg-gray-100 min-h-[30px] inline-flex justify-center items-center py-1 px-1.5 bg-white border border-gray-200 font-mono text-sm text-gray-800 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] hover:shadow-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)] rounded-md">
          Tab
        </kbd>{" "}
        to move between fields. Press{" "}
        <kbd className="hover:bg-gray-100 min-h-[30px] inline-flex justify-center items-center py-1 px-1.5 bg-white border border-gray-200 font-mono text-sm text-gray-800 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] hover:shadow-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)] rounded-md">
          Enter
        </kbd>{" "}
        to add the new entry to the log.
      </p>
      <div className="relative mt-4">
        <div
          className="flex space-x-2"
          style={{ position: "relative", top: "1px", left: "0" }}
        >
          <button
            className={`tab px-4 py-1 rounded-t-md transition-colors duration-150 text-sm active:scale-[99%] ${
              activeTab === "single"
                ? "bg-white text-black hover:bg-gray-50 border-t border-l border-r border-gray-300"
                : "bg-gray-50 text-black hover:bg-gray-50 border-t border-l border-r border-b border-gray-300"
            }`}
            onClick={() => setActiveTab("single")}
          >
            Add Single Entry
          </button>
          <button
            className={`tab px-4 py-1 rounded-t-md transition-colors duration-150 text-sm active:scale-[99%] ${
              activeTab === "batch"
                ? "bg-white text-black hover:bg-gray-50 border-t border-l border-r border-gray-300"
                : "bg-gray-50 text-black hover:bg-gray-50 border-t border-l border-r border-b border-gray-300"
            }`}
            onClick={() => setActiveTab("batch")}
          >
            Add Batch Entry
          </button>
        </div>
        <div className="border rounded-b-md border-gray-300 bg-white">
          {activeTab === "single" && (
            <form
              className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 p-2"
              onSubmit={handleSubmit}
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
                onKeyDown={handleKeyDown}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.systolic ? "border-red-500" : "focus:ring-blue-500"
                }`}
              />
              {errors.systolic && (
                <span className="text-red-500 text-sm">
                  Systolic value is required and must be between 0 and 999.
                </span>
              )}
              <input
                ref={diastolicInputRef}
                type="number"
                placeholder="Diastolic"
                value={futureEntry.diastolic}
                onChange={handleDiastolicChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.diastolic ? "border-red-500" : "focus:ring-blue-500"
                }`}
              />
              {errors.diastolic && (
                <span className="text-red-500 text-sm">
                  Diastolic value is required and must be between 0 and 999.
                </span>
              )}
              <Button type="submit" className="h-auto">
                +
              </Button>
            </form>
          )}
          {activeTab === "batch" && (
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 p-2">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
              />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  Automatically fill log from photo{" "}
                  <span className="text-indigo-600 italic">Experimental</span>
                </h3>
                <p className="text-sm text-gray-600">
                  Upload a photo of a blood pressure log, and AI will extract
                  data from the photo automatically. Please verify the data
                  manually, as it may not be accurate.
                </p>
                <label htmlFor="photo-upload" className="block">
                  {uploadedPhoto ? (
                    <Button
                      className="h-auto"
                      onClick={async () => {
                        try {
                          const data = await sendPhotoToOpenAIToOCR(
                            uploadedPhoto
                          );
                          console.log(data);
                        } catch (error) {
                          console.error(error);
                        }
                      }}
                    >
                      Extract data from photo
                    </Button>
                  ) : (
                    <Button asChild className="h-auto">
                      <span className="cursor-pointer">Upload photo</span>
                    </Button>
                  )}
                </label>
                <p>
                  {uploadedPhoto ? (
                    <div className="flex items-center space-x-2">
                      <span>{uploadedPhoto.name}</span>
                      <Button
                        variant={"destructive"}
                        onClick={() => setUploadedPhoto(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <span className="text-gray-500">No file uploaded</span>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

type BPLogResponse = {
  logs: {
    id: string;
    dateTime: string;
    systolic: string;
    diastolic: string;
  }[];
};

async function sendPhotoToOpenAIToOCR(photo: File): Promise<BPLogResponse> {
  const base64Image = await convertFileToBase64(photo);
  const imageType = photo.type || "image/jpeg"; // Default to jpeg if type is not available
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer `, // Replace with your actual API key
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please transcribe this image of a blood pressure log.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${imageType};base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "bp_log_response",
          strict: true,
          schema: {
            type: "object",
            properties: {
              logs: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    dateTime: { type: "string" },
                    systolic: { type: "string" },
                    diastolic: { type: "string" },
                  },
                  required: ["id", "dateTime", "systolic", "diastolic"],
                  additionalProperties: false,
                },
              },
            },
            required: ["logs"],
            additionalProperties: false,
          },
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send photo to OpenAI");
  }

  const data: BPLogResponse = await response.json();
  return data;
}

function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(",")[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
