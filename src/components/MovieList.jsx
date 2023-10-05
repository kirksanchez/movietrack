import React from 'react';
import './MovieList.css';

function MovieList({
  movies,
  handleToWatchClick,
  toWatchComponent: ToWatchComponent,
}) {
  return (
    <div className='movie-list-container'>
      {movies.map((movie) => (
        <div className='image-container' key={movie.imdbID}>
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(
              movie.Title
            )}`}
            target='_blank'
            rel='noopener noreferrer'
            className='image-container-anchor'
          >
            <div
              className='poster'
              style={{
                backgroundImage: `url(${movie.Poster})`,
              }}
            ></div>
          </a>

          <div
            onClick={(e) => {
              e.stopPropagation();
              handleToWatchClick(movie);
            }}
            className='overlay'
          >
            <ToWatchComponent movie={movie} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieList;
