import { Redirect, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import RPStyles from './RegisterPage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'

export const RegisterPage = () => {
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
    <main className = {RPStyles.registerPage__main}>
      <div className = {RPStyles.registerPage__content}>
<h1 className={`${RPStyles.registerPage__title} mb-6 text_type_main-medium`}> Регистрация </h1>
<form className={`${RPStyles.registerPage__form} mb-20`}>
<Input
            type={'text'}
            placeholder={'Имя'}
            onChange={changeFormData}
            value={formData.name}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'} />
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
            <Button type='primary' size='medium'>Зарегистрироваться</Button>
</form>
<div className={`${RPStyles.registerPage__buttons} mb-4 text_type_main-medium`}>
          <span className='text_type_main-default'>Уже зарегистрированы?</span>
          <Link to='/login' className={`${RPStyles.registerPage__link} ml-2 text_type_main-default`}>Войти</Link>
        </div>
</div>
</main>
  )
}