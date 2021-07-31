import React from 'react';
import { Modal } from 'semantic-ui-react';
import HealthCheckForm from './HealthCheckForm';
import { EntryWithoutId } from '../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (entry: EntryWithoutId) => void;
}

const AddOccupationalHealthcareModal = ({modalOpen, onClose, onSubmit}: Props) => (
  <Modal 
    open={modalOpen}
    onClose={onClose}
    onSubmit={onSubmit}
  >
    <Modal.Content>
      <HealthCheckForm onSubmit={onSubmit} onCancel={onClose} /> 
    </Modal.Content>
  </Modal>
);

export default AddOccupationalHealthcareModal;
