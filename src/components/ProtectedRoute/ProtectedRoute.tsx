import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { authSelector } from "../../services/slice/authorisation";
import { useSelector } from "react-redux";


export const ProtectedRoute = ({ children, ...rest }) => {
  const { auth } = useSelector(authSelector);

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
