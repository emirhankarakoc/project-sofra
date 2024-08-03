import React, { useState, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { APIURL, http } from "../assets/http";
import { Link } from "react-router-dom";

export default function Seller() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const response = await http.get(`${APIURL}/seller/ads`);
      setAds(response.data); // API'den gelen verileri state'e kaydet
      console.log(ads);
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="bg-warning">
        <Container fluid>
          <Row>
            <Col className="border border-white p-3" sm={3}>
              <div className="d-flex justify-content-lg-start align-content-center flex-column">
                <div>Menu</div>
                <Button>Sat</Button>
                <Button variant="danger">Gelir / Gider Takip</Button>
              </div>
            </Col>
            <Col className="border border-white p-3" sm={9}>
              {ads &&
                ads.map((ad) => (
                  <Card
                    key={ad.id}
                    className="mb-3"
                    style={{ height: "200px" }}
                  >
                    <Row className="g-0">
                      <Col sm={3}>
                        <Card.Img
                          style={{
                            maxHeight: "200px",
                            objectFit: "contain",
                          }}
                          src={ad.photoPaths[0]}
                          alt="ad photo"
                        />
                      </Col>
                      <Col sm={6}>
                        <Card.Body>
                          <Card.Title>{ad.name}</Card.Title>
                          <Card.Text>
                            {ad.description} - {ad.price} TL
                          </Card.Text>
                        </Card.Body>
                      </Col>
                      <Col
                        sm={3}
                        className="d-flex align-items-center justify-content-center"
                      >
                        <Link to={`/food/${ad.id}`}>
                          <Button variant="primary">İncele</Button>
                        </Link>{" "}
                      </Col>
                    </Row>
                  </Card>
                ))}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
