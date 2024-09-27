import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer id="footer">
            <p className="fh">AnalyzSys</p>
            <p class="fp">
                At Analyzsys, we’re dedicated to sharing insights and 
                knowledge about the power and potential of web development. 
                Explore our resources to stay ahead in the digital world. 
                For inquiries or support, contact us.
            </p>
            <div id="socials-container">
                <a href="https://www.github.com/angeladanelle13" target="_blank" rel="noopener noreferrer"><i className="ri-github-line social-icon"></i></a>
                <a href="https://www.linkedin.com/in/maria-angela-danelle-bodino-450086304" target="_blank" rel="noopener noreferrer"><i className="ri-linkedin-line social-icon"></i></a>
                <a href="https://www.facebook.com/angeladanelle13/" target="_blank" rel="noopener noreferrer"><i className="ri-facebook-line social-icon"></i></a>
                <a href="mailto:angeladanelle13@gmail.com"><i className="ri-mail-line social-icon"></i></a>
            </div>
            <p className="copyright">Copyright © 2024 | All Rights Reserved<br />Developed by Maria Angela Danelle Bodino</p>
        </footer>
    );
};

export default Footer;
