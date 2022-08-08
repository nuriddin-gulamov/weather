import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

function WeatherFooter() {
  return (
    <div className="weather__footer">
      <FontAwesomeIcon icon={faGear} />
    </div>
  );
}

export default WeatherFooter;
