import { KnownTemplateIds } from "../const";
import { Todo } from "./Todo";

export type DisplayTemplate = {
  templateName: string;
  templateId: KnownTemplateIds;
  description: string;
  imagePreview: string;
  displaySize: "1x" | "2x";
  hpi: {
    enabled: boolean;
  };
  events: {
    enabled: boolean;
  };
  physicalExam: {
    enabled: boolean;
    sections: string[];
  };
  vitals: {
    enabled: boolean;
    sections: string[];
  };
  labs: {
    enabled: boolean;
  };
  meds: {
    enabled: boolean;
  };
  dailyTodoList?: Todo[];
  patientsPerPage: number;
};
