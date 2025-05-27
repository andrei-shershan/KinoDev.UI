const Dropdown = ({
  id,
  options,
  onChange,
  selectedValue,
  labelText
}: {
  id?: string,
  options: { value: string; label: string }[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedValue?: string;
  labelText?: string;
}) => {

  return (
    <div>
      <label htmlFor="valueDropdown">{labelText}</label>
      <select
        id={id}
        value={selectedValue}
        onChange={onChange}
        className="form-select"
      >
        {
          options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))
        }
      </select>
    </div>
  );

}

export default Dropdown;