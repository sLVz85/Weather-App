import "../index.css";

function CurrentTemperature({ city, country, icon, degree, wind, humidity }) {
  return (
    <div>
      <h1 className="city">
        {city}, {country}
      </h1>
      <img src={icon} alt="sunny" className="main-temp-image" />
      <p className="degree">{degree}°C</p>
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        <p className="details">Wind {wind}mph</p>
        <p className="details">Humidity %{humidity}</p>
      </section>
    </div>
  );
}

export default CurrentTemperature;
