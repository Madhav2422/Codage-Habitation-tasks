import React, { useState } from "react";

const Header = ({ onSearch, onFilter }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchText); // Trigger the search callback only on button click
  };

  const handleFilter = (e) => {
    onFilter(e.target.value);
  };

  return (
    <header>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name, region, or code"
          value={searchText}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>
      <select onChange={handleFilter}>
        <option value="all">All</option>
        <option value="independent">Independent</option>
        <option value="dependent">Dependent</option>
      </select>
    </header>
  );
};

export default Header;
