import { Route, RouteProps } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { authSelector } from "../../services/slice/authorisation";
import { FC } from "react";
import { useAppSelector } from "../../index";

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { auth } = useAppSelector(authSelector);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};
