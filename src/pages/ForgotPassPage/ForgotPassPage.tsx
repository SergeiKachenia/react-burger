import { Redirect, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import FPPStyles from './ForgotPassPage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input} from '@ya.praktikum/react-developer-burger-ui-components'


export const ForgotPassPage = () => {
    const [formData, addFormData] = useState({
      email: '',
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
      <main className = {FPPStyles.forgotPassPage__main}>
        <div className = {FPPStyles.forgotPassPage__content}>
  <h1 className={`${FPPStyles.forgotPassPage__title} mb-6 text_type_main-medium`}> Восстановление пароля </h1>
  <form className={`${FPPStyles.forgotPassPage__form} mb-20`}>
              <Input
              type={'email'}
              placeholder={'E-mail'}
              onChange={changeFormData}
              value={formData.email}
              name={'email'}
              error={false}
              errorText={'Ошибка'}
              size={'default'} />
              <Button type='primary' size='medium'>Восстановить</Button>
  </form>
  <div className={`${FPPStyles.forgotPassPage__buttons} mb-4 text_type_main-medium`}>
            <span className='text_type_main-default'>Вспомнили пароль?</span>
            <Link to='/login' className={`${FPPStyles.forgotPassPage__link} ml-2 text_type_main-default`}>Войти</Link>
          </div>
  </div>
  </main>
    )
  }
