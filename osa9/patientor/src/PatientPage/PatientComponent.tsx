import React, { useEffect, useState } from 'react';
import { apiBaseUrl } from '../constants';
import axios from 'axios';
import {Entry, EntryWithoutId, Patient, Gender} from '../types';
import { useParams } from 'react-router-dom';
import EntryComponent from '../components/EntryComponent';
import AddHealthCheckModal from '../AddHealthCheckModal/index';
import AddHospitalCheckModal from '../AddHospitalModal/index';
import AddOccupationalHealthcareModal from '../AddEntryModal/index';
import { useStateValue } from '../state';
import { createEntry } from '../state/reducer';

const PatientPage = (): JSX.Element => {
  const [modalOccupationalHealthcareOpen, setOccupationalhealthcareModal] = useState<boolean>(false);
  const [modalHospitalOpen, setHospitalModal] = useState<boolean>(false);
  const [modalHealthCheckOpen, setHealthCheckModal] = useState<boolean>(false);
  const [{patients}, dispatch] = useStateValue();
  const [patient,setPatient] = useState<Patient>( {
      id: 'undefined',
      name: '-',
      occupation: '-',
      gender: Gender.Other,
      entries: []
    });
  const { id } = useParams<{id: string}> ();
  useEffect( () => {
    for(const a in patients){
      if(a === id){
        setPatient(patients[a]);
        break;
      }
    }
  },[id, patients]);
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
  const onSubmit = async (values: EntryWithoutId): Promise<void> => {
    try{
      closeOccupationalHealthcareModal(); 
      closeHospitalModal();
      closeHealthCheckModal();
      const entry = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, values);
      dispatch(createEntry(entry.data, patient, id));
    } catch (e) {
      console.log(e);
    }
  };
  const openOccupationalHealthcareModal = (): void => setOccupationalhealthcareModal(true);
  const closeOccupationalHealthcareModal = (): void => setOccupationalhealthcareModal(false);
  const openHospitalModal = (): void => setHospitalModal(true);
  const closeHospitalModal = (): void => setHospitalModal(false);
  const openHealthCheckModal = (): void => setHealthCheckModal(true);
  const closeHealthCheckModal = (): void => setHealthCheckModal(false);
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
      <div className='ui cards'> 
        {patient.entries.map(a => <EntryComponent key={a.id} {...a} />)}
      </div>
      <button onClick={() => openOccupationalHealthcareModal()}>Add OccupationalHealtcare </button>
      <button onClick={() => openHospitalModal()}>Add Hospital </button>
      <button onClick={() => openHealthCheckModal()}>Add HealthCheck </button>
    <AddOccupationalHealthcareModal modalOpen={modalOccupationalHealthcareOpen} onClose={closeOccupationalHealthcareModal} onSubmit={onSubmit} />
    <AddHospitalCheckModal modalOpen={modalHospitalOpen} onClose={closeHospitalModal} onSubmit={onSubmit} />
    <AddHealthCheckModal modalOpen={modalHealthCheckOpen} onClose={closeHealthCheckModal} onSubmit={onSubmit} />
    </div>

  );
};
export default PatientPage;
