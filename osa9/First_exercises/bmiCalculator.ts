// bmi = 1.3 * mass(kg)/(height(m)^2.5)

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
  return bmi
}
console.log(bmiCalculator(67, 1.89))

