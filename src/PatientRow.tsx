import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { Patient } from "./Patient";
import { getTemplate, KnownTemplateIds, PATIENTS_PER_PAGE } from "./const";
import { TodoSection } from "./PatientRow/TodoSection";
import { AssessmentAndPlan } from "./PatientRow/AssessmentAndPlan";
import { HPISection } from "./PatientRow/HPISection";
import { Banner } from "./PatientRow/Banner";
import { GridSection } from "./PatientRow/GridSection";

interface PatientRowProps {
  patient: Patient;
  pageIndex: number;
  index: number;
  templateId: KnownTemplateIds;
}

const patientRowStyles = StyleSheet.create({
  leftBox: {
    width: "50%",
    height: `${100 / PATIENTS_PER_PAGE}%`,
    borderTop: "0.5px solid black",
    borderBottom: "0.5px solid black",
    borderLeft: "0.5px solid black",
    // borderRight: "0.5px solid black",
    display: "flex",
    position: "relative",
    flexDirection: "column",
  },
  rightBox: {
    width: "50%",
    height: `${100 / PATIENTS_PER_PAGE}%`,
    borderTop: "0.5px solid black",
    borderBottom: "0.5px solid black",
    borderLeft: "0.5px solid black",
    borderRight: "0.5px solid black",
    display: "flex",
    position: "relative",
    flexDirection: "column",
  },
  leftDoubleHeightBox: {
    width: "50%",
    height: `${(100 / PATIENTS_PER_PAGE) * 2}%`,
    borderTop: "0.5px solid black",
    borderBottom: "0.5px solid black",
    borderLeft: "0.5px solid black",
    // borderRight: "0.5px solid black",
    display: "flex",
    position: "relative",
    flexDirection: "column",
  },
  rightDoubleHeightBox: {
    width: "50%",
    height: `${(100 / PATIENTS_PER_PAGE) * 2}%`,
    borderTop: "0.5px solid black",
    borderBottom: "0.5px solid black",
    borderLeft: "0.5px solid black",
    borderRight: "0.5px solid black",
    display: "flex",
    position: "relative",
    flexDirection: "column",
  },
  bannerContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  dobText: {
    fontSize: "8px",
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
  apGridBox: {
    width: "50%",
    minHeight: "33%",
    maxHeight: "50%",
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
  splitBoxContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  apText: {
    padding: "2px",
    fontWeight: 700,
  },
  oneLinerText: {
    padding: "2px",
    fontStyle: "italic",
    fontWeight: 400,
  },
  todoFlexContainer: {
    padding: "2px",
    flex: 1,
    width: "100%",
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
  todoDescription: {
    paddingHorizontal: "2px",
    paddingVertical: "2px",
  },
  todoBlank: {
    paddingHorizontal: "2px",
    paddingVertical: "2px",
    borderBottom: "0.5px dotted grey",
    width: "100%",
  },
  dailyTodoDescription: {
    paddingRight: "8px",
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
  fishboneRow: {
    display: "flex",
    flexDirection: "row",
  },
  fishboneSvg: {
    margin: "8px",
    marginVertical: "2px",
  },
  fishboneLabelText: {
    fontSize: "3px",
    color: "rgba(243, 244, 246, 0.1)",
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
  leftBulletText: {
    paddingLeft: "2px",
    color: "#333",
    fontSize: "8px",
    listStyleType: "disc",
  },
  leftBulletTextUnderline: {
    paddingLeft: "2px",
    marginRight: "2px",
    marginLeft: "8px",
    color: "#333",
    fontSize: "8px",
    listStyleType: "disc",
    borderBottom: "0.5px dotted grey",
    width: "90%",
    height: "12px",
  },
  assessmentBlankUnderline: {
    borderBottom: "0.5px dotted grey",
    width: "95%",
    // marginRight: "2px",
    // height: "12px",
    // display: "flex",
    // alignItems: "center",
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

export const PatientRow: React.FC<PatientRowProps> = ({
  patient,
  pageIndex,
  index,
  templateId,
}) => {
  const vitals = ["Temp", "Sys", "Dias", "RR", "HR", "SpO2"];
  const physicalExams = [
    "GEN",
    "HEENT",
    "Skin",
    "CVS",
    "Pulm",
    "GI",
    "MSK",
    "Neuro",
    "Lines",
  ];

  return (
    <>
      <View
        key={`${pageIndex}-${index}-1`}
        style={
          getTemplate({
            template_id: templateId,
            custom_override_templates: patient.display_template_overrides,
          }).displaySize === "2x"
            ? patientRowStyles.leftDoubleHeightBox
            : patientRowStyles.leftBox
        }
      >
        <Banner patient={patient} />
        <HPISection patient={patient} />
        <GridSection vitals={vitals} physicalExams={physicalExams} />
      </View>
      <View
        key={`${pageIndex}-${index}-2`}
        style={
          getTemplate({
            template_id: templateId,
            custom_override_templates: patient.display_template_overrides,
          }).displaySize === "2x"
            ? patientRowStyles.leftDoubleHeightBox
            : patientRowStyles.rightBox
        }
      >
        <View style={patientRowStyles.splitBoxContainer}>
          <View
            style={{
              display: "flex",
            }}
          >
            <Text style={patientRowStyles.apText}>
              A/P:{" "}
              {patient.one_liner && (
                <Text style={patientRowStyles.oneLinerText}>
                  {patient.one_liner}
                </Text>
              )}
            </Text>
          </View>
          <AssessmentAndPlan patient={patient} />
          <TodoSection patient={patient} />
        </View>
      </View>
    </>
  );
};
