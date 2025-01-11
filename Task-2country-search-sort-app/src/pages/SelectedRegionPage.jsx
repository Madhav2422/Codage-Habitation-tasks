import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCountries } from "../../api";
import CountryCard from "../components/CountryCard.jsx";

const SelectedRegionPage = () => {
  const { regionName } = useParams(); // Get the region name from the URL
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRegionCountries = async () => {
      try {
        const allCountries = await fetchCountries();
        
     

        const filteredCountries = allCountries.filter((country) => {
          const countryRegion = country.region?.toLowerCase() || ""; // Handle undefined region
          return countryRegion === regionName.toLowerCase();
        });

        setCountries(filteredCountries);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching countries:", err);
        setError("Failed to fetch countries for the selected region.");
        setLoading(false);
      }
    };

    fetchRegionCountries();
  }, [regionName]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="selected-region-page">
      <h1>Countries in {regionName}</h1>
      <div className="country-list">
        {countries.length > 0 ? (
          countries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))
        ) : (
          <p>No countries found in this region.</p>
        )}
      </div>
    </div>
  );
};

export default SelectedRegionPage;
