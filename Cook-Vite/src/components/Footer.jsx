import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {currentYear} Cookbook Connect. All rights reserved.</p>
        <p>Use at your own risk, Cookbook Connect and associated partners are not</p>
        <p>liable for any damages or losses incurred while using this service.</p>
        <p>Please read our Terms of Service for more information.</p>
      </div>
    </footer>
  );
};

export default Footer;