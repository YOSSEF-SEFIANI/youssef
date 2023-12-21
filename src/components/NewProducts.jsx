import React, { useState } from "react";
import { AddProducts } from "../appDb";
import { AlertMessage } from "./Products";

export default function NewProducts() {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [checked, setCheck] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState();

  const handleAddPrd = () => {
    let product = { name, price, checked };
    return (
      AddProducts(product)
        .then((resp) => {
          setMessage(JSON.stringify(resp.data));
          setName("");
          setPrice("");
          setShow(true);
        })
        .catch((err) => console.error(err))
    );
  };

  return (
    <>
      <AlertMessage
        title={"New product"}
        message={message}
        show={show}
        onHide={() => setShow(false)}
      />
      <form action="post" className="container-fluid">
        <div className="form-group ">
          <label>Name </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Product.."
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
            class="form-check-input"
          />
          <label className="form-check-label">Check me out</label>
        </div>
        <button
          disabled={!name || !price}
          onClick={() => {
            handleAddPrd();
          }}
          type="button"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </>
  );
}
