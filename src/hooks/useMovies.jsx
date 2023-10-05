import { useState, useEffect } from 'react';

export const useMovies = (initialSearchValue) => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState(initialSearchValue);

  const getMovieRequest = async (searchValue) => {
    const URL = `http://www.omdbapi.com/?apikey=9b4f8f46`;

    const fetchMovies = async (page = 1) => {
      const response = await fetch(`${URL}&s=${searchValue}&page=${page}`);
      const data = await response.json();
      return data.Search || [];
    };

    const firstPageMovies = await fetchMovies(1);
    const secondPageMovies = await fetchMovies(2);
    const thirdPageMovies = await fetchMovies(3);

    const combinedMovies = [
      ...firstPageMovies,
      ...secondPageMovies,
      ...thirdPageMovies,
    ];

    setMovies(combinedMovies);
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  return { movies, setMovies, searchValue, setSearchValue };
};
