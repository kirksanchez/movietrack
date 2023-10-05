import React from 'react';
import './MovieList.css';

function Search({ searchValue, setSearchValue }) {
  return (
    <div className='col col-sm-4'>
      <input
        className='form-control'
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        placeholder='What do you want to search?'
      />
    </div>
  );
}

export default Search;
