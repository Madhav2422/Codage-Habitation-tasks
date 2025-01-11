import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchCountries } from "../../api.js";

const CountryDetailsPage = () => {
  const { countryName } = useParams();
  const [country, setCountry] = useState(null);
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const allCountries = await fetchCountries();
      setCountries(allCountries);
      const selectedCountry = allCountries.find(
        (c) => c.name.common.toLowerCase() === countryName.toLowerCase()
      );
      setCountry(selectedCountry);
    };
    fetchData();
  }, [countryName]);

  if (!country) return <p>Loading...</p>;

  const { flags, name, cca3, region, borders } = country;

  // Find border countries by their codes
  const borderCountries =
    borders?.map((borderCode) =>
      countries.find((c) => c.cca3 === borderCode)
    ) || [];

  return (
    <div className="country-details">
      <img src={flags.png} alt={name.common} />
      <h1>{name.common}</h1>
      <p>
        <strong>Code:</strong> {cca3}
      </p>
      <p>
        <strong>Region:</strong> {region}
      </p>
      <p>
        <strong>Borders:</strong>{" "}
        {borderCountries.length > 0 ? (
          borderCountries.map((borderCountry) => (
            <button
              key={borderCountry.cca3}
              onClick={() => navigate(`/country/${borderCountry.name.common}`)}
              className="border-button"
            >
              {borderCountry.name.common}
            </button>
          ))
        ) : (
          "None"
        )}
      </p>
    </div>
  );
};

export default CountryDetailsPage;
