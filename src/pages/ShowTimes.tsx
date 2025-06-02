import { ENDPOINTS } from "../constants/endpoints";
import { URLS } from "../constants/urls";
import { useInternalApiClient } from "../hooks/useInternalApiClient";
import MainLayout from "../layouts/mainLayout";
import { Grid, message } from "antd";
import { ERRORS } from "../constants/errors";
import ShowTimeButton from "../components/show-times/showTimeButton";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ShowingMoviesDatePicker from "../components/show-times/showingMoviesDatePicker";
import { ROUTES } from "../constants/routes";
import { PORTALS_TYPES } from "../constants/portalTypes";
import { IMovieShowTimes } from "../models/api.models";
import { useApplicationContext } from "../state-management/providers/AdminContextProvider";
const { useBreakpoint } = Grid;

const ShowTimes: React.FC = () => {

  const { state, dispatch } = useApplicationContext();
  const { fetchGet } = useInternalApiClient();
  const { date } = useParams<{ date?: string }>();
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState<string>(date ? date : today);

  const screens = useBreakpoint();

  const getDateString = (): string => {
    if (date) {
      return date;
    }
    return today;
  };

  useEffect(() => {
    const fetchShowTimes = async () => {
      dispatch({ type: 'SET_SPINNING', payload: true });
      var result = await fetchGet(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.MOVIES.GET_SHOWTIMES}?date=${getDateString()}`);

      try {
        if (result.ok) {
          var data: IMovieShowTimes[] = await result.json();
          dispatch({ type: 'GET_SHOWING_MOVIES', payload: data });
        } else {
          message.error(ERRORS.GENERIC_API_ERROR);
        }

      } catch (error) {
        console.error(error);
        message.error(ERRORS.GENERIC_API_ERROR);
      }

      dispatch({ type: 'SET_SPINNING', payload: false });
    };

    fetchShowTimes();
  }, [selectedDate]);

  const handleShowTimeClick = (showTimeId: number) => {
    navigate(`/${ROUTES.SHOWTIMES}/${showTimeId}`);
  }

  return (
    <MainLayout portalType={PORTALS_TYPES.CLIENT} >
      <div>
        <h1>
          Showing Movies
        </h1>
      </div>
      <div>

        {ShowingMoviesDatePicker({ selectedDate: getDateString(), callBack: setSelectedDate })}

      </div>
      {
        state.showingMovies && state.showingMovies?.length > 0
          ? state.showingMovies.map((movie) => {

            // middle screen or wider
            if (screens.sm) {
              return (
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  margin: '16px 0',
                  width: '100%'
                }}>
                  <div style={{
                    flexShrink: 0,
                    width: '200px'
                  }}>
                    <div className="movie-poster-wrapper">
                      <div className="movie-poster-container " style={{
                        backgroundImage: `url(${movie.url})`,
                      }}> </div>
                    </div>
                  </div>
                  <div style={{
                    flex: '1',
                    minWidth: 0
                  }}>
                    <div style={{ fontSize: '1.2em', fontWeight: 'bold', marginBottom: '8px' }}>
                      {movie.name}
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      Duration: {movie.duration} minutes
                    </div>
                    <div>
                      {movie?.moviesShowTimeDetails?.map((showTime, index) => (
                        <ShowTimeButton key={index} movieShowTimeDetails={showTime} onClick={handleShowTimeClick} />
                      ))}
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      {movie.description}
                    </div>
                  </div>
                </div>
              );

            } else {
              return (
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  margin: '16px 0',
                  width: '100%'
                }}>
                  <div style={{
                    flexShrink: 0,
                    width: '200px'
                  }}>
                    <div className="movie-poster-wrapper">
                      <div className="movie-poster-container " style={{
                        backgroundImage: `url(${movie.url})`,
                      }}> </div>
                    </div>
                  </div>
                  <div style={{
                    flex: '1',
                    minWidth: 0
                  }}>
                    <div style={{ fontSize: '1.2em', fontWeight: 'bold', marginBottom: '8px' }}>
                      {movie.name}
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      Duration: {movie.duration} minutes
                    </div>
                    <div>
                      {movie?.moviesShowTimeDetails?.map((showTime, index) => (
                        <ShowTimeButton key={index} movieShowTimeDetails={showTime} onClick={handleShowTimeClick} />
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
          })
          : <p>
            No movies are currently showing
          </p>
      }
    </MainLayout >
  );
}

export default ShowTimes;