import express from 'express';
import { data } from '../services/diagnosisSevice';
const diagnoseRouter = express.Router();


diagnoseRouter.get('/', (_req, res) => {
  res.send(data());
});


export default diagnoseRouter;
