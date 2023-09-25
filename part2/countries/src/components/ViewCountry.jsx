import axios from "axios";
import { useState, useEffect } from "react";

const ViewCountry = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = import.meta.env.VITE_API_KEY;
  const city = country.capital;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  let temp;
  let image;
  let wind;

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (weatherData !== null) {
    // console.log(weatherData);
    temp = weatherData.main.temp;
    image = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    wind = weatherData.wind.speed;
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital}</div>
      <div>Area {country.area}</div>
      <h2>Languages:</h2>
      <ul>
        {Object.values(country.languages).map((value, index) => {
          return <li key={index}>{value}</li>;
        })}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Weather in {country.capital}</h2>
      <p>Temperature {temp} Celcius</p>
      <img src={image} alt="" />
      <p>Wind {wind} m/s</p>
    </div>
  );
};

export default ViewCountry;
