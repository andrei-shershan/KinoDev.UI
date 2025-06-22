import useIsMobile from "../../hooks/useIsMobile";
import { ShowTimeDetailsApiModel } from "../../models/api.models";
import { getImageSourceUrl } from "../../utils/images";
import { getShowTimeTime } from "./showTimeButton";

import './showtimesListAdmin.css';

interface HallShowTimes {
  hallId: string;
  hallName: string;
  showTimes: ShowTimeDetailsApiModel[];
}

interface ShowTimeGroupByMovie {
  movieId: string;
  movieName: string;
  url: string;
  duration?: number;
  halls: HallShowTimes[];
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
    const movie = movies?.find(x => x.movieId === showTimes[i].movie.id.toString());
    
    if (movie) {
      // Movie exists for this date, check if the hall exists
      const hall = movie.halls.find(h => h.hallId === showTimes[i].hall.id.toString());
      if (hall) {
        // Hall exists for this movie, add the showtime
        hall.showTimes.push(showTimes[i]);
      } else {
        // Hall doesn't exist for this movie, create it
        movie.halls.push({
          hallId: showTimes[i].hall.id.toString(),
          hallName: showTimes[i].hall.name,
          showTimes: [showTimes[i]]
        });
      }
    } else if (movies) {
      // Movie doesn't exist for this date, create it with the hall
      movies.push({
        movieId: showTimes[i].movie.id.toString(),
        movieName: showTimes[i].movie.name,
        url: getImageSourceUrl(showTimes[i].movie.url),
        duration: showTimes[i].movie.duration,
        halls: [{
          hallId: showTimes[i].hall.id.toString(),
          hallName: showTimes[i].hall.name,
          showTimes: [showTimes[i]]
        }]
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
        <br />
        <hr />
        <h3 className="showtime-selected-date">{group.dateKey} - ({group.movies.length} movies)</h3>
        {
          group.movies.map((movie) => (
            <div key={movie.movieId} className="showtime-details showtime-movie" >
              <div className="movie-card-img" style={{
                width: isMobile ? '100px' : '150px',
                height: isMobile ? '100px' : '150px',
                backgroundImage: `url(${getImageSourceUrl(movie.url)})`,
                display: 'inline-block',
              }} >
              </div>
              <div className="show-time-card">
                <h3>{movie.movieName}</h3>
                {
                  movie.halls.map((hall) => (
                    <div key={hall.hallId} className="hall-showtimes">
                      <h4>Hall: {hall.hallName}</h4>
                      <div className="showtimes-container">
                        {hall.showTimes.map((showTime) => (
                          <div key={showTime.id}>
                            <span>{getShowTimeTime(showTime.time)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>))
  );
}
