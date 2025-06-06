import useIsMobile from "../../hooks/useIsMobile";
import { MovieShowTimes } from "../../models/api.models";
import { getImageSourceUrl } from "../../utils/images";
import ShowTimeButton from "./showTimeButton";

import './showingMovieCard.css';

export const ShowingMovieCard = ({ movie, handleShowTimeClick }:
  {
    movie: MovieShowTimes,
    handleShowTimeClick: (showTimeId: number) => void
  }
) => {
  const isMobile = useIsMobile();

  return (
    <div className="showing-movie-card">
      <div className={`poster-container ${isMobile ? 'poster-container-mobile' : 'poster-container-desktop'}`}>
        <div className={`movie-poster-wrapper ${isMobile ? 'poster-wrapper-mobile' : ''}`}>
          <div className={`movie-poster-container poster-container-img ${isMobile ? 'poster-img-mobile' : ''}`} style={{
            backgroundImage: `url(${getImageSourceUrl(movie.url)})`
          }}></div>
        </div>
      </div>
      <div className="content-container">
        <div className="movie-title">
          {movie.name}
        </div>
        <div className="info-section">
          Duration: {movie.duration} minutes
        </div>
        <div>
          {movie?.moviesShowTimeDetails?.map((showTime, index) => (
            <ShowTimeButton key={index} movieShowTimeDetails={showTime} onClick={handleShowTimeClick} />
          ))}
        </div>
        {/* Show description only in desktop view */}
        {!isMobile && (
          <div className="info-section">
            {movie.description}
          </div>
        )}
      </div>
    </div>
  );
}
