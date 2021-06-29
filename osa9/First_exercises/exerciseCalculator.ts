export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
interface inputValues {
  array: Array<number>;
  target: number;
}
const parseArguments = (args: Array<string>): inputValues => {
  if( args.length < 4){
    throw new Error('wrong amounth of args');
  }
  const [_a, _b, target, ...array ] = args.map(Number)
  return{
    array,
    target
  };
};
const getRating = (precentage:number):number => {
  switch(true){
    case(precentage>=1):
      return 3;
    case(precentage>=.5):
      return 2;
    case(precentage<0.5):
      return 1;
    default:
      return 0;
  }
};
const description = (rating:number):string => {
  switch(rating){
    case (3):
      return 'Good job';
    case(2):
      return 'not too bad but could be better ';
    case(1):
      return 'you should try again';
    default:
      throw new Error('something went wrong');
  }
};
export const calculateExercises = (week:Array<number>, target: number): Result => {
  const total = week.reduce((accumulator, current) => accumulator+current, 0);
  const average = total / week.length;
  const rating = getRating(average/target);
  return {
    periodLength: week.length,
    trainingDays: week.reduce((accumulator, current) => current === 0 ?accumulator: accumulator+1,0) ,
    success: total/week.length>= target ? true: false,
    rating,
    ratingDescription: description(rating),
    target,
    average
  };
};
try {
  const { array, target } = parseArguments(process.argv);
  console.log(calculateExercises(array, target));
}catch(e: any) {
  console.log('Error', e.message);
}
