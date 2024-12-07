import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { Patient } from "./Patient";
import { daily_todo_list, PATIENTS_PER_PAGE } from "./const";
import { XFishbone } from "./XFishbone";
import { YFishbone } from "./YFishbone";
import { CMPFishbone } from "./CMPFishbone";

// Create styles for PatientRow component
const patientRowStyles = StyleSheet.create({
  box: {
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
  doubleHeightBox: {
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
    borderBottom: "1px solid black",
    borderRight: "1px solid black",
    whiteSpace: "nowrap",
    padding: "2px",
  },
  bannerBoxShrinkable: {
    backgroundColor: "white",
    borderBottom: "1px solid black",
    borderRight: "1px solid black",
    whiteSpace: "nowrap",
    padding: "2px",
    flexShrink: 1,
    minWidth: "30px",
    minHeight: "13px",
  },
  bannerBoxShrinkableLarge: {
    backgroundColor: "white",
    borderBottom: "1px solid black",
    borderRight: "1px solid black",
    whiteSpace: "nowrap",
    padding: "2px",
    flexShrink: 1,
    minWidth: "50px",
    minHeight: "13px",
  },
  eventsTextContainer: {
    padding: "2px",
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
  labsGridBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  gridBoxText: {
    padding: "2px",
    paddingBottom: "1px",
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
    borderTop: "1px solid black",
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
    borderBottom: "0.5px solid grey",
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
  leftBulletText: {
    paddingLeft: "2px",
    color: "#333",
    fontSize: "8px",
    listStyleType: "disc",
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
    <View
      key={`${pageIndex}-${index}-1`}
      style={
        patient?.display_size === "2x"
          ? patientRowStyles.doubleHeightBox
          : patientRowStyles.box
      }
    >
      <View style={patientRowStyles.bannerContainer}>
        <View style={patientRowStyles.bannerBoxShrinkable}>
          <Text
            style={!patient.location ? patientRowStyles.smallBannerText : {}}
          >
            {patient.location ? patient.location : "LOCATION"}
          </Text>
        </View>
        <View style={patientRowStyles.bannerBox}>
          <Text
            style={
              !patient.last_name && !patient.first_name
                ? patientRowStyles.smallBannerText
                : {}
            }
          >
            {patient.last_name || patient.first_name
              ? `${patient.last_name?.toUpperCase()}${
                  patient.last_name && patient.first_name ? ", " : ""
                }${patient.first_name}`
              : "NAME"}
          </Text>
        </View>
        <View style={patientRowStyles.bannerBoxShrinkableLarge}>
          <Text style={!patient.dob ? patientRowStyles.smallBannerText : {}}>
            {patient.dob
              ? `DOB: ${patient.dob} (${
                  new Date().getFullYear() - new Date(patient.dob).getFullYear()
                })`
              : "DOB"}
          </Text>
        </View>
        <View style={patientRowStyles.bannerBoxShrinkableLarge}>
          <Text style={!patient.mrn ? patientRowStyles.smallBannerText : {}}>
            {patient.mrn ? `MRN: ${patient.mrn}` : "MRN"}
          </Text>
        </View>
      </View>
      {patient.hpi?.map((hpi, i) => (
        <View key={i}>
          <Text style={patientRowStyles.oneLinerText}>
            {i === 0 && <Text style={patientRowStyles.apText}>HPI: </Text>}
            {hpi}
          </Text>
        </View>
      ))}

      <View style={patientRowStyles.gridContainer}>
        <View style={patientRowStyles.subObjGridBox}>
          <Text style={patientRowStyles.eventsText}>Events:</Text>
        </View>
        <View style={patientRowStyles.subObjGridBox}>
          <Text style={patientRowStyles.gridBoxText}>Vitals:</Text>
          <Text style={patientRowStyles.peText}>Temp:</Text>
          <Text style={patientRowStyles.peText}>Sys:</Text>
          <Text style={patientRowStyles.peText}>Dias:</Text>
          <Text style={patientRowStyles.peText}>RR:</Text>
          <Text style={patientRowStyles.peText}>HR:</Text>
          <Text style={patientRowStyles.peText}>O2:</Text>
        </View>
        <View style={patientRowStyles.subObjGridBox}>
          <Text style={patientRowStyles.gridBoxText}>Labs:</Text>
          <View style={patientRowStyles.labsGridBox}>
            <View style={patientRowStyles.fishboneContainer}>
              <YFishbone />
              <XFishbone />
            </View>
            <CMPFishbone />
          </View>
        </View>
        <View style={patientRowStyles.subObjGridBox}>
          <Text style={patientRowStyles.gridBoxText}>PE:</Text>
          <Text style={patientRowStyles.peText}>GEN:</Text>
          <Text style={patientRowStyles.peText}>HEENT:</Text>
          <Text style={patientRowStyles.peText}>Skin:</Text>
          <Text style={patientRowStyles.peText}>CVS:</Text>
          <Text style={patientRowStyles.peText}>Pulm:</Text>
          <Text style={patientRowStyles.peText}>GI:</Text>
          <Text style={patientRowStyles.peText}>MSK:</Text>
          <Text style={patientRowStyles.peText}>Neuro:</Text>
          <Text style={patientRowStyles.peText}>Lines:</Text>
        </View>
        <View style={patientRowStyles.subObjGridBox}>
          <Text style={patientRowStyles.gridBoxText}>Meds:</Text>
          <View style={patientRowStyles.medsContainer}>
            <View style={patientRowStyles.medsColumn}>
              <Text style={patientRowStyles.medsText}>
                Amlodipine 10mg PO BID
              </Text>
              <Text style={patientRowStyles.medsText}>
                Lisinopril 20mg PO QD
              </Text>
              <Text style={patientRowStyles.medsText}>
                Metformin 500mg PO BID
              </Text>
              <Text style={patientRowStyles.medsText}>
                Atorvastatin 40mg PO QHS
              </Text>
            </View>
            <View style={patientRowStyles.medsColumn}>
              <Text style={patientRowStyles.medsText}>
                Omeprazole 20mg PO QD
              </Text>
              <Text style={patientRowStyles.medsText}>
                Insulin Glargine 10 units SC QHS
              </Text>
              <Text style={patientRowStyles.medsText}>
                Insulin Lispro 5 units SC TID with meals
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
    <View
      key={`${pageIndex}-${index}-2`}
      style={
        patient?.display_size === "2x"
          ? patientRowStyles.doubleHeightBox
          : patientRowStyles.box
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
        <View style={patientRowStyles.gridContainer}>
          {Array.from({ length: 4 }).map((_, i) => (
            <View key={i} style={patientRowStyles.apGridBox}>
              <Text style={patientRowStyles.gridBoxText}>
                {patient.assessment_and_plan && patient.assessment_and_plan[i]
                  ? `# ${patient.assessment_and_plan?.[i].assessment}:`
                  : "#"}
              </Text>
              {patient.assessment_and_plan &&
                patient.assessment_and_plan?.[i]?.plan.map((plan, j) => (
                  <Text style={patientRowStyles.leftBulletText} key={j}>
                    • {plan}
                  </Text>
                ))}
            </View>
          ))}
        </View>
        <View style={patientRowStyles.todoContainer}>
          <View style={patientRowStyles.todoFlexContainer}>
            <Text style={patientRowStyles.todoText}>Todo:</Text>
            {patient.todos?.map((todo, i) => (
              <View key={i}>
                <Text style={patientRowStyles.todoDescription}>
                  [{"  "}] {todo.description}
                </Text>
              </View>
            ))}
            {[0, 1, 2].map((i) => (
              <View key={i}>
                <Text style={patientRowStyles.todoBlank}>[{"  "}]</Text>
              </View>
            ))}
          </View>
          {daily_todo_list && (
            <View style={patientRowStyles.footer}>
              {daily_todo_list.map((todo, i) => (
                <View key={i}>
                  <Text style={patientRowStyles.dailyTodoDescription}>
                    [{"  "}] {todo.description}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  </>
);
