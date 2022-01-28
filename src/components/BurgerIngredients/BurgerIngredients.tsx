import React from 'react'
import {Tab, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsStyles from './BurgerIngredients.module.css'
import PropTypes from 'prop-types';





const BurgerIngredientsPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number,
}).isRequired

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(BurgerIngredientsPropTypes).isRequired
}


function BurgerIngredients (props: any)  {

  const [current, setCurrent] = React.useState('bun')

  if (current === 'bun') {
    document.getElementById(current)?.scrollIntoView({
      behavior: 'smooth',
    });
  }
  else if (current === 'sauce') {
    document.getElementById(current)?.scrollIntoView({
      behavior: 'smooth',
    });
  }
  else if (current === 'main') {
    document.getElementById(current)?.scrollIntoView({
      behavior: 'smooth',
    });
  }
    return (
      <section className={IngredientsStyles.ingredients}>
      <h1 className={'text text_type_main-large mb-5 mt-10'}>Соберите бургер</h1>
      <div className={IngredientsStyles.ingredients__tabs}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>


      <div className={`${IngredientsStyles.ingredients__scroll} custom-scroll mt-10`}>

<section id={'bun'}>
  <h2 className={'text text_type_main-medium'}>Булки</h2>
  <ul className={IngredientsStyles.ingredients__list}>
    {props.ingredients.map((item: AppProps) => item.type === 'bun' && <li key={item._id}>
    <a className={IngredientsStyles.ingredients__link} href='#'>
      <img src={item.image} alt={item.name}/>
      <div className={IngredientsStyles.ingredients__price}>
        <span className={'text text_type_digits-default'}>{item.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={`${IngredientsStyles.ingredients__title} text text_type_main-default`}>{item.name}</h3>
    </a>
    </li>
    )}
  </ul>
  </section>
  <section id={'sauce'}>
  <h2 className={'text text_type_main-medium'}>Соусы</h2>
  <ul className={IngredientsStyles.ingredients__list}>
    {props.ingredients.map((item: AppProps) => item.type === 'sauce' && <li key={item._id}>
    <a className={IngredientsStyles.ingredients__link} href='#'>
      <img src={item.image} alt={item.name}/>
      <div className={IngredientsStyles.ingredients__price}>
        <span className={'text text_type_digits-default'}>{item.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={`${IngredientsStyles.ingredients__title} text text_type_main-default`}>{item.name}</h3>
    </a>
    </li>
    )}
  </ul>
  </section>
  <section id={'main'}>
  <h2 className={'text text_type_main-medium'}>Начинки</h2>
  <ul className={IngredientsStyles.ingredients__list}>
    {props.ingredients.map((item: AppProps) => item.type === 'main' && <li key={item._id}>
    <a className={IngredientsStyles.ingredients__link} href='#'>
      <img src={item.image} alt={item.name}/>
      <div className={IngredientsStyles.ingredients__price}>
        <span className={'text text_type_digits-default'}>{item.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={`${IngredientsStyles.ingredients__title} text text_type_main-default`}>{item.name}</h3>
    </a>
    </li>
    )}
  </ul>
  </section>

    </div>
    </section>
    )
  }


  export type AppProps = {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number
  }

export default BurgerIngredients