import AppHeader from "./components/AppHeader/AppHeader";
import { HomePage } from "./pages/HomePage/HomePage";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { ForgotPassPage } from "./pages/ForgotPassPage/ForgotPassPage";
import { ResetPassPage } from "./pages/ResetPassPage/ResetPassPage";
import { PageNotFound } from "./pages/PageNotFound/PageNotFound";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { IngredientPage } from "./pages/IngredientPage/IngredientPage";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IngredientDetails } from "./components/IngredientDetails/IngredientDetails";
import { FeedPage } from "./pages/FeedPage/FeedPage";
import { OrdersPage } from "./pages/OrdersPage/OrdersPage";
import { Modal } from "./components/Modal/Modal";
import { OrderItemPage } from "./pages/OrderItemPage/OrderItemPage";
import { fetchIngredients } from "./services/slice/ingredients";
import {
  getUserRequest,
  authSelector,
  getTokenRequest,
} from "./services/slice/authorisation";
import { getCookie } from "./utils/cookies";

function App() {
  const { auth } = useSelector(authSelector);
  useEffect(() => {
    dispatch(fetchIngredients());
    if (getCookie("refreshToken")) {
      dispatch(getUserRequest());
      if (!auth) {
        // @ts-ignore
        dispatch(getTokenRequest()).then(() =>dispatch(getUserRequest()));
      }
    }
  }, []);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  console.log(location);
  // @ts-ignore
  const background = location.state && location.state.background;

  const closeModal = () => {
    history.goBack();
  };

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <DndProvider backend={HTML5Backend}>
            <HomePage />
          </DndProvider>
        </Route>
        <Route path="/ingredients/:id" exact={true}>
          <IngredientPage />
        </Route>
        <Route path="/feed/:id" exact={true}>
          <OrderItemPage />
        </Route>
        <ProtectedRoute path="/profile/orders/:id" exact={true}>
          <OrderItemPage />
        </ProtectedRoute>
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
        <ProtectedRoute path="/profile" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact={true}>
          <OrdersPage />
        </ProtectedRoute>
        <Route path="/feed" exact={true}>
          <FeedPage />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
      {background && (
        <Switch>
          <Route path="/ingredients/:id">
            <Modal onClose={closeModal} title={"Детали ингредиента"}>
              <IngredientDetails />
            </Modal>
          </Route>
          <ProtectedRoute path="/profile/orders/:id">
            <Modal onClose={closeModal} title={"Детали заказа"}>
              <OrderItemPage />
            </Modal>
          </ProtectedRoute>
          <Route path="/feed/:id">
            <Modal onClose={closeModal} title={"Детали заказа"}>
              <OrderItemPage />
            </Modal>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
