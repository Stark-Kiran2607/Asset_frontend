import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";


export default function SignIn(props) {
    const [isLogin, setIsLogin] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        localStorage.setItem("isLoggedIn", true);
        let isAuthorized = localStorage.getItem("isLoggedIn");
        if (isAuthorized){
            setIsLogin(true);
        }
    };
    props.onLogin(isLogin);

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{minHeight: "100vh"}} >
            <Row className="w-100">
                <Col md={{span: 4, offset: 4}}>
                    <div className="shadow p-4 rounded bg-white">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="email" className="mb-3">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="email" placeholder="Enter Email" required />
                            </Form.Group>
                            <Form.Group controlId="password" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" required />
                            </Form.Group>
                            <Button type="submit" variant="success" className="w-100 mb-3" onClick={handleSubmit}>
                                Sign In
                            </Button>
                            <div className="d-flex align-items-center my-3">
                                <hr className="flex-grow-1" />
                                <span className="px-2 text-muted">OR</span>
                                <hr className="flex-grow-1" />
                            </div>
                            <Button variant="primary" className="w-100" style={{
                                background: "linear-gradient(45deg, #8E2DE2 30%, #4A00E0 90%)",
                                border: NamedNodeMap,
                                boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
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
