import React, { useEffect, useState } from 'react';
import { apiBaseUrl } from '../constants';
import axios from 'axios';
import { Patient, Gender, EntryWithoutId } from '../types';
import { useParams } from 'react-router-dom';
import EntryComponent from '../components/EntryComponent';
import AddEntryModal from '../AddEntryModal/index';



const PatientPage = (): JSX.Element => {
  const [modalOpen, setModal] = useState<boolean>(false);
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
  const onSubmit = (values: EntryWithoutId): void => {
    closeModal(); 
    console.log(values);
  };

  const openModal = (): void => setModal(true);
  const closeModal = (): void => setModal(false);
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
      <button onClick={() => openModal()}>Add Entry </button>
    <AddEntryModal modalOpen={modalOpen} onClose={() => closeModal()} onSubmit={(values) => onSubmit(values)} />
    </div>

  );
};
export default PatientPage;
