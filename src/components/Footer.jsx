import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa"; // Importing icons

const Footer = () => {
  // Scroll to Top Function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Policies Section */}
        <div className="footer-section">
          <h3>Policies</h3>
          <a href="/terms">Terms and conditions</a>
          <a href="/privacy">Privacy policy</a>
          <a href="/accessibility">Accessibility</a>
        </div>

        {/* Follow Us Section */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="social-icon" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="social-icon" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="social-icon" />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="social-icon" />
            </a>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="footer-section footer-contact">
          <h3>Contact Us</h3>
          <p>6/A Suncity, Pune</p>
          <p>+91 9022230064</p>
          <a href="tel:+919022230064">
            <button className="contact-button">Contact us</button>
          </a>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button className="scroll-to-top" onClick={scrollToTop}>
        ↑
      </button>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2025 Your Website. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
