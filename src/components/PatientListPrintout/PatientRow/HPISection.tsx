import { HPISectionProps } from "./PatientRow";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

const patientRowStyles = StyleSheet.create({
  apText: {
    padding: "2px",
    fontWeight: 700,
  },
  oneLinerText: {
    padding: "2px",
    fontStyle: "italic",
    fontWeight: 400,
  },
});

export const HPISection: React.FC<HPISectionProps> = ({ patient }) => (
  <>
    {patient.hpi?.map((hpi, i) => (
      <View key={i}>
        <Text style={patientRowStyles.oneLinerText}>
          {i === 0 && <Text style={patientRowStyles.apText}>HPI: </Text>}
          {hpi}
        </Text>
      </View>
    ))}
  </>
);
