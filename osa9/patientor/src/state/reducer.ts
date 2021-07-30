import { State } from "./state";
import { Patient, Entry, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  |{ 
      type: 'SET_DIAGNOSIS_LIST';
      payload: Diagnosis[]
  }|{
      type: "ADD_ENTRY";
      payload: {
            entry: Entry;
            patient:Patient;
            id: string;
      };
  };

export const setPatientList = (patients : Patient[]): Action => ({
    type: 'SET_PATIENT_LIST',
    payload: patients,
  }
);
export const createEntry = (entry: Entry, patient:Patient, id: string): Action => ({
    type: 'ADD_ENTRY',
    payload: {entry, id, patient},
  }
);
export const createPatient = (patient: Patient): Action => ({
  type: 'ADD_PATIENT',
  payload: patient,
});
export const setDiagnosisList = (diagnoses: Diagnosis[]): Action => ({
  type: 'SET_DIAGNOSIS_LIST',
  payload: diagnoses,
});
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case 'ADD_ENTRY':
      const newPatient = { ...action.payload.patient, entries:action.payload.patient.entries.concat(action.payload.entry)};

      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: newPatient
        }
      };
    case 'SET_DIAGNOSIS_LIST':
      console.log(action.payload);
      return{
        ...state,
        diagnoses: action.payload,
      };
    default:
      return state;
  }
};
