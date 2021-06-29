// bmi = 1.3 * mass(kg)/(height(m)^2.5)
interface params {
  mass: number,
  height: number,
}
const parseArgs = (args: Array<string>): params => {
  if(args.length < 4) throw new Error('too few args');
  if(args.length > 4) throw new Error('too many args');

  const [_a, _b, mass, height ] = args.map(Number) ;
  if(!isNaN(mass) && !isNaN(Number(height))){
    return {
      mass,
      height
    };
  } throw new Error('types of args were wrong');
};
export const bmiCalculator = (mass: number, height: number):string => {
  const a = Math.pow(height/100,2.5);
  const b = mass/a;
  const bmi = 1.3 * b;
  switch(true){
    case(bmi>=40):
      return 'Obese Class III (very severely obese)';
    case(bmi>=35):
      return 'Obese Class II (severely obese)';
    case(bmi>=30):
      return 'Obese Class I (moderately obese)';
    case(bmi>=25):
      return 'Overweight';
    case(bmi>=18.5):
      return 'Normal (healthy weight)';
    case (bmi >= 16) :
      return 'underweight' ;
    case (bmi >= 15) :
      return 'Severely underweight' ;
    case (bmi < 15) :
      return 'very severely underweight' ;
    default:
      throw new Error('something went wrong');
  }
};

try{
  const {mass, height} = parseArgs(process.argv);
  console.log(bmiCalculator(mass, height));
}catch(e){
  console.log('error', e);
}
