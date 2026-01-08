import  { type FC } from 'react'
import './Modal.scss'
import { useTranslation } from 'react-i18next'

interface IModal {
    closeModal: () => void;
    logout: () => void;
}

const Modal:FC<IModal> = ({ closeModal, logout }) => {
        const { t } = useTranslation()
  return (
    <>
        <div className="modal" onClick={() => closeModal()}>
            <div className="modal__block" onClick={(event) => event.stopPropagation()}>
                <h2 className="modal__block-title">{t('logout')}</h2>
                <div className="modal__block-buttons">
                    <button className="modal__block-button" onClick={() => logout()}>{t('yes')}</button>
                    <button className="modal__block-button" onClick={() => closeModal()}>{t('no')}</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Modal