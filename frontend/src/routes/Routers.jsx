import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import MyProfile from "../pages/MyProfile";
import Home from "../pages/Home";
import AddBalance from "../pages/AddBalance";
import BeSeller from "../pages/BeSeller";
import AddFood from "../pages/AddFood";
import Seller from "../pages/Seller";
import Food from "../pages/Food";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<MyProfile />} />
      <Route path="/addbalance" element={<AddBalance />} />
      <Route path="/seller" element={<Seller />} />
      <Route path="/beseller" element={<BeSeller />} />
      <Route path="/sellfood" element={<AddFood />} />
      <Route path="/food/:id" element={<Food />} />

      <Route path="*" element={<Home />} />
    </Routes>
  );
}
