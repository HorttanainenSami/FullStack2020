import { patients } from '../../data/patients';
import {v1 as uuid} from 'uuid';
import { Patient, NewPatient, EntryWithoutId, Entry } from '../types';

export const patientsData = ():  Patient [] => {
  return patients;
};
export const getPatient = (id : string): Patient => {
  const patient = patients.find(patient => patient.id === id );
  if(!patient){
    throw new Error('no such patient');
  }
  return patient;
};
export const addEntry = (entry: EntryWithoutId, patient: Patient): Entry => {
  const id = uuid();
  const newEntry = {
    id,
    ...entry
  };
  patients.map(p => patient.id === p.id ? patient.entries.push(newEntry) : p);
  return newEntry;

};
export const addPatient = (entry: NewPatient): Patient => {
  const id = uuid();
  const newPatient: Patient = {
    id,
    ...entry,
    entries: [],
  };
  patients.push(newPatient);
  return newPatient;
};
