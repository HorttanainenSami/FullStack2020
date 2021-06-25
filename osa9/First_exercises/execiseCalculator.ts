interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
const getRating = (precentage:number):number => {
  console.log(`rating ${precentage}`)
  switch(true){
    case(precentage>=1):
      return 3
    case(precentage>=.5):
      return 2
    case(precentage<0.5):
      return 1
    dafault:
      return 0
  }
}
const description = (rating:number):string => {
  switch(rating){
    case (3):
      return 'Good job'
    case(2):
      return 'not too bad but could be better '
    case(1):
      return 'you should try again'

  }
}
const calculateExercises = (week:Array<number>, target: number): Result => {
  const total = week.reduce((accumulator, current) => accumulator+current, 0) 
  const average = total / week.length
  const rating = getRating(average/target)
  return {
    periodLength: week.length,
    trainingDays: week.reduce((accumulator, current) => current === 0 ?accumulator: accumulator+1,0) ,
    success: total/week.length>= target ? true: false,
    rating,
    ratingDescription: description(rating),
    target,
    average
  }
}
console.log(calculateExercises([3,0,2,0,0,3,1], 5))
