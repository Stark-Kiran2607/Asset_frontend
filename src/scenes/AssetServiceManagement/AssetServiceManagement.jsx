import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AssetServiceManagement() {
  const [requestDate, setRequestDate] = useState(null);
  const [serviceGivenDate, setServiceGivenDate] = useState(null);

  return (
    <Container className="my-4">
      <h3 className="mb-4">Asset Service Management</h3>
      <Form>
        <Row className="mb-3">
          <Col md={6} className="mb-3">
            <Form.Label>Service ID</Form.Label>
            <Form.Control type="text" placeholder="Enter Service ID" />
          </Col>
          <Col md={6} className="mb-3">
            <Form.Label>Service Provider</Form.Label>
            <Form.Control type="text" placeholder="Enter Service Provider" />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6} className="mb-3">
            <Form.Label>Request ID</Form.Label>
            <Form.Control type="text" placeholder="Enter Request ID" />
          </Col>
          <Col md={6} className="mb-3">
            <Form.Label>Request Date</Form.Label>
            <DatePicker
              selected={requestDate}
              onChange={(date) => setRequestDate(date)}
              className="form-control"
              placeholderText="Select Request Date"
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6} className="mb-3">
            <Form.Label>Asset ID</Form.Label>
            <Form.Control type="text" placeholder="Enter Asset ID" />
          </Col>
          <Col md={6} className="mb-3">
            <Form.Label>Asset Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Asset Name" />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <Form.Label>Complain Detail</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Enter Complain Detail"
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>Service Completed Detail</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Enter Service Completed Detail"
            />
          </Col>
          <Col md={6}>
            <Form.Label>Service Given Date</Form.Label>
            <DatePicker
              selected={serviceGivenDate}
              onChange={(date) => setServiceGivenDate(date)}
              className="form-control"
              placeholderText="Select Service Given Date"
            />
          </Col>
        </Row>

        <Row className="mt-4">
          <Col className="d-flex justify-content-end gap-2">
            <Button variant="secondary">Cancel</Button>
            <Button variant="dark">Save</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
