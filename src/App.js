import "./App.css";
import Search from "./Components/Search/Search";
import Weather from "./Components/Weather/Weather";
import React, { useState } from "react";

function App() {
  const [weatherico, setWeatherIco] = useState("");
  const [location, setLocation] = useState("");
  const [temp, setTemp] = useState("");
  const [weatherToggle, setTogg] = useState(false);
  const onSearchChange = (searchData) => {
    console.log("SearchData", searchData);
    console.log("lng:", searchData.value[0], " lat:", searchData.value[1]);
    const lat = searchData.value[0];
    const lng = searchData.value[1];
    console.log(searchData.label);
    setLocation(searchData.label);
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
        encodeURIComponent(lat) +
        "&lon=" +
        encodeURIComponent(lng) +
        "&appid=5cec10b78e973a3a6a8c071ff79b294a"
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        console.log("icon:", response.weather[0].icon);
        setWeatherIco(response.weather[0].icon);
        setTemp(Math.floor(response.main.temp - 273.15));
        setTogg(true);
      });
  };

  return (
    <>
      <div
        className="background"
        style={{
          backgroundImage: "url(./bgrounds/" + weatherico + ".jpeg)",
          height: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="container">
        <header className="appHeader">
          <Search onSearchChange={onSearchChange} />
        </header>
        {weatherToggle === true && (
          <Weather icon={weatherico} location={location} temp={temp} />
        )}
      </div>
    </>
  );
}

export default App;
