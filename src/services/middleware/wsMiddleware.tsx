import { actions } from "../slice/websocket";

export const wsMiddleware = (wsActions: typeof actions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;

      const {
        startWSConnection,
        stopWSConnection,
        successWSConnection,
        getWSMessage,
        sendWSMessage,
        closedWSConnection,
        errorWSConnection,
      } = wsActions;

      if (type === startWSConnection.type) {
        socket = new WebSocket(payload);
      }
      if (type === stopWSConnection.type)
        socket && socket.close(1000, "CLOSE_NORMAL");

      if (socket) {
        socket.onopen = (event) => {
          console.log("Соединение установлено");
          dispatch(successWSConnection());
        };
        // функция, которая вызывается при получении события от сервера
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(getWSMessage(parsedData));
        };

        socket.onerror = (event) => {
          dispatch(errorWSConnection());
        };

        socket.onclose = (event) => {
          dispatch(closedWSConnection());
        };

        if (type === sendWSMessage.type) {
          console.log("сообщение отправлено");
          socket.send(JSON.stringify(payload));
        }
      }

      next(action);
    };
  };
};
