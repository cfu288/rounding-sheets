import { Patient, createEmptyPatient } from "@/models/Patient";
import { useState, useEffect, useCallback } from "react";

interface PatientListMap {
  [key: string]: Patient[];
}

export const usePatientList = (
  listName: string = "New List " + new Date().toLocaleDateString()
): [Patient[], (patients: Patient[]) => void, string[]] => {
  const defaultListName = "New List " + new Date().toLocaleDateString();

  // Get all list names
  const [allListNames, setAllListNames] = useState<string[]>(() => {
    const savedLists = localStorage.getItem("patient_lists_meta");
    if (!savedLists) {
      return [defaultListName];
    }
    return JSON.parse(savedLists);
  });

  // Get the specific list
  const [patients, setPatientsInternal] = useState<Patient[]>(() => {
    const savedLists = localStorage.getItem("patient_lists");
    if (!savedLists) {
      // Initialize with empty list if nothing exists
      const initialLists: PatientListMap = {
        [defaultListName]: Array(6)
          .fill(null)
          .map(() => createEmptyPatient()),
      };
      localStorage.setItem("patient_lists", JSON.stringify(initialLists));
      localStorage.setItem(
        "patient_lists_meta",
        JSON.stringify([defaultListName])
      );
      return initialLists[defaultListName];
    }

    const lists: PatientListMap = JSON.parse(savedLists);
    if (!lists[listName]) {
      // If this specific list doesn't exist, create it
      lists[listName] = Array(6)
        .fill(null)
        .map(() => createEmptyPatient());
      localStorage.setItem("patient_lists", JSON.stringify(lists));
      if (!allListNames.includes(listName)) {
        const newListNames = [...allListNames, listName];
        localStorage.setItem(
          "patient_lists_meta",
          JSON.stringify(newListNames)
        );
        setAllListNames(newListNames);
      }
    }
    return lists[listName];
  });

  // Update storage whenever the list changes
  useEffect(() => {
    const savedLists = localStorage.getItem("patient_lists");
    const lists: PatientListMap = savedLists ? JSON.parse(savedLists) : {};
    lists[listName] = patients;
    localStorage.setItem("patient_lists", JSON.stringify(lists));
  }, [patients, listName]);

  const setPatients = useCallback((patients: Patient[]) => {
    setPatientsInternal(patients);
  }, []);

  return [patients, setPatients, allListNames];
};
