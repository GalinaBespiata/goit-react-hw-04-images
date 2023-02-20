import { useState } from 'react';

import css from '../SearchBar/SearchBar.module.css';

export function SearchBar({ onSubmit }) {
  const [searchInput, setSearchInput] = useState('');
  const handleOnChangeInput = evt => {
    
    setSearchInput(evt.target.value);
  };

  const submitForm = evt => {
    evt.preventDefault();

    onSubmit(searchInput);
   
    setSearchInput('');
  };

  return (
    <header className={css.searchBar}>
      <form className={css.searchForm} onSubmit={submitForm}>
        <button type="submit" className={css.searchFormButton}>
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>

        <input
          value={searchInput}
          onChange={handleOnChangeInput}
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
