import { getTemplate } from "../../../const";
import { AssessmentAndPlanProps } from "./PatientRow";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

const patientRowStyles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  apGridBox: {
    width: "50%",
    // minHeight: "33%",
    maxHeight: "50%",
  },
  gridBoxText: {
    padding: "2px",
    paddingBottom: "0.5px",
    paddingTop: "3px",
    fontWeight: 700,
    marginVertical: "1px",
  },
  gridBoxTextUnderline: {
    borderBottom: "0.5px dotted grey",
    width: "97.5%",
    padding: "2px",
    paddingBottom: "0.5px",
    paddingTop: "3px",
    fontWeight: 700,
    marginVertical: "1px",
  },
  leftBulletText: {
    paddingLeft: "2px",
    color: "#333",
    fontSize: "8px",
    listStyleType: "disc",
  },
  leftBulletTextUnderline: {
    paddingLeft: "2px",
    marginHorizontal: "auto",
    marginVertical: "1px",
    color: "#333",
    fontSize: "8px",
    listStyleType: "disc",
    borderBottom: "0.5px dotted grey",
    width: "95%",
    height: "12px",
  },
  assessmentBlankUnderline: {
    borderBottom: "0.5px dotted DarkGrey",
    width: "95%",
  },
});

export const AssessmentAndPlan: React.FC<AssessmentAndPlanProps> = ({
  patient,
  templateId,
}) => {
  const template = getTemplate({
    template_id: templateId,
    custom_override_templates: patient.display_template_overrides,
  });

  let blankAPSectionsToDisplay;
  if (template.patientsPerPage >= 3) {
    blankAPSectionsToDisplay = 4;
  } else if (template.patientsPerPage === 2 || template.displaySize === "2x") {
    blankAPSectionsToDisplay = 6;
  } else if (template.patientsPerPage === 1) {
    blankAPSectionsToDisplay = 10;
  } else {
    blankAPSectionsToDisplay = 4;
  }
  blankAPSectionsToDisplay -= patient.assessment_and_plan?.length || 0;

  const systemBasedAP = template.ap?.systemsBased;
  const systems = template.ap?.systems || [];

  return (
    <View style={patientRowStyles.gridContainer}>
      {systemBasedAP
        ? systems.map((system, i) => (
            <View key={i} style={patientRowStyles.apGridBox}>
              <Text style={patientRowStyles.gridBoxTextUnderline}>
                # {system}:
              </Text>
              <View style={patientRowStyles.leftBulletTextUnderline}></View>
              <View style={patientRowStyles.leftBulletTextUnderline}></View>
              <View style={patientRowStyles.leftBulletTextUnderline}></View>
            </View>
          ))
        : patient.assessment_and_plan?.map((ap, i) => (
            <View key={i} style={patientRowStyles.apGridBox}>
              <Text style={patientRowStyles.gridBoxText}>
                # {ap.assessment}:
              </Text>
              {ap.plan.length > 0 ? (
                ap.plan.map((plan, j) => (
                  <Text style={patientRowStyles.leftBulletText} key={j}>
                    • {plan}
                  </Text>
                ))
              ) : (
                <>
                  <View style={patientRowStyles.leftBulletTextUnderline}></View>
                  <View style={patientRowStyles.leftBulletTextUnderline}></View>
                  <View style={patientRowStyles.leftBulletTextUnderline}></View>
                </>
              )}
            </View>
          ))}
      {!systemBasedAP &&
        Array.from({ length: blankAPSectionsToDisplay }).map((_, i) => (
          <View key={`blank-${i}`} style={patientRowStyles.apGridBox}>
            <View style={patientRowStyles.assessmentBlankUnderline}>
              <Text style={patientRowStyles.gridBoxText}>#</Text>
            </View>
            <View style={patientRowStyles.leftBulletTextUnderline}></View>
            <View style={patientRowStyles.leftBulletTextUnderline}></View>
            <View style={patientRowStyles.leftBulletTextUnderline}></View>
          </View>
        ))}
    </View>
  );
};