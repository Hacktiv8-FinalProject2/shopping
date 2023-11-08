import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Table } from "react-bootstrap";
import { setUpdateStock } from "../../store/reducers/product";
import { formatPrice } from "../../utils/price";

const HomeAdmin = () => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  const allProducts = useSelector((state) =>
    state.product.products.length > 0
      ? state.product.products
      : JSON.parse(localStorage.getItem("allProducts"))
  );

  const handleUpdateStock = (id) => {
    dispatch(setUpdateStock({ id: id, stock: count }));
    const updatedAllProducts = allProducts.map((product) => {
      if (product.id === id) {
        return { ...product, stock: count };
      }
      return product;
    });

    localStorage.setItem("allProducts", JSON.stringify(updatedAllProducts));
  };

  return (
    <Table striped bordered hover responsive className="container">
      <thead>
        <tr>
          <th className="col-2 text-center">Image</th>
          <th className="col-3 text-center">Product Name</th>
          <th className="col-2 text-center">Price</th>
          <th className="col-1 text-center">Stock</th>
          <th className="col-2 text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {allProducts &&
          allProducts.length > 0 &&
          allProducts.map((product) => {
            return (
              <tr key={product.id}>
                <td className="d-flex align-items-center justify-content-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: "50%" }}
                  />
                </td>
                <td className="text-center align-middle">{product.title}</td>
                <td className="text-center align-middle">
                  {formatPrice(product.price)}
                </td>
                <td className="text-center align-middle">
                  <Form.Control
                    defaultValue={product.stock}
                    type="number"
                    onChange={(e) => setCount(parseInt(e.target.value))}
                  />
                </td>
                <td className="text-center align-middle">
                  <Button
                    style={{
                      textDecoration: "none",
                      backgroundColor: "#ab7a5f",
                      border: "none",
                    }}
                    onClick={() => handleUpdateStock(product.id)}
                  >
                    Update Stock
                  </Button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default HomeAdmin;
