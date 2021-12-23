import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/index";
import Register from "./pages/register/index";
import Init from "./pages/Init/index"
import ShoppingCar from "./pages/shoppingCar/index"
import StoreMenu from "./pages/storeMenu/index"
import Admin from "./pages/admin";
import InSafeguard from "./pages/inSafeguard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/init" element={<Init />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/shoppingCar" element={<ShoppingCar />} />
      <Route path="/storeMenu" element={<StoreMenu />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/safeguard" element={<InSafeguard />} />
    </Routes>
  );
};

export default App;
