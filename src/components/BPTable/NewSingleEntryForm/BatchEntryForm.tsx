import React, { ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { sendPhotoToOpenAIToOCR } from "./sendPhotoToOpenAIToOCR";

export const BatchEntryForm: React.FC<BatchEntryFormProps> = ({
  uploadedPhoto,
  handlePhotoUpload,
  setUploadedPhoto,
}) => (
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
        Upload a photo of a blood pressure log, and AI will extract data from
        the photo automatically. Please verify the data manually, as it may not
        be accurate.
      </p>
      <label htmlFor="photo-upload" className="block">
        {uploadedPhoto ? (
          <Button
            className="h-auto"
            onClick={async () => {
              try {
                const data = await sendPhotoToOpenAIToOCR(uploadedPhoto);
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
);
export type BatchEntryFormProps = {
  uploadedPhoto: File | null;
  handlePhotoUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  setUploadedPhoto: React.Dispatch<React.SetStateAction<File | null>>;
};
