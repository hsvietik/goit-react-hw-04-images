import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContainer } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { fetchPictures } from '../api';
import { Loader } from './Loader/Loader';

export function App() {
  const abortCtrl = useRef();
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const setPage = () => setCurrentPage(prevState => prevState + 1);
  const onQueryChange = query => {
    setQuery(query);
    setPictures([]);
    setCurrentPage(1);
    setTotalHits(0);
  };
  useEffect(() => {
    if (query === '') return;

    async function loadPictures() {
      if (abortCtrl.current) {
        abortCtrl.current.abort();
      }
      abortCtrl.current = new AbortController();
      try {
        setIsLoading(true);
        const response = await fetchPictures({
          query,
          currentPage,
          abortCtrl,
        });
        setPictures(prevPictures => [...prevPictures, ...response.hits]);
        setTotalHits(response.totalHits);

        if (currentPage > 1) {
          setTimeout(() => {
            window.scrollBy({
              top: 650,
              behavior: 'smooth',
            });
          }, 300);
        }
        if (!response.hits.length) {
          return toast.warn(
            `Sorry, there are no images matching your search query. Please try again.`
          );
        }
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          return toast.warn(`Oops, something went wrong.`);
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadPictures();
  }, [currentPage, query]);

  const isEmptyArray = pictures.length === 0;
  const islastPage = currentPage > totalHits / 12;
  return (
    <AppContainer>
      <Searchbar onSubmit={query => onQueryChange(query)} />
      <ImageGallery pictures={pictures} />
      {isLoading && <Loader />}
      {!isEmptyArray && !islastPage && !isLoading && (
        <Button onClick={setPage} />
      )}
      <ToastContainer autoClose={3000} />
    </AppContainer>
  );
}
