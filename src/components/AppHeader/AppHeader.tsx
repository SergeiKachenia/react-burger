import { FC } from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeaderStyles from "./AppHeader.module.css";
import { NavLink, Link, useLocation } from "react-router-dom";
import { TLocationState } from "../../services/types/data";

const AppHeader: FC = () => {
  const location = useLocation<TLocationState>();
  return (
    <header className={`${AppHeaderStyles.header} pt-4 pb-4`}>
      <div className={AppHeaderStyles.header__wrap}>
        <nav className={AppHeaderStyles.header__nav}>
          <ul className={AppHeaderStyles.list}>
            <li className={AppHeaderStyles.list__item}>
              <NavLink
                to={"/"}
                exact
                className={AppHeaderStyles.list__link}
                href={"#"}
                activeStyle={{ color: "#F2F2F3" }}
              >
                <BurgerIcon
                  type={location.pathname === "/" ? "primary" : "secondary"}
                />
                <span
                  className={`${AppHeaderStyles.list__title} ml-2 text text_type_main-default`}
                >
                  Конструктор
                </span>
              </NavLink>
            </li>
            <li className={AppHeaderStyles.list__item}>
              <NavLink
                to={"/feed"}
                exact
                className={AppHeaderStyles.list__link}
                href={"#"}
                activeStyle={{ color: "#F2F2F3" }}
              >
                <ListIcon
                  type={location.pathname === "/feed" ? "primary" : "secondary"}
                />
                <span
                  className={`${AppHeaderStyles.list__title} ml-2 text text_type_main-default`}
                >
                  Лента заказов
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <Link to={"/"} className={AppHeaderStyles.logo} href={"#"}>
          <Logo />
        </Link>
        <div className={AppHeaderStyles.account}>
          <NavLink
            to={"/profile"}
            exact
            className={AppHeaderStyles.list__link}
            href={"#"}
            activeStyle={{ color: "#F2F2F3" }}
          >
            <ProfileIcon
              type={
                location.pathname !== "/profile" &&
                location.pathname !== "/profile/orders"
                  ? "secondary"
                  : "primary"
              }
            />
            <span
              className={`${AppHeaderStyles.account__title} ml-2 text text_type_main-default`}
            >
              Личный кабинет
            </span>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
