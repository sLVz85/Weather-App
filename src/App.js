import React, { useState } from "react";
import "./index.css";
import CurrentTemperature from "./components/CurrentTemperature";
import Card from "./components/Card";
import axios from "axios";

const API_KEY = "38a7b969c9984665a07144649240402";

const App = () => {
  const [inputLocation, setInputLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentInfo, setCurrentInfo] = useState({});
  const [forecastInfo, setForecastInfo] = useState({});

  const handleLocation = async (e) => {
    if (e.key === "Enter") {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${inputLocation}`
        );
        const data = response.data;
        // Puoi ora gestire i dati ricevuti dalla chiamata API come desideri

        setCurrentInfo(data);
        setInputLocation("");
      } catch (error) {
        console.error("Errore nella chiamata API", error);
        // Puoi gestire l'errore qui, ad esempio mostrando un messaggio all'utente
      }
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&days=7&q=${inputLocation}`
        );
        const data = response.data;
        // Puoi ora gestire i dati ricevuti dalla chiamata API come desideri
        console.log(data);

        setForecastInfo(data.forecast.forecastday);
        setInputLocation("");
        console.log(forecastInfo);
      } catch (error) {
        console.error("Errore nella chiamata API", error);
        // Puoi gestire l'errore qui, ad esempio mostrando un messaggio all'utente
      }
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="title">Weather React Forecast</h1>
      <input
        type="text"
        placeholder="  Enter Location"
        className="input-text"
        value={inputLocation}
        onChange={(e) => setInputLocation(e.target.value)}
        onKeyDown={(e) => handleLocation(e)}
      />

      {currentInfo && currentInfo.current && !isLoading && (
        <CurrentTemperature
          city={currentInfo.location.name}
          country={currentInfo.location.country}
          icon={currentInfo.current.condition.icon}
          degree={currentInfo.current.temp_c}
          wind={currentInfo.current.wind_mph}
          humidity={currentInfo.current.humidity}
        />
      )}
      {!isLoading && (
        <section style={{ display: "flex", marginTop: "30px" }}>
          {Array.isArray(forecastInfo) &&
            forecastInfo.length > 0 &&
            forecastInfo
              .slice(1)
              .map((card) => (
                <Card
                  date={card.date}
                  maxTemp={card.day.maxtemp_c}
                  minTemp={card.day.mintemp_c}
                  icon={card.day.condition.icon}
                  sunrise={card.astro.sunrise}
                  sunset={card.astro.sunset}
                />
              ))}
        </section>
      )}
      {isLoading && <p>Loading Weather Info</p>}
    </div>
  );
};

export default App;
