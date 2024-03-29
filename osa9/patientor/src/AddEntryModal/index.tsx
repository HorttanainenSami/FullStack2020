import React from 'react';
import { Modal } from 'semantic-ui-react';
import OccupationalHealtCareForm from './OccupationalHealthcareModal';
import { EntryWithoutId } from '../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (entry: EntryWithoutId) => void;
}

const AddEntryModal = ({modalOpen, onClose, onSubmit}: Props) => (
  <Modal 
    open={modalOpen}
    onClose={onClose}
    onSubmit={onSubmit}
  >
    <Modal.Content>
      <OccupationalHealtCareForm onSubmit={onSubmit} onCancel={onClose} /> 
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;
