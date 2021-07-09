import express from 'express';
import { patientsData } from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsData());
});

export default router;
