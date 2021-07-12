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

export default router;
