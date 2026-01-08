import  { useState, type FC } from 'react'
import LayoutForm from "../layouts/LayoutForm"
import { useForm } from "react-hook-form"
import CustomInput from "../components/UI/CustomInput"
import type { ILogin } from "../types"
import CustomButton from "../components/UI/CustomButton"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../api/common"
import { errorResponse } from "../utils/errorResponse"
import { useTranslation } from 'react-i18next'

const Login:FC = () => {
  
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [errorText, setErrorText] = useState('')
  const { mutateAsync } = loginUser()
  
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<ILogin>({ mode: 'onChange' })
  
  
  const submit = async (data: ILogin) => {
    console.log('data', data);
    try {
      await mutateAsync(data)
      setErrorText('')
      navigate('/')
    } catch (error) {
      let text = errorResponse(error, 'login')
      setErrorText(text)
    }
  }
  
  return (
    <>
        <LayoutForm>
            <div className="layoutForm__block">
              <h2 className="layoutForm__block-title">{t('login_title')}</h2>
              <form onSubmit={handleSubmit(submit)}  className="layoutForm__block-form">
                <CustomInput
                  text={t('your_login')}
                  placeholder={t('login_placeholder')}
                  type="text"
                  error={errors.username}
                  register={register('username', {
                    required: t('required_field'),
                    minLength: {
                      value: 6,
                      message: t('min_6_chars')
                    }
                  })}
                />
                <CustomInput
                  text={t('your_password')}
                  placeholder={t('your_password')}
                  type="password"
                  error={errors.password}
                  register={register('password', {
                    required: t('required_field'),
                    minLength: {
                      value: 8,
                      message: t('min_8_chars')
                    }
                  })}
                />
                <CustomButton
                  text={t('login_btn')}
                  width={248}
                  height={60}
                  center={true}
                />
              </form>
              <div className="layoutForm__block-info">
                {errorText && <p className="layoutForm__block-info-error">{errorText}</p> }
                <p className="layoutForm__block-info-text">{t('no_account')}? </p>
                <Link to="/register" className="layoutForm__block-info-link">{t('register_link')}</Link>
              </div>
            </div>
        </LayoutForm>
    </>
  )
}

export default Login