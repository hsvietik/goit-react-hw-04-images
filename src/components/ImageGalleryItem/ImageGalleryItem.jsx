import React, { useState } from 'react';
import { GalleryItem, GalleryPicture } from './ImageGalleryItem.styled';
import { ModalWindow } from '../Modal/Modal';

export function ImageGalleryItem({ id, src, alt, largeImageURL }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <GalleryItem key={id} onClick={toggleModal}>
      <GalleryPicture src={src} alt={alt} />
      <ModalWindow
        modalIsOpen={modalIsOpen}
        toggleModal={toggleModal}
        src={largeImageURL}
        alt={alt}
      />
    </GalleryItem>
  );
}
