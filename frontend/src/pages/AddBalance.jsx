import React, { useState } from "react";
import axios from "axios";
import NavigationBar from "../components/NavigationBar";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { APIURL, http, httpError } from "../assets/http";

export default function AddBalance() {
  const [amount, setAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestbody = {
        amount: amount,
      };

      const response = await http.post(
        `${APIURL}/users/balance/add`,
        requestbody
      );

      console.log("Server Response:", response.data);
      setMessage("İşlem başarıyla gerçekleştirildi.");
      setTimeout(() => {
        window.location.href = "/profile";
      }, 2000);
    } catch (error) {
      httpError("Hata:", error);
      setMessage("İşlem sırasında bir hata oluştu.");
    }
  };

  return (
    <div>
      <NavigationBar />

      <Container fluid className="bg-light" style={{ height: "100vh" }}>
        <Row
          className="justify-content-center align-items-center"
          style={{ height: "100%" }}
        >
          <Col md={6} className="p-4 rounded shadow-lg bg-white">
            <h2 className="mb-4 text-center">Kart Bilgileriyle Bakiye Ekle</h2>
            {message && <p className="text-center text-success">{message}</p>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="amountInput">
                <Form.Label>Eklemek İstediğiniz Tutar (TL)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Tutarı girin"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="cardNumberInput">
                <Form.Label>Kart Numarası</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Kart numarasını girin"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="expiryDateInput">
                <Form.Label>Son Kullanma Tarihi</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="MM/YYYY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="cvvInput">
                <Form.Label>CVV</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 mt-3">
                Gönder
              </Button>
            </Form>
            <p className="mt-3">
              Kart numarası, expiration ve CVV deneme sürecinde olduğu için
              kullanıma kapatılmıştır. İstediğiniz miktarı yükleyebilirsiniz.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
