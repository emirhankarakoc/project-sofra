import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { APIURL, http } from "../assets/http";
import { Button, Spinner } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";

const MyProfile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await http.get(`${APIURL}/account/getMe`);
        console.log("User data:", response.data);
        setUserData(response.data);
        if (response.data.role == "ROLE_SELLER") {
          localStorage.setItem("userRole", "ROLE_SELLER");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Log in first.");
      }
    };

    if (localStorage.getItem("userToken")) {
      fetchUserData();
    }
  }, []);

  return (
    <div className="container">
      <NavigationBar />
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">My Profile</h3>
              {userData && (
                <div>
                  <p>
                    <strong>Email:</strong> {userData.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {userData.role}
                  </p>
                  <p>
                    <strong>Extra Info:</strong> {userData.extraInfo}
                  </p>
                  <p>
                    <strong>Balance:</strong> {userData.balance}
                  </p>
                  <div className="d-flex flex-row justify-content-between ">
                    <AddBalance />
                    <BeSeller />
                    <BackToHome />
                  </div>
                  <LogOut />
                </div>
              )}
              {!userData && (
                <div className="d-flex align-content-center justify-content-center flex-column ">
                  <div>No account, login first.</div>
                  <LoginOrBackToHome />
                </div>
              )}
              {error && (
                <div className="alert alert-success mt-3" role="alert">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

const LoginOrBackToHome = () => {
  return (
    <div className="d-flex justify-content-between mt-3">
      <Link to="/login" className="btn btn-success text-start">
        Login
      </Link>

      <Link to="/" className="btn btn-danger text-end">
        Back to Home
      </Link>
    </div>
  );
};
const BackToHome = () => {
  return (
    <div className="d-flex justify-content-between mt-3">
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
};
const AddBalance = () => {
  return (
    <div className="d-flex justify-content-between mt-3">
      <Link to="/addbalance" className="btn btn-warning">
        Add Balance
      </Link>
    </div>
  );
};
const BeSeller = () => {
  return (
    <div className="d-flex justify-content-between mt-3">
      <Link to="/beSeller" className="btn btn-success">
        Be Seller
      </Link>
    </div>
  );
};

const handleLogOut = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userRole");
  setTimeout(() => {
    window.location.href = "/";
  }, 1000);
};

const LogOut = () => {
  return (
    <div className="d-flex justify-content-between mt-3">
      <Button onClick={handleLogOut} variant="danger">
        Log Out
      </Button>
    </div>
  );
};
