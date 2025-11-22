import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Collection from "./Pages/Collection"
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import NewListing from "./Pages/NewListing";
import Requests from "./Pages/Requests";
import NewRequest from "./Pages/NewRequest";
import Booking from "./Pages/Booking";
import PlaceOrder from "./Pages/PlaceOrder";
import Orders from "./Pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer, toast } from 'react-toastify';
import Verify from "./Pages/Verify";
import Profile from "./Pages/Profile";

const App = () => {
  return (
    <div className='min-h-screen bg-blue-50 flex flex-col'>
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <main className='flex-1 w-full'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection/>} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/privacy' element={<PrivacyPolicy />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/booking/:productId' element={<Booking />} />
          <Route path='/login' element={<Login />} />
          <Route path='/new-listing' element={<NewListing />} />
          <Route path='/requests' element={<Requests />} />
          <Route path='/requests/new' element={<NewRequest />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/verify' element={<Verify/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
