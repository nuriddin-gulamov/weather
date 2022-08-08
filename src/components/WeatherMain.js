import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faWind,
  faDroplet,
  faTemperatureHalf,
  faWifi,
} from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from './LoadingSpinner';

function WeatherMain({
  weatherData,
  weatherDegreeType,
  setWeatherDegreeType,
  weatherWindSpeedType,
  setWeatherWindSpeedType,
  isLoading,
  noInternet,
}) {
  const [now, setNow] = useState('DD MONTH, YYYY');
  const [enteredCity, setEnteredCity] = useState('');

  const inputRef = useRef();

  useEffect(() => {}, []);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!enteredCity.trim().length) {
      return (inputRef.current.style.borderColor = 'red');
    }
    localStorage.setItem(
      'q',
      enteredCity.toLowerCase().slice(0, 1).toUpperCase() +
        enteredCity.toLowerCase().slice(1)
    );
    window.location.reload();
  };

  const inputChangeHandler = (event) => {
    setEnteredCity(event.target.value);
  };

  const weatherDegreeTypeChangeHandler = () => {
    if (weatherDegreeType === 'c') setWeatherDegreeType('f');
    else setWeatherDegreeType('c');
  };

  const weatherWindSpeedTypeChangeHandler = () => {
    if (weatherWindSpeedType === 'k') setWeatherWindSpeedType('m');
    else setWeatherWindSpeedType('k');
  };

  const weatherCityChangeHandler = () => {
    localStorage.removeItem('q');
    window.location.reload();
  };

  return (
    <main className="weather__main">
      {!localStorage.getItem('q') ? (
        <div className="weather__city-input">
          <form onSubmit={formSubmitHandler}>
            <input
              className="form__input"
              placeholder="Hidden Placeholder"
              type="text"
              ref={inputRef}
              onChange={inputChangeHandler}
              value={enteredCity}
            />
            <label
              className="form__label"
              onClick={() => inputRef.current.focus()}
            >
              Enter the name of your city
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : !isLoading ? (
        !noInternet ? (
          <div>
            <div className="weather__top">
              <div className="weather__date">
                <h3>{weatherData.lastUpdated.split(' ')[0]}</h3>
              </div>
              <div className="weather__city" onClick={weatherCityChangeHandler}>
                {weatherData.weatherCity !== '-' ? (
                  <FontAwesomeIcon icon={faLocationDot} />
                ) : null}
                <h2>{weatherData.weatherCity}</h2>
              </div>
              <div className="weather__icon">
                <img
                  src={
                    weatherData.weatherIcon !== '-'
                      ? weatherData.weatherIcon
                      : ''
                  }
                  alt=""
                />
              </div>
              <div className="weather__condition">
                <h4>{weatherData.weatherCondition}</h4>
              </div>
              <div className="weather__degree">
                <h1 onClick={weatherDegreeTypeChangeHandler}>
                  {weatherDegreeType === 'c'
                    ? weatherData.weatherDegreeC !== '-'
                      ? Math.round(weatherData.weatherDegreeC) + '°C'
                      : '-'
                    : weatherData.weatherDegreeF !== '-'
                    ? Math.round(weatherData.weatherDegreeF) + '°F'
                    : '-'}
                </h1>
              </div>
            </div>
            <div className="weather__more-info">
              <div>
                <h4>Wind</h4>
                <FontAwesomeIcon icon={faWind} />
                <h3 onClick={weatherWindSpeedTypeChangeHandler}>
                  {weatherWindSpeedType === 'k'
                    ? weatherData.weatherWindK !== '-'
                      ? Math.round(weatherData.weatherWindK) + ' kph'
                      : '-'
                    : weatherData.weatherWindM !== '-'
                    ? Math.round(weatherData.weatherWindM) + ' mph'
                    : '-'}
                </h3>
              </div>
              <div>
                <h4>Humidity</h4>
                <FontAwesomeIcon icon={faDroplet} />
                <h3>
                  {weatherData.weatherHumidity !== '-'
                    ? weatherData.weatherHumidity + '%'
                    : '-'}
                </h3>
              </div>
              <div>
                <h4>Feeling</h4>
                <FontAwesomeIcon icon={faTemperatureHalf} />
                <h3 onClick={weatherDegreeTypeChangeHandler}>
                  {weatherDegreeType === 'c'
                    ? weatherData.weatherFeelingC !== '-'
                      ? Math.round(weatherData.weatherFeelingC) + '°C'
                      : '-'
                    : weatherData.weatherFeelingF !== '-'
                    ? Math.round(weatherData.weatherFeelingF) + '°F'
                    : '-'}
                </h3>
              </div>
            </div>
          </div>
        ) : (
          <div className="no-internet">
            <FontAwesomeIcon icon={faWifi} />
            <h3>
              No Internet Connection Available, please try <br /> again later.
            </h3>
          </div>
        )
      ) : (
        <div className="loading">
          <LoadingSpinner />
          <h3>Loading...</h3>
        </div>
      )}
    </main>
  );
}

export default WeatherMain;
// °
