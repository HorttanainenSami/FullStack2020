import React from 'react';
import { Modal } from 'semantic-ui-react';
import EntryForm from './AddEntryForm';
import { EntryWithoutId } from '../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}

const AddEntryModal = (modalEntrys: Props) => (
  <Modal 
    open={modalEntrys.modalOpen}
    onClose={modalEntrys.onClose}
    onSubmit={modalEntrys.onSubmit}
  >
    <Modal.Content>
      <EntryForm onSubmit={modalEntrys.onSubmit} onCancel={modalEntrys.onClose} /> 
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;
