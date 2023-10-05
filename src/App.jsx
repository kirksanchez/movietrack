import { useEffect, useState } from 'react';
import MovieList from './components/MovieList';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieHeader from './components/MovieHeader';
import Search from './components/Search';
import AddToWatch from './components/AddToWatch';
import LoginCard from './components/LoginCard';
import ToWatchComponent from './components/ToWatchComponent';
import Sidebar from './components/Sidebar';
import { useMovies } from './hooks/useMovies';
import { useLocalStorage } from './hooks/useLocalStorage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const { movies, setMovies, searchValue, setSearchValue } = useMovies('');
  const [toWatch, setToWatch] = useLocalStorage('react-movie-app-toWatch', []);
  const [watched, setWatched] = useLocalStorage('react-movie-app-watched', []);
  const [currentPage, setCurrentPage] = useState('home');
  const [setShowHomePage] = useState(true);

  useEffect(() => {
    const storedToWatchList = JSON.parse(
      localStorage.getItem('react-movie-app-toWatch')
    );

    if (storedToWatchList) {
      setToWatch(storedToWatchList);
    }
  }, []);

  const forSave = (items) => {
    localStorage.setItem('react-movie-app-toWatch', JSON.stringify(items));
  };

  const toWatchMovie = (movie) => {
    const isInToWatch = toWatch.some(
      (toWatchMovie) => toWatchMovie.imdbID === movie.imdbID
    );
    const isInWatched = watched.some(
      (watchedMovie) => watchedMovie.imdbID === movie.imdbID
    );

    if (isInToWatch || isInWatched) {
      return;
    }

    const newToWatchList = [...toWatch, movie];
    setToWatch(newToWatchList);
    forSave(newToWatchList);
  };

  const removeToWatchMovie = (movie) => {
    const newToWatchList = toWatch.filter(
      (toWatch) => toWatch.imdbID !== movie.imdbID
    );
    setToWatch(newToWatchList);
    forSave(newToWatchList);
  };

  const redirectTo = (path) => {
    switch (path) {
      case '/home':
        setCurrentPage('home');
        setSearchValue('');
        setMovies([]);
        break;
      case '/to-watch':
        setCurrentPage('to-watch');
        break;
      case '/watched':
        setCurrentPage('watched');
        break;
      case '/':
        setShowHomePage(true);
        break;
      default:
        setCurrentPage('home');
        break;
    }
  };

  const doneWatchingMovie = (movie) => {
    const newToWatchList = toWatch.filter(
      (toWatchMovie) => toWatchMovie.imdbID !== movie.imdbID
    );
    const newWatchedList = [...watched, movie];

    setToWatch(newToWatchList);
    setWatched(newWatchedList);

    forSaveToWatch(newToWatchList);
    forSaveWatched(newWatchedList);
  };

  const forSaveToWatch = (items) => {
    localStorage.setItem('react-movie-app-toWatch', JSON.stringify(items));
  };

  const forSaveWatched = (items) => {
    localStorage.setItem('react-movie-app-watched', JSON.stringify(items));
  };

  useEffect(() => {
    const storedWatchedList = JSON.parse(
      localStorage.getItem('react-movie-app-watched')
    );

    if (storedWatchedList) {
      setWatched(storedWatchedList);
    }
  }, []);

  const removeFromWatched = (movie) => {
    const newWatchedList = watched.filter(
      (watchedMovie) => watchedMovie.imdbID !== movie.imdbID
    );
    setWatched(newWatchedList);
    forSaveWatched(newWatchedList);
  };

  const watchAgain = (movie) => {
    const newWatchedList = watched.filter(
      (watchedMovie) => watchedMovie.imdbID !== movie.imdbID
    );
    const newToWatchList = [...toWatch, movie];

    setWatched(newWatchedList);
    setToWatch(newToWatchList);

    forSaveWatched(newWatchedList);
    forSaveToWatch(newToWatchList);
  };

  return (
    <Router>
      <div className='container-fluid movie-app'>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route
            exact
            path='/login'
            element={<LoginCard onLogin={() => redirectTo('/home')} />}
          />
          <Route
            exact
            path='/home'
            element={
              <div className='d-flex'>
                <Sidebar
                  username='Kirk'
                  onClickHome={() => redirectTo('/home')}
                  onClickToWatch={() => redirectTo('/to-watch')}
                  onClickWatched={() => redirectTo('/watched')}
                  onClickLogOut={() => setShowHomePage(true)}
                />
                <Home
                  movies={movies}
                  handleToWatchClick={toWatchMovie}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  toWatch={toWatch}
                  watched={watched}
                />
              </div>
            }
          />
          <Route
            exact
            path='/to-watch'
            element={
              <div className='d-flex'>
                <Sidebar
                  username='Kirk'
                  onClickHome={() => redirectTo('/home')}
                  onClickToWatch={() => redirectTo('/to-watch')}
                  onClickWatched={() => redirectTo('/watched')}
                  onClickLogOut={() => setShowHomePage(true)}
                />
                <ToWatch
                  toWatch={toWatch}
                  removeToWatchMovie={removeToWatchMovie}
                  doneWatchingMovie={doneWatchingMovie}
                />
              </div>
            }
          />
          <Route
            exact
            path='/watched'
            element={
              <div className='d-flex'>
                <Sidebar
                  username='Kirk'
                  onClickHome={() => redirectTo('/home')}
                  onClickToWatch={() => redirectTo('/to-watch')}
                  onClickWatched={() => redirectTo('/watched')}
                  onClickLogOut={() => setShowHomePage(true)}
                />
                <Watched
                  watched={watched}
                  removeFromWatched={removeFromWatched}
                  watchAgain={watchAgain}
                />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <div className='container-fluid movie-app'>
      <div className='movie-title'>
        <div className='app-name'>
          <h1>MOVIETRACK</h1>
        </div>
        <div>
          <button
            className='login-button'
            onClick={() => (window.location.href = '/login')}
          >
            LOG IN
          </button>
        </div>
      </div>
    </div>
  );
}

