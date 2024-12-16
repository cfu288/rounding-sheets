import { PatientListPrintout } from "@/components/PatientListPrintout/PatientListPrintout";
import { KnownTemplateIds, patient_list } from "@/const";
import { Font, usePDF } from "@react-pdf/renderer";
import { useParams } from "react-router";
import source1 from "../assets/Atkinson-Hyperlegible-Regular.ttf";
import source2 from "../assets/Atkinson-Hyperlegible-Italic.ttf";
import source3 from "../assets/Atkinson-Hyperlegible-BoldItalic.ttf";
import source4 from "../assets/Atkinson-Hyperlegible-Bold.ttf";

Font.register({
  family: "Atkinson",
  fonts: [
    { src: source1, fontWeight: "normal" },
    { src: source2, fontStyle: "italic" },
    { src: source3, fontStyle: "italic", fontWeight: 700 },
    { src: source4, fontWeight: 700 },
  ],
});

export const ShowPDF = () => {
  const { templateId } = useParams<{ templateId: KnownTemplateIds }>();
  const [instance, _] = usePDF({
    document: (
      <PatientListPrintout
        patients={patient_list}
        templateId={templateId || "3_pt_floor_template"}
      />
    ),
  });

  return (
    <div className="w-full h-screen min-h-full">
      <iframe
        src={instance.url || ""}
        style={{
          width: "100%",
          height: "100%",
          margin: 0,
          border: "none",
        }}
      />
    </div>
  );
};
