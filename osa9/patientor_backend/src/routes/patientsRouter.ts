import express from 'express';
import { patientsData, addPatient } from '../services/patientsService';
import { toNewPatientEntry } from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsData());
});

router.post('/', (req, res) => {
  try{
    console.log('asd');
    const newEntry = toNewPatientEntry(req.body);
    const newPatient = addPatient(newEntry);
    res.json(newPatient);
  }catch(e){
    res.status(400).send(e.message);
  }
});
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientsData().find(patient => patient.id === id);
  if(patient){
    return res.send(patient);
  }
  return res.status(400).send({error: 'no patient with such id'});
});

export default router;
