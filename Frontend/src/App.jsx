
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import Restaurantsearch from "./Pages/Restaurantsearch/Restaurantsearch";
import Partnerwithus from "./Pages/Partnerwithus/Partnerwithus";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="restaurant-search" element={<Restaurantsearch/>}/>
        <Route path="partner-with-us" element={<Partnerwithus/>}/>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
