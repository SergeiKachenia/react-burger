import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  webSocket: null,
  wsConnected: false,
  wsError: false,
  feedOrders: [],
  total: null,
  totalToday: null
}


export const wsSlice = createSlice({
  name: 'webSocket',
  initialState,
  reducers: {
    startWSConnection: (state, {payload}) => {
    },
    stopWSConnection: (state) => {
        state.wsConnected = false
        state.wsError = false
    },
    successWSConnection: (state) => {
      state.wsConnected = true;
      state.wsError = false;
    },
    getWSMessage: (state, {payload}) => {
      state.feedOrders = payload.orders;
      state.total = payload.total;
      state.totalToday = payload.totalToday;
    },
    sendWSMessage: (state, {payload}) => {
    },

    closedWSConnection: (state) => {
      state.wsConnected = false;
      state.wsError = false;
    },

    errorWSConnection: (state) => {
      state.wsConnected = false;
      state.wsError = true
    },
  },


});

export const {startWSConnection, stopWSConnection, successWSConnection, getWSMessage, sendWSMessage, closedWSConnection, errorWSConnection} = wsSlice.actions
export const actions = wsSlice.actions


export const wsSelector = state => state.webSocket;
export const webSocketReducer = wsSlice.reducer
