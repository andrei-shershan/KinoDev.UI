import useIsMobile from "../../hooks/useIsMobile";
import { ShowTimeDetailsApiModel } from "../../models/api.models";
import { getImageSourceUrl } from "../../utils/images";
import { getShowTimeTime } from "./showTimeButton";

import './showtimesListAdmin.css';

interface ShowTimeGroupByMovie {
  movieId: string;
  movieName: string;
  url: string;
  duration?: number;
  showTimes: ShowTimeDetailsApiModel[];
}

interface ShowTimeGroupedByDate {
  dateKey: string;
  movies: ShowTimeGroupByMovie[];
}

const getShowTimesGroupedByDate = (showTimes: ShowTimeDetailsApiModel[]): ShowTimeGroupedByDate[] => {
  let result: ShowTimeGroupedByDate[] = [];

  for (let i = 0; i < showTimes.length; i++) {
    const dateKey = new Date(showTimes[i].time).toISOString().split("T")[0];
    if (!result.find(x => x.dateKey === dateKey)) {
      result.push({
        dateKey: dateKey,
        movies: []
      });
    }

    const movies = result.find(x => x.dateKey === dateKey)?.movies;
    const movieShowTimes = movies?.find(x => x.movieId === showTimes[i].movie.id.toString())?.showTimes;
    if (movieShowTimes) {
      movieShowTimes.push(showTimes[i]);
    }
    else if (movies) {
      movies.push({
        movieId: showTimes[i].movie.id.toString(),
        movieName: showTimes[i].movie.name,
        url: showTimes[i].movie.url,
        duration: showTimes[i].movie.duration,
        showTimes: [showTimes[i]]
      });
    }
  }

  return result;
}

export const ShowTimesListAdmin = ({
  showTimes
}:
  {
    showTimes: ShowTimeDetailsApiModel[];
  }) => {

  const isMobile = useIsMobile();

  return (
    getShowTimesGroupedByDate(showTimes || []).map((group) => (
      <div key={group.dateKey} className="showtime-group">
        <div className="showtime-selected-date">{group.dateKey}</div>
        {
          group.movies.map((movie) => (
            <div key={movie.movieId} className="showtime-movie">
              <div className="showtime-details" style={{ display: 'block' }} >
                <div className="movie-card-img" style={{
                  width: isMobile ? '100px' : '200px',
                  height: isMobile ? '100px' : '200px',
                  backgroundImage: `url(${getImageSourceUrl(movie.url)})`,
                  backgroundSize: 'cover',
                  display: 'inline-block',
                  verticalAlign: 'top'
                }} >
                </div>
                <div style={{ display: 'inline-block' }}>
                  <h3>{movie.movieName}</h3>
                  {
                    movie.showTimes.map((showTime) => (
                      <div>
                        <strong>{getShowTimeTime(showTime.time)}</strong>
                        <span>Hall: {showTime.hall.name}</span>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          ))
        }
      </div>))
  );
}