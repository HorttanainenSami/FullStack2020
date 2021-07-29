import React, { useEffect, useState } from 'react';
import { apiBaseUrl } from '../constants';
import axios from 'axios';
import {Entry, EntryWithoutId, Patient, Gender} from '../types';
import { useParams } from 'react-router-dom';
import EntryComponent from '../components/EntryComponent';
import AddEntryModal from '../AddEntryModal/index';
import { useStateValue } from '../state';
import { createEntry } from '../state/reducer';

const PatientPage = (): JSX.Element => {
  const [modalOpen, setModal] = useState<boolean>(false);
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
      closeModal(); 
      const entry = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, values);
      dispatch(createEntry(entry.data, patient, id));
    } catch (e) {
      console.log(e);
    }
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
    <AddEntryModal modalOpen={modalOpen} onClose={closeModal} onSubmit={onSubmit} />
    </div>

  );
};
export default PatientPage;
