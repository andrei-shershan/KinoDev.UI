import './index.css';
import { InputType } from '../types';

export const Input = ({
  id,
  name,
  type,
  required,
  placeholder,
  value,
  labelText,
  onChange,
}: {
  id?: string,
  name?: string,
  type: InputType,
  required?: boolean,
  placeholder?: string,
  value?: string | readonly string[] | number | undefined,
  labelText?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
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

      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="kinodev-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange ? onChange(e) : undefined}
      />
    </div>
  );
}