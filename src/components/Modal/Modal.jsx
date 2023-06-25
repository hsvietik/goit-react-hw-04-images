import Modal from 'react-modal';
import { lock, unlock } from 'tua-body-scroll-lock';
const customStyles = {
  overlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  content: {
    top: '55%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    border: 'none',
  },
};

Modal.setAppElement('#root');
export const ModalWindow = ({ modalIsOpen, toggleModal, src, alt }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={toggleModal}
      style={customStyles}
      onAfterOpen={lock}
      onAfterClose={unlock}
    >
      <img src={src} alt={alt} />
    </Modal>
  );
};
