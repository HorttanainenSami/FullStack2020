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
      <div className='card'>
        <div className='ui small header'>
          <i> {props.date} <i className="user md icon"></i> </i>    
            <div className='meta'>
              {props.description}    
            </div>
          <ul>
            {diagnoses?.map(code => <li key={code}> {code} </li>)}
          </ul>
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
            {diagnoses?.map(code => <li key={code}> {code} </li>)}
          </ul>
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
