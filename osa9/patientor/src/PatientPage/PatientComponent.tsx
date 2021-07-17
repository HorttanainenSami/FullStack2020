import React, { useEffect, useState } from 'react';
import { apiBaseUrl } from '../constants';
import axios from 'axios';
import { Patient, Gender, Entry } from '../types';
import { useParams } from 'react-router-dom';
const EntryComponent = (props: Entry) => {
  switch(props.type){
  case 'OccupationalHealthcare':
    return(
      <div className='ui small header'>
        <i> {props.date} {props.description} </i>    
        <ul>
          {props.diagnosisCodes?.map(code => <li key={code}> {code} </li>)}
        </ul>
     
      </div>
    );
    case 'Hospital':
      return(
        <div className='ui small header'>
          <i> {props.date} {props.description} </i>    
          <ul>
            {props.diagnosisCodes.map(code => <li key={code}> {code} </li>)}
          </ul>
        </div>
      );

    case 'HealthCheck':
      return(
        <>
          <i> {props.date} {props.description} </i>    
          <div> 
            Health check rating: {props.healthChechRating}
          </div>
        </>
      );
    default:
      return<> </>;
  }
};
const PatientPage = (): JSX.Element => {
  const [patient, setPatient] = useState<Patient>( {
      id: 'undefined',
      name: '-',
      occupation: '-',
      gender: Gender.Other,
      entries: []
    });
  const { id } = useParams<{id: string}> ();
  useEffect( () => {
    void axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
      .then(response => setPatient(response.data));
  },[id]);
const GenderIcon = () => {
  switch(patient.gender){
    case(Gender.Male):
      return "mars icon";
    case(Gender.Female):
      return "venus icon";
    case(Gender.Other):
      return "genderless icon";
    default:
      return "";
  }
};
console.log(patient);
  if(!patient){
    return <p> asd </p>;
  }
  return( 
    <div>
      <div className='ui huge header'>
        {patient?.name}
        <i className= {GenderIcon()}></i>
      </div>
      <div className='ui small header' > 
        ssn: {patient.ssn}
      </div>
      <div className='ui small header' > 
        occupation: {patient.occupation}
      </div>
    <div className='ui medium header'>
    Entries
    </div>
      {patient.entries.map(a => <EntryComponent key={a.id} {...a} />)}
    </div>

  );
};
export default PatientPage;
