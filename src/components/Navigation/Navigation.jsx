import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ toggleTheme, isDarkMode }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isUnderlineVisible, setUnderlineVisible] = useState(false);
    const location = useLocation();

    const handleMenuClick = () => {
        setMenuOpen(!isMenuOpen);
    };

    const handleLinkClick = () => {
        setMenuOpen(false);
        setUnderlineVisible(true);
    };

    const updateUnderlinePosition = useCallback(() => {
        const activeLink = document.querySelector(`.nav-link a[href='${location.pathname}']`);
        const underline = document.querySelector(".underline");

        if (activeLink && underline) {
            underline.style.width = `${activeLink.getBoundingClientRect().width}px`;
            underline.style.transform = `translateX(${activeLink.getBoundingClientRect().left + window.scrollX}px)`; // Adjust position to be relative to the viewport
        }
    }, [location.pathname]);

    useEffect(() => {
        const underline = document.querySelector(".underline");

        if (location.pathname === '/') {
            if (!isUnderlineVisible) {
                underline.classList.remove('visible');
            } else {
                underline.classList.add('visible');
                const homeLink = document.querySelector(`.nav-link a[href='/']`);
                underline.style.width = `${homeLink.getBoundingClientRect().width}px`;
                underline.style.transform = `translateX(${homeLink.getBoundingClientRect().left + window.scrollX}px)`; // Center it below Home
            }
        } else {
            setUnderlineVisible(true);
            updateUnderlinePosition();
        }

        if (underline) {
            underline.classList.toggle('visible', isUnderlineVisible);
        }
    }, [location.pathname, updateUnderlinePosition, isUnderlineVisible]);

    useEffect(() => {
        window.addEventListener("resize", updateUnderlinePosition);

        return () => {
            window.removeEventListener("resize", updateUnderlinePosition);
        };
    }, [updateUnderlinePosition]);

    useEffect(() => {
        const navbar = document.querySelector(".navbar");
        if (isMenuOpen) {
            navbar.classList.add("open");
        } else {
            navbar.classList.remove("open");
        }
    }, [isMenuOpen]);

    return (
        <header>
            <Link to="/" className="logo">AnalyzSys</Link>

            <div className="nav-container">
                <ul className="navbar">
                    <li className={`nav-link ${location.pathname === '/' ? 'active-link' : ''}`}>
                        <Link to="/" onClick={handleLinkClick}>Home</Link>
                    </li>
                    <li className={`nav-link ${location.pathname === '/about' ? 'active-link' : ''}`}>
                        <Link to="/about" onClick={handleLinkClick}>About</Link>
                    </li>
                    <li className={`nav-link ${location.pathname === '/contact' ? 'active-link' : ''}`}>
                        <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
                    </li>
                    <div className={`underline ${isUnderlineVisible ? 'visible' : ''}`}></div>
                </ul>

                <div className="nav-button">
                    <i
                        className={`bx ${isDarkMode ? "bx-sun" : "bx-moon"} change-theme`}
                        id="theme-button"
                        onClick={toggleTheme}
                    ></i>
                    <i
                        className={`bx ${isMenuOpen ? "bx-x" : "bx-menu"}`}
                        id="menu-icon"
                        onClick={handleMenuClick}
                    ></i>
                </div>
            </div>
        </header>
    );
};

export default Navigation;
