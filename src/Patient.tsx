import { DisplayTemplate } from "./DisplayTemplate";
import { Todo } from "./Todo";

export type Patient = {
  last_name?: string;
  first_name?: string;
  dob?: string;
  location?: string;
  mrn?: string;
  one_liner?: string;
  hpi?: string[];
  todos?: Todo[];
  assessment_and_plan?: {
    assessment: string;
    plan: string[];
  }[];
  display_template_overrides?: Partial<DisplayTemplate>[];
};

export const PatientSchema = {
  type: "object",
  properties: {
    last_name: { type: "string" },
    first_name: { type: "string" },
    dob: { type: "string", format: "date" },
    location: { type: "string" },
    mrn: { type: "string" },
    one_liner: { type: "string" },
    hpi: {
      type: "array",
      items: { type: "string" },
    },
    todos: {
      type: "array",
      items: { $ref: "#/definitions/Todo" },
    },
    assessment_and_plan: {
      type: "array",
      items: {
        type: "object",
        properties: {
          assessment: { type: "string" },
          plan: {
            type: "array",
            items: { type: "string" },
          },
        },
        required: ["assessment", "plan"],
      },
    },
    display_size: { type: "string", enum: ["1x", "2x"] },
  },
  definitions: {
    Todo: {
      type: "object",
      properties: {
        description: { type: "string" },
        due_date: { type: "string" },
        status: { type: "string", enum: ["OPEN", "CLOSED"] },
      },
      required: ["description", "status"],
    },
  },
  additionalProperties: false,
};
