import React, { useState } from "react";
import "../styles/Login.css";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/reducers/auth";
import { toast } from "react-toastify";
import { IconContext } from "react-icons";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username,
      password,
    };

    if (user === "admin") {
      navigate("/");
    } else {
      dispatch(login(data))
        .then((response) => {
          if (response) {
            navigate("/");
          } 
        })
        .catch((error) => {
          toast.error("Login Failed!", error);
        });
    }
  };

  if (user === "admin") {
    navigate("/");
    return null;
  }

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        <Col className="bg d-flex justify-content-center align-items-center"></Col>
        <Col className="d-flex justify-content-center align-items-center">
          <div className="w-75">
            <h3 className="fw-bold text-center">LOGIN</h3>
            <Form className="mt-4" onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <div class="d-flex justify-content-between">
                  <Form.Label>Username</Form.Label>
                </div>
                <Form.Control
                  placeholder="Username"
                  value={username}
                  style={{ height: "50px" }}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <div class="d-flex justify-content-between">
                  <Form.Label>Password</Form.Label>
                </div>
                <div className="position-relative">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    style={{ height: "50px" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    className=" position-absolute translate-middle-y"
                    style={{
                      border: "none",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                      right: "16px",
                      top: "50%",
                    }}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    <IconContext.Provider value={{ size: "20px" }}>
                      {showPassword ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </IconContext.Provider>
                    
                  </span>
                </div>
              </Form.Group>
              <button type="submit" className="w-100 login-button">
                Login
              </button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
