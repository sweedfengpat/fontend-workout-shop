import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from '@mui/material/Container';

import Navbar from './components/Navbar';
import ButtonAdmin from './components/ButtonAdmin';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Forgot from './pages/users/Forgot';
import Cart from './pages/Cart';
import FollowShipping from './pages/FollowShipping';
import CheckOut from './pages/users/Checkout';
import History from './pages/users/History';

import ManageProduct from './pages/admin/ManageProduct';
import AddProduct from './pages/admin/AddProduct';
import Product from './pages/admin/Product';
import Order from './pages/admin/Order';
import OrderID from './pages/admin/OrderID';
import Track from './pages/admin/Track';

import Address from './pages/users/Address';
import Profile from './pages/users/Profile';
import Shipping from './pages/admin/Shipping';
import AllPayment from './pages/admin/AllPayment';
import OrderIDUser from './pages/users/OrderIDUser';
import ForgotPassword from './pages/admin/ForgotPassword';
import About from './pages/admin/About';
import ManageCategory from './pages/admin/ManageCategory';
import EditCategory from './pages/admin/EditCategory';
import EditAddress from './pages/users/EditAddress';




function App() {

  return (

      <BrowserRouter>
      <Navbar />
      <ButtonAdmin />


      <Container  maxWidth="xl">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/follow-shipping" element={<FollowShipping />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/order/:orderId" element={<OrderIDUser />} />
          <Route path="/history" element={<History />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/address" element={<Address />} />
          <Route path="/edit-address" element={<EditAddress />} />

          <Route path="/admin/manage-product" element={<ManageProduct />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/product" element={<Product />} />
          <Route path="/admin/order" element={<Order />} />
          <Route path="/admin/shipping" element={<Shipping />} />
          <Route path="/admin/order/:orderId" element={<OrderID />} />
          <Route path="/admin/all-payment" element={<AllPayment />} />
          <Route path="/admin/all-forgot" element={<ForgotPassword />} />
          <Route path="/admin/about" element={<About />} />
          <Route path="/admin/category" element={<ManageCategory />} />
          <Route path="/admin/edit-category" element={<EditCategory />} />
          <Route path="/admin/track/:id" element={<Track />} />
          <Route path="*" element={<Home />} />
      </Routes>
      </Container>

      </BrowserRouter>


  );
}

export default App;
