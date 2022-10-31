import { AsyncPaginate } from "react-select-async-paginate";
import React, { useState } from "react";

const Search = ({ onSearchChange }) => {
  const [value, setValue] = useState();
  const url = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
  const loadOptions = (inputValue) => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "437e8ff706mshbf3376467f885b4p17f51ejsn7784e9a5475b",
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    };

    return fetch(url + "?minPopulation=50000&namePrefix=" + inputValue, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        return {
          options: response.data.map((city) => {
            return {
              value: [city.latitude, city.longitude],
              label: city.city + ", " + city.country,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (searchData) => {
    setValue(searchData);
    onSearchChange(searchData);
  };

  return (
    <div
      style={{
        width: "80%",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      <AsyncPaginate
        value="Search"
        onChange={handleChange}
        debounceTimeout={600}
        placeholder="Type a city name"
        loadOptions={loadOptions}
      />
    </div>
  );
};

export default Search;
