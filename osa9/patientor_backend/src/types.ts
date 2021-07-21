 export interface Diagnosis {
  code: string,
  name: string,
  latin?: string,
}
// Patients
export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export enum Gender { 
  Male= 'male',
  Female= 'female',
  Other= 'other',
}
export type NewPatient = Omit<Patient, 'id'|'entries'>;
export type Fields = { 
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown,
};
export interface DataFields extends Fields {
  entries : unknown,
  id: unknown,
}
//Entry
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface SickLeave{
  startDate: string,
  endDate: string,
}
interface Discharge{
  date: string,
  criteria: string,
}
interface baseEntry {
  id: string,
  date: string,
  specialist: string,
  description: string,
}
interface OccupationalHealthcare extends baseEntry {
  type: 'OccupationalHealthcare',
  diagnosisCodes?: Array<Diagnosis['code']>,
  employerName: string,
  sickLeave?: SickLeave,
}
interface HealthCheck extends baseEntry{
  type: 'HealthCheck',
  healthCheckRating: HealthCheckRating,
}
interface Hospital extends baseEntry{
  type: 'Hospital',
  diagnosisCodes: Array<Diagnosis['code']>,
  discharge: Discharge,
}
export type Entry = OccupationalHealthcare | HealthCheck | Hospital;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;
