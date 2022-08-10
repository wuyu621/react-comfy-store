import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
  Home,
  About,
  SingleProduct,
  Cart,
  Checkout,
  Error,
  Products,
  PrivateRoute,
  AuthWrapper,
} from "./pages";

function App() {
  return (
    <AuthWrapper>
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="cart" element={<Cart />}></Route>
          <Route path="products" element={<Products />}></Route>
          <Route path="products/:id" element={<SingleProduct />}></Route>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route path="checkout" element={<Checkout />}></Route>
          </Route>

          <Route path="*" element={<Error />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthWrapper>
  );
}

export default App;
