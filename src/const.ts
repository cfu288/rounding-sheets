import { Patient } from "./App";

export const patient_list: Patient[] = [
  {
    last_name: "Doe",
    first_name: "John",
    dob: "01/01/1970",
    mrn: "123456",
    one_liner: "This is a one-liner",
  },
  {
    last_name: "Smith",
    first_name: "Jane",
    dob: "02/02/1980",
    mrn: "654321",
  },
  {
    last_name: "Brown",
    first_name: "Charlie",
    dob: "03/03/1990",
    mrn: "112233",
  },
  {
    last_name: "Johnson",
    first_name: "Emily",
    dob: "04/04/2000",
    mrn: "445566",
  },
  {
    last_name: "Williams",
    first_name: "Michael",
    dob: "05/05/2010",
    mrn: "778899",
  },
  {
    last_name: "Jones",
    first_name: "Sarah",
    dob: "06/06/2020",
    mrn: "990011",
  },
];

// Calculate the number of rows based on the patient list count
export const N_ROWS = patient_list.length || 0;

export const PATIENTS_PER_PAGE = 3;

export const CALC_PAGES = Math.ceil(patient_list.length / PATIENTS_PER_PAGE);
