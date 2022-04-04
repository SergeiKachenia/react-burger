import { Redirect, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import RPPStyles from './ResetPassPage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'

export const ResetPassPage = () => {
  const [formData, addFormData] = useState({
    password: '',
    token: ''
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
    <main className = {RPPStyles.resetPassPage__main}>
      <div className = {RPPStyles.resetPassPage__content}>
<h1 className={`${RPPStyles.resetPassPage__title} mb-6 text_type_main-medium`}> Восстановление пароля </h1>
<form className={`${RPPStyles.resetPassPage__form} mb-20`}>
            <PasswordInput
            onChange={changeFormData}
            value={formData.password}
            name={'password'} />
            <Input
            type={'text'}
            placeholder={'E-mail'}
            onChange={changeFormData}
            value={formData.token}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'} />
            <Button type='primary' size='medium'>Сохранить</Button>
</form>
        <div className={`${RPPStyles.resetPassPage__buttons} text_type_main-medium`}>
          <span className='text_type_main-default'>Вспомнили пароль?</span>
          <Link to='/login' className={`${RPPStyles.resetPassPage__link} ml-2 text_type_main-default`}>Войти</Link>
        </div>
      </div>
    </main>
  )
}