// src/api.js
const apiKey = 'd9ee2866';

export const fetchMovies = async (query) => {
    const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
    const data = await response.json();
    return data.Search || [];
};

export const fetchMovieById = async (id) => {
    const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);
    const data = await response.json();
    return data;
};
