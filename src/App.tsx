import { PDFViewer } from "@react-pdf/renderer";
import { Document, Page, StyleSheet } from "@react-pdf/renderer";
import { PatientRow } from "./PatientRow";
import { CALC_PAGES, patient_list, PATIENTS_PER_PAGE } from "./const";
import { Font } from "@react-pdf/renderer";
import source1 from "./assets/Atkinson-Hyperlegible-Regular.ttf";
import source2 from "./assets/Atkinson-Hyperlegible-Italic.ttf";
import source3 from "./assets/Atkinson-Hyperlegible-BoldItalic.ttf";
import source4 from "./assets/Atkinson-Hyperlegible-Bold.ttf";

Font.register({
  family: "Atkinson",
  fonts: [
    { src: source1, fontWeight: "normal" }, // font-style: normal, font-weight: normal
    { src: source2, fontStyle: "italic" },
    { src: source3, fontStyle: "italic", fontWeight: 700 },
    { src: source4, fontWeight: 700 },
  ],
});

export type Patient = {
  last_name?: string;
  first_name?: string;
  dob?: string;
  mrn?: string;
  one_liner?: string;
  todos?: Todo[];
};

export type Todo = {
  description: string;
  due_date?: string;
  status: "OPEN" | "CLOSED";
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
    // fontFamily: "Atkinson",
    fontFamily: "Atkinson",
    fontWeight: "normal",
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
