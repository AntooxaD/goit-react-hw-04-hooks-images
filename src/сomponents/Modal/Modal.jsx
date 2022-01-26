import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import LoaderSpin from "../Loader/Loader";
import { Overlay, Modalbox } from "../Style/styled";

const modalRoot = document.getElementById("modal-root");

export default function Modal({ src, alt, onClose }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  const handleImageLoaded = () => {
    setLoading(!loading);
  };

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <Modalbox>
        <img
          src={src}
          alt={alt}
          onLoad={handleImageLoaded}
          style={{
            display: loading ? "none" : "block",
          }}
        ></img>
      </Modalbox>
      {loading && <LoaderSpin radius={350} />}
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
};
