import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeaderStyles from "./AppHeader.module.css";

function AppHeader() {
  return (
    <header className={`${AppHeaderStyles.header} pt-4 pb-4`}>
      <div className={AppHeaderStyles.header__wrap}>
        <nav className={AppHeaderStyles.header__nav}>
          <ul className={AppHeaderStyles.list}>
            <li className={AppHeaderStyles.list__item}>
              <a className={AppHeaderStyles.list__link} href={"#"}>
                <BurgerIcon type="primary" />
                <span
                  className={`${AppHeaderStyles.list__title} ml-2 text text_type_main-default`}
                >
                  Конструктор
                </span>
              </a>
            </li>
            <li className={AppHeaderStyles.list__item}>
              <a className={AppHeaderStyles.list__link} href={"#"}>
                <ListIcon type="secondary" />
                <span
                  className={`${AppHeaderStyles.list__title} ml-2 text text_type_main-default text_color_inactive`}
                >
                  Лента заказов
                </span>
              </a>
            </li>
          </ul>
        </nav>
        <a className={AppHeaderStyles.logo} href={"#"}>
          {" "}
          <Logo />{" "}
        </a>
        <div className={AppHeaderStyles.account}>
          <a className={AppHeaderStyles.account__link} href={"#"}>
            <ProfileIcon type="secondary" />
            <span
              className={`${AppHeaderStyles.account__title} ml-2 text text_type_main-default text_color_inactive`}
            >
              Личный кабинет
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
