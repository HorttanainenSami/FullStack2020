import express from 'express';
import diagnoseRouter from './routes/diagnosesRouter';

const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.get('/api/ping', (_req, res) => {
  console.log('pong');
  res.send('pong');
});
app.use('/api/diagnoses', diagnoseRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server is running in port ${PORT}`);
});
