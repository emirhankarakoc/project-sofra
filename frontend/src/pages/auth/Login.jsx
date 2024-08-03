import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/NavigationBar";
import { APIURL, http, userToken } from "../../assets/http"; // Örnek olarak kullanılan APIURL ve http yapılandırması
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${APIURL}/account/login`, loginData);
      console.log("Login successful:", response.data.accessToken);
      localStorage.setItem("userToken", response.data.accessToken);
      Cookies.set("login", "true", { expires: 30 });
      setResponseMessage("Login successful.");
      setTimeout(() => {
        navigate("/"); // Başarılı giriş sonrası ana sayfaya yönlendirme
      }, 2000);
    } catch (error) {
      console.error("Login error:", error);
      setResponseMessage(`Login failed. Error message: ${error}`);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success">
                  Login
                </button>

                {responseMessage && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {responseMessage}
                  </div>
                )}
                <div>
                  Don't created account yet?
                  <a href="/register">Click here !</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
