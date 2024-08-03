import React, { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function MapComponent({ apiKey, foodListings }) {
  const mapRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);

  useEffect(() => {
    // Load Google Maps API
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Initialize map
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 40.35067811747749, lng: 49.80278309694586 }, // Default center
        zoom: 15, // Zoom level
        styles: [
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ visibility: "on" }],
          },
          {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "transit",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      });

      // Get user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation({ lat: latitude, lng: longitude });

            // Center map on user's location
            map.setCenter({ lat: latitude, lng: longitude });

            // Add marker for user's location
            new window.google.maps.Marker({
              position: { lat: latitude, lng: longitude },
              map,
              title: "Konumunuz",
            });
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }

      // Add markers for food listings
      foodListings.forEach((listing) => {
        const marker = new window.google.maps.Marker({
          position: { lat: listing.latitude, lng: listing.longitude },
          map,
          title: listing.name,
        });

        // Marker'a tıklandığında modal'ı aç
        marker.addListener("click", () => {
          setSelectedListing(listing); // Seçili yemek listesini güncelle
        });
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [apiKey, foodListings]);

  // Modal componentini render etmek için
  return (
    <>
      <div style={{ width: "100%", height: "calc(100vh - 56px)" }} ref={mapRef}>
        {/* 56px, NavigationBar'ın yaklaşık yüksekliğidir */}
        Loading map...
      </div>

      {/* Bootstrap Modal */}
      <Modal show={!!selectedListing} onHide={() => setSelectedListing(null)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedListing?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Description: {selectedListing?.description}</p>
          <p>Price: {selectedListing?.price}</p>
          <img
            src={selectedListing?.photoPaths[0]}
            alt="Food"
            style={{ maxWidth: "100%" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Link to={`/food/${selectedListing?.id}`}>
            {" "}
            <Button variant="success">Incele</Button>
          </Link>
          <Button variant="secondary" onClick={() => setSelectedListing(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MapComponent;
