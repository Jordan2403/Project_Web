// src/components/Home.tsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <header className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4">Bienvenido al sistema de Encuesta</h1>
          <p className="lead">
            Crea y responde encuestas de manera fácil y rápida
          </p>
          <Link to="/register" className="btn btn-lg btn-light mt-3">
            Regístrate
          </Link>
        </div>
      </header>
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Crea Encuestas</h5>
                  <p className="card-text">
                    Diseña encuestas personalizadas para obtener la información
                    que necesitas.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Responde Encuestas</h5>
                  <p className="card-text">
                    Participa en encuestas y ayuda a otros a recopilar datos
                    valiosos.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Analiza Resultados</h5>
                  <p className="card-text">
                    Revisa y analiza los resultados de tus encuestas de manera
                    detallada.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">Testimonios</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <p className="card-text">
                    "SurveyApp ha transformado la manera en que recopilamos
                    datos. Es fácil de usar y muy eficiente."
                  </p>
                  <p className="text-muted">- Juan Pérez</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <p className="card-text">
                    "Gracias a SurveyApp, hemos podido obtener información
                    valiosa de nuestros clientes rápidamente."
                  </p>
                  <p className="text-muted">- María García</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <p className="card-text">
                    "La mejor herramienta de encuestas que he utilizado.
                    Altamente recomendable."
                  </p>
                  <p className="text-muted">- Carlos López</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Contacto</h2>
          <div className="row">
            <div className="col-md-6">
              <h5>Dirección</h5>
              <p>123 Calle Principal, Ciudad, País</p>
            </div>
            <div className="col-md-6">
              <h5>Correo Electrónico</h5>
              <p>123@admin.com</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
