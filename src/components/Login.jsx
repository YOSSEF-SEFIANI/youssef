import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AppContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [authState, setAuthState] = useContext(AuthContext);

  const loginUser = (e) => {
    e.preventDefault();
    if (["user", "admin"].includes(username) && password === "1234") {
      return (
        setAuthState({
          ...authState,
          isAuthenticated: true,
          username: username,
          roles: username === "admin" ? ["USER", "ADMIN"]: ["USER"],
        }),
        navigate("/products")
      );
    }
  };

  return (
    <div className="container">
      <form onSubmit={loginUser}>
        <div className="form-group">
          <label className="form-label mt-4">Email address</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="form-control"
            placeholder="username"
          />
          <label className="form-label mt-4">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
