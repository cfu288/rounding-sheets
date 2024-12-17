import { ReactNode } from "react";
import { Navbar } from "./Navbar";

interface AppLayoutProps {
  children: ReactNode;
  fixedNavbar?: boolean;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  fixedNavbar = false,
}) => {
  return (
    <main className="flex flex-col h-full">
      <Navbar isAbsolute={fixedNavbar}></Navbar>
      {children}
    </main>
  );
};
