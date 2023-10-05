import React from 'react';
import './Watch.css';

function AddToWatch({ onClick }) {
  return (
    <button className='add-to-watch-btn' onClick={onClick}>
      Add to Watch
    </button>
  );
}

export default AddToWatch;
