import { OrdersList } from "../../components/OrdersList/OrdersList";
import { ProfileNavigation } from "../../components/ProfileNavigation/ProfileNavigation";
import OPStyles from "./OrdersPage.module.css";
import { wsSelector } from "../../services/slice/websocket";
import { useWebSocket } from "../../hooks/wsHook";
import { useAppSelector } from "../../index";
import { TOrder } from "../../services/types/data";
import { FC } from "react";

export const OrdersPage: FC = () => {
  useWebSocket();
  const { feedOrders } = useAppSelector(wsSelector);
  const page = "/profile/orders";
  let reversedFeedOrders: TOrder[] = [];
  if (feedOrders.length > 0) {
    reversedFeedOrders = [...feedOrders].reverse();
  }
  return (
    <>
      <section className={OPStyles.ordersPage__main}>
        <div className={OPStyles.orderPage__nav}>
          <ProfileNavigation />
        </div>
        <section className={`${OPStyles.ordersPage__list} custom-scroll`}>
          {reversedFeedOrders &&
            reversedFeedOrders.map((item: TOrder) => (
              // @ts-ignore
              <OrdersList
                key={item._id}
                order={item}
                //@ts-ignore
                idIngredients={item.ingredients}
                page={page}
              />
            ))}
        </section>
      </section>
    </>
  );
};
