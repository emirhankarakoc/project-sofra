import axios from "axios";
import React, { useState } from "react";
import { APIURL, http } from "../../assets/http";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registerData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${APIURL}/account/register`,
        registerData
      );
      console.log("Registration successful:", response.data);
      setResponseMessage("Registration successful, you can log in now.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      // Burada başarılı kayıt durumunda kullanıcıyı yönlendirebilir veya başka bir işlem yapabilirsiniz.
    } catch (error) {
      console.error("Registration error:", error);
      setResponseMessage("Registration failed. Try again.");

      // Hata durumunda kullanıcıya bildirim verebilir veya başka bir işlem yapabilirsiniz.
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Register</h3>
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
                  Register
                </button>

                {responseMessage && (
                  <div className="alert alert-danger mt-3">
                    {responseMessage}
                  </div>
                )}
                <div>
                  Already have an account?
                  <a href="/login"> Click here !</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
