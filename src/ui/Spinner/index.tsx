import './index.css';

export const Spinner = () => {
  return (
    <div className="spinner-wrapper">
      <div className="spinner-container">
        <div className="spinner-square" />
        <div className="spinner-square" />
        <div className="spinner-square" />
      </div>
    </div>
  );
}