import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/index";
import Register from "./pages/register/index";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
