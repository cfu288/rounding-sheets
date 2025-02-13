import React, { createContext, useContext } from "react";
import { usePatientListManager } from "@/hooks/usePatientListManager";

type PatientListContextType = ReturnType<typeof usePatientListManager>;

const PatientListContext = createContext<PatientListContextType | null>(null);

export function usePatientList() {
  const context = useContext(PatientListContext);
  if (!context) {
    throw new Error("usePatientList must be used within a PatientListProvider");
  }
  return context;
}

export function PatientListProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const patientListState = usePatientListManager();

  return (
    <PatientListContext.Provider value={patientListState}>
      {children}
    </PatientListContext.Provider>
  );
}
