import React from 'react';
import Modal from '@mui/material/Modal';
import ModalDialog from '@mui/material/ModalDialog';
import ModalClose from './ModalClose'; // Assuming ModalClose is defined elsewhere
import Typography from '@mui/material/Typography';

const ModalComponent = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <ModalDialog color="neutral" variant="soft">
        <ModalClose onClose={onClose} />
        <Typography>Modal title</Typography>
      </ModalDialog>
    </Modal>
  );
};

export default ModalComponent;
