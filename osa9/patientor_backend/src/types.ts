 export interface Diagnosis {
  code: string,
  name: string,
  latin?: string,
}
export enum Gender { 
  'male',
  'female',
}
export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
}
export type NewPatient = Omit<Patient, 'id'>;
export type Fields = { 
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown,
};
