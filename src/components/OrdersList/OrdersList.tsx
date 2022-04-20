import OLStyles from './OrdersList.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import { ImagesList } from "../ImagesList/ImagesList";
import {getStatus, getDate} from "../../utils/utils";
import {ingredientsSelector} from "../../services/slice/ingredients";
import { Link, useLocation } from 'react-router-dom';
import PropTypes from "prop-types";



export const OrdersList = ({order, idIngredients, page}) => {
  const location = useLocation()
  const { ingredients } = useSelector(ingredientsSelector)

  const searchIngredient = value => {
    // @ts-ignore
  return ingredients.filter(ingredient => ingredient._id === value);
}
const searchIngredientsImages = id => {
  return id.map(item => {
    const imagesList = searchIngredient(item);
    // @ts-ignore
    if (imagesList.length) {
      // @ts-ignore
      return imagesList[0].image;
    }
  });
}

const searchIngredientsPrice = id => {
  return id.map(item => {
    const priceList = searchIngredient(item);
    // @ts-ignore
    if (priceList.length) {
      // @ts-ignore
      return priceList[0].price;
    }
  });
}
const price = searchIngredientsPrice(idIngredients).reduce((acc, price) => acc + price, 0)

return (
  <>
    <Link className={OLStyles.ordersList__item} to={{ pathname: `/${page}/${order._id}`, state: { background: location } }}>
      <div className={OLStyles.ordersList__header}>
        <span className={`${OLStyles.ordersList__itemId} text_type_digits-default`}>#{order.number}</span>
        <time className={`${OLStyles.ordersList__itemDate} text text_color_inactive text_type_main-default`}>{getDate(order.createdAt)}</time>
      </div>
      <h2 className={'text text_type_main-medium'}>{order.name}</h2>
      {location.pathname.startsWith('/profile') &&
        <span className={'text text_type_main-small'}>{getStatus(order.status)}</span>
      }
      <div className={OLStyles.ordersList__itemDesc}>
        <ul className={OLStyles.ordersList__itemImages}>
            <ImagesList ingredientsImages={searchIngredientsImages(idIngredients)} />
        </ul>
        <div className={OLStyles.ordersList__itemPrice}>
          {price &&
          <span className={'text_type_digits-default'}>{price}</span>}
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>

  </>
)
}
