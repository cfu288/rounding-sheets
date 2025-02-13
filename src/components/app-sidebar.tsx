import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";
import { Modal } from "@/components/Modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { getTemplate, KnownTemplateIds } from "@/const";
import { useParams, useLocation, Link } from "react-router-dom";
import { usePatientList } from "@/providers/PatientListProvider";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Installation",
          url: "#",
        },
        {
          title: "Project Structure",
          url: "#",
        },
      ],
    },
    {
      title: "Building Your Application",
      url: "#",
      items: [
        {
          title: "Routing",
          url: "#",
        },
        {
          title: "Data Fetching",
          url: "#",
          isActive: true,
        },
        {
          title: "Rendering",
          url: "#",
        },
        {
          title: "Caching",
          url: "#",
        },
        {
          title: "Styling",
          url: "#",
        },
        {
          title: "Optimizing",
          url: "#",
        },
        {
          title: "Configuring",
          url: "#",
        },
        {
          title: "Testing",
          url: "#",
        },
        {
          title: "Authentication",
          url: "#",
        },
        {
          title: "Deploying",
          url: "#",
        },
        {
          title: "Upgrading",
          url: "#",
        },
        {
          title: "Examples",
          url: "#",
        },
      ],
    },
    {
      title: "API Reference",
      url: "#",
      items: [
        {
          title: "Components",
          url: "#",
        },
        {
          title: "File Conventions",
          url: "#",
        },
        {
          title: "Functions",
          url: "#",
        },
        {
          title: "next.config.js Options",
          url: "#",
        },
        {
          title: "CLI",
          url: "#",
        },
        {
          title: "Edge Runtime",
          url: "#",
        },
      ],
    },
    {
      title: "Architecture",
      url: "#",
      items: [
        {
          title: "Accessibility",
          url: "#",
        },
        {
          title: "Fast Refresh",
          url: "#",
        },
        {
          title: "Next.js Compiler",
          url: "#",
        },
        {
          title: "Supported Browsers",
          url: "#",
        },
        {
          title: "Turbopack",
          url: "#",
        },
      ],
    },
    {
      title: "Community",
      url: "#",
      items: [
        {
          title: "Contribution Guide",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { templateId } = useParams();
  const location = useLocation();
  const {
    currentListName,
    setCurrentListName,
    allListNames,
    isNewListModalOpen,
    setIsNewListModalOpen,
    newListName,
    setNewListName,
    handleNewListSubmit,
  } = usePatientList();

  // get all templates
  const templates = KnownTemplateIds.map((id) =>
    getTemplate({ template_id: id })
  );

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">ReverbMD</span>
                  <span className="">Scutsheets</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/">Home</a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#" className="font-medium">
                  Scutsheet
                </a>
              </SidebarMenuButton>
              <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                {templates.map((template) => (
                  <SidebarMenuSubItem key={template.templateId}>
                    <SidebarMenuSubButton
                      asChild
                      isActive={template.templateId === templateId}
                    >
                      <a
                        href={`/scutsheet/${template.templateId}`}
                        className="font-medium"
                      >
                        {template.templateName}
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="#" className="font-medium">
                  Patient Lists
                </Link>
              </SidebarMenuButton>
              <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                {/* <SidebarMenuSubItem>
                  <SidebarMenuSubButton
                    asChild
                    isActive={location.pathname === "/scutsheet/generate-pdf"}
                  >
                    <a href="/scutsheet/generate-pdf">Manage Lists</a>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem> */}
                {allListNames.map((name) => (
                  <SidebarMenuSubItem
                    key={name}
                    className={
                      location.pathname === "/scutsheet/generate-pdf" &&
                      name === currentListName
                        ? "bg-accent"
                        : ""
                    }
                  >
                    <SidebarMenuSubButton
                      isActive={name === currentListName}
                      onClick={() => setCurrentListName(name)}
                    >
                      <Link to={`/scutsheet/generate-pdf`}>{name}</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton
                    onClick={() => setIsNewListModalOpen(true)}
                  >
                    + New List
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <Modal
        isOpen={isNewListModalOpen}
        onClose={() => setIsNewListModalOpen(false)}
        title="Create New List"
      >
        <div className="space-y-4">
          <Input
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="Enter list name"
          />
          <Button
            onClick={handleNewListSubmit}
            disabled={!newListName || allListNames.includes(newListName)}
          >
            Create List
          </Button>
        </div>
      </Modal>
    </Sidebar>
  );
}

<SidebarMenu className="gap-2">
  {data.navMain.map((item) => (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild>
        <a href={item.url} className="font-medium">
          {item.title}
        </a>
      </SidebarMenuButton>
      {item.items?.length ? (
        <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
          {item.items.map((item) => (
            <SidebarMenuSubItem key={item.title}>
              <SidebarMenuSubButton asChild isActive={item.isActive}>
                <a href={item.url}>{item.title}</a>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      ) : null}
    </SidebarMenuItem>
  ))}
</SidebarMenu>;
