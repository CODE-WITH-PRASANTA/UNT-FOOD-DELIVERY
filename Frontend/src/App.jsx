
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
import Privicypolicy from "./Pages/Privicypolicy/Privicypolicy";
import Termandcondition from "./Pages/Termandcondition/Termandcondition";
import About from "./Pages/About/About";
import Blog from "./Pages/Blog/Blog";
import Contact from "./Pages/Contact/Contact";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About/>}/>
        <Route path="contact" element={<Contact/>}/>
        <Route path="blog" element={<Blog/>}/>
        <Route path="restaurant-search" element={<Restaurantsearch/>}/>
        <Route path="partner" element={<Partnerwithus/>}/>
        <Route path="privacy" element={<Privicypolicy/>}/>
        <Route path="terms" element={<Termandcondition/>}/>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
