import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeaderStyles from "./AppHeader.module.css";
import { NavLink, Link } from 'react-router-dom'

function AppHeader() {
  return (
    <header className={`${AppHeaderStyles.header} pt-4 pb-4`}>
      <div className={AppHeaderStyles.header__wrap}>
        <nav className={AppHeaderStyles.header__nav}>
          <ul className={AppHeaderStyles.list}>
            <li className={AppHeaderStyles.list__item}>
              <NavLink to={"/"} className={AppHeaderStyles.list__link} href={"#"}>
                <BurgerIcon type="primary" />
                <span
                  className={`${AppHeaderStyles.list__title} ml-2 text text_type_main-default`}
                >
                  Конструктор
                </span>
              </NavLink>
            </li>
            <li className={AppHeaderStyles.list__item}>
              <NavLink to={"/feed"} className={AppHeaderStyles.list__link} href={"#"}>
                <ListIcon type="secondary" />
                <span
                  className={`${AppHeaderStyles.list__title} ml-2 text text_type_main-default text_color_inactive`}
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
          <NavLink to={"/profile"} className={AppHeaderStyles.account__link} href={"#"}>
            <ProfileIcon type="secondary" />
            <span
              className={`${AppHeaderStyles.account__title} ml-2 text text_type_main-default text_color_inactive`}
            >
              Личный кабинет
            </span>
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
