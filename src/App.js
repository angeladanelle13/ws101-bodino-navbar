import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import EventHandler from './components/Handlers/eventHandler';
import Contact from './components/Contact/Contact';

const App = () => {
    const [isDarkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const selectedTheme = localStorage.getItem('selected-theme');
        if (selectedTheme === 'dark') {
            setDarkMode(true);
            document.body.classList.add('dark-theme');
        } else {
            setDarkMode(false);
            document.body.classList.remove('dark-theme');
        }
    }, []);

    const handleToggleTheme = () => {
        setDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('selected-theme', !isDarkMode ? 'dark' : 'light');
    };

    return (
        <Router>
            <div className={isDarkMode ? 'dark-theme' : ''}>
                <EventHandler />
                <Navigation toggleTheme={handleToggleTheme} isDarkMode={isDarkMode} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
