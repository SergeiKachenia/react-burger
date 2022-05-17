import { Location } from "history";
import { RootState } from "../../index";
import { AnyAction, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

export type TIngredient = {
  readonly id?: string;
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
};

export type TOrder =  {
  readonly order: {
    readonly ingredients: TIngredient[];
    readonly number: number;
  };
  readonly number: number;
  readonly name: string;
  readonly status: string;
  readonly createdAt: string;
  readonly ingredients: TIngredient[];
  readonly _id: string;
};
export interface IUserRegistration {
  name: string;
  email: string;
  password: string;
}
export interface IForgotPassword {
  email: string;
}
export interface IResetPassword {
  password: string;
  token: string;
}

export interface IUserLogin {
  password: string;
  email: string;
}

export interface IOrderIngredient {
  ingredient: TIngredient;
  count: number;
}



export type TLocationState = {
  background?: Location<TLocationState>;
  from?: { pathname: string };
};

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>
