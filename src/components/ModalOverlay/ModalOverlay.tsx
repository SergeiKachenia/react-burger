import React from "react";
import PropTypes from "prop-types";
import OverlayStyles from "./ModalOverlay.module.css";

function ModalOverlay(props: any) {
  return (
    <div
      className={OverlayStyles.overlay}
      onClick={() => {
        props.onClose(false);
      }}
    ></div>
  );
}

export default ModalOverlay;

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};
