import React, { useState } from "react";
import "./ErrorModal.css";

function ErrorModal({ errorMessage, onClose }) {
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
    onClose();
  };

  return (
    showModal && (
      <div className="modal">
        <div className="modal-content">
          <div className="close-container">
            <span className="close" onClick={handleClose}>
              &times;
            </span>
          </div>
          <h1>Error</h1>
          <p>{errorMessage}</p>
        </div>
      </div>
    )
  );
}

export default ErrorModal;
