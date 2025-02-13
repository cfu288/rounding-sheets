import { PatientListPrintout } from "@/components/PatientListPrintout/PatientListPrintout";
import { getTemplate, KnownTemplateIds } from "@/const";
import { Font, usePDF } from "@react-pdf/renderer";
import { useParams } from "react-router";
import source1 from "../assets/Atkinson-Hyperlegible-Regular.ttf";
import source2 from "../assets/Atkinson-Hyperlegible-Italic.ttf";
import source3 from "../assets/Atkinson-Hyperlegible-BoldItalic.ttf";
import source4 from "../assets/Atkinson-Hyperlegible-Bold.ttf";
import { usePatientList } from "./usePatientList";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@radix-ui/react-separator";

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
  const template = getTemplate({
    template_id: templateId || "3_pt_floor_template",
  });
  const [patients] = usePatientList();
  const [instance] = usePDF({
    document: (
      <PatientListPrintout
        patients={patients}
        templateId={templateId || "3_pt_floor_template"}
      />
    ),
  });

  return (
    // <AppLayout fixedNavbar>
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Scutsheet</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{template.templateName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-slate-100/50 dark:bg-slate-800/50 p-4">
              <h2 className="text-lg font-bold">{template.templateName}</h2>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {template.description}
              </p>
            </div>
            <div className="aspect-video rounded-xl bg-slate-100/50 dark:bg-slate-800/50" />
            <div className="aspect-video rounded-xl bg-slate-100/50 dark:bg-slate-800/50" />
          </div> */}
          {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-slate-100/50 md:min-h-min dark:bg-slate-800/50" /> */}
          <div className="w-full flex-grow bg-slate-100/50 rounded-xl">
            <iframe
              src={instance.url || ""}
              style={{
                width: "100%",
                height: "100%",
                margin: 0,
                border: "none",
              }}
              className="rounded-xl"
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
    // </AppLayout>
  );
};

export type ModalContent = "hpi" | "todos" | "assessment_and_plan" | null;
