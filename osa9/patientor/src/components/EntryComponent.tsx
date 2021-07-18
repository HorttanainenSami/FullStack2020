import React, { useEffect, useState} from 'react';
import { Entry, Diagnosis } from '../types';
import { apiBaseUrl } from '../constants';
import axios from 'axios';
const EntryComponent = (props: Entry) => {
  const [diagnoses, setDiagnoses] = useState<Array<string>>([]);

  useEffect( () => {
    //eslint-disable-next-line
    fetchDiagnoses();
}, [props.id]);

  const diagnosePromises = async (): Promise<string[]> => {
    if(props.type === 'HealthCheck' || !props.diagnosisCodes) {
      return [];
    }
    const urls = props.diagnosisCodes.map(code => `${apiBaseUrl}/diagnoses/${code}`);
    const promises = urls?.map(async url => await axios.get<Diagnosis>(url));

    const asd = await Promise.all(
      promises.map(promise => promise
        .then(response =>  `${response.data.code} ${response.data.name}`))
    );
    return asd;
  };
  const fetchDiagnoses = async () => {
    const asd = await diagnosePromises();
    setDiagnoses(asd);
  };

  switch(props.type){
  case 'OccupationalHealthcare':
    return(
      <div className='ui small header'>
        <i> {props.date} {props.description} </i>    
        <ul>
          {diagnoses?.map(code => <li key={code}> {code} </li>)}
        </ul>
      </div>
    );
    case 'Hospital':
      return(
        <div className='ui small header'>
          <i> {props.date} {props.description} </i>    
          <ul>
            {diagnoses?.map(code => <li key={code}> {code} </li>)}
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
export default EntryComponent;
