import { useState, useCallback, useEffect, useMemo } from "react";
import { Patient, createEmptyPatient, generateUUID } from "@/models/Patient";

interface PatientListMap {
  [key: string]: Patient[];
}

interface PatientListState {
  lists: PatientListMap;
  listNames: string[];
  currentListName: string;
}

const STORAGE_KEY = {
  LISTS: "patient_lists",
  META: "patient_lists_meta",
};

export function usePatientListManager() {
  // Initialize state from localStorage
  const [state, setState] = useState<PatientListState>(() => {
    const defaultListName = "New List " + new Date().toLocaleDateString();
    const savedLists = localStorage.getItem(STORAGE_KEY.LISTS);
    const savedMeta = localStorage.getItem(STORAGE_KEY.META);

    const lists: PatientListMap = savedLists
      ? JSON.parse(savedLists)
      : {
          [defaultListName]: Array(6)
            .fill(null)
            .map(() => createEmptyPatient()),
        };

    // Ensure all existing patients have UUIDs
    const listsWithUUIDs = Object.entries(lists).reduce(
      (acc, [listName, patients]) => {
        acc[listName] = patients.map((patient) =>
          patient.id ? patient : { ...patient, id: generateUUID() }
        );
        return acc;
      },
      {} as PatientListMap
    );

    const listNames = savedMeta ? JSON.parse(savedMeta) : [defaultListName];

    return {
      lists: listsWithUUIDs,
      listNames,
      currentListName: defaultListName,
    };
  });

  const [isNewListModalOpen, setIsNewListModalOpen] = useState<boolean>(false);
  const [newListName, setNewListName] = useState<string>("");

  // Memoize the current list's patients
  const patients = useMemo(
    () => state.lists[state.currentListName],
    [state.lists, state.currentListName]
  );

  // Sync state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY.LISTS, JSON.stringify(state.lists));
    localStorage.setItem(STORAGE_KEY.META, JSON.stringify(state.listNames));
  }, [state]);

  const setCurrentListName = useCallback((name: string) => {
    setState((prev) => ({
      ...prev,
      currentListName: name,
    }));
  }, []);

  const setPatients = useCallback(
    (updater: Patient[] | ((prev: Patient[]) => Patient[])) => {
      setState((prev) => {
        const currentPatients = prev.lists[prev.currentListName];
        const newPatients =
          typeof updater === "function" ? updater(currentPatients) : updater;

        // Ensure we're not setting undefined or null values and all patients have UUIDs
        const validPatients = newPatients.map((patient) => ({
          ...patient,
          id: patient.id || generateUUID(),
          mrn: patient.mrn || "",
          first_name: patient.first_name || "",
          last_name: patient.last_name || "",
          dob: patient.dob || "",
          location: patient.location || "",
          one_liner: patient.one_liner || "",
          hpi: patient.hpi || "",
          todos: patient.todos || [],
          assessment_and_plan: patient.assessment_and_plan || [],
        }));

        return {
          ...prev,
          lists: {
            ...prev.lists,
            [prev.currentListName]: validPatients,
          },
        };
      });
    },
    []
  );

  const handleNewListSubmit = useCallback(() => {
    if (newListName && !state.listNames.includes(newListName)) {
      setState((prev) => ({
        lists: {
          ...prev.lists,
          [newListName]: Array(6)
            .fill(null)
            .map(() => createEmptyPatient()),
        },
        listNames: [...prev.listNames, newListName],
        currentListName: newListName,
      }));
      setNewListName("");
      setIsNewListModalOpen(false);
    }
  }, [newListName, state.listNames]);

  // Helper function to find a patient by ID
  const findPatientById = useCallback(
    (id: string): Patient | undefined => {
      return patients.find((p) => p.id === id);
    },
    [patients]
  );

  // Helper function to update a patient by ID
  const updatePatientById = useCallback(
    (id: string, updates: Partial<Patient>) => {
      setPatients((prevPatients) =>
        prevPatients.map((p) => (p.id === id ? { ...p, ...updates } : p))
      );
    },
    [setPatients]
  );

  return {
    currentListName: state.currentListName,
    setCurrentListName,
    patients,
    setPatients,
    allListNames: state.listNames,
    isNewListModalOpen,
    setIsNewListModalOpen,
    newListName,
    setNewListName,
    handleNewListSubmit,
    findPatientById,
    updatePatientById,
  };
}
