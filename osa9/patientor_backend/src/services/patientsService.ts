import { patients } from '../../data/patients';
import {v1 as uuid} from 'uuid';
import { Patient, NewPatient } from '../types';

export const patientsData = ():  Patient [] => {
  return patients;
};

export const addPatient = (entry: NewPatient): Patient => {
  const id = uuid();
  const newPatient: Patient = {
    id,
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};
