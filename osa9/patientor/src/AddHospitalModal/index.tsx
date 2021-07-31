import React from 'react';
import { Modal } from 'semantic-ui-react';
import HospitalForm from './HospitalModal';
import { EntryWithoutId } from '../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (entry: EntryWithoutId) => void;
}

const AddHospitalModal = ({modalOpen, onClose, onSubmit}: Props) => (
  <Modal 
    open={modalOpen}
    onClose={onClose}
    onSubmit={onSubmit}
  >
    <Modal.Content>
      <HospitalForm onSubmit={onSubmit} onCancel={onClose} /> 
    </Modal.Content>
  </Modal>
);

export default AddHospitalModal;
