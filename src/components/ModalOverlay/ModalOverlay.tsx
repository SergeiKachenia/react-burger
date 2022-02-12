import React from "react";
import { burgerIngredientsPropTypes, AppProps } from "../../utils/types";
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
