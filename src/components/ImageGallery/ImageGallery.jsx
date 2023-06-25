import React, { Component } from 'react';

import { GalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  render() {
    return (
      <div>
        <GalleryList>
          {this.props.pictures.map(
            ({ id, webformatURL, largeImageURL, tags }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  src={webformatURL}
                  alt={tags}
                  largeImageURL={largeImageURL}
                  onClick={this.toggleModal}
                />
              );
            }
          )}
        </GalleryList>
      </div>
    );
  }
}
