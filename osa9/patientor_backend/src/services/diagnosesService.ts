import diagnoseData from '../../data/diagnoses.json';
import { Diagnosis } from '../types';

const diagnosis: Diagnosis [] = diagnoseData;

export const data = (): Diagnosis [] => {
  return diagnosis;
};
