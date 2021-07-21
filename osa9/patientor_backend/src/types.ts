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

export type EntryFields = OccupationalHealthcareField | HealthCheckField | HospitalField; 

interface baseEntryField {
  date: unknown,
  specialist: unknown,
  description: unknown,
}
interface OccupationalHealthcareField extends baseEntryField{
  type: 'OccupationalHealthcare',
  diagnosisCodes?: unknown,
  employerName: unknown,
  sickLeave?: unknown,
}
interface HealthCheckField extends baseEntry{
  type: 'HealthCheck',
  healthCheckRating: unknown,
}
interface HospitalField extends baseEntry{
  type: 'Hospital',
  diagnosisCodes: unknown,
  discharge: unknown,
}
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface SickLeave{
  startDate: string,
  endDate: string,
}
export interface Discharge{
  date: string,
  criteria: string,
}
interface baseEntry {
  id: string,
  date: string,
  specialist: string,
  description: string,
}
export type DiagnosisCodes = Array<Diagnosis['code']>;
interface OccupationalHealthcare extends baseEntry {
  type: 'OccupationalHealthcare',
  diagnosisCodes?: DiagnosisCodes,
  employerName: string,
  sickLeave?: SickLeave,
}
interface HealthCheck extends baseEntry{
  type: 'HealthCheck',
  healthCheckRating: HealthCheckRating,
}
interface Hospital extends baseEntry{
  type: 'Hospital',
  diagnosisCodes: DiagnosisCodes,
  discharge: Discharge,
}
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type EntryWithoutId = UnionOmit<Entry, 'id'>;
export type Entry = OccupationalHealthcare | HealthCheck | Hospital;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;
