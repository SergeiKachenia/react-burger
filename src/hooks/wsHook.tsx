import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  closedWSConnection,
  startWSConnection,
} from "../services/slice/websocket";
import { getCookie } from "../utils/cookies";
import { wsUrl } from "../utils/utils";
import { TLocationState } from "../services/types/data";
import { useAppDispatch } from "../index";

export const useWebSocket = () => {

  const location = useLocation<TLocationState>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (location.pathname.startsWith("/feed")) {
      dispatch(startWSConnection(`${wsUrl}/orders/all`));
    } else if (location.pathname.startsWith("/profile")) {
      const accessToken = getCookie("accessToken").slice(7);
      dispatch(startWSConnection(`${wsUrl}/orders?token=${accessToken}`));
    }
    return () => {
      dispatch(closedWSConnection());
    };
  }, [location]);
};
