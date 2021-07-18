import express from 'express';
import { data } from '../services/diagnosesService';
const diagnoseRouter = express.Router();


diagnoseRouter.get('/', (_req, res) => {
  res.send(data());
});
diagnoseRouter.get('/:code', (req, res) => {
  const code = req.params.code; 
  console.log(code);
  const entry = data().find(entry => entry.code === code);
  if(entry){
    return res.json(entry);
  }
  return res.status(400).json({error: 'invalid code'});
 
});


export default diagnoseRouter;
