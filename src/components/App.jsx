import React, { useState } from 'react';
import Nav from './nav';
import SearchArea from './searchArea';

function App() {
  const [movies, setMovies] = useState([]); // State for movies
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term
  const [error, setError] = useState(''); // State for handling errors
  const apiKey = import.meta.env.VITE_API_KEY; // Use import.meta.env for Vite

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm) return; // If no search term, return early

    setMovies([]); // Reset movies before new search
    setError(''); // Reset error message

    console.log(`Fetching data for: ${searchTerm}`); // Log the search term for debugging

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Log the fetched data to see the structure

        if (data.results.length === 0) {
          setError('No movies found!');
        } else {
          setMovies(data.results); // Set movies from API response
        }
      })
      .catch((error) => {
        console.error(error); // Log any errors that occur during fetch
        setError('Error fetching data');
      });
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value); // Update the search term
  };

  return (
    <div className="App">
      <Nav />
      <SearchArea handleSubmit={handleSubmit} handleChange={handleChange} searchTerm={searchTerm} />

      {/* Display error message if there's an error */}
      {error && <div className="error">{error}</div>}

      {/* Display the movies if available */}
      {movies.length > 0 && (
        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-item">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
              ) : (
                <div>No Image Available</div>
              )}
              <h3>{movie.title}</h3>
              <p>{movie.release_date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
