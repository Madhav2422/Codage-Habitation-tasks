import React from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CountryRegionPage from "./pages/CountryRegionPage";
import SelectedRegionPage from "./pages/SelectedRegionPage"; 
import CountryDetailsPage from "./pages/CountryDetailsPage";
import "./App.css";

const App = () => {
  return (
    <div>
      <header>
        <nav>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Home
          </NavLink>
          <NavLink
            to="/country-region"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Region
          </NavLink>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/country-region" element={<CountryRegionPage />} />
        <Route path="/region/:regionName" element={<SelectedRegionPage />} />
        <Route path="/country/:countryName" element={<CountryDetailsPage />} />
      </Routes>
    </div>
  );
};

export default App;
