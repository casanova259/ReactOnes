import { useEffect, useRef, useState } from "react";
import StarRating from "./components/StarRating";
import { useMovie } from "./useMovie";
import {usekey} from './usekey'
import { useLocalStorageState } from "./useLocalStorageState";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "4a45147d";

export default function App() {
  const [query, setQuery] = useState("");
  // const [movies, setMovies] = useState([]);
  // const [isloading, setisLoading] = useState(false);
  // const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null)
  // const query = "interstellar"

  // const [watched, setWatched] = useState([]);
  //when the value of state depends upon the pre data or computation u can pass a pure function
  //in the state whcih will return that data :MAIN RULE U CAN"TT CALL ANY FUNCTION IN THAT AND
  //U CANNOT PASS ANY ARGS IN THAT PARTICULAR FUNCTION
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id) {
    setSelectedId(selectedId => id === selectedId ? null : id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  //the fucntion used to add a movie to wathced movie array
  function handleAddWatched(movie) {
    setWatched(watched => [...watched, movie])
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id))
  }


  //storing the Watched movie in the local storage
  useEffect(function () {
    localStorage.setItem("watched", JSON.stringify(watched))
  }, [watched])

  // useEffect(function () {

  //   const controller = new AbortController();

  //   async function fetchMovies() {
  //     try {
  //       setisLoading(true);
  //       setError('');
  //       const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal });

  //       if (!res.ok) throw new Error("Something Went Wrong with fetching movies");

  //       const data = await res.json();
  //       if (data.Response == "False") throw new Error("Movie Not Found");
  //       setMovies(data.Search);
  //       setError("");
  //     } catch (err) {
  //       if (err.name !== "AbortError") {
  //         setError(err.message);
  //       }
  //     } finally {
  //       setisLoading(false);
  //     }
  //   }
  //   //we call this function now in the useffect hook
  //   if (query.length < 3) {
  //     setMovies([]);
  //     setError('');
  //     return
  //   }
  //   handleCloseMovie();
  //   fetchMovies();

  //   return function () {
  //     controller.abort();
  //   }
  // }, [query])

  const { movies, isloading, error } = useMovie(query);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movie={movies} />
      </NavBar>
      <Main>
        <Box>
          {/* {isloading ? <Loader /> : <MovieList movies={movies} />} */}

          {/* First one is for loading  */}
          {isloading && <Loader />}
          {/* {second one when there's no loading means the data has been fetched  and there's no error} */}
          {!isloading && !error &&
            <MovieList
              onSelectMovie={handleSelectMovie}
              movies={movies}

            />}
          {/* Nwo the third one is that when the eroor is there */}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ?
            <MovieDetails
              selectedId={selectedId}
              onClosemovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}

            /> : <><WatchedSummary watched={watched} />
              <WatchedList watched={watched} ondeleteWatched={handleDeleteWatched} /></>}

        </Box>
      </Main>
    </>
  );
}

function ErrorMessage({ message }) {
  return <p className="error">
    <span>❌</span> {message}
  </p>;
}
function Loader() {
  return <p className="loader">LOADING....</p>
}

function NavBar({ children }) {

  return <nav className="nav-bar">
    {children}
  </nav>
}
function Logo() {
  return <div className="logo">
    <span role="img">🍿</span>
    <h1>usePopcorn</h1>
  </div>
}
function Search({ query, setQuery }) {

  //steps to  create ref
  //1. create a ref
  const inputEl = useRef(null);

  //3.use that ref in a useEffect
 
  usekey("Enter",function() {

      if (document.activeElement === inputEl.current )return;
      inputEl.current.focus();
      setQuery('');
    })

  return <input
    //pass that ref from the element
    ref={inputEl}
    className="search"
    type="text"
    placeholder="Search movies..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
  />
}

function NumResults({ movie }) {
  return <p className="num-results">
    {/* Found <strong>{movie.length}</strong> results */}
  </p>
}


