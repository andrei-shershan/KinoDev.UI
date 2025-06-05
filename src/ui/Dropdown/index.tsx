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
      {
        labelText &&
        <div className="kinodev-label-container">
          <label htmlFor={id} className="kinodev-label-text">
            {labelText}
          </label>
        </div>
      }
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