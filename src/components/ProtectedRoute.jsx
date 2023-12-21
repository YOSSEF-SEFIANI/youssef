import React, { useContext } from "react";
import {  Navigate } from "react-router-dom";
import { AuthContext } from "../auth/AppContext";

const ProtectedRoute = ({children }) => {
  const [authState, setAuthState] = useContext(AuthContext);
  if (authState.isAuthenticated) {
    return children;
  } else {
    return <Navigate to={"/home"} />;
  }
};
export default ProtectedRoute;
