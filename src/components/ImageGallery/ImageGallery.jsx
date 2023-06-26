import React from 'react';

import { GalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export function ImageGallery({ pictures, toggleModal }) {
  return (
    <div>
      <GalleryList>
        {pictures.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <ImageGalleryItem
              key={id}
              src={webformatURL}
              alt={tags}
              largeImageURL={largeImageURL}
              onClick={toggleModal}
            />
          );
        })}
      </GalleryList>
    </div>
  );
}
