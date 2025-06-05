import './index.css';

export const TextArea = ({
  id,
  name,
  value,
  onChange: handleInputChange,
  rows = 5,
  required = false,
  placeholder,
  labelText
}:
  {
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    rows?: number;
    required?: boolean;
    placeholder?: string;
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

      <textarea
        id={id}
        name={name}
        value={value}
        onChange={handleInputChange}
        rows={rows}
        required={required}
        placeholder={placeholder}
        className="kinodev-textarea"
      />
    </div>

  );
}