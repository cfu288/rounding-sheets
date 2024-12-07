import { Page } from "@react-pdf/renderer";
import { ACTUAL_PATIENTS_PER_PAGE } from "./const";
import { PatientRow } from "./PatientRow";
import { Document, StyleSheet } from "@react-pdf/renderer";

import { Text } from "@react-pdf/renderer";

const documentStyles = StyleSheet.create({
  page: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "8in",
    height: "11.5in",
    fontSize: "8px",
    padding: "0.125in",
    fontFamily: "Atkinson",
    fontWeight: "normal",
  },
});

const hiddenDataStyles = StyleSheet.create({
  hiddenText: {
    display: "none",
    height: 0,
    width: 0,
    color: "transparent",
  },
});

const HiddenDataComponent = () => (
  <Text id="hiddenData" style={hiddenDataStyles.hiddenText}>
    {JSON.stringify(ACTUAL_PATIENTS_PER_PAGE)}
  </Text>
);

export const PatientListPrintout = ({ patients }: { patients: any }) => {
  return (
    <Document title="ScutSheet">
      {ACTUAL_PATIENTS_PER_PAGE.map((patients, pageIndex) => (
        <Page key={pageIndex} size={"LETTER"} style={documentStyles.page}>
          <HiddenDataComponent />
          {patients.map((patient, index) => (
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
};
