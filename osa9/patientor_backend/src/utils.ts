import { Discharge, HealthCheckRating, SickLeave, DiagnosisCodes, EntryWithoutId, EntryFields, NewPatient, Gender, DataFields, Fields, Entry, Patient } from './types';
const isString = (entry: unknown): entry is string => {
  return typeof entry === 'string' || entry instanceof String;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};
const isEntry = (param: any): param is Entry[] => {
  return typeof param[0] === 'string' || param instanceof Array;
};

// muuta
const parseDate = (entry: unknown): string => {
  if(!entry || !isString(entry)){
    throw new Error('dateOfBirth is incorrect or doenst exist');
  }
  return entry;
};
const parseGender = (entry: unknown): Gender => {
  if(!entry || !isGender(entry) ){
    throw new Error('gender is incorrect or doenst exist');
  }
  return entry;
};

const parseEntries = (entry: unknown): Entry[] => {
  if(!entry || !isEntry(entry)) {
    throw new Error('entry is incorrect or deosnt exist');
  }
  return entry;
};
const parseString = (entry: unknown, name: string): string => {
  if(!entry || !isString(entry)){
    throw new Error(`${name} is incorrect or doestn exist`);
  }
  return entry;
};

const isDiagnosisCodes = (params: any): params is DiagnosisCodes => {
  return typeof params.length === 'number' || params instanceof Array || typeof params[0] === 'string';
};
const parseDiagnosisCodes = (entry: unknown): DiagnosisCodes => {
  if(!entry || !isDiagnosisCodes(entry)){
    throw new Error('diagnosiscodes is incorrect or doesnt exist'); 
  }
  return entry;
};
const isSickLeave = (params: any): params is SickLeave => {
  return typeof params.startDate === 'string' || typeof params.endDate === 'string';
};
const parseSickLeave = (entry: unknown): SickLeave => {
  if(!entry || !isSickLeave(entry)){
    throw new Error('diagnosiscodes is incorrect or doesnt exist'); 
  }
  return entry;
};
const isHealtCheckRating = (params: any) : params is HealthCheckRating => {
 return Object.values(HealthCheckRating).includes(params);
};
const parseHealthCheckRating = (entry: unknown): HealthCheckRating => {
  if(!entry || !isHealtCheckRating(entry)){
    throw new Error('diagnosiscodes is incorrect or doesnt exist'); 
  }
  return entry;
};
const isDischarge = (params: any): params is Discharge => {
  return typeof params === 'object' || typeof params.date === 'string' || typeof params.criteria === 'string';
};
const parseDischarge = (entry: unknown) : Discharge => {
  if(!entry || !isDischarge(entry)){
    throw new Error('diagnosiscodes is incorrect or doesnt exist'); 
  }
  return entry;
};







export const toNewPatientEntry = ({name, dateOfBirth, ssn, occupation, gender} : Fields): NewPatient => {
  const newPatient = {
    name: parseString(name, 'name'),
    dateOfBirth : parseDate(dateOfBirth),
    ssn : parseString(ssn, 'ssn'),
    occupation : parseString(occupation, 'string'),
    gender : parseGender(gender),
  }; 
  return newPatient;
};
export const toPatientData = ({name, dateOfBirth, ssn, occupation, gender, entries, id}: DataFields): Patient => {
  const newPatient = toNewPatientEntry({name, dateOfBirth, ssn, occupation, gender});
  
  return {
    ...newPatient,
    entries: parseEntries(entries),
    id: parseString(id, 'id'),
  };
};
export const toNewEntry = (entry : EntryFields): EntryWithoutId => {
 const base = {
    date: parseDate(entry.date),
    specialist: parseString(entry.specialist, 'specialist'),
    description: parseString(entry.description,'desription'),
 };
  switch(entry.type){
    case 'OccupationalHealthcare':
      const employerName = {...base, employerName: parseString(entry.employerName, 'employerName'), type: entry.type};
      const diagnosisCodes = entry.diagnosisCodes 
      ? { ...employerName, diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes)}
      : employerName ;
      return entry.sickLeave ? { ...diagnosisCodes, sickLeave: parseSickLeave(entry.sickLeave)}: diagnosisCodes;
    case 'HealthCheck':
      return{
        type: entry.type,
        ...base,
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
      };
    case 'Hospital':
      return{
        ...base,
        diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
        discharge: parseDischarge(entry.discharge),
        type: entry.type,
      };
    default:
      return assertNever(entry);
  }
};
const assertNever = (value: never): never => {
  throw new Error(`unhandled union member ${value}`);
};
