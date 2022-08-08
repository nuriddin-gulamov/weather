import React, { useState } from 'react';
import WeatherFooter from './WeatherFooter';
import WeatherMain from './WeatherMain';

function Weather({ weatherData, isLoading, noInternet }) {
  const [weatherDegreeType, setWeatherDegreeType] = useState('c');
  const [weatherWindSpeedType, setWeatherWindSpeedType] = useState('k');

  return (
    <div className="weather">
      <WeatherMain
        weatherData={weatherData}
        weatherDegreeType={weatherDegreeType}
        setWeatherDegreeType={setWeatherDegreeType}
        weatherWindSpeedType={weatherWindSpeedType}
        setWeatherWindSpeedType={setWeatherWindSpeedType}
        isLoading={isLoading}
        noInternet={noInternet}
      />
    </div>
  );
}

export default Weather;
