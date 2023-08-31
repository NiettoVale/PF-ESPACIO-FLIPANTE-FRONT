import React from "react";


export default function SearchBar({ busqueda, setBusqueda, filterSearch }) {
  const handleChange = (event) => {
    setBusqueda(event.target.value);
    filterSearch(event.target.value)
  };

  return (
    <div >
      <input
        type="search"
        value={busqueda}
        onChange={handleChange}
      />
    </div>
  );
}