function Main({ children }) {
  return <main className="main">
    {children}
  </main>
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (<div className="box">
    <button
      className="btn-toggle"
      onClick={() => setIsOpen((open) => !open)}
    >
      {isOpen ? "–" : "+"}
    </button>
    {isOpen && (
      children
    )}
  </div>);
}

// function WatchBox() {

//   const [isOpen2, setIsOpen2] = useState(true);


//   return (<div className="box">
//     <button
//       className="btn-toggle"
//       onClick={() => setIsOpen2((open) => !open)}
//     >
//       {isOpen2 ? "–" : "+"}
//     </button>
//     {isOpen2 && (
//       <>

//       </>
//     )}
//   </div>);
// }

function MovieList({ movies, onSelectMovie }) {

  return <ul className="list list-movies">
    {movies?.map((movie) => (
      <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
    ))}
  </ul>
}

function Movie({ movie, onSelectMovie }) {
  return <li onClick={() => onSelectMovie(movie.imdbID)}>
    <img src={movie.Poster} alt={`${movie.Title} poster`} />
    <h3>{movie.Title}</h3>
    <div>
      <p>
        <span>🗓</span>
        <span>{movie.Year}</span>
      </p>
    </div>
  </li>
}

function MovieDetails({ selectedId, onClosemovie, onAddWatched, watched }) {

  const [movie, setMovie] = useState({});
  const [isloading, setisLoading] = useState(false);
  const [userRating, setUserRating] = useState('');

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating

  const countRating = useRef(0);

  useEffect(function () {
    if (userRating) countRating.current++;
  }, [userRating])

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre
  } = movie;

  function handleAdd() {


    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating,
      countRatingDecisions: countRating.current
    };

    onAddWatched(newWatchedMovie);
    onClosemovie();
  }


  usekey("Escape",onClosemovie);
  


  useEffect(function () {
    if (!title) return;
    document.title = `MOVIE | ${title}`;

    return function () {
      document.title = "usePopCorn";

      //closure a fucniton will remember everything
      //when it is created
    }
  }, [title])

  useEffect(function () {
    async function getMovieDetails() {
      setisLoading(true)
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
      const data = await res.json();
      setMovie(data);
      setisLoading(false)
    }
    getMovieDetails();
  }, [selectedId])



  return <div className="details">

    {isloading ? <Loader /> : <>
      <header>
        <button className="btn-back" onClick={onClosemovie}>&larr;</button>
        <img src={poster} alt={`poster of movie ${movie}`} />

        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐</span>
            {imdbRating} IMDb rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          {!isWatched ?
            <>
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={setUserRating}
              />
              {userRating > 0 &&
                <button
                  className="btn-add"
                  onClick={handleAdd}>
                  Add to List
                </button>
              }
            </> :
            <p>You Rated this movie with {watchedUserRating} <span>⭐</span></p>
          }

        </div>
        <p><em>{plot}</em></p>
        <p>Staring {actors}</p>
        <p>Directed By {director}</p>
      </section></>}

  </div>
}

function WatchedSummary({ watched = [] }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return <div className="summary">
    <h2>Movies you watched</h2>
    <div>
      <p>
        <span>#️⃣</span>
        <span>{watched.length} movies</span>
      </p>
      <p>
        <span>⭐️</span>
        <span>{avgImdbRating.toFixed(2)}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{avgUserRating.toFixed(2)}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{avgRuntime} min</span>
      </p>
    </div>
  </div>
}

function WatchedList({ watched = [], ondeleteWatched }) {
  return <ul className="list">
    {watched.map((movie) => (
      <WatchedMovie movie={movie} key={movie.imdbID} ondeleteWatched={ondeleteWatched} />
    ))}
  </ul>
}

function WatchedMovie({ movie, ondeleteWatched }) {
  return <li key={movie.imdbID}>
    <img src={movie.poster} alt={`${movie.title} poster`} />
    <h3>{movie.Title}</h3>
    <div>
      <p>
        <span>⭐️</span>
        <span>{movie.imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{movie.userRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{movie.runtime} min</span>
      </p>

      <button className="btn-delete" onClick={() => ondeleteWatched(movie.imdbID)}>X</button>
    </div>
  </li>
}