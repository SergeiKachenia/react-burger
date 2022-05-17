import { FC } from "react";
import OverlayStyles from "./ModalOverlay.module.css";

const ModalOverlay: FC<{ readonly onClose: (a: boolean) => void }> = (
  props
) => {
  return (
    <div
      className={OverlayStyles.overlay}
      onClick={() => {
        props.onClose(false);
      }}
    ></div>
  );
};

export default ModalOverlay;
