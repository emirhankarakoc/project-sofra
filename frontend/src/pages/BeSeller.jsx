import React, { useState } from "react";
import NavigationBar from "../components/NavigationBar";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { APIURL, http } from "../assets/http";

export default function BeSeller() {
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleAgreementChange = () => {
    setAgreementChecked(!agreementChecked);
  };

  const handleSubmit = async () => {
    if (!agreementChecked) {
      alert("Kullanıcı sözleşmesini onaylamadan işlem gerçekleştiremezsiniz.");
      return;
    }

    try {
      const response = await http.put(`${APIURL}/account/type/seller`);
      localStorage.setItem("userToken", response.data.extraInfo);
      //burada extrainfo, gelen jwt tokenimiz aslinda. headerda vermeyi beceremdigim icin boyle yapmak zorunda kaldim dostum. hemen atlama.

      console.log("İşlem gerçekleştirildi.");
      setResponseMessage(
        "Tebrikler, artık satıcı oldunuz.! 2 saniye sonra yönlendirileceksiniz."
      );
      setTimeout(() => {
        window.location.href = "/profile";
      }, 2000);
    } catch (error) {
      console.error("İşlem sırasında bir hata oluştu:", error);
    }
  };

  return (
    <div>
      <NavigationBar />
      {responseMessage && (
        <Container fluid className="bg-light" style={{ height: "100vh" }}>
          <Row
            className="justify-content-center align-items-center"
            style={{ height: "100%" }}
          >
            <Col md={6} className="p-4 rounded shadow-lg bg-white">
              <h2 className="mb-4 text-center">Satıcı Sözleşmesi ve Onay</h2>
              <div className="d-flex justify-content-center align-content-center flex-column">
                {responseMessage}
                <Button className="my-1">Kutla</Button>
                <p className="my-1">
                  simdilik kutla butonu deaktif, ilerleyen zamanda konfeti
                  patlattiracagiz.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      )}
      {!responseMessage && (
        <Container fluid className="bg-light" style={{ height: "100vh" }}>
          <Row
            className="justify-content-center align-items-center"
            style={{ height: "100%" }}
          >
            <Col md={6} className="p-4 rounded shadow-lg bg-white">
              <h2 className="mb-4 text-center">Satıcı Sözleşmesi ve Onay</h2>

              <Form>
                <div className="border border-black p-1">
                  <p className="mt-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla vitae elit libero, a pharetra augue. Donec sed odio
                    dui. Maecenas faucibus mollis interdum.
                  </p>
                </div>
                <Form.Group controlId="agreementCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Satıcı sözleşmesini okudum ve kabul ediyorum."
                    checked={agreementChecked}
                    onChange={handleAgreementChange}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="button"
                  className="w-100 mt-3"
                  onClick={handleSubmit}
                  disabled={!agreementChecked}
                >
                  Onayla
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}
