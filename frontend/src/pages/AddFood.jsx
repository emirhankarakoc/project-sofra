import React, { useState, useEffect } from "react";
import { APIURL, http } from "../assets/http";
import { Navbar, Carousel, Button, Spinner } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";

export default function AddFood() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    latitude: "",
    longitude: "",
  });
  const [files, setFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value, files: newFiles } = e.target;
    if (name === "multipartFile") {
      setFiles([...files, ...newFiles]);

      const newPreviewImages = Array.from(newFiles).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewImages([...previewImages, ...newPreviewImages]);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    files.forEach((file) => {
      data.append("multipartFiles", file);
    });
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("latitude", formData.latitude);
    data.append("longitude", formData.longitude);

    try {
      setIsLoading(true);
      const response = await http.post(`${APIURL}/seller/ad`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsLoading(false);
      setResponseMessage(
        `${previewImages.length} adet ürün başarıyla yüklendi, ürünlerinizin sayfasına yönlendiriliyorsunuz.`
      );
      setTimeout(() => {
        window.location.href = "/seller";
      }, 2000);
      console.log("Ads uploaded successfully");
    } catch (error) {
      setResponseMessage("Ürün yüklenirken bir hata oluştu.");

      console.error("Error uploading ads:", error);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="container mt-5">
        <h2 className="mb-4">Satacağın yemeğin ekle.</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <Carousel
              className="border p-2 border-black rounded"
              controls={previewImages.length > 1}
            >
              {previewImages.map((previewImage, index) => (
                <Carousel.Item key={index}>
                  <img
                    style={{ height: "500px" }}
                    className="d-block w-100"
                    src={previewImage}
                    alt={`Preview ${index}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>

            <label htmlFor="multipartFile">Resimler</label>
            <input
              type="file"
              className="form-control"
              id="multipartFile"
              name="multipartFile"
              onChange={handleChange}
              multiple
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">İsim</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Açıklama</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Fiyat</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-flex justify-content-center align-content-center flex-column">
            <Button type="submit">Gönder</Button>

            {responseMessage}
            {isLoading && (
              <div>
                <Spinner />
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
