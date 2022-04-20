import {OrdersList} from "../../components/OrdersList/OrdersList";
import {ProfileNavigation} from "../../components/ProfileNavigation/ProfileNavigation"
import OPStyles from "./OrdersPage.module.css";
import {useSelector} from "react-redux";
import {wsSelector} from "../../services/slice/websocket"
import { useWebSocket } from "../../hooks/wsHook";
export const OrdersPage = () => {
useWebSocket();
  const {feedOrders} = useSelector(wsSelector)

  return (
    <>
      <section className={OPStyles.ordersPage__main}>
        <div className={OPStyles.orderPage__nav}>
        <ProfileNavigation/>
        </div>
        <section className={`${OPStyles.ordersPage__list} custom-scroll`}>
          {feedOrders &&
            feedOrders.map((item) => (
              // @ts-ignore
              <OrdersList key={item._id} order={item} idIngredients={item.ingredients} page='/profile/orders' />
            ))
          }
        </section>
    </section>
    </>

  )
}
