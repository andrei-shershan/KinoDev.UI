import { MovieShowTimeDetails } from "../../models/api.models";

import './showTimeButton.css';

export const getShowTimeTime = (fullDate: Date) => {
  var date = new Date(fullDate);
  var hours = date.getHours().toString().padStart(2, '0');
  var minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}

interface ShowTimeButtonProps {
  movieShowTimeDetails: MovieShowTimeDetails;
  onClick: (showTimeId: number) => void;
}

const ShowTimeButton = ({ movieShowTimeDetails, onClick }: ShowTimeButtonProps) => {  return (
    <button
      className={`show-time-button ${movieShowTimeDetails.isSellingAvailable 
        ? 'show-time-button--available' 
        : 'show-time-button--unavailable'}`}
      disabled={!movieShowTimeDetails.isSellingAvailable}
      onClick={() => onClick(movieShowTimeDetails.id)}
    >
      {getShowTimeTime(movieShowTimeDetails.time)}
    </button>
  );
}

export default ShowTimeButton;