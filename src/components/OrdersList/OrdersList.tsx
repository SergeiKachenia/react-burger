import OLStyles from "./OrdersList.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../index";
import { ImagesList } from "../ImagesList/ImagesList";
import { getStatus, getDate } from "../../utils/utils";
import { ingredientsSelector } from "../../services/slice/ingredients";
import { Link, useLocation } from "react-router-dom";
import { FC } from "react";
import { TOrder } from "../../services/types/data";
import { TLocationState} from "../../services/types/data";
import {TIngredient } from "../../services/types/data"
interface IOrdersListProps {
  order: TOrder;
  idIngredients: string[];
  page: string;
}

export const OrdersList: FC<IOrdersListProps> = ({
  order,
  idIngredients,
  page
}) => {
  const location = useLocation<TLocationState>();
  const { ingredients } = useAppSelector(ingredientsSelector);

  const searchIngredient = (value: string) => {
    const ingrID =  ingredients.filter((ingredient) => ingredient._id === value);
    return ingrID;
  };
  const searchIngredientsImages = (id: TIngredient['_id'][]) => {
    return id.map((item: string) => {
      const imagesList = searchIngredient(item);
      if (imagesList.length) {
        return imagesList[0].image;
      }
    });
  };

  const searchIngredientsPrice = (id: TIngredient['_id'][]) => {
    return id.map((item: string) => {
      const priceList = searchIngredient(item);
      if (priceList.length) {
        return priceList[0].price;
      }
    });
  };
  const price = searchIngredientsPrice(idIngredients).reduce(
    (acc: number, price: number) => acc + price,
    0
  );

  return (
    <>
      <Link
        className={OLStyles.ordersList__item}
        to={{
          pathname: `${page}/${order._id}`,
          state: { background: location },
        }}
      >
        <div className={OLStyles.ordersList__header}>
          <span
            className={`${OLStyles.ordersList__itemId} text_type_digits-default`}
          >
            #{order.number}
          </span>
          <time
            className={`${OLStyles.ordersList__itemDate} text text_color_inactive text_type_main-default`}
          >
            {getDate(order.createdAt)}
          </time>
        </div>
        <h2 className={"text text_type_main-medium"}>{order.name}</h2>
        {location.pathname.startsWith("/profile") && (
          <span className={"text text_type_main-small"}>
            {getStatus(order.status)}
          </span>
        )}
        <div className={OLStyles.ordersList__itemDesc}>
          <ul className={OLStyles.ordersList__itemImages}>
            <ImagesList
              ingredientsImages={searchIngredientsImages(idIngredients)}
            />
          </ul>
          <div className={OLStyles.ordersList__itemPrice}>
            {price && (
              <span className={"text_type_digits-default"}>{price}</span>
            )}
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>
    </>
  );
};
