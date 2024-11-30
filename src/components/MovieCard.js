// src/components/MovieCard.js
import React from 'react';

const MovieCard = ({ movie, onShowDetails, onAddToWatchlist }) => {
    return (
        <div className="movie-card">
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            <button onClick={() => onShowDetails(movie.imdbID)}>Details</button>
            <button onClick={() => onAddToWatchlist(movie.imdbID)}>Add to Watchlist</button>
        </div>
    );
};

export default MovieCard;
