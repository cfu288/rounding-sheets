import { KnownTemplateIds } from "./const";
import { Todo } from "./Todo";

export type DisplayTemplate = {
  templateName: string;
  templateId: KnownTemplateIds;
  description: string;
  imagePreview: string;
  displaySize: "1x" | "2x";
  physicalExam: {
    sections: string[];
  };
  vitals: {
    sections: string[];
  };
  dailyTodoList?: Todo[];
  patientsPerPage: number;
};
