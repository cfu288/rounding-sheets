import { CMPFishbone } from "./Labs/CMPFishbone";
import { HHFishbone } from "./Labs/HHFishbone";
import { ReverseYFishbone } from "./Labs/ReverseYFishbone";
import { XFishbone } from "./Labs/XFishbone";
import { YFishbone } from "./Labs/YFishbone";
import { GridSectionProps } from "./PatientRow";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

const patientRowStyles = StyleSheet.create({
  bannerContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  bannerBox: {
    flex: 1,
    backgroundColor: "white",
    borderBottom: "0.5px solid black",
    borderRight: "0.5px solid black",
    whiteSpace: "nowrap",
    padding: "2px",
  },
  bannerBoxShrinkable: {
    backgroundColor: "white",
    borderBottom: "0.5px solid black",
    borderRight: "0.5px solid black",
    whiteSpace: "nowrap",
    padding: "2px",
    flexShrink: 1,
    minWidth: "30px",
    minHeight: "13px",
  },
  bannerBoxShrinkableLarge: {
    backgroundColor: "white",
    borderBottom: "0.5px solid black",
    borderRight: "0.5px solid black",
    whiteSpace: "nowrap",
    padding: "2px",
    flexShrink: 1,
    minWidth: "50px",
    minHeight: "13px",
  },
  bannerBoxShrinkableLargeRightNoBorder: {
    backgroundColor: "white",
    borderBottom: "0.5px solid black",
    whiteSpace: "nowrap",
    padding: "2px",
    flexShrink: 1,
    minWidth: "50px",
    minHeight: "13px",
  },
  eventsText: {
    padding: "2px",
    fontWeight: 700,
    minHeight: "25%",
  },
  gridContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  subObjGridBox: {
    width: "50%",
    minHeight: "25%",
    maxHeight: "50%",
  },
  subObjGridBoxFullWidth: {
    width: "100%",
    minHeight: "25%",
    maxHeight: "50%",
  },
  labsGridBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  gridBoxText: {
    padding: "2px",
    paddingBottom: "0.5px",
    paddingTop: "3px",
    fontWeight: 700,
  },
  todoText: {
    fontWeight: 700,
    width: "100%",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    borderTop: "0.5px solid black",
    width: "100%",
    padding: "2px",
  },
  todoBlank: {
    paddingHorizontal: "2px",
    paddingVertical: "2px",
    borderBottom: "0.5px dotted grey",
    width: "100%",
  },
  todoContainer: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    height: "50%",
  },
  fishboneContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  fishboneSvg: {
    margin: "8px",
    marginVertical: "2px",
  },
  fishboneValueText: {
    fontSize: "8px",
  },
  peText: {
    paddingLeft: "2px",
  },
  medsText: {
    paddingLeft: "2px",
    fontSize: "6px",
  },
  medsEmptyPlaceholder: {
    marginLeft: "2px",
    marginRight: "2px",
    borderBottom: "0.5px dotted grey",
    width: "100%",
  },
  smallBannerText: {
    fontSize: 3,
    textAlign: "left",
  },
  medsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  medsColumn: {
    width: "50%",
  },
});

export const GridSection: React.FC<
  GridSectionProps & { medications?: string[] }
> = ({
  vitals,
  physicalExams,
  medications = [
    // "Amlodipine 10mg PO BID",
    // "Lisinopril 20mg PO QD",
    // "Metformin 500mg PO BID",
    // "Atorvastatin 40mg PO QHS",
    // "Aspirin 81mg PO QD",
    // "Tamulosin 0.4mg PO QHS",
    // "Omeprazole 20mg PO QD",
    // "Insulin Glargine 10 units SC QHS",
    // "Insulin Lispro 5 units SC TID with meals",
    // "Insulin Sensitive Sliding Scale",
  ],
}) => (
  <View style={patientRowStyles.gridContainer}>
    <View style={patientRowStyles.subObjGridBoxFullWidth}>
      <Text style={patientRowStyles.eventsText}>Events:</Text>
    </View>
    <View style={patientRowStyles.subObjGridBox}>
      <Text style={patientRowStyles.gridBoxText}>Vitals:</Text>
      {vitals.map((vital, i) => (
        <Text key={i} style={patientRowStyles.peText}>
          {vital}:
        </Text>
      ))}
    </View>
    <View style={patientRowStyles.subObjGridBox}>
      <Text style={patientRowStyles.gridBoxText}>PE:</Text>
      {physicalExams.map((exam, i) => (
        <Text key={i} style={patientRowStyles.peText}>
          {exam}:
        </Text>
      ))}
    </View>
    <View style={patientRowStyles.subObjGridBox}>
      <Text style={patientRowStyles.gridBoxText}>Labs:</Text>
      <View style={patientRowStyles.labsGridBox}>
        <View style={patientRowStyles.fishboneContainer}>
          <HHFishbone />
          <CMPFishbone />
        </View>
        <View style={patientRowStyles.fishboneContainer}>
          <XFishbone />
          <YFishbone />
          <ReverseYFishbone />
        </View>
      </View>
    </View>

    <View style={patientRowStyles.subObjGridBox}>
      <Text style={patientRowStyles.gridBoxText}>Meds:</Text>
      <View style={patientRowStyles.medsContainer}>
        {medications.length > 0
          ? medications.sort().map((med, i) => (
              <Text key={i} style={patientRowStyles.medsText}>
                {med};
              </Text>
            ))
          : Array.from({ length: 7 }).map((_, i) => (
              <Text key={i} style={patientRowStyles.medsEmptyPlaceholder}>
                {" "}
              </Text>
            ))}
      </View>
    </View>
  </View>
);
