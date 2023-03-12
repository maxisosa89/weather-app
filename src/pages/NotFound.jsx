import React from "react";
import { Link } from "react-router-dom";
import './NotFound.css'

function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 - Not Found</h1>
      <p className="not-found-message">
        Lo siento, la página que estás buscando no existe.
      </p>
      <Link to="/">
        <button className="not-found-link">Ir al Home</button>
      </Link>
    </div>
  );
}

export default NotFound;
