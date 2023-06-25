import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContainer } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { fetchPictures } from '../api';
import { Loader } from './Loader/Loader';

export class App extends Component {
  abortCtrl;
  state = {
    query: '',
    currentPage: 1,
    pictures: [],
    totalHits: 0,
    isLoading: false,
  };
  setQuery = query => {
    this.setState({ query });
  };
  setPage = () => {
    this.setState(prevState => {
      return { currentPage: prevState.currentPage + 1 };
    });
  };
  async componentDidUpdate(_, prevState) {
    const { query, currentPage } = this.state;
    const newQuery = prevState.query !== query;
    const newPage = prevState.currentPage !== currentPage;
    if (!query) {
      return toast.info(`Enter your query in the search bar.`);
    }
    if (newQuery) {
      this.setState({ pictures: [], currentPage: 1 });
    }
    if (newQuery || newPage) {
      if (this.abortCtrl) {
        this.abortCtrl.abort();
      }
      this.abortCtrl = new AbortController();

      try {
        this.setState({ isLoading: true });
        const response = await fetchPictures({
          query,
          currentPage,
          abortCtrl: this.abortCtrl,
        });
        this.setState(prevState => {
          return {
            pictures: [...prevState.pictures, ...response.hits],
            totalHits: response.totalHits,
          };
        });
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
        this.setState({ isLoading: false });
      }
    } else {
      return;
    }
  }

  render() {
    const { pictures, isLoading, totalHits, currentPage } = this.state;
    const isEmptyArray = pictures.length === 0;
    const islastPage = currentPage > totalHits / 12;
    return (
      <AppContainer>
        <Searchbar onSubmit={this.setQuery} />
        <ImageGallery pictures={pictures} />
        {isLoading && <Loader />}
        {!isEmptyArray && !islastPage && !isLoading && (
          <Button onClick={this.setPage} />
        )}
        <ToastContainer autoClose={3000} />
      </AppContainer>
    );
  }
}
