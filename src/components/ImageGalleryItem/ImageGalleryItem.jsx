import React, { Component } from 'react';
import { GalleryItem, GalleryPicture } from './ImageGalleryItem.styled';
import { ModalWindow } from '../Modal/Modal';
export class ImageGalleryItem extends Component {
  state = {
    modalIsOpen: false,
  };
  toggleModal = () => {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
  };

  render() {
    const { id, src, alt, largeImageURL } = this.props;
    return (
      <GalleryItem key={id} onClick={this.toggleModal}>
        <GalleryPicture src={src} alt={alt} />
        <ModalWindow
          modalIsOpen={this.state.modalIsOpen}
          toggleModal={this.toggleModal}
          src={largeImageURL}
          alt={alt}
        />
      </GalleryItem>
    );
  }
}
