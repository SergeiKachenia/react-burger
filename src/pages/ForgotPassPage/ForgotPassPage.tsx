import { Redirect, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import FPPStyles from './ForgotPassPage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input} from '@ya.praktikum/react-developer-burger-ui-components'
import { forgotPassRequest, authSelector, resetError } from '../../services/slice/authorisation'

export const ForgotPassPage = () => {
  const [email, addEmail] = useState('')
    const location = useLocation()
    const dispatch = useDispatch()
    const { forgotPassReqSuccess, auth } = useSelector(authSelector)

    const sendForgotPassForm = e => {
      e.preventDefault()
      dispatch(forgotPassRequest(email))
    }

    useEffect(() => {
      dispatch(resetError())
    }, [])

    if (forgotPassReqSuccess) {
      return (
        <Redirect to='/reset-password' />
      )
    }

    if (!forgotPassReqSuccess) {
      return (
        <Redirect to='/' />
      )
    }

    if (auth) {
      return (
        // @ts-ignore
        <Redirect to={location?.state?.from || '/' } />
      )
    }
    return (
      <main className = {FPPStyles.forgotPassPage__main}>
        <div className = {FPPStyles.forgotPassPage__content}>
  <h1 className={`${FPPStyles.forgotPassPage__title} mb-6 text_type_main-medium`}> Восстановление пароля </h1>
  <form className={`${FPPStyles.forgotPassPage__form} mb-20`} onSubmit={sendForgotPassForm}>
              <Input
              type={'email'}
              placeholder={'Укажите Ваш e-mail'}
              onChange={e => addEmail(e.target.value)}
              value={email}
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
