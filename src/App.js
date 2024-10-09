import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Footer } from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Features from "./Pages/Features/Features";
import { Solutions } from "./Pages/Solutions/Solutions";
import { Support } from "./Pages/Support/Support";
import "./App.css";
import { Home } from "./Pages/Home/Home";
import { Pricing } from "./Pages/Pricing/Pricing";
import { WhyKinesin } from "./Pages/WhyKinesin/WhyKinesin";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/why-kinesin"} element={<WhyKinesin />} />
          <Route path={"/features"} element={<Features />} />
          <Route path={"/solutions"} element={<Solutions />} />
          <Route path={"/pricing"} element={<Pricing />} />
          <Route path={"/support"} element={<Support />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
