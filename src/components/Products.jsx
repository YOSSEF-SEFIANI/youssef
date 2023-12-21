import {
  faCheck,
  faCheckCircle,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { CheckedProduct, DeleteProducts, GetProducts } from "../appDb";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AppContext";

function Products() {
  const [products, setProducts] = useState([]);
  const [authState, setAuthState] = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    handleProduct();
  }, []);

  const handleProduct = () => {
    GetProducts()
      .then((resp) => {
        setProducts(resp.data);
      })
      .catch((err) => console.error(err));
  };
  const handleRemoveProduct = (pdt) => {
    DeleteProducts(pdt)
      .then((resp) => {
        let newPrd = products.filter((product) => product.id !== pdt.id);
        setProducts(newPrd);
      })
      .catch((err) => console.error(err));
  };
  const handleCheckProduct = (product) => {
    CheckedProduct(product)
      .then((resp) => {
        let newPrd = products.map((prd) => {
          if (prd.id === product.id) {
            prd.checked = !prd.checked;
          }
          return prd;
        });
        setProducts(newPrd);
      })
      .catch((err) => console.error(err));
  };

  return (
    <table className="container table ">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>price</th>
          <th>Checked</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <th>{product.id}</th>
            <td>{product.name}</td>
            <td>{product.price}</td>
            {authState.roles?.includes("ADMIN") ? (
              <td>
                <button
                  onClick={() => handleCheckProduct(product)}
                  className={
                    product.checked == true
                      ? "btn btn-outline-success"
                      : "btn btn-outline-danger"
                  }
                >
                  <FontAwesomeIcon
                    icon={product.checked ? faCheckCircle : faCheck}
                  />
                </button>
              </td>
            ) : (
              <td>
                <FontAwesomeIcon
                  icon={product.checked ? faCheckCircle : faCheck}
                />
              </td>
            )}
            {authState.roles?.includes("ADMIN") && (
              <td>
                <button
                  onClick={() => handleRemoveProduct(product)}
                  className=" btn btn-outline-danger"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            )}

            {authState.roles?.includes("ADMIN") && (
              <td>
                <button
                  className=" btn btn-outline-success"
                  onClick={() => navigate(`/editProduct/${product.id}`)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export const AlertMessage = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Products;
