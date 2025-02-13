import { KnownTemplateIds } from "../const";
import { Todo } from "./Todo";

export type DisplayTemplate = {
  templateName: string;
  templateId: KnownTemplateIds;
  description: string;
  imagePreview: string;
  displaySize: "1x" | "2x";
  hpi?: {
    enabled: boolean;
    blankLines?: number;
  };
  events?: {
    enabled: boolean;
    fullWidth?: boolean;
    height?: "1/12" | "1/6" | "1/4" | "1/3";
  };
  socialHistory?: {
    enabled: boolean;
    height?: "1/12" | "1/6" | "1/4" | "1/3";
  };
  familyHistory?: {
    enabled: boolean;
    height?: "1/12" | "1/6" | "1/4" | "1/3";
  };
  allergies?: {
    enabled: boolean;
    height?: "1/12" | "1/6" | "1/4" | "1/3";
  };
  surgicalHistory?: {
    enabled: boolean;
    height?: "1/12" | "1/6" | "1/4" | "1/3";
  };
  physicalExam?: {
    enabled: boolean;
    sections: string[];
  };
  vitals?: {
    enabled: boolean;
    sections: string[];
  };
  labs?: {
    enabled: boolean;
    fullWidth?: boolean;
  };
  meds?: {
    enabled: boolean;
  };
  consults?: {
    enabled: boolean;
  };
  imaging?: {
    enabled: boolean;
  };
  micro?: {
    enabled: boolean;
  };
  ap?: {
    enabled: boolean;
    systemsBased: boolean;
    systems: string[];
    enableMisc?: boolean;
  };
  todo?: {
    enabled: boolean;
  };
  dailyTodoList?: Todo[];
  patientsPerPage: number;
};
