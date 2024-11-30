// 

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const apiKey = 'd9ee2866';
const popularMovies = [
    'tt0848228', 'tt4154796', 'tt0468569', 'tt0111161', 'tt1375666',
    'tt0133093', 'tt0137523', 'tt0266697', 'tt0284978', 'tt0076759',
    'tt0109830', 'tt0120815', 'tt0180093', 'tt0451094', 'tt0110912'
];

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate(); // Hook to navigate to other routes

    useEffect(() => {
        fetchMoviesByIds(popularMovies);
    }, []);

    const fetchMoviesByIds = async (ids) => {
        const movies = await Promise.all(ids.map(id =>
            fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`)
                .then(response => response.json())
        ));
        setMovies(movies);
    };

    const fetchMovies = async () => {
        const response = await fetch(`https://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}`);
        const data = await response.json();
        setMovies(data.Search || []);
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            fetchMovies();
        }
    };

    const showDetails = (imdbID) => {
        navigate(`/movie/${imdbID}`); // Navigate to MovieDetails page
    };

    const addToWatchlist = (imdbID) => {
        const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        if (!storedWatchlist.includes(imdbID)) {
            storedWatchlist.push(imdbID);
            localStorage.setItem('watchlist', JSON.stringify(storedWatchlist));
            console.log(`Added ${imdbID} to watchlist`);
        } else {
            console.log(`${imdbID} is already in the watchlist`);
        }
    };

    return (
        <section>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">Search</button>
            </div>
            <section className="grid-container">
                {movies.map(movie => (
                    <div key={movie.imdbID} className="movie-card">
                        <img src={movie.Poster} alt={movie.Title} />
                        <h3>{movie.Title}</h3>
                        <p>{movie.Year}</p>
                        <button onClick={() => showDetails(movie.imdbID)}>Details</button>
                        <button onClick={() => addToWatchlist(movie.imdbID)}>Add to Watchlist</button>
                    </div>
                ))}
            </section>
        </section>
    );
};

export default Home;
