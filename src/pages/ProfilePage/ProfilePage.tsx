import { useState, useEffect } from "react";
import PPStyles from "./ProfilePage.module.css";
import { useDispatch } from "react-redux";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  resetError,
  authSelector,
  getUserRequest,
  updateUserRequest,
} from "../../services/slice/authorisation";
import { ProfileNavigation } from "../../components/ProfileNavigation/ProfileNavigation";
import { useAppSelector } from "../../index";
import { IUserRegistration } from "../../services/types/data";
import { FC, FormEvent } from "react";

export const ProfilePage: FC = () => {
  const { error, userData } = useAppSelector(authSelector);
  const [formData, addFormData] = useState<IUserRegistration>({
    email: "",
    password: "",
    name: "",
  });
  const dispatch = useDispatch();
  const changeFormData = (e: { target: { name: string; value: string } }) => {
    addFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetUserInfo = (e: FormEvent) => {
    e.preventDefault();
    addFormData({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });
  };

  const updateUserInfo = (e: FormEvent) => {
    e.preventDefault();
    dispatch(updateUserRequest(formData));
  };

  useEffect(() => {
    dispatch(getUserRequest());
    addFormData({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });
  }, [userData]);

  useEffect(() => {
    dispatch(resetError());
  }, []);

  return (
    <main className={PPStyles.profilePage__main}>
      <ProfileNavigation />
      <section className={PPStyles.profilePage__profileInfo}>
        <form
          className={`${PPStyles.profilePage__form} input_size_default`}
          onFocus={null}
        >
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={changeFormData}
            icon={"EditIcon"}
            value={formData.name}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
          <Input
            type={"email"}
            name={"email"}
            placeholder={"E-mail"}
            onChange={changeFormData}
            icon={"EditIcon"}
            value={formData.email}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
          <Input
            type={"password"}
            name={"password"}
            placeholder={"Пароль"}
            onChange={changeFormData}
            icon={"EditIcon"}
            value={formData.password}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
          {error && (
            <span
              className={`${PPStyles.error} text text_type_main-medium mb-4`}
            >
              {error}
            </span>
          )}
          <div className={PPStyles.profilePage__buttons}>
            <Button type={"primary"} size={"medium"} onClick={updateUserInfo}>
              Сохранить
            </Button>
            <Button type={"secondary"} size={"medium"} onClick={resetUserInfo}>
              Отмена
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
};
