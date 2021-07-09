import { patients } from '../../data/patients';
import { Patients } from '../types';

export const patientsData = ():  Patients [] => {
  return patients;
};
