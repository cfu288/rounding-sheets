import { Text, View, StyleSheet, Svg, Line } from "@react-pdf/renderer";
import { Patient } from "./App";
import { daily_todo_list, PATIENTS_PER_PAGE } from "./const";

// Create styles for PatientRow component
const patientRowStyles = StyleSheet.create({
  box: {
    width: "50%",
    height: `${100 / PATIENTS_PER_PAGE}%`,
    border: "0.5px solid black",
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
  oneLinerText: {
    padding: "2px",
    fontStyle: "italic",
  },
  eventsTextContainer: {
    padding: "2px",
  },
  eventsText: {
    fontWeight: 700,
    minHeight: "25%",
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
  labsGridBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: "12px",
  },
  gridBoxText: {
    padding: "2px",
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
  flexContainer: {
    flex: 1,
  },
  todoText: {
    padding: "2px",
    fontWeight: 700,
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
    paddingHorizontal: "4px",
    paddingVertical: "2px",
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
    margin: "16px",
    marginVertical: "8px",
  },
  peText: {
    paddingLeft: "2px",
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
          <Text style={patientRowStyles.oneLinerText}>{patient.one_liner}</Text>
        </View>
      ) : undefined}
      <View style={patientRowStyles.eventsTextContainer}>
        <Text style={patientRowStyles.eventsText}>Events:</Text>
      </View>
      <View style={patientRowStyles.gridContainer}>
        <View style={patientRowStyles.gridBox}>
          <Text style={patientRowStyles.gridBoxText}>Vitals:</Text>
        </View>
        <View style={patientRowStyles.gridBox}>
          <Text style={patientRowStyles.gridBoxText}>Labs:</Text>
          <View style={patientRowStyles.labsGridBox}>
            <View style={patientRowStyles.fishboneContainer}>
              {/* Y fishbone */}
              <Svg height="20" width="20" style={patientRowStyles.fishboneSvg}>
                <Line
                  x1="0"
                  y1="0"
                  x2="10"
                  y2="10"
                  stroke="black"
                  strokeWidth="1"
                />
                <Line
                  x1="10"
                  y1="10"
                  x2="20"
                  y2="0"
                  stroke="black"
                  strokeWidth="1"
                />
                <Line
                  x1="10"
                  y1="10"
                  x2="10"
                  y2="20"
                  stroke="black"
                  strokeWidth="1"
                />
              </Svg>
              {/* X fishbone */}
              <Svg height="20" width="20" style={patientRowStyles.fishboneSvg}>
                <Line
                  x1="0"
                  y1="0"
                  x2="20"
                  y2="20"
                  stroke="black"
                  strokeWidth="1"
                />
                <Line
                  x1="0"
                  y1="20"
                  x2="20"
                  y2="0"
                  stroke="black"
                  strokeWidth="1"
                />
              </Svg>
            </View>
            <View style={patientRowStyles.fishboneRow}>
              {/* fishbone, -|-|< one horizontal line, with two vertical lines crossing it, and 2 tail lines 45 deg at the right end */}
              <Svg height="20" width="70" style={patientRowStyles.fishboneSvg}>
                <Line
                  x1="0"
                  y1="10"
                  x2="55"
                  y2="10"
                  stroke="black"
                  strokeWidth="1"
                />
                <Line
                  x1="20"
                  y1="0"
                  x2="20"
                  y2="20"
                  stroke="black"
                  strokeWidth="1"
                />
                <Line
                  x1="40"
                  y1="0"
                  x2="40"
                  y2="20"
                  stroke="black"
                  strokeWidth="1"
                />
                {/* 45deg line to top right */}
                <Line
                  x1="55"
                  y1="10"
                  x2="65"
                  y2="0"
                  stroke="black"
                  strokeWidth="1"
                />
                {/* 45deg line to bottom right*/}
                <Line
                  x1="55"
                  y1="10"
                  x2="65"
                  y2="20"
                  stroke="black"
                  strokeWidth="1"
                />
              </Svg>
            </View>
          </View>
        </View>
        <View style={patientRowStyles.gridBox}>
          <Text style={patientRowStyles.gridBoxText}>Today:</Text>
        </View>
        <View style={patientRowStyles.gridBox}>
          <Text style={patientRowStyles.gridBoxText}>PE:</Text>
          <Text style={patientRowStyles.peText}>AAOx</Text>
          <Text style={patientRowStyles.peText}>CVS:</Text>
          <Text style={patientRowStyles.peText}>Pulm:</Text>
          <Text style={patientRowStyles.peText}>Abd:</Text>
          <Text style={patientRowStyles.peText}>MSK:</Text>
        </View>
      </View>
    </View>
    <View key={`${pageIndex}-${index}-2`} style={patientRowStyles.box}>
      <View style={patientRowStyles.splitBoxContainer}>
        <Text style={patientRowStyles.apText}>A/P:</Text>
        <View style={patientRowStyles.gridContainer}>
          <View style={patientRowStyles.gridBox}>
            <Text style={patientRowStyles.gridBoxText}>#</Text>
          </View>
          <View style={patientRowStyles.gridBox}>
            <Text style={patientRowStyles.gridBoxText}>#</Text>
          </View>
          <View style={patientRowStyles.gridBox}>
            <Text style={patientRowStyles.gridBoxText}>#</Text>
          </View>
          <View style={patientRowStyles.gridBox}>
            <Text style={patientRowStyles.gridBoxText}>#</Text>
          </View>
        </View>
        <View style={patientRowStyles.todoContainer}>
          <View style={patientRowStyles.flexContainer}>
            <Text style={patientRowStyles.todoText}>Todo:</Text>
            {patient.todos?.map((todo, i) => (
              <View key={i}>
                <Text style={patientRowStyles.todoDescription}>
                  [{"  "}] {todo.description}
                </Text>
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
