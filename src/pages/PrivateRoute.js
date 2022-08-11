import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// will remove later

const PrivateRoute = ({ children }) => {
  const { user } = useAuth0();

  return user ? children : <Navigate to="/" />;
};
export default PrivateRoute;
