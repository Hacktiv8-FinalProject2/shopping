import React, { useEffect, useState } from "react";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import {
  FaCartPlus,
  FaClipboardList,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/reducers/auth";

function Navbarr() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [isShowLogout, setIsShowLogout] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user === "admin") {
      setIsAdmin(true);
    }
  }, [user]);

  return (
    <Navbar expand="lg" className="py-0 mb-0">
      <Container>
        <Navbar.Brand href="/" className="text-dark">
          <img src={logo} alt="logo" fluid width="100" height="100" />
        </Navbar.Brand>

        {isLoggedIn ? (
          <Navbar
            id="navbarScroll"
            className="d-flex justify-content-end gap-1"
          >
            <Row>
              <Col sm={6}>
                {isAdmin ? (
                  <Link
                    to={"/report"}
                    style={{ textDecoration: "none", color: "#ab7a5f" }}
                  >
                    <FaClipboardList size={30} />
                  </Link>
                ) : (
                  <>
                    <Link
                      to={"/cart"}
                      style={{ textDecoration: "none", color: "#ab7a5f" }}
                    >
                      <FaCartPlus size={30} />
                    </Link>
                  </>
                )}
              </Col>
              <Col sm={6}>
                <FaUser
                  size={30}
                  style={{
                    textDecoration: "none",
                    color: "#ab7a5f",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsShowLogout(!isShowLogout)}
                />
                {isShowLogout && (
                  <div className="custom-dropdown">
                    <p
                      className="custom-logout-button"
                      onClick={() => {
                        dispatch(logout(navigate));
                      }}
                    >
                      Logout
                    </p>
                  </div>
                )}
              </Col>
            </Row>
          </Navbar>
        ) : (
          <Navbar id="navbarScroll" className="d-flex justify-content-end">
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              <h5 className="login">
                <FaUserPlus size={25} /> Login
              </h5>
            </Link>
          </Navbar>
        )}
      </Container>
    </Navbar>
  );
}

export default Navbarr;
