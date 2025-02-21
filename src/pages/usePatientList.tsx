import { Patient, createEmptyPatient } from "@/models/Patient";

const example_patients: Patient[] = [
  {
    ...createEmptyPatient(),
    location: "CTICU 13",
    last_name: "Davis",
    first_name: "Wayne",
    mrn: "4472705",
    dob: "Jul 15, 1961",
    hpi: `
63yo M PMH AUD, CAD, HTN, bipolar disorder, schizophrenia, admitted as a transfer from OSH on 2/9 for AMS, seizures, rhabdomyolysis, concerning for alcohol withdrawal seizures and possible delirium tremens. 
He has been managed on the floors with CIWA (Ativan). Also noted to have transaminits and elevated CK c/f rhabdomyolysis managed with fluids. Pt also found to have b/l humerus fractures (due to seizures?) which ortho was going to operate on next week. 
MICU consulted 2/13 for airway watch in the setting of acute L jaw swelling that happened overnight; pt seen at bedside w/ audible stridor. ENT initially consulted but patient initially refused ENT; ENT rec'd CT neck which pt was taken down for along with CT angio (r/o PE i/s/o tachycardia).
However during CT, pt coded. Nursing bedside noted patient to have PEA arrest. ROSC achieved after three rounds of compressions and 2 doses of epinephrine. Patient intubated for airway protection. Patient then brought to the MICU.
In MICU, notably pt having extended convulsive activity concerning for status epilepticus; s/p ativan 4 mg x 2, propofol drip started, and keppra load. Per neuro recs, started on Targeted Temperature Management (TTM). EEG showing burst suppression pattern.
`,
    one_liner:
      "DAVIS, WAYNE is a 63 y/o m w AUD, CAD, HTN, bipolar disorder, schizophrenia, admitted for AMS, seizures, rhabdomyolysis, and autonomic instability, concerning for alcohol withdrawal seizures and possible DT. His hospital course has been complicated by 1. left submandibular edema with airway compression, 2 PEA arrest, and 3. myoclonic jerks",
    assessment_and_plan: [
      {
        assessment: "Neuro",
        plan: [
          "#status epilepticus s/p CPR",
          "#anoxic brain injury",
          "#hx of alcohol withdrawal last drink 2/6",
          "normal EEG 2/10, LTVEEG with burst suppression patterns c/w anoxic brain injury",
          "keppra maint dose",
          "c/w thiamine, folate",
          "f/u neurocrit/neuro recommendations",
          "TTM rewarming",
          "#schizophrenia/bipolar disorder/depression",
          "#schizoaffective disorder",
          // "home meds: olanzapine, risperidone, sertraline, and vilazodone",
          "hold olanzapine, risperidone and sertraline, psych following",
        ],
      },
      {
        assessment: "Pulm",
        plan: [
          "intubated, c/f aspiration",
          "#parotitis",
          "#laryngeal edema",
          "c/w vanc, zosyn",
          "ENT following",
        ],
      },
      {
        assessment: "Cardio",
        plan: [
          "#cardiac arrest",
          "TTM - now rewarming",
          "#reported syncope",
          "TTE with normal EF, no abnormalities",
          "negative initial EEG",
        ],
      },
      {
        assessment: "GI",
        plan: [
          "#Acute transaminitis",
          "Likely due to rhabdo, maddrey 7.7 not concerning for alc hep at this time",
        ],
      },
      {
        assessment: "Renal/GU",
        plan: [
          "#rhabdomyolysis",
          "patient had bloody UA with 0 rbcs i/s/o seizure.",
          "troponin downtrending, elevation likely i/s/o rhabdomyolysis, no EKG changes",
          "trend CK",
        ],
      },
      {
        assessment: "ID",
        plan: [
          "#L cheek swelling",
          "unclear reason, c/f parotitis vs angioedema vs abscess. ENT following",
          "CT neck: Extensive edematous changes involving the laryngeal soft tissues with severe stenosis of the laryngeal airway. Differential: Laryngeal edema/angioedema. An infectious or inflammatory process or laryngeal mass cannot be excluded.",
          "c/w vanc, zosyn, f/u Bcx 2/13, 2/7 Bcx NGTD x 5 days",
          "vanc level 2/14 PM",
        ],
      },
      {
        assessment: "Endo",
        plan: ["NAI", "q4h fingersticks / SSI"],
      },
      {
        assessment: "Heme",
        plan: [
          "#Anemia",
          "patient with stable Hg however downtrending",
          "2/2 trauma? bleeding into b/l humerus area?",
          "normal bilirubin, haptoglobin: low concern for hemolysis.",
          "trend cbc q6h",
        ],
      },
      {
        assessment: "MSK",
        plan: [
          "#Bilateral Humerus Fractures likely 2/2 seizures",
          "CT of the R shoulder shows comminuted humeral head fracture with posterior dislocation of humeral head fragment",
          "Ortho: shoulder arthroplasty vs ORIF once stable",
        ],
      },
    ],
  },
  {
    ...createEmptyPatient(),
    location: "CTICU 8",
    last_name: "russo",
    first_name: "Frank",
    dob: "Nov 8, 1960",
    mrn: "3071238",
    hpi: `
  64M with PMH of HTN, HLD, DM on insulin, A-fib on Eliquis, chronic lower extremity lymphedema with ulcers, tobacco use, and obesity, presented to MidHudson on 1/28 with SOB due to pneumonia, concern for LE/scrotal cellulitis, and AKI on CKD. On 2/3 he was started on HD due to worsening renal failure with associated severe hypervolemia not responding sufficiently to diuretics. Despite this he continued to have worsening dyspnea requiring transfer to ICU on 2/10 with subsequent intubation. On 2/11 during HD patient suffered a cardiac arrest with ROSC after ~10 minutes, post arrest course complicated by pericardial effusion Medium sized 1.5 to 2 cm  but not noted to have tamponade. Due to diffuse volume overload status was requiring more frequent and longer sessions of IHD. 2/13 during the day an extra session of HD was attempted but the patient did not tolerate it. Decision was made to transfer to WMC for higher level of care specifically CVVHD.
  `,
    one_liner:
      "64M with PMH of HTN, HLD, DM on insulin, A-fib on Eliquis, chronic lower extremity lymphedema with ulcers transferred from MidHudson on 1/28 with SOB due to pneumonia, septic shock, and AKI on CKD. Course complicated by worsening dyspnea and renal failure necessitating HD on 2/3 and intubation and MICU admission on 2/10. Also had cardiac arrest on 2/11 during dialysis session with ROSC achieved in 10 minutes. Ultimately transferred to WMC for higher level of care specifically CVVHD.",
    assessment_and_plan: [
      {
        assessment: "Neuro",
        plan: [
          "# Sedated on propofol and fentanyl",
          "Maintaining deep sedation i/s/o of ARDS",
          "Obtain CT head post cardiac arrest after chest tube/shiley",
        ],
      },
      {
        assessment: "Pulm",
        plan: [
          "# ARDS, B/L pleural effusion, AHRF",
          "P/F < 100 c/f ARDS",
          "Bilateral pleural effusion noted on POCUS",
          "S/p chest tube 2/14, sent fluid studies",
          "Deep sedation with fentanyl and propofol as above",
          "B/l pleural effusions potentially iso of malignancy vs infectious, CT thorax obtained at OSH with bilateral lung nodules",
        ],
      },
      {
        assessment: "Cardio",
        plan: [
          "# Atrial fibrillation",
          "# Post cardiac arrest, ROSC after 10 minutes",
          "AC on hold since 2/12, as OSH was planning for thoracentesis",
          "Last TTE at OSH 2/10 revealed small pleural effusion <1 cm",
          "Some concern for pericardial effusion post arrest, not appreciated on bedside POCUS by MICU here but can repeat TTE",
        ],
      },
      {
        assessment: "Renal",
        plan: [
          "# AKI on CKD, Volume overloaded",
          "Will start CVVHD once new dialysis catheter placed.",
        ],
      },
      {
        assessment: "ID",
        plan: [
          "# Acute hypoxic respiratory failure",
          "# Septic shock",
          "Suspected to be pneumonia, less likely venous ulcer",
          "Initially on meropenem and linezolid",
          "F/u blood, sputum, respiratory multiplex",
          "# R lower leg cellulitis",
          "Dry ulcers noted, in the setting of venous stasis",
          "Reached out to ID - recced d/c linezolid, c/v meropenam 500 q24h, uro consult, US left inner thigh, serum procal",
        ],
      },
      {
        assessment: "Endo",
        plan: ["# DM", "c/w glargine 12 BID and sliding scale insulin"],
      },
    ],
  },
  {
    ...createEmptyPatient(),
    location: "MICU 4",
    last_name: "Wilson",
    first_name: "Arielle",
    dob: "Nov 22, 1988",
    hpi: `
  36 y/o f with recent diagnosis of EtOH cirrhosis in November, c/b reoccuring ascites needing weekly paracentesis and HE who initially presented to Albany Medical Center on 24/25 with worsening jaundice, abdominal distension, and AMS with c/f acute on chronic liver failure. Transferred to WMC for OLT evaluation. Patient was admitted to MICU due to worsening mental status and rapid decompensation of chronic liver failure and multi-organ failure. Started on CVV since 2/6 for AKI, Now intubated since 2/7 for airway protection. Course in MICU has been complicated by profound ileus despite previous attempts of bowel regimine with golytely, neostigmine. Extubation has been deferred given aspiration risk.
  There was recently concern for SBO given ileus, however CTAP did not reveal any obstruction. Noted to have some segments of mural thickening, likely 2/2 intestional edema. Also noted was moderate-large ascites, so an IP drain was placed yesterday which drained slightly over 4L before it was clamped. Two days ago, NGT suction, and rectal tube, yesterday noted to have some oozing around access points requiring Cryo and FFP. ROTEM ordered for guidance"
  `,
    one_liner:
      "36-year-old woman with history of gastric bypass surgery, with decompensated EtOH cirrhosis with encephalopathy, respiratory failure, renal failure, and hypotension, course complicated by bleeding and ileus",
    assessment_and_plan: [
      {
        assessment: "Neuro",
        plan: [
          "# Sedation",
          "Wean precedex and propofol daily for mental status exam",
          "# AMS/Hepatic Encephalopathy",
          "C/w rifaximin, hold lactulose due to abdominal distension",
          "Continue CVVHD for ammonia clearance at 100 cc/hour",
          "Sodium benzonate 2.5g q12h",
        ],
      },
      {
        assessment: "Pulm",
        plan: [
          "# Intubated",
          "Plan to attempt extubation after GI tract decompression",
        ],
      },
      {
        assessment: "Cardio",
        plan: [
          "# Hypotension",
          "Wean levo as tolerated",
          "likely 2/2 vasoplegia i/s/o ACLF",
          "# QTc Prolongation",
          "Monitor QTc (currently 580-640)",
        ],
      },
      {
        assessment: "GI",
        plan: [
          "# Decompensated Cirrhosis",
          "MELD OPTN score of 40",
          "HE: c/w rifaximin. Holding lactulose i/s/o abd distension. s/p 4 L of golytely on 2/6. Only 1 scant BM recorded over HC. Now passing flatulence.",
          "Volume status: CVVHD started 2/6, 100cc/hr target",
          "Ascites: present. s/p therapeutic paracentesis on 2/6, 2/13 drain placed, fluid studies sent",
          "SBP ppx: c/w ceftriaxone 1g",
          "EV: unknown, c/w pantoprazole 40 mg IV BID",
          "# Ileus",
          "Gave 1L of golytely on 2/14. fresh water enema 2/14 no stool",
          "Daily KUB and serial abdominal exams",
          "CVVHD to 100cc/hr for fluid removal",
          "Hold oral medications (Linzess, Simethicone)",
        ],
      },
      {
        assessment: "Renal/GU",
        plan: [
          "# Oliguric AKI",
          "Continue CVVHD at 100cc/hr target",
          "D/C foley 2/13",
        ],
      },
      {
        assessment: "Heme",
        plan: [
          "# Acute Normocytic Anemia/DIC",
          "Transfuse for Hgb < 7 and fibrinogen < 100",
          "ROTEM - platelet replacement",
          "Monitor for bleeding/oozing",
        ],
      },
      {
        assessment: "Endo",
        plan: [
          "# Hypothyroidism",
          "Continue IV levothyroxine 18.75mcg daily",
          "# Hyperglycemia",
          "Continue sliding scale insulin with TPN + glargine 4u q12h",
        ],
      },
      {
        assessment: "ID",
        plan: [
          "# Leukocytosis",
          "Continue ceftriaxone 1g daily for SBP ppx",
          "f/u repeat blood cultures",
          "Follow-up rest ofdiagnostic paracentesis labs (including TB, triglycerides, cytology)",
        ],
      },
    ],
  },
];
