import React, { useContext } from "react";
import {  Navigate } from "react-router-dom";
import { AuthContext } from "../auth/AppContext";

const ProtectedRouteByRole = ({ role, children }) => {
  const [authState, setAuthState] = useContext(AuthContext);
  if (authState.roles.includes(role)) {
    return children;
  } else {
    return <Navigate to={"/notAuthorized"} />;
  }
};
export default ProtectedRouteByRole;
