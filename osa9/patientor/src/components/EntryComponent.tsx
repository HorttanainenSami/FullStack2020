import React  from 'react';
import { Entry } from '../types';
import {useStateValue} from '../state';
const EntryComponent = (props: Entry) => {
  const [{ diagnoses }, ] = useStateValue();


  switch(props.type){
  case 'OccupationalHealthcare':
    return(
      <div className='card'>
      <h3> Occupational Healtcare </h3>
        <div className='ui small header'>
          <i> {props.date} <i className="user md icon"></i> </i>    
            <div className='meta'>
              {props.description}    
            </div>
          <ul>
      {props.diagnosisCodes?.map(diagnosis => <li key={diagnosis}> {diagnoses.find(a => a.code===diagnosis)?.code} {diagnoses.find(a => a.code === diagnosis)?.name} </li>)}
          </ul>
          <div> employer: {props.employerName} </div>
      { props.sickLeave ?  <div> Sick leave : {props.sickLeave.startDate} - {props.sickLeave.endDate} </div> :<> </>}
        </div>
      </div>
    );
    case 'Hospital':
      return(
      <div className='card'>
        <div className='ui small header'>
        <i> {props.date} <i className="user md icon"></i> </i>    
            <div className='meta'>
              {props.description}    
            </div>
          <ul>
            {props.diagnosisCodes?.map(diagnosis => <li key={diagnosis}> {diagnoses.find(a => a.code===diagnosis)?.code} {diagnoses.find(a => a.code === diagnosis)?.name} </li>)}
          </ul>
        <div> discharge : {props.discharge.date} {props.discharge.criteria} </div>
        </div>
        </div>
      );

    case 'HealthCheck':
      return(
        <div className='card'>
        <div className='ui small header'>
          <i> {props.date} <i className="user md icon"></i> </i>    
            <div className='meta'>
              {props.description}    
            </div>
            </div>
              <i className={`${selectHealthCondition(props.healthCheckRating)} heart icon`}></i>
        </div>
      );
    default:
      return<> </>;
  }
};
const selectHealthCondition = (rating: number) => {
  switch(rating){
    case 0:
      return "green";
    case 1:
      return "yellow";
    case 2:
      return "orange";
    case 3:
      return "red";
    default:
      return "black";
    
  }
};
export default EntryComponent;
