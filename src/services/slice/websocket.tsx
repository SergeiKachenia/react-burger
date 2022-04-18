import {createSlice} from "@reduxjs/toolkit";
import {useAppDispatch} from '../../index'
import {wsUrl} from '../../utils/utils'
import {getCookie} from '../../utils/cookies'
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


export const getFeedRequest = () => {
  return (dispatch = useAppDispatch()) => {
    dispatch(
      startWSConnection({url: `${wsUrl}/all`})
    )

  }
}

export const getPersonalFeedRequest = () => {
  return (dispatch = useAppDispatch()) => {
    dispatch(
      startWSConnection({
        url: `${wsUrl}`,
        token: getCookie('accessToken').slice(7)
      })
    )
  }
}

export const stopFeedRequest = () => {
  return (dispatch = useAppDispatch()) => {
    dispatch(
      stopWSConnection()
    )
  }
}