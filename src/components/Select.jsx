const Select = (props) => {
  const { options, onChange } = props;

  return (
    <select onChange={onChange} className="text-black">
      {options.map((option) => (
        <option value={option.value}>{option.name}</option>
      ))}
    </select>
  );
};

export default Select;
