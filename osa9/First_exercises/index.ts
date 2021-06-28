import express from 'express'
import{ bmiCalculator } from './bmiCalculator'

const app = express()
app.get('/hello', (_req, res) => { 
  res.send('Hello Full Stack!')
})
app.get('/bmi', (req, res) => {
  const { height, weight } = req.query
  if(!isNaN(Number(weight)) && !isNaN(Number(height))) {
    return res.send(bmiCalculator( Number(weight), Number(height)))
  }
  return res.status(500).json({ error: 'malformatted params'})
  
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})

