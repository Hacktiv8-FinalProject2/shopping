import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { formatPrice } from "../../utils/price";

const Report = () => {
  const { user } = useSelector((state) => state.auth);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user === "admin") {
      setIsAdmin(true);
    }
  }, [user]);

  const checkoutCart = JSON.parse(localStorage.getItem("checkout")) || [];
  const aggregatedData = {};

  checkoutCart.forEach((item) => {
    if (!aggregatedData[item.id]) {
      aggregatedData[item.id] = {
        ...item,
        totalQuantity: item.quantity,
      };
    } else {
      aggregatedData[item.id].totalQuantity += item.quantity;
    }
  });

  const totalIncome = Object.values(aggregatedData).reduce((acc, item) => {
    const subTotal = item.price * item.totalQuantity;
    return acc + subTotal;
  }, 0);

  return isAdmin ? (
    <Table striped bordered hover responsive className="container">
      <thead>
        <tr>
          <th className="col-2 text-center">Image</th>
          <th className="col-3 text-center">Product Name</th>
          <th className="col-2 text-center">Price</th>
          <th className="col-1 text-center">Sold</th>
          <th className="col-2 text-center">Sub Total</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(aggregatedData).map((item) => (
          <tr key={item.id}>
            <td className="d-flex align-items-center justify-content-center">
              <img src={item.image} alt={item.title} style={{ width: "50%" }} />
            </td>
            <td className="text-center align-middle">{item.title}</td>
            <td className="text-center align-middle">
              {formatPrice(item.price)}
            </td>
            <td className="text-center align-middle">
              {item.totalQuantity} items
            </td>
            <td className="text-center align-middle">
              {formatPrice(item.price * item.totalQuantity)}
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan="4">
            <h4 className="text-center fw-bold">Total Income</h4>
          </td>
          <td>
            <h5 className="text-center fw-bold">{formatPrice(totalIncome)}</h5>
          </td>
        </tr>
      </tbody>
    </Table>
  ) : (
    <div style={{ textAlign: "center", minHeight: "100vh" }}>
      <h2>Access Denied</h2>
      <p>Only admin users are allowed to access this page.</p>
    </div>
  );
};

export default Report;
