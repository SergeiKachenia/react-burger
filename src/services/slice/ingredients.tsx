import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { baseUrl, checkResponse } from "../../utils/utils";
import { getCookie } from "../../utils/cookies";
import { TIngredient } from "../types/data";
import { AppDispatch } from "../../index";
import { TRootState } from "../index";
interface TIngredientState {
  ingredients: TIngredient[];
  loading: boolean;
  error: boolean;
  ingredientDetails: TIngredient[];
  activeIngredientDetailsModal: boolean;
  cartIngredients: TIngredient[];
  orderNumber: number;
  orderName: string;
  orderModal: boolean;
  totalSum: number;
}

export const initialState: TIngredientState = {
  ingredients: [],
  loading: false,
  error: null,
  ingredientDetails: null,
  activeIngredientDetailsModal: false,
  cartIngredients: [],
  orderNumber: 0,
  orderName: "",
  orderModal: false,
  totalSum: 0,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    getIngredients: (state: TIngredientState) => {
      state.loading = true;
    },
    getIngredientsSuccess: (
      state: TIngredientState,
      { payload }: PayloadAction<TIngredient[]>
    ) => {
      state.loading = false;
      state.error = false;
      state.ingredients = payload;
    },
    getIngredientsFail: (
      state: TIngredientState,
      { payload }: PayloadAction<any>
    ) => {
      state.loading = false;
      state.error = payload;
    },
    showIngredientDetails: (
      state: TIngredientState,
      { payload }: PayloadAction<any>
    ) => {
      state.ingredientDetails = payload;
      state.activeIngredientDetailsModal = true;
    },
    removeIngredientDetails: (state: TIngredientState) => {
      state.ingredientDetails = null;
      state.activeIngredientDetailsModal = false;
    },
    addIngredientToCart: {
      reducer: (state: TIngredientState, { payload }: PayloadAction<any>) => {
        state.cartIngredients.push(payload);
        console.log({ payload });
      },
      // @ts-ignore
      prepare: (item) => {
        const id: string = uuidv4();
        // @ts-ignore
        return { payload: { id, ...item } };
      },
    },
    deleteIngredientFromCart: (
      state: TIngredientState,
      { payload }: PayloadAction<{ type: string; _id: string }>
    ) => {
      if (payload.type === "bun")
        state.cartIngredients = state.cartIngredients.filter(
          (i) => i.type !== "bun"
        );
      else {
        const itemIndex = state.cartIngredients
          .map((i) => i._id)
          .indexOf(payload._id);
        state.cartIngredients = state.cartIngredients.filter(
          (i, ind) => ind !== itemIndex
        );
      }
    },
    removeIngredientFromCart: (state: TIngredientState) => {
      state.cartIngredients = [];
    },
    sendOrderInProgress: (state: TIngredientState) => {
      state.loading = true;
    },
    sendOrderSuccess: (
      state: TIngredientState,
      { payload }: PayloadAction<{ order: { number: number }; name: string }>
    ) => {
      state.loading = false;
      state.error = false;
      state.orderNumber = payload.order.number;
      state.orderName = payload.name;
      state.orderModal = true;
    },
    sendOrderFail: (
      state: TIngredientState,
      { payload }: PayloadAction<any>
    ) => {
      state.loading = false;
      state.error = payload;
      state.orderNumber = 0;
      state.orderName = "";
    },
    closeOrderModal: (state: TIngredientState) => {
      state.orderModal = false;
    },
    getTotalSum: (state: TIngredientState) => {
      const cart = state.cartIngredients;
      let total = 0;

      if (cart.length > 0) {
        total =
          cart
            .filter((i) => i.type !== "bun")
            .reduce((a, i) => a + i.price, 0) +
          (cart.some((i) => i.type === "bun")
            ? cart.find((i) => i.type === "bun").price * 2
            : 0);
      }

      state.totalSum = total;
    },
    dragIngredients: (
      state: TIngredientState,
      { payload }: PayloadAction<any>
    ) => {
      const ingredientsToChange = state.cartIngredients.filter(
        (i) => i.type !== "bun"
      );
      ingredientsToChange[payload.drag] = ingredientsToChange.splice(
        payload.hover,
        1,
        ingredientsToChange[payload.drag]
      )[0];
      state.cartIngredients = ingredientsToChange.concat(
        state.cartIngredients.filter((i) => i.type === "bun")
      );
    },
  },
});

export const {
  getIngredients,
  getIngredientsSuccess,
  getIngredientsFail,
  showIngredientDetails,
  removeIngredientDetails,
  addIngredientToCart,
  deleteIngredientFromCart,
  sendOrderInProgress,
  sendOrderSuccess,
  sendOrderFail,
  closeOrderModal,
  getTotalSum,
  dragIngredients,
  removeIngredientFromCart,
} = ingredientsSlice.actions;

export const fetchIngredients = () => {
  return async (dispatch: AppDispatch) => {
    // @ts-ignore
    dispatch(getIngredients());
    try {
      const res = await fetch(`${baseUrl}/ingredients`);
      checkResponse(res);
      const actualData = await res.json();
      dispatch(getIngredientsSuccess(actualData.data));
    } catch (error: unknown) {
      if (typeof error === "string") console.log(error);
      else if (error instanceof Error) {
        dispatch(getIngredientsFail(error.message));
      }
    }
  };
};

export const sendOrderInfo = (ingredients: TIngredient[]) => {
  return async (dispatch: AppDispatch) => {
    // @ts-ignore
    dispatch(sendOrderInProgress());
    console.log(initialState.loading);
    try {
      const res = await fetch(`${baseUrl}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: getCookie("accessToken"),
        },
        body: JSON.stringify({ ingredients: ingredients.map((i) => i._id) }),
      });
      checkResponse(res);
      const actualData = await res.json();
      dispatch(sendOrderSuccess(actualData));
      // @ts-ignore
      dispatch(removeIngredientFromCart());
    } catch (error: unknown) {
      if (typeof error === "string") console.log(error);
      else if (error instanceof Error) {
        dispatch(sendOrderFail(error.message));
      }
    }
  };
};

export const ingredientsSelector = (state: TRootState) => state.ingredients;
export const ingredientsReducer = ingredientsSlice.reducer;
