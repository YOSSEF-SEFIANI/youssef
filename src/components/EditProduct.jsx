import React, { useEffect, useState } from "react";
import { EditProducts, GetProductsById } from "../appDb";
import { useParams } from "react-router-dom";
import { AlertMessage } from "./Products";

function EditProduct() {
  const { id } = useParams();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [checked, setCheck] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState();

  useEffect(() => {
    handleGetPrd(id);
  }, []);
  const handleGetPrd = (id) => {
    GetProductsById(id).then((resp) => {
      let products = resp.data;
      setName(products.name);
      setPrice(products.price);
      setCheck(products.checked);
    });
  };
  const handleUpdatePrd = () => {
    let products = { id, name, price, checked };
    return EditProducts(products).then((resp) => {
      setMessage(JSON.stringify(resp.data));
      setName("");
      setPrice("");
      setShow(true);
    });
  };
  return (
    <>
      <AlertMessage
        title={"update"}
        message={message}
        show={show}
        onHide={() => setShow(false)}
      />
      <form className="container-fluid">
        <div className="form-group ">
          <label>Name </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Price </label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="form-group form-check">
          <input
            checked={checked}
            onChange={(e) => setCheck(e.target.checked)}
            type="checkbox"
            className="form-check-input"
          />
          <label className="form-check-label">Check me out</label>
        </div>
        
        <button
          disabled={!name || !price}
          type="button"
          onClick={() => handleUpdatePrd()}
          className="btn btn-primary"
        >
          save
        </button>
      </form>
    </>
  );
}

export default EditProduct;
