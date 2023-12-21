import { faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AppContext";

export default function NavBar() {
  const [currentPath, setCurrentPath] = useState();
  const navigate = useNavigate();
  const [authState, setAuthState] = useContext(AuthContext);
  useEffect(() => {
    let currentAction = window.location.pathname;
    setCurrentPath(currentAction.slice(1, currentAction.length));
  }, []);
  return (
    <nav className="container navbar-expand-lg bg-body-tertiary ">
      <ul className="nav m-1 d-flex">
        <li className="nav-item">
          <Link className={"nav-link"} to="/home">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className={"nav-link"} to="/products">
            Products
          </Link>
        </li>
        <li className="nav-item">
          <Link className={"nav-link"} to="/newProduct">
            New Product
          </Link>
        </li>
        {authState.isAuthenticated && (
          <li className="ml-auto">
           <span className="p-2">{authState.username}</span> 

            <Button 
              onClick={() =>
                setAuthState({
                  ...authState,
                  isAuthenticated: false,
                  username: undefined,
                  roles: undefined,
                })
              }
            >
              <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>
            </Button>
          </li>
        )}
        {!authState.isAuthenticated && (
          <li className="ml-auto">
            <Button onClick={() => navigate("/login")}>
              <FontAwesomeIcon icon={faSignIn} />
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
}
