import { type FC } from 'react'
import './ProductById.scss'
import { Link, useParams } from "react-router-dom"
import { arrowIcon, cart, starIcon } from "../../utils/img"
import CustomButton from "../UI/CustomButton"
import { getProductById } from "../../api/common"
import Skeleton from "./Skeleton"
import { cartStore } from "../../store/cartStore"
import { toast } from "react-toastify"
import { useTranslation } from 'react-i18next'

const ProductById:FC = () => {
    
    const { t } = useTranslation()
    const params = useParams()
    
    const { data } = getProductById(+params.id!)
    const { addToCart } = cartStore()
    
    const addToCartHandler = () => {
        addToCart(data)
        toast.success(t('added_to_cart'), {
            position: 'bottom-right',
            autoClose: 2000
        })
    }
    
  return (
    <>
        {data ?  (
                <div className="product">
                    <div className="product__top">
                        <Link to="/" className="product__top-link">
                            <img src={arrowIcon} alt="" />
                        </Link>
                        <CustomButton
                            text={t('add_to_cart')}
                            height={43}
                            width={143}
                            img={cart}
                            gap={14}
                            click={addToCartHandler}
                        />
                    </div>
                    <div className="product__item">
                        <div className="product__item-left">
                            <img src={data.image} alt="" className="product__item-left-img" />
                        </div>
                        <div className="product__item-right">
                            <div className="product__item-right-top">
                                <h2 className="product__item-right-title">{data.title}</h2>
                                <p className="product__item-right-text">{data.description}</p>
                            </div>
                            <div className="product__item-right-bottom">
                                <div className="product__item-right-price">
                                    <p className="product__item-right-price-text">{t('price')}</p>
                                    <p className="product__item-right-price-value">{data.price}$</p>
                                </div>
                                <div className="product__item-right-rating">
                                    <p className="product__item-right-rating-text">{t('rating')}</p>
                                    <p className="product__item-right-rating-value">
                                        {data.rating}
                                        <img src={starIcon} alt="" />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        ) : <Skeleton/>}

    </>
  )
}

export default ProductById