import { Todo } from "./Todo";
import { Patient } from "./Patient";

export const daily_todo_list: Todo[] = [
  {
    description: "Note",
    status: "OPEN",
  },
  {
    description: "Labs",
    status: "OPEN",
  },
  {
    description: "Hospital Course",
    status: "OPEN",
  },
];

export const patient_list: Patient[] = [
  {
    last_name: "Doe",
    first_name: "Jane",
    dob: "",
    location: "",
    mrn: "1234567",
    one_liner:
      "54-year-old female with atypical chest pain and a history of hypertension and hyperlipidemia.",
    hpi: [
      "Jane Doe is a 54-year-old female with a past medical history of hypertension and hyperlipidemia presenting with a 4-hour history of intermittent chest discomfort.",
      "The pain is described as a mild, dull ache located in the left anterior chest. The discomfort does not radiate and is not associated with exertion.",
      "She denies any associated shortness of breath, diaphoresis, palpitations, nausea, or syncope. She notes that the pain sometimes improves with position changes and resolves spontaneously within 5–10 minutes.",
      "She denies recent fevers, chills, upper respiratory symptoms, or cough. No history of prior similar episodes.",
      "She does not recall any specific activities precipitating today's episode. She denies recent travel, immobilization, or a history of deep vein thrombosis/pulmonary embolism (DVT/PE).",
      "Social history reveals she is a nonsmoker, has no alcohol intake, and has no recreational drug use. Family history is significant for her father's myocardial infarction at age 58.",
    ],
    todos: [
      {
        description: "Serial troponins q6 hours x 2 to rule out NSTEMI",
        due_date: null,
        status: "OPEN",
      },
      {
        description: "Continuous telemetry monitoring",
        due_date: null,
        status: "OPEN",
      },
      {
        description: "Repeat EKG in 4-6 hours or sooner if symptoms worsen",
        due_date: null,
        status: "OPEN",
      },
      {
        description: "Continue ASA 81 mg daily",
        due_date: null,
        status: "OPEN",
      },
      {
        description: "PRN acetaminophen for musculoskeletal chest pain",
        due_date: null,
        status: "OPEN",
      },
      {
        description:
          "Consider trial of omeprazole 20 mg daily for possible GERD",
        due_date: null,
        status: "OPEN",
      },
    ],
    assessment_and_plan: [
      {
        assessment: "Acute Coronary Syndrome (ACS)",
        plan: [
          "Serial troponins q6 hours x 2",
          "Continuous telemetry monitoring",
          "Repeat EKG in 4-6 hours or sooner if symptoms worsen",
          "Continue ASA 81 mg daily",
        ],
      },
      {
        assessment: "Hypertension",
        plan: [
          "Blood pressure elevated but at baseline. Continue home medication (amlodipine).",
        ],
      },
      {
        assessment: "Hyperlipidemia",
        plan: ["Continue atorvastatin 20 mg"],
      },
      {
        assessment: "Musculoskeletal Chest Pain (Possible)",
        plan: [
          "PRN acetaminophen for discomfort if chest wall tenderness develops",
        ],
      },
      {
        assessment: "GERD/Dyspepsia (Possible)",
        plan: ["Consider trial of omeprazole 20 mg daily"],
      },
    ],
    display_size: "2x",
  },
  {},
  {},
]; //

// Calculate the number of rows based on the patient list count
export const N_ROWS = patient_list.length || 0;

export const PATIENTS_PER_PAGE = 3;

export const ACTUAL_PATIENTS_PER_PAGE = (() => {
  const result: Patient[][] = [];
  let currentPage: Patient[] = [];
  let remainingSpace: number = PATIENTS_PER_PAGE;

  for (const patient of patient_list) {
    const size: number = patient.display_size === "2x" ? 2 : 1;

    if (remainingSpace >= size) {
      currentPage.push(patient);
      remainingSpace -= size;
    } else {
      result.push(currentPage);
      currentPage = [patient];
      remainingSpace = PATIENTS_PER_PAGE - size;
    }
  }

  if (currentPage.length > 0) {
    result.push(currentPage);
  }

  return result;
})();

export const CALC_PAGES = Math.ceil(
  patient_list.length / ACTUAL_PATIENTS_PER_PAGE.length
);
