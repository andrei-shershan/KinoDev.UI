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
  min,
  max,
  width,
  accept
}: {
  id?: string,
  name?: string,
  type: InputType,
  required?: boolean,
  placeholder?: string,
  value?: string | readonly string[] | number | boolean | undefined,
  labelText?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  min?: number,
  max?: number,
  width?: number,
  accept?: string,

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
        accept={accept}
        required={required}
        className="kinodev-input"
        style={{ width: width ? `${width}px` : '' }}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange ? onChange(e) : undefined}
        min={min}
        max={max}
      />
    </div>
  );
}