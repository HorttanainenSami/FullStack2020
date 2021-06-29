import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json())

app.get('/hello', (_req, res) => { 
  res.send('Hello Full Stack!');
});
app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if(!isNaN(Number(weight)) && !isNaN(Number(height))) {
    return res.send(bmiCalculator( Number(weight), Number(height)));
  }
  return res.status(500).json({ error: 'malformatted params'});
  
});
app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;
  if(isNaN(daily_exercises) || isNaN(target)) return res.status(500).json({error: 'missing params'})
  if(isNaN(Number(target)) || isNaN(Object(daily_exercises)) || isNaN(Number(daily_exercises[0]))) {
    return res.status(500).json({error: 'malformatted params' });
  }
  const result = calculateExercises(daily_exercises, target);

  return res.send(result);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

