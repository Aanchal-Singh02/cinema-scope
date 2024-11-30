// 
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const apiKey = 'd9ee2866'; // Ensure you have the API key defined

const Watchlist = () => {
    const [watchlist, setWatchlist] = useState([]);
    const [movies, setMovies] = useState([]); // State to hold movie details
    const navigate = useNavigate();

    useEffect(() => {
        const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        setWatchlist(storedWatchlist);

        // Fetch movie details for each ID in the watchlist
        const fetchMovies = async () => {
            const movieDetails = await Promise.all(storedWatchlist.map(async (imdbID) => {
                const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`);
                const data = await response.json();
                return data.Response === "True" ? data : null; // Return null if not found
            }));
            setMovies(movieDetails.filter(movie => movie !== null)); // Filter out null responses
        };

        fetchMovies();
    }, []);

    const removeFromWatchlist = (imdbID) => {
        const updatedWatchlist = watchlist.filter(id => id !== imdbID);
        setWatchlist(updatedWatchlist);
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
        // Also update movies state to reflect the removal
        setMovies(movies.filter(movie => movie.imdbID !== imdbID));
    };

    return (
        <section>
            <header>
                <h1><span>My</span> Watch<span>List</span></h1>
                <button onClick={() => navigate('/')}>Back to Search</button>
            </header>

            <section className="grid-container">
                {watchlist.length === 0 ? (
                    <p>No movies in your watchlist.</p>
                ) : (
                    movies.map(movie => (
                        <div key={movie.imdbID} className="movie-card">
                            <h3>{movie.Title}</h3>
                            <img src={movie.Poster} alt={movie.Title} />
                            <button onClick={() => removeFromWatchlist(movie.imdbID)}>Remove</button>
                            <button onClick={() => navigate(`/movies/${movie.imdbID}`)}>Details</button> {/* Navigate to details */}
                        </div>
                    ))
                )}
            </section>
        </section>
    );
};

export default Watchlist;
