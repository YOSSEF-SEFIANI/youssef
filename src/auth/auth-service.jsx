import  { useState } from "react";

export const useAuthState = () => {
  const authState = useState({
    isAuthenticated: false,
    username: undefined,
    roles: undefined,
  });

  return authState;
};
