import { Redirect, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LPStyles from './LoginPage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'

export const LoginPage = () => {
  const [formData, addFormData] = useState({
    email: '',
    password: ''
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
    <main className = {LPStyles.loginPage__main}>
      <div className = {LPStyles.loginPage__content}>
<h1 className={`${LPStyles.loginPage__title} mb-6 text_type_main-medium`}> Вход </h1>
<form className={`${LPStyles.loginPage__form} mb-20`}>
<Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={changeFormData}
            value={formData.email}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'} />
            <PasswordInput
            onChange={changeFormData}
            value={formData.password}
            name={'password'} />
            <Button type='primary' size='medium'>Войти</Button>
</form>
<div className={`${LPStyles.loginPage__buttons} mb-4 text_type_main-medium`}>
          <span className='text_type_main-default'>Вы — новый пользователь?</span>
          <Link to='/register' className={`${LPStyles.loginPage__link} ml-2 text_type_main-default`}>Зарегистрироваться</Link>
        </div>
        <div className={`${LPStyles.loginPage__buttons} text_type_main-medium`}>
          <span className='text_type_main-default'>Забыли пароль?</span>
          <Link to='/forgot-password' className={`${LPStyles.loginPage__link} ml-2 text_type_main-default`}>Восстановить пароль</Link>
        </div>
      </div>
    </main>
  )
}