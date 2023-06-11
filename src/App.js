import React, { useState } from "react";

const App = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [forecastData, setForecastData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fetch weather forecast data using the provided API
    fetch(
      `http://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Process the weather forecast data
        const timeseries = data.properties.timeseries.slice(0, 30); // Get the first 30 timeseries objects
        setForecastData(timeseries);
      })
      .catch((error) => {
        console.log(error); // Handle any errors
      });
  };

  return (
    <div id="root">
      <h1>Weather Forecast</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="latitude">Latitude:</label>
        <input
          type="text"
          id="latitude"
          className="latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <label htmlFor="longitude">Longitude:</label>
        <input
          type="text"
          id="longitude"
          className="longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <button type="submit">Get Forecast</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Temperature (°C)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecastData.map((forecast) => (
            <tr key={forecast.time}>
              <td>{new Date(forecast.time).toLocaleString()}</td>
              <td>
                {forecast.data.instant.details.air_temperature.toFixed(1)}
              </td>
              <td>{forecast.data.next_1_hours.summary.symbol_code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
