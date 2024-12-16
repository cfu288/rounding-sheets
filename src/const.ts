import { Patient } from "./models/Patient";
import { DisplayTemplate } from "./models/DisplayTemplate";

export const display_templates: DisplayTemplate[] = [
  {
    templateName: "Medicine Floor (3 Patients)",
    description:
      "Designed for residents on floors. Keep track of the most important information for rounds.",
    templateId: "3_pt_floor_template",
    imagePreview: "/images/3person.png",
    displaySize: "1x",
    hpi: {
      enabled: false,
    },
    events: {
      enabled: true,
      fullWidth: true,
    },
    physicalExam: {
      enabled: true,
      sections: ["HEENT", "Skin", "CVS", "Pulm", "GI", "MSK", "Neuro", "Lines"],
    },
    vitals: {
      enabled: true,
      sections: ["Temp", "Sys", "Dias", "RR", "HR", "SpO2"],
    },
    labs: {
      enabled: true,
    },
    meds: {
      enabled: true,
    },
    consults: {
      enabled: false,
    },
    dailyTodoList: [
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
    ],
    patientsPerPage: 3,
  },
  {
    templateName: "Medicine Floor (2 Patients)",
    templateId: "2_pt_floor_template",
    imagePreview: "/images/2person.png",
    description: "Designed for floors, fits 2 patients on a single page",
    displaySize: "1x",
    hpi: {
      enabled: false,
    },
    events: {
      enabled: true,
      fullWidth: true,
    },
    physicalExam: {
      enabled: true,
      sections: ["HEENT", "Skin", "CVS", "Pulm", "GI", "MSK", "Neuro", "Lines"],
    },
    vitals: {
      enabled: true,
      sections: ["Temp", "Sys", "Dias", "RR", "HR", "SpO2"],
    },
    labs: {
      enabled: true,
    },
    meds: {
      enabled: true,
    },
    consults: {
      enabled: false,
    },
    dailyTodoList: [
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
    ],
    patientsPerPage: 2,
  },
  {
    templateName: "Medicine Admission",
    templateId: "1_pt_floor_template",
    imagePreview: "/images/1person.png",
    description: "One full page per patient. Great for new admissions.",
    displaySize: "1x",
    hpi: {
      enabled: true,
      blankLines: 20,
    },
    events: {
      enabled: false,
      fullWidth: true,
      height: "1/12",
    },
    physicalExam: {
      enabled: true,
      sections: ["HEENT", "Skin", "CVS", "Pulm", "GI", "MSK", "Neuro", "Lines"],
    },
    vitals: {
      enabled: true,
      sections: ["Temp", "Sys", "Dias", "RR", "HR", "SpO2"],
    },
    socialHistory: {
      enabled: true,
      height: "1/12",
    },
    familyHistory: {
      enabled: true,
      height: "1/12",
    },
    allergies: {
      enabled: true,
      height: "1/12",
    },
    surgicalHistory: {
      enabled: true,
      height: "1/12",
    },
    labs: {
      enabled: true,
    },
    meds: {
      enabled: true,
    },
    consults: {
      enabled: true,
    },
    imaging: {
      enabled: true,
    },
    ap: {
      enableMisc: true,
      enabled: true,
      systemsBased: false,
      systems: [],
    },
    dailyTodoList: [
      {
        description: "Note",
        status: "OPEN",
      },
      {
        description: "Orders",
        status: "OPEN",
      },
    ],
    patientsPerPage: 1,
  },
  {
    templateName: "MICU",
    templateId: "1_pt_micu_template",
    imagePreview: "/images/micu1person.png",
    description:
      "Designed for residents in the MICU. One full page per patient, systems based.",
    displaySize: "1x",
    hpi: {
      enabled: true,
    },
    events: {
      enabled: true,
      fullWidth: true,
      height: "1/12",
    },
    physicalExam: {
      enabled: true,
      sections: ["HEENT", "Skin", "CVS", "Pulm", "GI", "MSK", "Neuro", "Lines"],
    },
    vitals: {
      enabled: true,
      sections: [
        "Temp",
        "HR",
        "RR",
        "BP (MAP)",
        "Sedatives",
        "Pressors",
        "SpO2",
        "Rate",
        "TV",
        "FiO2",
        "PEEP",
        "pH/PaCO2/PaO2/HCO3",
        "I&O",
      ],
    },
    labs: {
      enabled: true,
      fullWidth: true,
    },
    meds: {
      enabled: true,
    },
    consults: {
      enabled: true,
    },
    imaging: {
      enabled: true,
    },
    ap: {
      enabled: true,
      systemsBased: true,
      systems: [
        "Neuro",
        "Cardio",
        "Pulm",
        "GI",
        "Renal/GU",
        "Heme",
        "Endo",
        "ID",
        "MSK",
        "Skin",
        "Other",
      ],
    },
    dailyTodoList: [
      {
        description: "Note",
        status: "OPEN",
      },
      {
        description: "CBC, CMP, Mg, Phos (4am)",
        status: "OPEN",
      },
      {
        description: "AVG (4am), CXR (1am)",
        status: "OPEN",
      },
      {
        description: "T&S",
        status: "OPEN",
      },
    ],
    patientsPerPage: 1,
  },
];

