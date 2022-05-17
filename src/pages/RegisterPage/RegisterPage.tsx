import { Redirect, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import RPStyles from "./RegisterPage.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  registerRequest,
  authSelector,
  resetError,
} from "../../services/slice/authorisation";
import { useAppSelector, useAppDispatch } from "../../index";
import { IUserRegistration } from "../../services/types/data";
import { FC, FormEvent } from "react";
import { TLocationState } from "../../services/types/data";

export const RegisterPage: FC = () => {
  const [formData, addFormData] = useState<IUserRegistration>({
    email: "",
    password: "",
    name: "",
  });

  const location = useLocation<TLocationState>();
  const dispatch = useAppDispatch();
  const { error, auth } = useAppSelector(authSelector);

  const changeFormData = (e: { target: { name: string; value: string } }) => {
    addFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    dispatch(resetError());
  }, []);

  const sendRegistrationForm = (e: FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(registerRequest(formData));
  };

  if (auth) {
    return (
      // @ts-ignore
      <Redirect to={location?.state?.from || "/"} />
    );
  }

  return (
    <main className={RPStyles.registerPage__main}>
      <div className={RPStyles.registerPage__content}>
        <h1
          className={`${RPStyles.registerPage__title} mb-6 text_type_main-medium`}
        >
          {" "}
          Регистрация{" "}
        </h1>
        <form
          className={`${RPStyles.registerPage__form} mb-20`}
          onSubmit={sendRegistrationForm}
        >
          <Input
            type={"text"}
            placeholder={"Ваше имя"}
            onChange={changeFormData}
            value={formData.name}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
          <Input
            type={"email"}
            placeholder={"E-mail"}
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
              className={`${RPStyles.error} text text_type_main-medium mb-4`}
            >
              {error}
            </span>
          )}
          <Button type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </form>
        <div
          className={`${RPStyles.registerPage__buttons} mb-4 text_type_main-medium`}
        >
          <span className="text_type_main-default">Уже зарегистрированы?</span>
          <Link
            to="/login"
            className={`${RPStyles.registerPage__link} ml-2 text_type_main-default`}
          >
            Войти
          </Link>
        </div>
      </div>
    </main>
  );
};
