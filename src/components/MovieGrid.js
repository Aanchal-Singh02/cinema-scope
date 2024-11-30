// src/components/MovieGrid.js
import React from 'react';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies, onShowDetails, onAddToWatchlist }) => {
    return (
        <section id="movieGrid" className="grid-container">
            {movies.map(movie => (
                <MovieCard 
                    key={movie.imdbID} 
                    movie={movie} 
                    onShowDetails={onShowDetails} 
                    onAddToWatchlist={onAddToWatchlist} 
                />
            ))}
        </section>
    );
};

export default MovieGrid;
