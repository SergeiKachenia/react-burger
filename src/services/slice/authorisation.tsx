import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { baseUrl, checkResponse } from "../../utils/utils";
import { setCookie, getCookie, deleteCookie } from "../../utils/cookies";
import { AppDispatch } from "../../index";
import {
  IUserRegistration,
  IUserLogin,
  IForgotPassword,
  IResetPassword,
} from "../types/data";
import { RootState } from "../../index";

type TUserData = {
  email: string;
  password: string;
  name: string;
  token: string;
  refreshToken: string;
};

interface IAuthState {
  auth: boolean;
  loading: boolean;
  error: string;
  forgotPassReqSuccess: boolean;
  resetPassReqSuccess: boolean;
  userData: TUserData;
}

export const initialState: IAuthState = {
  auth: false,
  loading: false,
  error: "",
  forgotPassReqSuccess: false,
  resetPassReqSuccess: false,
  userData: {
    email: "",
    password: "",
    name: "",
    token: null,
    refreshToken: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkAuth: (state) => {
      getCookie("refreshToken") ? getUserRequest() : (state.auth = false);
    },
    resetError: (state) => {
      state.error = "";
    },
    resetForgotPassReqSuccess: (state) => {
      state.forgotPassReqSuccess = false;
    },
    resetResetPassReqSuccess: (state) => {
      state.resetPassReqSuccess = false;
    },
    registerInProgress: (state) => {
      state.loading = true;
    },
    registerSuccess: (
      state,
      {
        payload,
      }: PayloadAction<{
        user: { name: string; email: string };
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      state.loading = false;
      state.auth = true;
      state.userData.name = payload.user.name;
      state.userData.email = payload.user.email;
      state.userData.password = "";
      setCookie("accessToken", payload.accessToken, {});
      setCookie("refreshToken", payload.refreshToken, {});
    },
    registerFailed: (state, { payload }: PayloadAction<any>) => {
      state.loading = false;
      state.error = `Зарегистрироваться не удалось: ${payload}`;
    },
    forgotPassInProgress: (state) => {
      state.loading = true;
    },
    forgotPassSuccess: (state, { payload }: PayloadAction<any>) => {
      state.loading = false;
      state.forgotPassReqSuccess = true;
    },
    forgotPassFailed: (state, { payload }: PayloadAction<any>) => {
      state.loading = false;
      state.error = `Код отправить не удалось. Проблема: ${payload}`;
    },
    resetPassInProgress: (state) => {
      state.loading = true;
    },
    resetPassSuccess: (state, { payload }: PayloadAction<any>) => {
      state.loading = false;
      state.resetPassReqSuccess = true;
    },
    resetPassFailed: (state, { payload }: PayloadAction<any>) => {
      state.loading = false;
      state.error = `Ваш пароль изменить не удалось. Проблема: ${payload}`;
    },
    loginInProgress: (state) => {
      state.loading = true;
    },
    loginSuccess: (
      state,
      {
        payload,
      }: PayloadAction<{
        user: { name: string; email: string };
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      state.loading = false;
      state.auth = true;
      state.userData.name = payload.user.name;
      state.userData.email = payload.user.email;
      state.userData.password = "";
      setCookie("accessToken", payload.accessToken, { expires: 20 * 60 });
      setCookie("refreshToken", payload.refreshToken, {});
    },
    loginFailed: (state, { payload }: PayloadAction<any>) => {
      state.loading = false;
      state.error = `В аккаунт войти не удалось. Проблема: ${payload}`;
    },
    logoutInProgress: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.auth = false;
      state.userData.name = "";
      state.userData.email = "";
      state.userData.password = "";
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
    },
    logoutFailed: (state, { payload }: PayloadAction<any>) => {
      state.loading = false;
      state.error = `Не удалось выйти из аккаунта. Проблема: ${payload}`;
    },
    getUserInProgress: (state: IAuthState) => {
      state.loading = true;
    },
    getUserSuccess: (
      state,
      { payload }: PayloadAction<{ user: { name: string; email: string } }>
    ) => {
      state.userData.name = payload.user.name;
      state.userData.email = payload.user.email;
      state.userData.password = "";
      state.auth = true;
    },
    getUserFailed: (state, { payload }: PayloadAction<any>) => {
      state.userData.name = "";
      state.userData.email = "";
      state.userData.password = "";
      state.auth = false;
      state.loading = false;
      state.error = `Данные пользователя получить не удалось. Проблема: ${payload}`;
    },
    updateUserInProgress: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (
      state: IAuthState,
      { payload }: PayloadAction<{ user: { name: string; email: string } }>
    ) => {
      state.userData.name = payload.user.name;
      state.userData.email = payload.user.email;
      state.userData.password = "";
      state.auth = true;
    },
    updateUserFailed: (state, { payload }: PayloadAction<any>) => {
      state.userData.name = "";
      state.userData.email = "";
      state.userData.password = "";
      state.auth = false;
      state.loading = false;
      state.error = `Данные пользователя обновить не удалось. Проблема: ${payload}`;
    },
    getTokenInProgress: (state) => {
      state.loading = true;
    },
    getTokenSuccess: (
      state: IAuthState,
      { payload }: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      setCookie("accessToken", payload.accessToken, {});
      setCookie("refreshToken", payload.refreshToken, {});
      state.auth = true;
    },
    getTokenFailed: (state, { payload }: PayloadAction<any>) => {
      state.auth = false;
      state.loading = false;
      state.error = `Проблема: ${payload}`;
    },
  },
});

