import { ClockCircleOutlined } from "@ant-design/icons";
import useIsMobile from "../../hooks/useIsMobile";
import { MovieShowTimes } from "../../models/api.models";
import { getImageSourceUrl } from "../../utils/images";
import { BasicDetails } from "../labels/BasicDetails";
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
      <div className={`movie-poster ${isMobile ? 'mobile' : ''}`} style={{
        backgroundImage: `url(${getImageSourceUrl(movie.url)})`
      }}>
      </div>
      <div className="content-container">
        <div>
          <h2>{movie.name}</h2>
        </div>
        <BasicDetails
          details={`${movie.duration} minutes`}
        >
          <ClockCircleOutlined />
        </BasicDetails>
        <div className="show-time-buttons">
          {movie?.moviesShowTimeDetails?.map((showTime, index) => (
            <ShowTimeButton key={index} movieShowTimeDetails={showTime} onClick={handleShowTimeClick} />
          ))}
        </div>
        {/* Show description only in desktop view */}
        {!isMobile && (
          <div className="movie-description">
            {movie.description}
          </div>
        )}
      </div>
    </div>
  );
}
