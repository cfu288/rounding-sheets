import { PDFViewer } from "@react-pdf/renderer";
import { Document, Page, StyleSheet } from "@react-pdf/renderer";
import { PatientRow } from "./PatientRow";
import { CALC_PAGES, patient_list, PATIENTS_PER_PAGE } from "./const";

export type Patient = {
  last_name?: string;
  first_name?: string;
  dob?: string;
  mrn?: string;
  one_liner?: string;
};

export type ToDo = {
  description: string;
  due_date: string;
  status: string;
  assigned_to: string;
  notes: string;
};

const App = () => (
  <PDFViewer
    style={{
      width: "100vw",
      height: "100vh",
    }}
  >
    <PatientListPrintout patients={patient_list} />
  </PDFViewer>
);

// Create styles for PatientListPrintout component
const documentStyles = StyleSheet.create({
  page: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "8in",
    height: "11.5in",
    fontSize: "8px",
    padding: "0.125in",
  },
});

// Create Document Component
export const PatientListPrintout = ({ patients }: { patients: Patient[] }) => (
  <Document>
    {Array.from({ length: CALC_PAGES }).map((_, pageIndex) => (
      <Page key={pageIndex} size={"A4"} style={documentStyles.page}>
        {patients
          .slice(
            pageIndex * PATIENTS_PER_PAGE,
            (pageIndex + 1) * PATIENTS_PER_PAGE
          )
          .map((patient, index) => (
            <PatientRow
              key={`${pageIndex}-${index}`}
              patient={patient}
              pageIndex={pageIndex}
              index={index}
            />
          ))}
      </Page>
    ))}
  </Document>
);

export default App;
