
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
<<<<<<< HEAD
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Blog from "./Pages/Blog/Blog";
=======
import Restaurantsearch from "./Pages/Restaurantsearch/Restaurantsearch";
import Partnerwithus from "./Pages/Partnerwithus/Partnerwithus";
>>>>>>> bf3637ae70e15fe5d5e89f4613371978e20413dc

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
<<<<<<< HEAD
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blog" element={<Blog />} />

=======
        <Route path="restaurant-search" element={<Restaurantsearch/>}/>
        <Route path="partner-with-us" element={<Partnerwithus/>}/>
>>>>>>> bf3637ae70e15fe5d5e89f4613371978e20413dc
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
