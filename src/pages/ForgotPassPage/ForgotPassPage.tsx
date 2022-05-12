import { Redirect, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import FPPStyles from "./ForgotPassPage.module.css";
import { useDispatch } from "react-redux";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  forgotPassRequest,
  authSelector,
  resetError,
} from "../../services/slice/authorisation";
import { useAppSelector } from "../../index";
import { FC, FormEvent } from "react";
import { IForgotPassword } from "../../services/types/data";
import { TLocationState } from "../../services/types/data";

export const ForgotPassPage: FC = () => {
  const [email, addEmail] = useState<IForgotPassword>({
    email: "",
  });
  const location = useLocation<TLocationState>();
  const dispatch = useDispatch();
  const { forgotPassReqSuccess, auth } = useAppSelector(authSelector);

  const sendForgotPassForm = (e: FormEvent) => {
    e.preventDefault();
    dispatch(forgotPassRequest(email));
  };
  const onChange = (e: { target: { name: string; value: string } }) => {
    addEmail({ ...email, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    dispatch(resetError());
  }, []);

  if (forgotPassReqSuccess) {
    return <Redirect to="/reset-password" />;
  }

  if (auth) {
    return (
      // @ts-ignore
      <Redirect to={location?.state?.from || "/"} />
    );
  }
  return (
    <main className={FPPStyles.forgotPassPage__main}>
      <div className={FPPStyles.forgotPassPage__content}>
        <h1
          className={`${FPPStyles.forgotPassPage__title} mb-6 text_type_main-medium`}
        >
          {" "}
          Восстановление пароля{" "}
        </h1>
        <form
          className={`${FPPStyles.forgotPassPage__form} mb-20`}
          onSubmit={sendForgotPassForm}
        >
          <Input
            type={"email"}
            placeholder={"Укажите Ваш e-mail"}
            onChange={onChange}
            value={email.email}
            name={"email"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
          <Button type="primary" size="medium">
            Восстановить
          </Button>
        </form>
        <div
          className={`${FPPStyles.forgotPassPage__buttons} mb-4 text_type_main-medium`}
        >
          <span className="text_type_main-default">Вспомнили пароль?</span>
          <Link
            to="/login"
            className={`${FPPStyles.forgotPassPage__link} ml-2 text_type_main-default`}
          >
            Войти
          </Link>
        </div>
      </div>
    </main>
  );
};
