import  { useState, type FC } from 'react'
import LayoutForm from "../layouts/LayoutForm"
import { useForm } from "react-hook-form"
import CustomInput from "../components/UI/CustomInput"
import type { IRegister } from "../types"
import CustomButton from "../components/UI/CustomButton"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../api/common"
import { errorResponse } from "../utils/errorResponse"
import { useTranslation } from 'react-i18next'

const Register:FC = () => {
  
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [errorText, setErrorText] = useState('')
  const { mutateAsync } = registerUser()
  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors
    }
  } = useForm<IRegister>({ mode: 'onChange' })
  
  const password = watch('password')
  
  const submit = async (data: IRegister) => {
    console.log('data', data);
    try {
      await mutateAsync(data)
      setErrorText('')
      navigate('/login')
    } catch (error) {
      let text = errorResponse(error)
      setErrorText(text)
    }
  }
  
  return (
    <>
        <LayoutForm>
            <div className="layoutForm__block">
              <h2 className="layoutForm__block-title">{t('register_title')}</h2>
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
                  text={t('your_email')}
                  placeholder={t('email_placeholder')}
                  type="email"
                  error={errors.email}
                  register={register('email', {
                    required:t('required_field'),
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
                <CustomInput
                  text={t('confirm_password')}
                  placeholder={t('confirm_password')}
                  type="password"
                  error={errors.password2}
                  register={register('password2', {
                    required: t('required_field'),
                    validate: (value) =>  value == password || t('passwords_not_match'),
                    minLength: {
                      value: 8,
                      message: t('min_8_chars')
                    }
                  })}
                />
                <CustomButton
                  text={t('register_btn')}
                  width={248}
                  height={60}
                  center={true}
                />
              </form>
              <div className="layoutForm__block-info">
                {errorText && <p className="layoutForm__block-info-error">{errorText}</p> }
                <p className="layoutForm__block-info-text">{t('have_account')}?</p>
                <Link to="/login" className="layoutForm__block-info-link">{t('login_link')}</Link>
              </div>
            </div>
        </LayoutForm>
    </>
  )
}

export default Register