import PNFStyles from "./PageNotFound.module.css";
import { Link } from "react-router-dom";
import { FC } from "react";

export const PageNotFound: FC = () => {
  return (
    <div className={PNFStyles.pageNotFound__main}>
      <span className="text_type_main-large">404 - Страница не найдена</span>
      <Link
        to="/"
        className={`${PNFStyles.pageNotFound__link} ml-2 text_type_main-default`}
      >
        Вернуться на главную страницу
      </Link>
    </div>
  );
};
