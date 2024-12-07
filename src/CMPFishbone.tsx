import { View, Svg, Line, Text } from "@react-pdf/renderer";
import { StyleSheet } from "@react-pdf/renderer";
// Create styles for PatientRow component
const patientRowStyles = StyleSheet.create({
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
  oneLinerText: {
    padding: "2px",
    fontStyle: "italic",
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
    // height: "33%",
    minHeight: "33%",
    maxHeight: "50%",
  },
  subObjGridBox: {
    width: "50%",
    // height: "33%",
    minHeight: "25%",
    maxHeight: "50%",
  },
  labsGridBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    // paddingHorizontal: "12px",
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
  // fishboneTextRotatePos12: {
  //   fontSize: "3px",
  //   color: "Gainsboro",
  //   transform: "rotate(20deg)",
  // },
  // fishboneTextRotateNeg12: {
  //   fontSize: "3px",
  //   color: "Gainsboro",
  //   transform: "rotate(-12.5deg)",
  //   backgroundColor: "lightgray",
  // },
  // fishboneTextRotate90: {
  //   fontSize: "3px",
  //   color: "Gainsboro",
  //   transform: "rotate(90deg)",
  // },
  peText: {
    paddingLeft: "2px",
  },
  leftBulletText: {
    paddingLeft: "2px",
    color: "#333",
    fontSize: "8px",
    listStyleType: "disc", // Added bullet style
  },
  smallBannerText: {
    fontSize: 3,
    textAlign: "left",
  },
});

function formatCMPValues({
  sodium,
  potassium,
  chloride,
  co2,
  bun,
  creatinine,
  glucose,
}: {
  sodium?: number;
  potassium?: number;
  chloride?: number;
  co2?: number;
  bun?: number;
  creatinine?: number;
  glucose?: number;
}): {
  sodium: string;
  potassium: string;
  chloride: string;
  co2: string;
  bun: string;
  creatinine: string;
  glucose: string;
} {
  return {
    sodium: sodium !== undefined ? sodium.toFixed(0) : " ",
    potassium: potassium !== undefined ? potassium.toFixed(1) : " ",
    chloride: chloride !== undefined ? chloride.toFixed(0) : " ",
    co2: co2 !== undefined ? co2.toFixed(0) : " ",
    bun: bun !== undefined ? bun.toFixed(0) : " ",
    creatinine:
      creatinine !== undefined
        ? creatinine % 1 === 0
          ? creatinine.toFixed(1)
          : creatinine.toFixed(2)
        : " ",
    glucose: glucose !== undefined ? glucose.toFixed(0) : " ",
  };
}

export function CMPFishbone({
  sodium,
  potassium,
  chloride,
  co2,
  bun,
  creatinine,
  glucose,
}: {
  sodium?: number;
  potassium?: number;
  chloride?: number;
  co2?: number;
  bun?: number;
  creatinine?: number;
  glucose?: number;
}) {
  const formattedValues = formatCMPValues({
    sodium,
    potassium,
    chloride,
    co2,
    bun,
    creatinine,
    glucose,
  });

  return (
    <View style={patientRowStyles.fishboneRow}>
      <Svg height="40" width="100" style={patientRowStyles.fishboneSvg}>
        <Line x1="10" y1="20" x2="65" y2="20" stroke="black" strokeWidth="1" />
        <Text
          x="29"
          y="19"
          textAnchor="end"
          style={patientRowStyles.fishboneLabelText}
        >
          Na
        </Text>
        <Text
          x="29"
          y="15"
          textAnchor="end"
          style={patientRowStyles.fishboneValueText}
        >
          {formattedValues.sodium}
        </Text>
        <Line x1="30" y1="10" x2="30" y2="30" stroke="black" strokeWidth="1" />
        <Text
          x="29"
          y="23"
          textAnchor="end"
          style={patientRowStyles.fishboneLabelText}
        >
          K
        </Text>
        <Text
          x="29"
          y="30"
          textAnchor="end"
          style={patientRowStyles.fishboneValueText}
        >
          {formattedValues.potassium}
        </Text>
        <Line x1="50" y1="10" x2="50" y2="30" stroke="black" strokeWidth="1" />
        <Text
          x="49"
          y="19"
          textAnchor="end"
          style={patientRowStyles.fishboneLabelText}
        >
          Cl
        </Text>
        <Text
          x="49"
          y="15"
          textAnchor="end"
          style={patientRowStyles.fishboneValueText}
        >
          {formattedValues.chloride}
        </Text>
        <Text
          x="49"
          y="23"
          textAnchor="end"
          style={patientRowStyles.fishboneLabelText}
        >
          CO2
        </Text>
        <Text
          x="49"
          y="30"
          textAnchor="end"
          style={patientRowStyles.fishboneValueText}
        >
          {formattedValues.co2}
        </Text>
        <Text
          x="65"
          y="19"
          textAnchor="end"
          style={patientRowStyles.fishboneLabelText}
        >
          BUN
        </Text>
        <Text
          x="65"
          y="15"
          textAnchor="end"
          style={patientRowStyles.fishboneValueText}
        >
          {formattedValues.bun}
        </Text>
        <Text
          x="65"
          y="23"
          textAnchor="end"
          style={patientRowStyles.fishboneLabelText}
        >
          Cr
        </Text>
        <Text
          x="65"
          y="30"
          textAnchor="end"
          style={patientRowStyles.fishboneValueText}
        >
          {formattedValues.creatinine}
        </Text>
        <Text
          x="67"
          y="21"
          textAnchor="start"
          style={patientRowStyles.fishboneLabelText}
        >
          Glu
        </Text>
        <Text
          x="73"
          y="22.5"
          textAnchor="start"
          style={patientRowStyles.fishboneValueText}
        >
          {formattedValues.glucose}
        </Text>
        <Line x1="65" y1="20" x2="75" y2="10" stroke="black" strokeWidth="1" />
        <Line x1="65" y1="20" x2="75" y2="30" stroke="black" strokeWidth="1" />
      </Svg>
    </View>
  );
}
