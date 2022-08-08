import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Weather from "./components/Weather";

function App() {
  // DO NOT RECOMMENDED TO OPEN
  const [weather, setWeather] = useState({
    weatherCity: "-",
    weatherIcon: "-",
    weatherCondition: "-",
    weatherDegreeC: "-",
    weatherDegreeF: "-",
    weatherWind: "-",
    weatherHumidity: "-",
    weatherFeelingC: "-",
    weatherFeelingF: "-",
    lastUpdated: "YYYY-MM-DD HH:MM",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [noInternet, setNoInternet] = useState(false);

  useEffect(() => {
    fetchWeather();
  }, []);

  function fetchWeather() {
    window.onoffline = () => {
      return setNoInternet(true);
    };
    window.ononline = () => {
      setNoInternet(false);
    };
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=75b9336d0fbe4322a0563741221503&q=${localStorage.getItem(
        "q"
      )}&days=3&aqi=no&alerts=no`
    )
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log(json);
        setWeather({
          weatherCity: json.location.name,
          weatherIcon: json.current.condition.icon,
          weatherCondition: json.current.condition.text,
          weatherDegreeC: json.current.temp_c,
          weatherDegreeF: json.current.temp_f,
          weatherWindK: json.current.wind_kph,
          weatherWindM: json.current.wind_mph,
          weatherHumidity: json.current.humidity,
          weatherFeelingC: json.current.feelslike_c,
          weatherFeelingF: json.current.feelslike_f,
          lastUpdated: json.current.last_updated,
        });
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch(error => {
        if (error instanceof Error) {
          localStorage.removeItem("q");
          window.location.reload();
        }
      });
  }

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Weather
                weatherData={weather}
                isLoading={isLoading}
                noInternet={noInternet}
              />
              <p>
                <em>
                  Copyright &copy; by Nuriddin Gulamov. Only the use of this app
                  is allowed. <br /> Don't claim it as your own or use for
                  portfolio.
                </em>
              </p>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
