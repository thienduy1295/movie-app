import React from "react";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Home from "./components/Pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "./components/Pages/Search";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
