import { IMovieShowTimeDetails } from "../models/applicationContext.model";

const getShowTimeTime = (fullDate: Date) => {
  var date = new Date(fullDate);
  var hours = date.getHours().toString().padStart(2, '0');
  var minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}

interface ShowTimeButtonProps {
  movieShowTimeDetails: IMovieShowTimeDetails;
  onClick: (showTimeId: number) => void;
}

const ShowTimeButton = ({ movieShowTimeDetails, onClick }: ShowTimeButtonProps) => {
  return (
    <button
      style={{
        padding: '4px 15px',
        borderRadius: '6px',
        border: '1px solid #d9d9d9',
        backgroundColor: 'transparent',
        cursor: movieShowTimeDetails.isSellingAvailable ? 'pointer' : 'not-allowed',
        opacity: movieShowTimeDetails.isSellingAvailable ? 1 : 0.5
      }}
      disabled={!movieShowTimeDetails.isSellingAvailable}
      onClick={() => onClick(movieShowTimeDetails.id)}
    >
      {getShowTimeTime(movieShowTimeDetails.time)}
    </button>
  );
}

export default ShowTimeButton;