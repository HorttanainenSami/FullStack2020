export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}
export type Entry = OccupationalHealthcare | Hospital | HealthCheck;
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type EntryWithoutId = UnionOmit<Entry, 'id'>;
export type OccupationalHealthcareWithoutId = UnionOmit<OccupationalHealthcare, 'id'>;
export type HospitalWithoutId = UnionOmit<Hospital, 'id'>;
export type HealthCheckWithoutId = UnionOmit<HealthCheck, 'id'>;
interface baseEntry {
  id: string,
  date: string,
  specialist: string,
  description: string,
}
interface SickLeave {
  startDate: string,
  endDate: string,
}
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}
interface Discharge {
  date: string,
  criteria: string,
}
export type DiagnosisCodes = Array<Diagnosis['code']>;
export interface OccupationalHealthcare extends baseEntry {
  type: 'OccupationalHealthcare',
  diagnosisCodes?: DiagnosisCodes,
  employerName: string,
  sickLeave?: SickLeave,
}
export interface HealthCheck extends baseEntry {
  type: 'HealthCheck',
  healthCheckRating: HealthCheckRating,
}
export interface Hospital extends baseEntry {
  type: 'Hospital',
  diagnosisCodes: DiagnosisCodes,
  discharge: Discharge,
}
export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[],
}
