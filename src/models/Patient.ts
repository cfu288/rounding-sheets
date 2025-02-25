import { DisplayTemplate } from "./DisplayTemplate";
import { Todo } from "./Todo";

export interface LabBase {
  display_name: string;
  units: string;
  display_value: string;
  effective_datetime: string;
  identifiers: {
    id: string;
    system: "powerchart-touch";
  }[];
}

export interface LabNumber extends LabBase {
  value_number: number;
}

export interface LabString extends LabBase {
  value_string: string;
}

export type Lab = LabNumber | LabString;

export interface VitalBase {
  display_name: string;
  units: string;
  display_value: string;
  effective_datetime: string;
  identifiers: {
    id: string;
    system: "powerchart-touch";
  }[];
}

export interface VitalNumber extends VitalBase {
  value_number: number;
}

export interface VitalString extends VitalBase {
  value_string: string;
}

export type Vital = VitalNumber | VitalString;

export interface AssessmentAndPlanItem {
  assessment: string;
  plan: string[];
  category?: string;
}

export interface Med {
  name: string;
  route: string;
  frequency: string;
  dose: string | number;
  unit: string;
}

export interface Patient {
  id: string;
  name: string;
  room: string;
  age: number;
  gender: string;
  mrn: string;
  csn: string;
  dob: string;
  admission_date: string;
  discharge_date?: string;
  attending_name: string;
  attending_id: string;
  resident_name: string;
  resident_id: string;
  intern_name: string;
  intern_id: string;
  service: string;
  team: string;
  diagnosis: string;
  allergies: string[];
  code_status: string;
  isolation: string[];
  diet: string;
  activity: string;
  vitals?: Partial<Vital>[];
  labs?: Partial<Lab>[];
  meds?: Partial<Med>[];
  todos?: Todo[];
  one_liner?: string;
  hpi?: string;
  assessment_and_plan?: AssessmentAndPlanItem[];
  display_template_overrides?: Partial<DisplayTemplate>[];
}

export function createEmptyPatient(): Patient {
  return {
    id: "",
    name: "",
    room: "",
    age: 0,
    gender: "",
    mrn: "",
    csn: "",
    dob: "",
    admission_date: "",
    attending_name: "",
    attending_id: "",
    resident_name: "",
    resident_id: "",
    intern_name: "",
    intern_id: "",
    service: "",
    team: "",
    diagnosis: "",
    allergies: [],
    code_status: "",
    isolation: [],
    diet: "",
    activity: "",
    vitals: [],
    labs: [],
    meds: [],
    todos: [],
    one_liner: "",
    hpi: "",
    assessment_and_plan: [],
  };
}
