import { getTemplate } from "../../../const";
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
  },
  gridContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  gridBox1HalfWidth: {
    width: "50%",
    minHeight: "8.33%",
    maxHeight: "50%",
  },
  gridBox1FullWidth: {
    width: "100%",
    minHeight: "8.33%",
    maxHeight: "50%",
  },
  gridBox2HalfWidth: {
    width: "50%",
    minHeight: "16.67%",
    maxHeight: "50%",
  },
  gridBox2FullWidth: {
    width: "100%",
    minHeight: "16.67%",
    maxHeight: "50%",
  },
  gridBox3HalfWidth: {
    width: "50%",
    minHeight: "25%",
    maxHeight: "50%",
  },
  gridBox3FullWidth: {
    width: "100%",
    minHeight: "25%",
    maxHeight: "50%",
  },
  gridBox4HalfWidth: {
    width: "50%",
    minHeight: "33%",
    maxHeight: "50%",
  },
  gridBox4FullWidth: {
    width: "100%",
    minHeight: "33%",
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

export const GridSection: React.FC<GridSectionProps> = ({
  patient,
  templateId,
}) => {
  const template = getTemplate({
    template_id: templateId,
    custom_override_templates: patient.display_template_overrides,
  });

  const vitals = template.vitals?.sections || [];
  const vitalsEnabled = template.vitals?.enabled || false;
  const physicalExamEnabled = template.physicalExam?.enabled || false;
  const eventsEnabled = template.events?.enabled || false;
  const eventsFullWidth =
    template.events?.fullWidth === undefined
      ? false
      : template.events?.fullWidth;
  // 1/6 is gridBox2, 1/4 is gridBox3, 1/3 is gridBox4
  const eventsHeight = template.events?.height || "1/6";
  const physicalExams = template.physicalExam?.sections || [];
  const medications: string[] = [];
  const labsEnabled = template.labs?.enabled || false;
  const labsFullWidth = template.labs?.fullWidth || false;
  const medsEnabled = template.meds?.enabled || false;
  const consultsEnabled = template.consults?.enabled || false;
  const imagingEnabled = template.imaging?.enabled || false;
  const getEventStyle = () => {
    switch (eventsHeight) {
      case "1/12":
        return eventsFullWidth
          ? patientRowStyles.gridBox1FullWidth
          : patientRowStyles.gridBox1HalfWidth;
      case "1/6":
        return eventsFullWidth
          ? patientRowStyles.gridBox2FullWidth
          : patientRowStyles.gridBox2HalfWidth;
      case "1/4":
        return eventsFullWidth
          ? patientRowStyles.gridBox3FullWidth
          : patientRowStyles.gridBox3HalfWidth;
      case "1/3":
        return eventsFullWidth
          ? patientRowStyles.gridBox4FullWidth
          : patientRowStyles.gridBox4HalfWidth;
      default:
        return eventsFullWidth
          ? patientRowStyles.gridBox2FullWidth
          : patientRowStyles.gridBox2HalfWidth;
    }
  };

  return (
    <View style={patientRowStyles.gridContainer}>
      {eventsEnabled && (
        <View style={getEventStyle()}>
          <Text style={patientRowStyles.eventsText}>Events:</Text>
        </View>
      )}
      {vitalsEnabled && (
        <View style={patientRowStyles.gridBox3HalfWidth}>
          <Text style={patientRowStyles.gridBoxText}>Vitals:</Text>
          {vitals.map((vital, i) => (
            <Text key={i} style={patientRowStyles.peText}>
              {vital}:
            </Text>
          ))}
        </View>
      )}
      {physicalExamEnabled && (
        <View style={patientRowStyles.gridBox3HalfWidth}>
          <Text style={patientRowStyles.gridBoxText}>PE:</Text>
          {physicalExams.map((exam, i) => (
            <Text key={i} style={patientRowStyles.peText}>
              {exam}:
            </Text>
          ))}
        </View>
      )}
      {labsEnabled && (
        <View
          style={
            labsFullWidth
              ? patientRowStyles.gridBox3FullWidth
              : patientRowStyles.gridBox3HalfWidth
          }
        >
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
      )}
      {imagingEnabled && (
        <View style={patientRowStyles.gridBox3HalfWidth}>
          <Text style={patientRowStyles.gridBoxText}>Imaging:</Text>
          <Text style={patientRowStyles.gridBoxText}></Text>
        </View>
      )}
      {consultsEnabled && (
        <View style={patientRowStyles.gridBox3HalfWidth}>
          <Text style={patientRowStyles.gridBoxText}>Consults:</Text>
          <Text style={patientRowStyles.gridBoxText}></Text>
        </View>
      )}
      {medsEnabled && (
        <View style={patientRowStyles.gridBox3HalfWidth}>
          <Text style={patientRowStyles.gridBoxText}>Meds:</Text>
          <View style={patientRowStyles.medsContainer}>
            {medications.length > 0
              ? medications.sort().map((med, i) => (
                  <Text key={i} style={patientRowStyles.medsText}>
                    {med};
                  </Text>
                ))
              : Array.from({ length: 10 }).map((_, i) => (
                  <Text key={i} style={patientRowStyles.medsEmptyPlaceholder}>
                    {" "}
                  </Text>
                ))}
          </View>
        </View>
      )}
    </View>
  );
};
