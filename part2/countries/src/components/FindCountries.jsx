const FindCountries = (props) => {
  return (
    <div>
      Find Countries :
      <input value={props.input} onChange={props.handleInputChange} />
    </div>
  );
};

export default FindCountries;