function Home({
  movies,
  handleToWatchClick,
  searchValue,
  setSearchValue,
  toWatch,
  watched,
}) {
  return (
    <>
      <div className='container-fluid movie-app'>
        <div className='row d-flex align-items-center mt-4 mb-4'>
          <MovieHeader heading='Movies' />
          <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        </div>
        <div className='row'>
          <MovieList
            movies={movies}
            handleToWatchClick={handleToWatchClick}
            toWatchComponent={(props) => {
              const isAlreadyAdded =
                toWatch.some((movie) => movie.imdbID === props.movie.imdbID) ||
                watched.some((movie) => movie.imdbID === props.movie.imdbID);

              if (isAlreadyAdded) return null;

              return <AddToWatch {...props} />;
            }}
          />
        </div>
      </div>
    </>
  );
}

function ToWatch({ toWatch, removeToWatchMovie, doneWatchingMovie }) {
  return (
    <>
      <div className='container-fluid movie-app'>
        <div className='row d-flex align-items-center mt-4 mb-4'>
          <MovieHeader heading='To Watch' />
        </div>
        <div className='row'>
          <MovieList
            movies={toWatch}
            handleToWatchClick={removeToWatchMovie}
            toWatchComponent={(props) => (
              <ToWatchComponent
                {...props}
                onClick={() => removeToWatchMovie(props.movie)}
                onDoneWatching={() => doneWatchingMovie(props.movie)}
              />
            )}
          />
        </div>
      </div>
    </>
  );
}

function Watched({ watched, removeFromWatched, watchAgain }) {
  return (
    <>
      <div className='container-fluid movie-app'>
        <div className='row d-flex align-items-center mt-4 mb-4'>
          <MovieHeader heading='Watched' />
        </div>
        <div className='row'>
          <MovieList
            movies={watched}
            handleToWatchClick={removeFromWatched}
            toWatchComponent={(props) => (
              <ToWatchComponent
                {...props}
                onRemoveFromWatched={() => removeFromWatched(props.movie)}
                onWatchAgain={() => watchAgain(props.movie)}
              />
            )}
          />
        </div>
      </div>
    </>
  );
}

export default App;
