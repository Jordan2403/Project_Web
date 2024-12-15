// src/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-3">
            <h5>Redes Sociales</h5>
            <a href="https://facebook.com" className="text-white me-3">
              <i className="fab fa-facebook"></i> Facebook
            </a>
            <a href="https://twitter.com" className="text-white me-3">
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <a href="https://instagram.com" className="text-white">
              <i className="fab fa-instagram"></i> Instagram
            </a>
          </div>
          <div className="col-md-6 mb-3">
            <h5>Contacto</h5>
            <p>Email: e123456789@live.edu.ec.com</p>
            <p>Teléfono: +593 456 7890</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
