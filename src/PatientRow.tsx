import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { Patient } from "./App";
import { N_ROWS, PATIENTS_PER_PAGE } from "./const";

// Create styles for PatientRow component
const patientRowStyles = StyleSheet.create({
  box: {
    width: "50%",
    height: `${100 / PATIENTS_PER_PAGE}%`,
    border: "1px solid black",
    display: "flex",
    position: "relative",
    flexDirection: "column",
  },
  bannerContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  bannerBox: {
    flex: 1,
    backgroundColor: "white",
    borderBottom: "1px solid black",
    borderRight: "1px solid black",
    whiteSpace: "nowrap",
    padding: "2px",
  },
  splitBoxContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  gridContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  gridBox: {
    width: "50%",
    height: "50%",
  },
  flexContainer: {
    flex: 1,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    borderTop: "1px solid black",
    width: "100%",
    padding: "2px",
  },
});

// Create PatientRow Component
export const PatientRow = ({
  patient,
  pageIndex,
  index,
}: {
  patient: Patient;
  pageIndex: number;
  index: number;
}) => (
  <>
    <View key={`${pageIndex}-${index}-1`} style={patientRowStyles.box}>
      <View style={patientRowStyles.bannerContainer}>
        <View style={patientRowStyles.bannerBox}>
          <Text>{patient.first_name}</Text>
        </View>
        <View style={patientRowStyles.bannerBox}>
          <Text>{patient.last_name?.toUpperCase()}</Text>
        </View>
        <View style={patientRowStyles.bannerBox}>
          <Text>DOB: {patient.dob}</Text>
        </View>
        <View style={patientRowStyles.bannerBox}>
          <Text>MRN: {patient.mrn}</Text>
        </View>
      </View>
      {patient.one_liner ? (
        <View>
          <Text
            style={{
              padding: "2px",
              fontStyle: "italic",
            }}
          >
            {patient.one_liner}
          </Text>
        </View>
      ) : undefined}
      <View style={{ padding: "2px" }}>
        <Text
          style={{
            fontWeight: 700,
          }}
        >
          Events:
        </Text>
      </View>
    </View>
    <View key={`${pageIndex}-${index}-2`} style={patientRowStyles.box}>
      <View style={patientRowStyles.splitBoxContainer}>
        <Text
          style={{
            padding: "2px",
          }}
        >
          A/P:
        </Text>
        <View style={patientRowStyles.gridContainer}>
          <View style={patientRowStyles.gridBox}>
            <Text
              style={{
                padding: "2px",
              }}
            >
              #
            </Text>
          </View>
          <View style={patientRowStyles.gridBox}>
            <Text
              style={{
                padding: "2px",
              }}
            >
              #
            </Text>
          </View>
          <View style={patientRowStyles.gridBox}>
            <Text
              style={{
                padding: "2px",
              }}
            >
              #
            </Text>
          </View>
          <View style={patientRowStyles.gridBox}>
            <Text
              style={{
                padding: "2px",
              }}
            >
              #
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            height: "50%",
          }}
        >
          <View style={patientRowStyles.flexContainer}>
            <Text
              style={{
                padding: "2px",
              }}
            >
              TODO:
            </Text>
          </View>
          <View style={patientRowStyles.footer}>
            <Text style={{ paddingRight: "8px" }}>[{"  "}] item 1</Text>
            <Text style={{ paddingRight: "8px" }}>[{"  "}] item 1</Text>
          </View>
        </View>
      </View>
    </View>
  </>
);
