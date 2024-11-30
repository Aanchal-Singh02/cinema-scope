// MovieDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css'; // Import your CSS file

const apiKey = 'd9ee2866';

const MovieDetails = () => {
    const { imdbID } = useParams(); // Get the movie ID from the URL parameters
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`);
            const data = await response.json();
            setMovie(data);
        };

        fetchMovieDetails();
    }, [imdbID]);

    if (!movie) {
        return <p>Loading...</p>; // Show loading state while fetching
    }

    return (
        <section className="movie-details">
            <h2>{movie.Title}</h2>
            <img src={movie.Poster} alt={movie.Title} />
            <p><strong>Plot:</strong> {movie.Plot}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Cast:</strong> {movie.Actors}</p>
            <p><strong>Release Year:</strong> {movie.Year}</p>
            <p><strong>Genre:</strong> <span className="genre">{movie.Genre}</span></p>
            <p><strong>Rating:</strong> {movie.imdbRating}</p>
            <p><strong>Language:</strong> {movie.Language}</p>
            <p><strong>Country:</strong> {movie.Country}</p>
            <button onClick={() => navigate('/')} className="close-button">Close</button>
        </section>
    );
};

export default MovieDetails;
