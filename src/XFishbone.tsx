import { Svg, Line, Text } from "@react-pdf/renderer";
import { StyleSheet } from "@react-pdf/renderer";

const fishboneStyles = StyleSheet.create({
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
});

// Create PatientRow Component
export function XFishbone({
  hgb = 13.5,
  hct = 40.0,
  wbc = 6.0,
  plt = 250,
}: {
  hgb?: number;
  hct?: number;
  wbc?: number;
  plt?: number;
}) {
  return (
    <Svg height="40" width="60" style={fishboneStyles.fishboneSvg}>
      <Line x1="20" y1="10" x2="40" y2="30" stroke="black" strokeWidth="1" />
      <Line x1="20" y1="30" x2="40" y2="10" stroke="black" strokeWidth="1" />
      <Text
        x="27"
        y="21"
        textAnchor="end"
        style={fishboneStyles.fishboneLabelText}
      >
        WBC
      </Text>
      <Text
        x="19"
        y="23"
        textAnchor="end"
        style={fishboneStyles.fishboneValueText}
      >
        {wbc}
      </Text>
      <Text
        x="30"
        y="15"
        textAnchor="middle"
        style={fishboneStyles.fishboneLabelText}
      >
        HGB
      </Text>
      <Text
        x="30"
        y="11"
        textAnchor="middle"
        style={fishboneStyles.fishboneValueText}
      >
        {hgb}
      </Text>
      <Text
        x="30"
        y="27"
        textAnchor="middle"
        style={fishboneStyles.fishboneLabelText}
      >
        HCT
      </Text>
      <Text
        x="30"
        y="34"
        textAnchor="middle"
        style={fishboneStyles.fishboneValueText}
      >
        {hct}
      </Text>
      <Text
        x="33"
        y="21"
        textAnchor="start"
        style={fishboneStyles.fishboneLabelText}
      >
        PLT
      </Text>
      <Text
        x="39"
        y="23"
        textAnchor="start"
        style={fishboneStyles.fishboneValueText}
      >
        {plt}
      </Text>
    </Svg>
  );
}
