import "./Weather.css";

const Weather = (props) => {
  const loc = props.location.split(",");
  return (
    <div className="Weather">
      <header>
        <div>
          <h1>{loc[0]}</h1>
          <h2>{loc[1]}</h2>
        </div>
        <div className="icon">
          <span
            style={{
              padding: "0.3rem",
              background: "#cacaca",
              borderRadius: "14px",
            }}
          >
            <img src={"icons/" + props.icon + ".png"} alt="icon" width="70" />
          </span>
        </div>
      </header>
      <section className="mainWeather">
        <div className="temp">{props.temp}&#176;</div>
      </section>
    </div>
  );
};

export default Weather;
