import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { users } from "../scenes/users.js";
export default function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
  e.preventDefault();

  const foundUser = users.find(
    (u) => u.email === email && u.password === password
  );

  if(!foundUser) {
    alert("Invalid credentials");
    return;
  }

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("currentUser", JSON.stringify(foundUser));

  props.onLogin(true, foundUser.role);

  if (foundUser.role === "admin") {
    navigate("/dashboard");
  } else {
    navigate("/EmployeeDashboard"); 
  }
};

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col md={{ span: 4, offset: 4 }}>
          <div className="shadow p-4 rounded bg-white">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="success" className="w-100 mb-3">
                Sign In
              </Button>
              <div className="d-flex align-items-center my-3">
                <hr className="flex-grow-1" />
                <span className="px-2 text-muted">OR</span>
                <hr className="flex-grow-1" />
              </div>
              <Button
                variant="primary"
                className="w-100"
                style={{
                  background: "linear-gradient(45deg, #8E2DE2 30%, #4A00E0 90%)",
                  border: "none",
                  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                }}
              >
                <i className="bi bi-google me-2"></i>
                Continue with Google
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
