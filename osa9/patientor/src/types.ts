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
interface OccupationalHealthcare extends baseEntry {
  type: 'OccupationalHealthcare',
  diagnosisCodes?: Array<Diagnosis['code']>,
  employerName: string,
  sickLeave?: SickLeave,
}
interface HealthCheck extends baseEntry {
  type: 'HealthCheck',
  healthChechRating: HealthCheckRating,
}
interface Hospital extends baseEntry {
  type: 'Hospital',
  diagnosisCodes: Array<Diagnosis['code']>,
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
