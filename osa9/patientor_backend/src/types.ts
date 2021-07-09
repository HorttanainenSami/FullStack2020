 export interface Diagnosis {
  code: string,
  name: string,
  latin?: string,
}
type gender = 'male' | 'female';
export interface Patients {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: gender,
  occupation: string,
}
