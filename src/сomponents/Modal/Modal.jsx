import { createPortal } from "react-dom";
import { Component } from "react";
import PropTypes from "prop-types";
import LoaderSpin from "../Loader/Loader";
import { Overlay, Modalbox } from "../Style/styled";

const modalRoot = document.getElementById("modal-root");
export default class Modal extends Component {
  state = {
    loading: true,
  };
  toggleLoadind() {
    this.setState((prevState) => {
      return { loading: !prevState.loading };
    });
  }
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  handleOverlayClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  handleImageLoaded = () => {
    this.setState({ loading: false });
  };
  render() {
    const { src, alt } = this.props;
    return createPortal(
      <Overlay onClick={this.handleOverlayClick}>
        <Modalbox>
          <img
            src={src}
            alt={alt}
            onLoad={this.handleImageLoaded}
            style={{
              display: this.state.loading ? "none" : "block",
            }}
          ></img>
        </Modalbox>
        {this.state.loading && <LoaderSpin radius={350} />}
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
};
