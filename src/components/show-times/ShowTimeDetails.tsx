import { ShowTimeDetailsApiModel } from "../../models/api.models";
import useIsMobile from "../../hooks/useIsMobile";
import './ShowTimeDetails.css'; 
import { getImageSourceUrl } from "../../utils/images";

const ShowTimeDetailsComponent = (
  {
    showTimeDetails,
    isBooking
  }:
    {
      showTimeDetails: ShowTimeDetailsApiModel,
      isBooking: boolean
    }) => {

  const { movie } = showTimeDetails;
  const isMobile = useIsMobile();

  // Get appropriate image class based on device and booking state
  const getImageClass = () => {
    if (isMobile) {
      return isBooking ? 'movie-image-mobile-booking' : 'movie-image-mobile';
    } else {
      return isBooking ? 'movie-image-desktop-booking' : 'movie-image-desktop';
    }
  };

  return (
    <div className="show-time-details-container">
      <div 
        className={`movie-image ${getImageClass()}`}
        style={{ backgroundImage: `url(${getImageSourceUrl(movie.url)})` }}
      >
      </div>
      <div className="movie-details">
        <h1>{movie.name}</h1>
        <p>{movie.releaseDate.toString()}</p>
        <p>{movie.duration}</p>
        {/* Show description only when not in booking mode and on desktop */}
        {!isBooking && !isMobile && <p>{movie.description}</p>}
      </div>
    </div>
  );
};

export default ShowTimeDetailsComponent;