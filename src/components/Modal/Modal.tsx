import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ModalStyles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export function Modal(props: any) {
  const modals = document.getElementById("react-modals")!;

  useEffect(() => {
    const closeByEsc = (event: any) => {
      if (event.key === "Escape") {
        props.onClose();
      }
    };
    window.addEventListener("keydown", closeByEsc);

    return () => {
      window.removeEventListener("keydown", closeByEsc);
    };
  }, []);

  return createPortal(
    <>
      <ModalOverlay onClose={props.onClose} />
      <div className={`${ModalStyles.popup} pt-10 pl-10 pr-10 pb-15`}>
        <div>
          <div
            className={`${ModalStyles.popup__header} text text_type_main-large mb-4`}
          >
            <span>{props.title}</span>
            <span
              className={ModalStyles.popup__closeicon}
              onClick={() => {
                props.onClose(false);
              }}
            >
              <CloseIcon type="primary" />
            </span>
          </div>
          <div className={ModalStyles.popup__content}>{props.children}</div>
        </div>
      </div>
    </>,
    modals
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
