import IDStyles from "./IngredientDetails.module.css";
import PropTypes from "prop-types";

function IngredientDetails({ item }) {
  return (
    <>
      <img className={IDStyles.image} src={item.image} alt={item.name} />
      <p className={"text text_type_main-medium mt-4 mb-8"}>{item.name}</p>
      <div>
        <ul className={IDStyles.list}>
          <li
            className={`${IDStyles.list__item} text text_type_main-default text_color_inactive`}
          >
            Калории,ккал
            <span className="text text_type_digits-default">
              {item.calories}
            </span>
          </li>
          <li
            className={`${IDStyles.list__item} text text_type_main-default text_color_inactive`}
          >
            Белки, г
            <span className="text text_type_digits-default">
              {item.proteins}
            </span>
          </li>
          <li
            className={`${IDStyles.list__item} text text_type_main-default text_color_inactive`}
          >
            Жиры, г
            <span className="text text_type_digits-default">{item.fat}</span>
          </li>
          <li
            className={`${IDStyles.list__item} text text_type_main-default text_color_inactive`}
          >
            Углеводы, г
            <span className="text text_type_digits-default">
              {item.carbohydrates}
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}

export default IngredientDetails;

IngredientDetails.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }),
  item: PropTypes.object.isRequired,
};
