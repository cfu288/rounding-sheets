import { getTemplate } from "../../../const";
import { HPISectionProps } from "./PatientRow";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

const patientRowStyles = StyleSheet.create({
  apText: {
    padding: "2px",
    fontWeight: 700,
  },
  oneLinerText: {
    padding: "2px",
    // fontStyle: "italic",
    fontWeight: 400,
  },
  gridBox2FullWidth: {
    width: "100%",
    minHeight: "16.67%",
    maxHeight: "50%",
  },
  gridBox3FullWidth: {
    width: "100%",
    minHeight: "25%",
    maxHeight: "50%",
  },
  hpiLabelText: {
    padding: "2px",
    fontWeight: 700,
    borderBottom: "0.5px dashed grey",
    width: "97.5%",
  },
  blankUnderline: {
    marginHorizontal: "auto",
    color: "#333",
    borderBottom: "0.5px dashed grey",
    width: "95%",
    height: "10px",
    marginBottom: "2px",
  },
});

export const HPISection: React.FC<HPISectionProps> = ({
  patient,
  templateId,
}) => {
  const template = getTemplate({
    template_id: templateId,
    custom_override_templates: patient.display_template_overrides,
  });

  return (
    <>
      {template.hpi?.enabled && (
        <>
          {patient.hpi && patient.hpi.length > 0 ? (
            <Text style={patientRowStyles.oneLinerText}>
              <Text style={patientRowStyles.apText}>HPI: </Text>
              {patient.hpi.map((hpi, i) => (
                <View key={i}>
                  <Text>{hpi}</Text>
                </View>
              ))}
            </Text>
          ) : (
            <View style={patientRowStyles.gridBox2FullWidth}>
              <Text style={patientRowStyles.hpiLabelText}>HPI:</Text>
              {Array.from({ length: 10 }).map((_, i) => (
                <View
                  key={`blank-${i}`}
                  style={patientRowStyles.blankUnderline}
                ></View>
              ))}
            </View>
          )}
        </>
      )}
    </>
  );
};
