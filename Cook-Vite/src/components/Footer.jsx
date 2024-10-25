import React from 'react';
import '../styles/Footer.css'; // Make sure to create a corresponding CSS file for styling

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2024 Cookbook Connect. All rights reserved.</p>
                <p>Use at your own risk, Cookbook Connect and associated partners are not</p>
                <p>liable for any damages or losses incurred while using this service.</p>
                <p>Please read Disney+ Terms of Service for further examples.</p>
            </div>
        </footer>
    );
};

export default Footer;