import './index.css';

export const Notification = ({ message }: { message: string }) => {
  return (
    <div className="notification">
      <p>{message}</p>
    </div>
  );
}