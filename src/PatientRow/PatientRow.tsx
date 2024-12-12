import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { Patient } from "../Patient";
import { getTemplate, KnownTemplateIds } from "../const";
import { GridSection } from "./GridSection";
import { AssessmentAndPlan } from "./AssessmentAndPlan";
import { HPISection } from "./HPISection";
import { TodoSection } from "./TodoSection";
import { Banner } from "./Banner";

export interface BannerProps {
  patient: Patient;
}

export interface HPISectionProps {
  patient: Patient;
}

export interface GridSectionProps {
  vitals: string[];
  physicalExams: string[];
}

export interface AssessmentAndPlanProps {
  patient: Patient;
  templateId: KnownTemplateIds;
}

const patientRowStyles = StyleSheet.create({
  // leftBox: {
  //   width: "50%",
  //   height: `${100 / getTemplate({}).patientsPerPage}%`,
  //   borderTop: "0.5px solid black",
  //   borderBottom: "0.5px solid black",
  //   borderLeft: "0.5px solid black",
  //   display: "flex",
  //   position: "relative",
  //   flexDirection: "column",
  // },
  // rightBox: {
  //   width: "50%",
  //   height: `${100 / getTemplate({}).patientsPerPage}%`,
  //   borderTop: "0.5px solid black",
  //   borderBottom: "0.5px solid black",
  //   borderLeft: "0.5px solid black",
  //   borderRight: "0.5px solid black",
  //   display: "flex",
  //   position: "relative",
  //   flexDirection: "column",
  // },
  // leftDoubleHeightBox: {
  //   width: "50%",
  //   height: `${(100 / getTemplate({}).patientsPerPage) * 2}%`,
  //   borderTop: "0.5px solid black",
  //   borderBottom: "0.5px solid black",
  //   borderLeft: "0.5px solid black",
  //   display: "flex",
  //   position: "relative",
  //   flexDirection: "column",
  // },
  // rightDoubleHeightBox: {
  //   width: "50%",
  //   height: `${(100 / getTemplate({}).patientsPerPage) * 2}%`,
  //   borderTop: "0.5px solid black",
  //   borderBottom: "0.5px solid black",
  //   borderLeft: "0.5px solid black",
  //   borderRight: "0.5px solid black",
  //   display: "flex",
  //   position: "relative",
  //   flexDirection: "column",
  // },
  bannerBox: {
    flex: 1,
    backgroundColor: "white",
    borderBottom: "0.5px solid black",
    borderRight: "0.5px solid black",
    whiteSpace: "nowrap",
    padding: "2px",
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
  gridBoxText: {
    padding: "2px",
    paddingBottom: "0.5px",
    paddingTop: "3px",
    fontWeight: 700,
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
  },
  smallBannerText: {
    fontSize: 3,
    textAlign: "left",
  },
});

interface PatientRowProps {
  patient: Patient;
  pageIndex: number;
  index: number;
  templateId: KnownTemplateIds;
}

export const PatientRow: React.FC<PatientRowProps> = ({
  patient,
  pageIndex,
  index,
  templateId,
}) => {
  return (
    <>
      <View
        key={`${pageIndex}-${index}-1`}
        style={
          getTemplate({
            template_id: templateId,
            custom_override_templates: patient.display_template_overrides,
          }).displaySize === "2x"
            ? {
                width: "50%",
                height: `${
                  (100 /
                    getTemplate({
                      template_id: templateId,
                      custom_override_templates:
                        patient.display_template_overrides,
                    }).patientsPerPage) *
                  2
                }%`,
                borderTop: "0.5px solid black",
                borderBottom: "0.5px solid black",
                borderLeft: "0.5px solid black",
                display: "flex",
                position: "relative",
                flexDirection: "column",
              }
            : {
                width: "50%",
                height: `${
                  100 /
                  getTemplate({
                    template_id: templateId,
                    custom_override_templates:
                      patient.display_template_overrides,
                  }).patientsPerPage
                }%`,
                borderTop: "0.5px solid black",
                borderBottom: "0.5px solid black",
                borderLeft: "0.5px solid black",
                display: "flex",
                position: "relative",
                flexDirection: "column",
              }
        }
      >
        <Banner patient={patient} />
        <HPISection patient={patient} />
        <GridSection
          vitals={
            getTemplate({
              template_id: templateId,
              custom_override_templates: patient.display_template_overrides,
            }).vitals.sections
          }
          physicalExams={
            getTemplate({
              template_id: templateId,
              custom_override_templates: patient.display_template_overrides,
            }).physicalExam.sections
          }
        />
      </View>
      <View
        key={`${pageIndex}-${index}-2`}
        style={
          getTemplate({
            template_id: templateId,
            custom_override_templates: patient.display_template_overrides,
          }).displaySize === "2x"
            ? {
                width: "50%",
                height: `${
                  (100 /
                    getTemplate({
                      template_id: templateId,
                      custom_override_templates:
                        patient.display_template_overrides,
                    }).patientsPerPage) *
                  2
                }%`,
                borderTop: "0.5px solid black",
                borderBottom: "0.5px solid black",
                borderLeft: "0.5px solid black",
                display: "flex",
                position: "relative",
                flexDirection: "column",
              }
            : {
                width: "50%",
                height: `${
                  100 /
                  getTemplate({
                    template_id: templateId,
                    custom_override_templates:
                      patient.display_template_overrides,
                  }).patientsPerPage
                }%`,
                borderTop: "0.5px solid black",
                borderBottom: "0.5px solid black",
                borderLeft: "0.5px solid black",
                borderRight: "0.5px solid black",
                display: "flex",
                position: "relative",
                flexDirection: "column",
              }
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
          <AssessmentAndPlan patient={patient} templateId={templateId} />
          <TodoSection patient={patient} templateId={templateId} />
        </View>
      </View>
    </>
  );
};
