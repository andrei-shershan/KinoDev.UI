import './index.css'

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
      <br />
      <select
        id={id}
        value={selectedValue}
        onChange={onChange}
        className="form-select"
      >
        <option value="" disabled>Select an option...</option>
        {
          options.map((option, index) => (
            <option key={index} value={option.value} className="dropdown-option">
              {option.label}
            </option>
          ))
        }
      </select>
    </div>
  );

}

export default Dropdown;