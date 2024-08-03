import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import { Col, Container, Row, Carousel, Button } from "react-bootstrap";
import axios from "axios";
import { APIURL, http } from "../assets/http";

const Food = () => {
  let { id } = useParams();
  const [foodAd, setFoodAd] = useState(null);

  useEffect(() => {
    const fetchFoodAd = async () => {
      try {
        const response = await http.get(`${APIURL}/users/food/${id}`);
        setFoodAd(response.data);
      } catch (error) {
        console.error("Error fetching food ad:", error);
      }
    };
    fetchFoodAd();
  }, [id]);

  if (!foodAd) return <div>Loading...</div>;

  // Function to generate Google Maps link
  const generateGoogleMapsLink = () => {
    const { latitude, longitude } = foodAd;
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  };

  // Function to generate Apple Maps link
  const generateAppleMapsLink = () => {
    const { latitude, longitude } = foodAd;
    return `http://maps.apple.com/maps?daddr=${latitude},${longitude}&amp;ll=`;
  };

  return (
    <div>
      <NavigationBar />
      <Container>
        <Row className="my-4">
          <Col>
            <Carousel>
              {foodAd.photoPaths.map((photoPath, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={photoPath}
                    alt={`Slide ${index}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col>
            <h2>{foodAd.name}</h2>
            <p>{foodAd.description}</p>
            <p>Ücret: {foodAd.price} TL</p>
            <div className="d-flex flex-column gap-2">
              <Button>Satın Al</Button>
              <Button variant="success">Satıcıyla İletişime Geç</Button>
              <Button
                variant="danger"
                href={generateGoogleMapsLink()}
                target="_blank"
              >
                Google Maps'te Gör
              </Button>
              <Button
                variant="warning"
                href={generateAppleMapsLink()}
                target="_blank"
              >
                Apple Haritalar'da Gör
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Food;
