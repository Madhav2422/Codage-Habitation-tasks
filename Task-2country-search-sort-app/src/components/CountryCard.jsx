
import React from "react";
import { useNavigate } from "react-router-dom";

const CountryCard = ({ country }) => {
  const navigate = useNavigate();
  const { flags, name, cca3, region, borders } = country;

  const handleClick = () => {
    navigate(`/country/${name.common}`);
  };

  return (
    <div className="country-card" onClick={handleClick}>
      <img src={flags.png} alt={name.common} />
      <h3>{name.common}</h3>
      <p>Code: {cca3}</p>
      <p>Region: {region}</p>
      <p>Borders: {borders?.join(", ") || "None"}</p>
    </div>
  );
};

export default CountryCard;
