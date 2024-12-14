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
  };
  events?: {
    enabled: boolean;
    fullWidth?: boolean;
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
  ap?: {
    enabled: boolean;
    systemsBased: boolean;
    systems: string[];
  };
  dailyTodoList?: Todo[];
  patientsPerPage: number;
};
