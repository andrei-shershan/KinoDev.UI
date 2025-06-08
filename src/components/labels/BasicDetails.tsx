import './basic-details.css';

export const BasicDetails: React.FC<{
  label?: string;
  details: string;
  multiline?: boolean;
  children?: React.ReactNode;
}> = ({ label, details, multiline, children }) => {

  return (
    <div className={`basic-details ${multiline ? 'multiline' : ''} `} >
      {
        label && <span className="label">{label}:</span>
      }

      {
        children && <span className="label">{children}</span>
      }

      <span className="details">{details}</span>
    </div>
  );
}
