import ViewCountry from "./ViewCountry";

const ShowCountries = ({ countries, showCountry }) => {
  if (countries.length > 10) {
    return <div>Too many matches, Specify another filter!</div>;
  } else if (countries.length === 1) {
    return <ViewCountry country={countries[0]} />;
  }

  return (
    <div>
      {countries.map((country) => (
        <div key={country.name.official}>
          {country.name.common}
          <button onClick={() => showCountry(country)}>Show</button>
        </div>
      ))}
    </div>
  );
};

export default ShowCountries;
