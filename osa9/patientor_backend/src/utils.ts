import { NewPatient, Gender, Fields, Entry } from './types';
const isString = (entry: unknown): entry is string => {
  return typeof entry === 'string' || entry instanceof String;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};
const isArray = (param: any): param is Entry[] => {
  return typeof param[0] === 'string' || param instanceof Array;
};

const parseName = (name: unknown): string => {
  if(!name || !isString(name)){
    throw new Error('incorrect or missing name');
  }
  return name;
};

const parseDateOfBirth = (entry: unknown): string => {
  if(!entry || !isString(entry)){
    throw new Error('dateOfBirth is incorrect or doenst exist');
  }
  return entry;
};
const parseSsn = (entry: unknown): string => {
  if(!entry || !isString(entry)){
    throw new Error('ssn is incorrect or doenst exist');
  }
  return entry;
};
const parseOccupation = (entry: unknown): string => {
  if(!entry || !isString(entry)){
    throw new Error('occupation is incorrect or doenst exist');
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
  if(!entry || !isArray(entry)) {
    throw new Error('entry is incorrect or deosnt exist');
  }
  return entry;
};

export const toNewPatientEntry = ({name, dateOfBirth, ssn, occupation, gender, entries} : Fields): NewPatient => {
  const newPatient = {
    name: parseName(name),
    dateOfBirth : parseDateOfBirth(dateOfBirth),
    ssn : parseSsn(ssn),
    occupation : parseOccupation(occupation),
    gender : parseGender(gender),
    entries: parseEntries(entries),
  }; 
  return newPatient;
};
