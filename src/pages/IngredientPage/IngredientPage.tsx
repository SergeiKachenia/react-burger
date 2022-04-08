import {IngredientDetails} from '../../components/IngredientDetails/IngredientDetails';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ingredientsSelector } from '../../services/slice/ingredients';
import IPStyles from './IngredientPage.module.css';


export const IngredientPage = () => {
//@ts-ignore
  const { id } = useParams()
  console.log(id)
  const { ingredients } = useSelector(ingredientsSelector)
  const currentIngredient = ingredients.find(item => item._id === id);

return (
  <>
    {currentIngredient &&
      <section className={`${IPStyles.ingredientPage__container} pt-20 mt-15`}>
        <h1 className='text text_type_main-large'>Детали ингредиента</h1>
        <IngredientDetails />
      </section>
    }
  </>
)
}