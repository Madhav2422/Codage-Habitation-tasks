import React, { useState, useEffect } from "react";
import { fetchCountries } from "../../api.js";
import CountryCard from "../components/CountryCard.jsx";
import Header from "../components/Header.jsx";


const HomePage = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCountries()
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((err) => setError("Failed to load countries. Please try again."));
  }, []);

  const handleSearch = (query) => {
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleFilter = (type) => {
    const filtered =
      type === "all"
        ? countries
        : countries.filter(
            (country) => country.independent === (type === "independent")
          );
    setFilteredCountries(filtered);
  };

  return (
    <div>
      <Header onSearch={handleSearch} onFilter={handleFilter} />
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="country-list">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <CountryCard key={country.cca3} country={country} />
            ))
          ) : (
            <p className="no-results">No countries found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
