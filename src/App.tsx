import AppHeader from "./components/AppHeader/AppHeader";
import { HomePage } from "./pages/HomePage/HomePage";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage/LoginPage"
import { RegisterPage } from "./pages/RegisterPage/RegisterPage"
import {ForgotPassPage } from "./pages/ForgotPassPage/ForgotPassPage"
import { ResetPassPage } from "./pages/ResetPassPage/ResetPassPage"
import { PageNotFound } from "./pages/PageNotFound/PageNotFound";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchIngredients,
  ingredientsSelector,
} from "./services/slice/ingredients";
function App() {
  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  console.log(location)
  // @ts-ignore
  const background = location.state && location.state.background;
  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <DndProvider backend={HTML5Backend}>
            <HomePage />
          </DndProvider>
        </Route>
        <Route path="/login" exact={true}>
          <LoginPage />
          </Route>
          <Route path="/register" exact={true}>
          <RegisterPage />
          </Route>
          <Route path="/forgot-password" exact={true}>
          <ForgotPassPage />
          </Route>
          <Route path="/reset-password" exact={true}>
          <ResetPassPage />
          </Route>
          <Route path="/profile" exact={true}>
          <ProfilePage />
          </Route>
          <Route>
          <PageNotFound />
          </Route>
      </Switch>
    </>
  );
}

export default App;
