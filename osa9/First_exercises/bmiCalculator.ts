// bmi = 1.3 * mass(kg)/(height(m)^2.5)
interface params {
  mass: number,
  height: number,
}
const parseArgs = (args: Array<String>): params => {
  if(args.length < 4) throw new Error('too few args')
  if(args.length > 4) throw new Error('too many args')

  const [a, b, mass, height ] = args.map(Number) 
  if(!isNaN(mass) && !isNaN(Number(height))){
    return {
      mass,
      height
    }
  }
}
const bmiCalculator = (mass: number, height: number) => {
  const a = Math.pow(height,2.5)
  const b = mass/a
  const bmi = 1.3 * b
  switch(true){
    case(bmi>=40):
      return 'Obese Class III (very severely obese)'
    case(bmi>=35):
      return 'Obese Class II (severely obese)'
    case(bmi>=30):
      return 'Obese Class I (moderately obese)'
    case(bmi>=25):
      return 'Overweight'
    case(bmi>=18.5):
      return 'Normal (healthy weight)'
    case (bmi >= 16) :
      return 'underweight' 
    case (bmi >= 15) :
      return 'Severely underweight' 
    case (bmi < 15) :
      return 'very severely underweight' 
  }
}

try{
  const {mass, height} = parseArgs(process.argv)
  console.log(bmiCalculator(mass, height))
}catch(e){
  console.log('error', e)
}
