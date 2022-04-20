
import ODStyles from "./OrderDetails.module.css";
import iconDone from "../../images/done.png";
import { ingredientsSelector } from "../../services/slice/ingredients";
import { useSelector } from "react-redux";

function OrderDetails() {
  const { orderNumber, orderName} = useSelector(ingredientsSelector);
  return (
    <>
      <div className={`text text_type_digits-large`}> {orderNumber} </div>
      <p className={`text text_type_main-medium mt-8`}>идентификатор заказа</p>
      <div className={`mt-15 mb-15`}>
        <img src={iconDone} alt="готовим заказ" />
      </div>
      <p className={`text text_type_main-default`}>
      Ваш {orderName} начали готовить
      </p>
      <p
        className={`mt-2 mb-15 text text_type_main-default text_color_inactive`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}
export default OrderDetails;
