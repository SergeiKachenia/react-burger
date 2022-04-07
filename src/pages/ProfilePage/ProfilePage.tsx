import { Redirect, NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import PPStyles from './ProfilePage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { resetError, logoutRequest, authSelector, getUserRequest, updateUserRequest } from '../../services/slice/authorisation'
export const ProfilePage = () => {
  const { error, userData, auth } = useSelector(authSelector)
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
  const logout = () => {
    dispatch(logoutRequest());

    }

  const resetUserInfo = e => {
    e.preventDefault()
    addFormData({
      name: userData.name,
      email: userData.email,
      password: userData.password
    })
  }

  const updateUserInfo = e => {
    e.preventDefault()
    // @ts-ignore
    dispatch(updateUserRequest(formData))
  }

  useEffect(() => {
    dispatch(getUserRequest())
    addFormData({
      name: userData.name,
      email: userData.email,
      password: userData.password
    })
  }, [userData])


  useEffect(() => {
    dispatch(resetError())
  }, [])


  if (!auth) {
    return (
          // @ts-ignore
      <Redirect to={location?.state?.from || '/login' } />
    )
  }

  return (
    <main className={PPStyles.profilePage__main}>
      <section className={PPStyles.profilePage__navMenu}>
      <NavLink
      to='/profile' exact={true}
      className={`${PPStyles.profilePage__link} text text_type_main-medium`}
      activeStyle={{ color: '#F2F2F3' }}>
        Профиль
      </NavLink>
      <NavLink
      to='/profile/orders' exact={true}
      className={`${PPStyles.profilePage__link} text text_type_main-medium`}
      activeStyle={{ color: '#F2F2F3' }}>
        История заказов
      </NavLink>
      <NavLink
      to= {auth? '/profile': '/login'} exact={true}
      className={`${PPStyles.profilePage__link} text text_type_main-medium`}
      activeStyle={{ color: '#F2F2F3' }} onClick={logout}>
        Выход
      </NavLink>
      <span className={`${PPStyles.profilePage__text} text text_type_main-default text_color_inactive mt-20`} >
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
        { error && <span className={`${PPStyles.error} text text_type_main-medium mb-4`}>{error}</span> }
        <div className={PPStyles.profilePage__buttons}>
        <Button type={"primary"} size={"medium"} onClick={updateUserInfo}>Сохранить</Button>
        <Button type={"secondary"} size={"medium"} onClick={resetUserInfo}>Отмена</Button>
      </div>
      </form>
      </section>
    </main>
  )
}