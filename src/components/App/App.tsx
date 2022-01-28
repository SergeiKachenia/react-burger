
import React from 'react';
import ReactDOM from 'react-dom';
import AppHeader from '../AppHeader/AppHeader';
import AppStyles from './App.module.css'
import  {ingredients, construct} from '../../utils/data'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import  BurgerIngredients  from '../BurgerIngredients/BurgerIngredients'


class App extends React.Component {
  render () {
    return (
      <>
        <AppHeader/>
        <main className={`${AppStyles.main}`}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor construct={construct} />
        </main>
      </>
    )
  }

}
export default App