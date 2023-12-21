import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/navBar";
import Home from "./Home";
import Products from "./components/Products";
import NewProducts from "./components/NewProducts";
import EditProduct from "./components/EditProduct";
import Login from "./components/Login";
import { useContext } from "react";
import { AuthContext } from "./auth/AppContext";
import { useAuthState } from "./auth/auth-service";
import NoIsAuthenticated from "./components/NoIsAuthenticated";
import ProtectedRouteByRole from "./components/ProtectedRouteByRole";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const authState = useAuthState();
  return (
    <AuthContext.Provider value={authState}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />

          <Route
            path="/newProduct"
            element={
              <ProtectedRoute>
                <ProtectedRouteByRole role={"ADMIN"}>
                  <NewProducts />
                </ProtectedRouteByRole>
              </ProtectedRoute>
            }
          />
          <Route
            path="/editProduct/:id"
            element={
              <ProtectedRouteByRole role={"ADMIN"}>
                <EditProduct />
              </ProtectedRouteByRole>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/notAuthorized" element={<NoIsAuthenticated />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
