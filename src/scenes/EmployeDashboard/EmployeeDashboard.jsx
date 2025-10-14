import React from "react";
import { useParams } from "react-router-dom";

import { Button, Card } from "react-bootstrap";

const EmployeeDashboard = () => {
    const { employeeId } = useParams();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));


    return (
      
            <div className="container mt-4">
                <h2>Employee Dashboard</h2>
                <p>Viewing dashboard for Employee Id: <strong>{employeeId}</strong></p>
                <h2>Welcome, {currentUser ? currentUser.name : "Employee"}!</h2>
                <div className="row g-4">
                    <div className="col-md-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>My Assigned Assets</Card.Title>
                                <Card.Text>View all the Assets currently available</Card.Text>
                                <Button variant = "primary" >View Assets</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>Request New Asset</Card.Title>
                                <Card.Text>Submit a request for a new asset</Card.Text>
                                <Button variant="success">Request Asset</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>Return Asset</Card.Title>
                                <Card.Text>Return an asset you no longer need</Card.Text>
                                <Button variant="danger">Return Asset</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        
    );
};

export default EmployeeDashboard;