export const {
  checkAuth,
  resetError,
  resetResetPassReqSuccess,
  resetForgotPassReqSuccess,
  registerInProgress,
  registerSuccess,
  registerFailed,
  forgotPassInProgress,
  forgotPassSuccess,
  forgotPassFailed,
  resetPassInProgress,
  resetPassSuccess,
  resetPassFailed,
  loginInProgress,
  loginSuccess,
  loginFailed,
  logoutInProgress,
  logoutSuccess,
  logoutFailed,
  getUserInProgress,
  getUserSuccess,
  getUserFailed,
  updateUserInProgress,
  updateUserSuccess,
  updateUserFailed,
  getTokenInProgress,
  getTokenSuccess,
  getTokenFailed,
} = authSlice.actions;

export const authSelector = (state: RootState) => state.auth;
export const authReducer = authSlice.reducer;

export const registerRequest = (form: IUserRegistration) => {
  return async (dispatch: AppDispatch) => {
    dispatch(registerInProgress());
    try {
      const res = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      checkResponse(res);
      const actualData = await res.json();
      dispatch(registerSuccess(actualData));
    } catch (error: unknown) {
      if (typeof error === "string") console.log(error);
      else if (error instanceof Error) {
        dispatch(registerFailed(error.message));
      }
    }
  };
};

export const forgotPassRequest = (email: IForgotPassword) => {
  return async (dispatch: AppDispatch) => {
    dispatch(forgotPassInProgress());
    try {
      const res = await fetch(`${baseUrl}/password-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });
      checkResponse(res);
      const actualData = await res.json();
      dispatch(forgotPassSuccess(actualData));
    } catch (error: unknown) {
      if (typeof error === "string") console.log(error);
      else if (error instanceof Error) {
        dispatch(forgotPassFailed(error.message));
      }
    }
  };
};

export const resetPassRequest = (form: IResetPassword) => {
  return async (dispatch: AppDispatch) => {
    dispatch(resetPassInProgress());
    try {
      const res = await fetch(`${baseUrl}/password-reset/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      checkResponse(res);
      const actualData = await res.json();
      dispatch(resetPassSuccess(actualData));
    } catch (error: unknown) {
      if (typeof error === "string") console.log(error);
      else if (error instanceof Error) {
        dispatch(resetPassFailed(error.message));
      }
    }
  };
};

export const loginRequest = (form: IUserLogin) => {
  return async (dispatch: AppDispatch) => {
    dispatch(loginInProgress());
    try {
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      checkResponse(res);
      const actualData = await res.json();
      dispatch(loginSuccess(actualData));
    } catch (error: unknown) {
      if (typeof error === "string") console.log(error);
      else if (error instanceof Error) {
        dispatch(loginFailed(error.message));
      }
    }
  };
};

export const logoutRequest = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(logoutInProgress());
    try {
      const res = await fetch(`${baseUrl}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: getCookie("refreshToken") }),
      });
      checkResponse(res);
      const actualData = await res.json();
      dispatch(logoutSuccess());
    } catch (error: unknown) {
      if (typeof error === "string") console.log(error);
      else if (error instanceof Error) {
        dispatch(logoutFailed(error.message));
      }
    }
  };
};

export const getUserRequest = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(getUserInProgress());
    try {
      const res = await fetch(`${baseUrl}/auth/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: getCookie("accessToken"),
        },
      });
      checkResponse(res);
      const actualData = await res.json();
      dispatch(getUserSuccess(actualData));
    } catch (error: unknown) {
      if (typeof error === "string") console.log(error);
      else if (error instanceof Error) {
        if (error.message === "Error status - 403") {
          dispatch(getTokenRequest()).then(() => dispatch(getUserRequest()));
        }
        dispatch(getUserFailed(error.message));
      }
    }
  };
};

export const updateUserRequest = (form: IUserRegistration) => {
  return async (dispatch: AppDispatch) => {
    dispatch(updateUserInProgress());
    try {
      const res = await fetch(`${baseUrl}/auth/user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: getCookie("accessToken"),
        },
        body: JSON.stringify(form),
      });
      checkResponse(res);
      const actualData = await res.json();
      dispatch(updateUserSuccess(actualData));
    } catch (error: unknown) {
      if (typeof error === "string") console.log(error);
      else if (error instanceof Error) {
        if (error.message === "Error status - 403") {
          dispatch(getTokenRequest()).then(() =>
            dispatch(updateUserRequest(form))
          );
        }
        dispatch(updateUserFailed(error.message));
      }
    }
  };
};

export const getTokenRequest = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(getTokenInProgress());
    try {
      const res = await fetch(`${baseUrl}/auth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: getCookie("refreshToken") }),
      });
      checkResponse(res);
      const actualData = await res.json();
      dispatch(getTokenSuccess(actualData));
    } catch (error: unknown) {
      if (typeof error === "string") console.log(error);
      else if (error instanceof Error) {
        dispatch(getTokenFailed(error.message));
      }
    }
  };
};
