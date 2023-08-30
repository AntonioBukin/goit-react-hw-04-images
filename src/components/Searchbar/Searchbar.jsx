import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { AiOutlineSearch } from 'react-icons/ai';
import {
  Header,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styled';

const notifyOptions = {
  position: 'top-center',
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'colored',
};

function Searchbar({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = event => {
    setInputValue(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (inputValue.trim() === '') {
      return toast.info('Please enter key words', notifyOptions);
    }
    onSubmit(inputValue);
    clearForm();
  };
  const clearForm = () => {
    setInputValue('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <AiOutlineSearch size="30" />
        </SearchFormBtn>
        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="All search images and fotos"
          value={inputValue}
          onChange={handleChange}
        />
      </SearchForm>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;

