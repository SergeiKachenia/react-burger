import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOrder } from "../types/data";
import { TRootState } from "../index";
interface IWSState {
  webSocket: null;
  wsConnected: boolean;
  wsError: boolean;
  feedOrders: TOrder[];
  total: string;
  totalToday: string;
}

const initialState: IWSState = {
  webSocket: null,
  wsConnected: false,
  wsError: false,
  feedOrders: [],
  total: null,
  totalToday: null,
};

export const wsSlice = createSlice({
  name: "webSocket",
  initialState,
  reducers: {
    startWSConnection: (state: IWSState, { payload }: PayloadAction<any>) => {},
    stopWSConnection: (state: IWSState) => {
      state.wsConnected = false;
      state.wsError = false;
    },
    successWSConnection: (state: IWSState) => {
      state.wsConnected = true;
      state.wsError = false;
    },
    getWSMessage: (
      state: IWSState,
      {
        payload,
      }: PayloadAction<{ orders: TOrder[]; total: string; totalToday: string }>
    ) => {
      state.feedOrders = payload.orders;
      state.total = payload.total;
      state.totalToday = payload.totalToday;
    },
    sendWSMessage: (state: IWSState, { payload }: PayloadAction<any>) => {},

    closedWSConnection: (state: IWSState) => {
      state.wsConnected = false;
      state.wsError = false;
    },

    errorWSConnection: (state: IWSState) => {
      state.wsConnected = false;
      state.wsError = true;
    },
  },
});

export const {
  startWSConnection,
  stopWSConnection,
  successWSConnection,
  getWSMessage,
  sendWSMessage,
  closedWSConnection,
  errorWSConnection,
} = wsSlice.actions;
export const actions = wsSlice.actions;

export const wsSelector = (state: TRootState) => state.webSocket;
export const webSocketReducer = wsSlice.reducer;
