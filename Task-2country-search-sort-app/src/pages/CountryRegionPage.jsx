import React from "react";
import { Link } from "react-router-dom";

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania", "Antarctic"];

const CountryRegionPage = () => {
  return (
    <div className="region-page">
      <h1>Regions</h1>
      <ul className="region-list">
        {regions.map((region) => (
          <li key={region}>
            <Link to={`/region/${region}`} className="region-link">
              {region}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryRegionPage;
