import OIPStyles from "./OrderItemPage.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { ingredientsSelector } from "../../services/slice/ingredients";
import { useParams } from "react-router-dom";
import { getStatus, getDate } from "../../utils/utils";
import { useEffect, useMemo } from "react";
import { authSelector } from "../../services/slice/authorisation";
import { wsSelector } from "../../services/slice/websocket";
import { useWebSocket } from "../../hooks/wsHook";
import { getCookie } from "../../utils/cookies";
import {
  getTokenRequest,
  getUserRequest,
} from "../../services/slice/authorisation";

export const OrderItemPage = () => {
  useWebSocket();
  const dispatch = useDispatch();
  const { ingredients } = useSelector(ingredientsSelector);
  const { auth } = useSelector(authSelector);
  useEffect(() => {
    if (
      getCookie("refreshToken") != null &&
      getCookie("accessToken") === null
    ) {
      // @ts-ignore
      dispatch(getTokenRequest()).then(() => getUserRequest())
    }
  }, []);
  //@ts-ignore
  const { id } = useParams();

  const { feedOrders } = useSelector(wsSelector);

  const orders = (feedOrders) =>
    feedOrders ? feedOrders.find((item) => item._id === id) : null;
  const order = orders(feedOrders);

  function useOrderIngredients(order) {
    const { newIngredients, total } = useMemo(() => {
      if (order) {
        return order.ingredients.reduce(
          (acc, orderIngredient) => {
            const newIngredient = acc.newIngredients.find(
              (item) => item.ingredient._id === orderIngredient
            );
            if (!newIngredient) {
              // @ts-ignore
              const ingredient = ingredients.find(
                (item) => item._id === orderIngredient
              );
              if (ingredient) {
                acc.newIngredients.push({ ingredient, count: 1 });
                // @ts-ignore
                acc.total += ingredient.price;
              }
            } else {
              newIngredient.count += 1;
              acc.total += newIngredient.ingredient.price;
            }
            return acc;
          },
          { newIngredients: [], total: 0 }
        );
      } else {
        return { newIngredients: [], total: 0 };
      }
    }, [order, ingredients]);

    return { newIngredients, total };
  }

  const newIngredient = useOrderIngredients(order);

  return (
    <>
      {feedOrders.length > 0 && ingredients.length > 0 && (
        <div className={OIPStyles.wrap}>
          {order && (
            <>
              <section className={`${OIPStyles.header} mb-15`}>
                <h2
                  className={`${OIPStyles.header_title} text_type_digits-default mb-10`}
                >
                  #{order.number}
                </h2>
                <h2 className={"text text_type_main-medium mb-3"}>
                  {order.name}
                </h2>

                <span
                  className={`text text_type_main-small ${OIPStyles.status}`}
                >
                  {getStatus(order.status)}
                </span>
              </section>
              <h2
                className={`text text_type_main-medium mb-6 ${OIPStyles.composition}`}
              >
                Состав:
              </h2>
              <section className={`${OIPStyles.body} custom-scroll`}>
                <ul className={`${OIPStyles.ingredients_list}`}>
                  {newIngredient.newIngredients.map((item, i) => (
                    <li key={i} className={OIPStyles.ingredient_item}>
                      <img
                        className={OIPStyles.ingredient_img}
                        alt={"ингредиент"}
                        src={item.ingredient.image}
                      />
                      <h3
                        className={`${OIPStyles.ingredient_title} text text_type_main-default`}
                      >
                        {item.ingredient.name}
                      </h3>
                      <span
                        className={`${OIPStyles.count} text_type_digits-default`}
                      >
                        {item.count} X {item.ingredient.price}
                        <CurrencyIcon type="primary" />
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
              <section className={OIPStyles.footer}>
                <time
                  // @ts-ignore
                  className={`${OIPStyles.footer_date} text text_color_inactive text_type_main-default`}
                >
                  {getDate(order.createdAt)}
                </time>
                <div className={OIPStyles.footer_price}>
                  <span className={"text_type_digits-default"}>
                    {newIngredient.total}
                  </span>
                  <CurrencyIcon type="primary" />
                </div>
              </section>
            </>
          )}
        </div>
      )}
    </>
  );
};
