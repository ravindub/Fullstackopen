import { useEffect, useState } from "react";
import axios from "axios";
import FindCountries from "./components/FindCountries";
import ShowCountries from "./components/ShowCountries";
import ViewCountry from "./components/ViewCountry";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState(null);
  let country;

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const countriesToShow = countries.filter((country) =>
    country.name.common.toLocaleLowerCase().includes(input.toLocaleLowerCase())
  );

  const handleInputChange = (event) => {
    setInput(event.target.value);
    setSelected(null);
  };

  const showCountry = (country) => {
    setSelected(country);
  };

  if (selected !== null) {
    country = <ViewCountry country={selected} />;
  } else {
    country = (
      <ShowCountries countries={countriesToShow} showCountry={showCountry} />
    );
  }

  return (
    <div>
      <FindCountries input={input} handleInputChange={handleInputChange} />
      {country}
    </div>
  );
};

export default App;