export const KnownTemplateIds = [
  "3_pt_floor_template",
  "2_pt_floor_template",
  "1_pt_floor_template",
  "1_pt_micu_template",
] as const;
export type KnownTemplateIds = (typeof KnownTemplateIds)[number];

export function getTemplate({
  template_id = "3_pt_floor_template",
  custom_override_templates = display_templates,
}: {
  template_id?: KnownTemplateIds;
  custom_override_templates?: Partial<DisplayTemplate>[];
} = {}): DisplayTemplate {
  const baseTemplate = display_templates.find(
    (template) => template.templateId === template_id
  );

  if (!baseTemplate) {
    throw new Error(
      `Template with id ${template_id} not found in display templates`
    );
  }

  if (custom_override_templates) {
    const overrideTemplate = custom_override_templates.find(
      (template) => template.templateId === template_id
    );

    if (overrideTemplate) {
      return { ...baseTemplate, ...overrideTemplate };
    }
  }

  return baseTemplate;
}

export const patient_list: Patient[] = [
  {
    // last_name: "Doe",
    // first_name: "Jane",
    // dob: "",
    // location: "",
    // mrn: "1234567",
    // one_liner:
    //   "54-year-old female with atypical chest pain and a history of hypertension and hyperlipidemia.",
    // hpi: [
    //   "Jane Doe is a 54-year-old female with a past medical history of hypertension and hyperlipidemia presenting with a 4-hour history of intermittent chest discomfort.",
    //   "The pain is described as a mild, dull ache located in the left anterior chest. The discomfort does not radiate and is not associated with exertion.",
    //   "She denies any associated shortness of breath, diaphoresis, palpitations, nausea, or syncope. She notes that the pain sometimes improves with position changes and resolves spontaneously within 5–10 minutes.",
    //   "She denies recent fevers, chills, upper respiratory symptoms, or cough. No history of prior similar episodes.",
    //   "She does not recall any specific activities precipitating today's episode. She denies recent travel, immobilization, or a history of deep vein thrombosis/pulmonary embolism (DVT/PE).",
    //   "Social history reveals she is a nonsmoker, has no alcohol intake, and has no recreational drug use. Family history is significant for her father's myocardial infarction at age 58.",
    // ],
    // todos: [
    //   {
    //     description: "Serial troponins q6 hours x 2 to rule out NSTEMI",
    //     due_date: null,
    //     status: "OPEN",
    //   },
    //   {
    //     description: "Continuous telemetry monitoring",
    //     due_date: null,
    //     status: "OPEN",
    //   },
    //   {
    //     description: "Repeat EKG in 4-6 hours or sooner if symptoms worsen",
    //     due_date: null,
    //     status: "OPEN",
    //   },
    //   {
    //     description: "Continue ASA 81 mg daily",
    //     due_date: null,
    //     status: "OPEN",
    //   },
    //   {
    //     description: "PRN acetaminophen for musculoskeletal chest pain",
    //     due_date: null,
    //     status: "OPEN",
    //   },
    //   {
    //     description:
    //       "Consider trial of omeprazole 20 mg daily for possible GERD",
    //     due_date: null,
    //     status: "OPEN",
    //   },
    // ],
    // assessment_and_plan: [
    //   {
    //     assessment: "Acute Coronary Syndrome (ACS)",
    //     plan: [
    //       "Serial troponins q6 hours x 2",
    //       "Continuous telemetry monitoring",
    //       "Repeat EKG in 4-6 hours or sooner if symptoms worsen",
    //       "Continue ASA 81 mg daily",
    //     ],
    //   },
    //   {
    //     assessment: "Hypertension",
    //     plan: [
    //       "Blood pressure elevated but at baseline. Continue home medication (amlodipine).",
    //     ],
    //   },
    //   {
    //     assessment: "Hyperlipidemia",
    //     plan: ["Continue atorvastatin 20 mg"],
    //   },
    //   {
    //     assessment: "Musculoskeletal Chest Pain (Possible)",
    //     plan: [
    //       "PRN acetaminophen for discomfort if chest wall tenderness develops",
    //     ],
    //   },
    //   {
    //     assessment: "GERD/Dyspepsia (Possible)",
    //     plan: ["Consider trial of omeprazole 20 mg daily"],
    //   },
    // ],
    // display_size: "2x",
  },
  {},
  {},
  {},
  {},
  {},
];
