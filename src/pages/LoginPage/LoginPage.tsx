import { Redirect, Link, useLocation } from "react-router-dom";
import { useState, useEffect, FormEvent, FC } from "react";
import LPStyles from "./LoginPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  authSelector,
  resetError,
  loginRequest,
  resetForgotPassReqSuccess,
  resetResetPassReqSuccess,
} from "../../services/slice/authorisation";
import { IUserLogin } from "../../services/types/data";
import { TLocationState } from "../../services/types/data";

export const LoginPage: FC = () => {
  const [formData, addFormData] = useState<IUserLogin>({
    email: "",
    password: "",
  });

  const { error, auth } = useSelector(authSelector);
  const location = useLocation<TLocationState>();
  const dispatch = useDispatch();

  const changeFormData = (e: { target: { name: string; value: string } }) => {
    addFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(resetError());
    dispatch(resetResetPassReqSuccess());
    dispatch(resetForgotPassReqSuccess());
  }, []);

  const sendLoginForm = (e: FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(loginRequest(formData));
  };

  if (auth) {
    return (
      // @ts-ignore
      <Redirect to={location?.state?.from || "/"} />
    );
  }

  return (
    <main className={LPStyles.loginPage__main}>
      <div className={LPStyles.loginPage__content}>
        <h1
          className={`${LPStyles.loginPage__title} mb-6 text_type_main-medium`}
        >
          {" "}
          Вход{" "}
        </h1>
        <form
          className={`${LPStyles.loginPage__form} mb-20`}
          onSubmit={sendLoginForm}
        >
          <Input
            type={"email"}
            placeholder={"Ваш e-mail"}
            onChange={changeFormData}
            value={formData.email}
            name={"email"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
          <PasswordInput
            onChange={changeFormData}
            value={formData.password}
            name={"password"}
          />
          {error && (
            <span
              className={`${LPStyles.error} text text_type_main-medium mb-4`}
            >
              {error}
            </span>
          )}
          <Button type="primary" size="medium">
            Войти
          </Button>
        </form>
        <div
          className={`${LPStyles.loginPage__buttons} mb-4 text_type_main-medium`}
        >
          <span className="text_type_main-default">
            Вы — новый пользователь?
          </span>
          <Link
            to="/register"
            className={`${LPStyles.loginPage__link} ml-2 text_type_main-default`}
          >
            Зарегистрироваться
          </Link>
        </div>
        <div className={`${LPStyles.loginPage__buttons} text_type_main-medium`}>
          <span className="text_type_main-default">Забыли пароль?</span>
          <Link
            to="/forgot-password"
            className={`${LPStyles.loginPage__link} ml-2 text_type_main-default`}
          >
            Восстановить пароль
          </Link>
        </div>
      </div>
    </main>
  );
};
