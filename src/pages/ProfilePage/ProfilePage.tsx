import { Redirect, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import PPStyles from './ProfilePage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'

export const ProfilePage = () => {
  const [formData, addFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const location = useLocation()
  const dispatch = useDispatch()
  const changeFormData = e => {
    addFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  return (
    <main className={PPStyles.profilePage__main}>
      <section className={PPStyles.profilePage__navMenu}>
      <NavLink
      to='/profile' exact
      className={`${PPStyles.profilePage__link} text text_type_main-medium text_color_inactive`}
      activeStyle={{ color: '#F2F2F3' }}>
        Профиль
      </NavLink>
      <NavLink
      to='/profile/orders' exact
      className={`${PPStyles.profilePage__link} text text_type_main-medium text_color_inactive`}
      activeStyle={{ color: '#F2F2F3' }}>
        История заказов
      </NavLink>
      <NavLink
      to='/login' exact
      className={`${PPStyles.profilePage__link} text text_type_main-medium text_color_inactive`}
      activeStyle={{ color: '#F2F2F3' }}>
        Выход
      </NavLink>
      <span className={`${PPStyles.profilePage__text} text text_type_main-default text_color_inactive mt-20`}>
      В этом разделе вы можете
      изменить свои персональные данные</span>
      </section>
      <section className={PPStyles.profilePage__profileInfo}>
      <form className={`${PPStyles.profilePage__form} input_size_default`} onFocus={null}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={changeFormData}

          icon={'EditIcon'}
          value={formData.name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Input
          type={'email'}
          name={'email'}

          placeholder={'E-mail'}
          onChange={changeFormData}
          icon={'EditIcon'}
          value={formData.email}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Input
          type={'password'}
          name={'password'}

          placeholder={'Пароль'}
          onChange={changeFormData}
          icon={'EditIcon'}
          value={formData.password}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <div className={PPStyles.profilePage__buttons}>
        <Button type={"primary"} size={"medium"}>Сохранить</Button>
        <Button type={"secondary"} size={"medium"}>Отмена</Button>
      </div>
      </form>
      </section>
    </main>
  )
}