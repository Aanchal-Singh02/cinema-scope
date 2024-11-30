import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Watchlist from './components/Watchlist';
import MovieDetails from './components/MovieDetails'
import './App.css'; // Import your CSS file

const App = () => {
    return (
        <Router>
            <header>
                <h1>Cinema <span>Scope</span></h1>
                <nav>
                    <Link to="/watchlist">
                        <button>Watchlist</button>
                    </Link>
                </nav>
            </header>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:imdbID" element={<MovieDetails />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/movies/:imdbID" element={<MovieDetails />} /> 
            </Routes>
        </Router>
    );
};

export default App;
