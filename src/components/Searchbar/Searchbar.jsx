import React, { Component } from 'react';
import { Formik } from 'formik';
import { ImSearch } from 'react-icons/im';
import {
  StyledSearchbar,
  StyledForm,
  SearchButton,
  SearchInput,
} from './Searchbar.styled';
import { PixabayLink } from './PixabayLink';

export class Searchbar extends Component {
  handleSubmit = ({ query }, { resetForm }) => {
    this.props.onSubmit(query);
    resetForm();
  };

  render() {
    return (
      <StyledSearchbar>
        <PixabayLink />
        <Formik initialValues={{ query: '' }} onSubmit={this.handleSubmit}>
          <StyledForm>
            <SearchInput
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              name="query"
            />
            <SearchButton type="submit">
              <ImSearch size="20px" />
            </SearchButton>
          </StyledForm>
        </Formik>
      </StyledSearchbar>
    );
  }
}
