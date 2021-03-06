import { Redirect, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import RPPStyles from "./ResetPassPage.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  resetError,
  resetPassRequest,
  authSelector,
} from "../../services/slice/authorisation";
import { useAppSelector, useAppDispatch } from "../../index";
import { IResetPassword, TLocationState } from "../../services/types/data";
import { FC, FormEvent } from "react";

export const ResetPassPage: FC = () => {
  const [formData, addFormData] = useState<IResetPassword>({
    password: "",
    token: "",
  });
  const location = useLocation<TLocationState>();
  const dispatch = useAppDispatch();
  const { resetPassReqSuccess, error, auth, forgotPassReqSuccess } =
    useAppSelector(authSelector);

  const changeFormData = (e: { target: { name: string; value: string } }) => {
    addFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(resetError());
  }, []);

  const sendResetPassForm = (e: FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(resetPassRequest(formData));
  };

  if (!forgotPassReqSuccess) {
    return <Redirect to="/forgot-password" />;
  }

  if (resetPassReqSuccess) {
    return <Redirect to="/login" />;
  }

  if (auth) {
    return (
      // @ts-ignore
      <Redirect to={location?.state?.from || "/"} />
    );
  }

  return (
    <main className={RPPStyles.resetPassPage__main}>
      <div className={RPPStyles.resetPassPage__content}>
        <h1
          className={`${RPPStyles.resetPassPage__title} mb-6 text_type_main-medium`}
        >
          {" "}
          Восстановление пароля{" "}
        </h1>
        <form
          className={`${RPPStyles.resetPassPage__form} mb-20`}
          onSubmit={sendResetPassForm}
        >
          <PasswordInput
            onChange={changeFormData}
            value={formData.password}
            name={"password"}
          />
          <Input
            type={"text"}
            placeholder={"Введите код, присланный на электронную почту"}
            onChange={changeFormData}
            value={formData.token}
            name={"token"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
          {error && (
            <span
              className={`${RPPStyles.error} text text_type_main-medium mb-4`}
            >
              {error}
            </span>
          )}
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </form>
        <div
          className={`${RPPStyles.resetPassPage__buttons} text_type_main-medium`}
        >
          <span className="text_type_main-default">Вспомнили пароль?</span>
          <Link
            to="/login"
            className={`${RPPStyles.resetPassPage__link} ml-2 text_type_main-default`}
          >
            Войти
          </Link>
        </div>
      </div>
    </main>
  );
};
