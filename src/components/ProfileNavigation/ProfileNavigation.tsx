import PNStyles from "./ProfileNavigation.module.css";
import { Redirect, NavLink, useLocation } from "react-router-dom";
import { logoutRequest } from "../../services/slice/authorisation";
import { useAppDispatch } from "../../index";
import { FC } from "react";
import { TLocationState } from "../../services/types/data";

export const ProfileNavigation: FC = () => {
  const location = useLocation<TLocationState>();
  const dispatch = useAppDispatch();
  const logout = () => {
    if (location.pathname === "/login") {
      dispatch(logoutRequest());
    } else {
      <Redirect to="/login" />;
      dispatch(logoutRequest());
    }
  };
  const content =
    location.pathname === "/profile/orders"
      ? "В этом разделе вы можете просмотреть свою историю заказов"
      : "В этом разделе вы можете изменить свои персональные данные";

  return (
    <section className={PNStyles.profileNavigation__navMenu}>
      <NavLink
        to="/profile"
        exact={true}
        className={`${PNStyles.profileNavigation__link} text text_type_main-medium`}
        activeStyle={{ color: "#F2F2F3" }}
      >
        Профиль
      </NavLink>
      <NavLink
        to="/profile/orders"
        exact={true}
        className={`${PNStyles.profileNavigation__link} text text_type_main-medium`}
        activeStyle={{ color: "#F2F2F3" }}
      >
        История заказов
      </NavLink>
      <button
        className={`${PNStyles.profileNavigation__button} text text_type_main-medium`}
        onClick={logout}
      >
        Выход
      </button>
      <span
        className={`${PNStyles.profileNavigation__text} text text_type_main-default text_color_inactive mt-20`}
      >
        {content}
      </span>
    </section>
  );
};
