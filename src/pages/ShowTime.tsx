import { useParams, useNavigate, useLocation } from 'react-router-dom';
import MainLayout from '../layouts/mainLayout';
import { useEffect } from 'react';
import { useApplicationContext } from '../context/ApplicationContext';
import { ENDPOINTS } from '../constants/endpoints';
import { URLS } from '../constants/urls';
import { useInternalApiClient } from '../hooks/useInternalApiClient';
import { IShowTimeDetails } from '../models/applicationContext.model';
import { Grid, message } from 'antd';
import { ERRORS } from '../constants/errors';
import { getDateTimeObject } from '../utils/dateFormatter';
import ShowTimeSeatsMap from '../components/ShowTimeSeatsMap';
const { useBreakpoint } = Grid;

const ShowTime = () => {
  const { showTimeId } = useParams<{ showTimeId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const isBooking = location.pathname.includes('booking');

  if (!showTimeId) {
    // TODO: Add page like NotFound, etc, to prevent this
    return <div>Show time ID is required</div>;
  }

  const { state, dispatch } = useApplicationContext();
  const { fetchWithAccessToken } = useInternalApiClient();

  useEffect(() => {
    const fetchShowTimes = async () => {
      dispatch({ type: 'SET_SPINNING', payload: true });
      var result = await fetchWithAccessToken(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.SHOW_TIMES.GET_SHOW_TIME_DETAILS}/${showTimeId}`);

      try {
        if (result.ok) {
          var data: IShowTimeDetails = await result.json();
          dispatch({ type: 'GET_SHOW_TIME_DETAILS', payload: data });
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
  }, [showTimeId]);

  const screens = useBreakpoint();

  return (
    <MainLayout>
      {
        screens.sm
          ? state.showTimeDetails
            ? <div style={{ display: 'flex', gap: '24px' }}>
              <div style={{ width: '300px', flexShrink: 0 }}>
                <div
                  style={{
                    width: '300px',
                    height: isBooking ? '150px' : '300px',
                    backgroundImage: `url(${state.showTimeDetails.movie.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <h1>{state.showTimeDetails.movie.name}</h1>
                <p>{state.showTimeDetails.movie.releaseDate.toString()}</p>
                <p>{state.showTimeDetails.movie.duration}</p>
                {!isBooking && <p>{state.showTimeDetails.movie.description}</p>}
                <h2>{getDateTimeObject(state.showTimeDetails.time).date} {getDateTimeObject(state.showTimeDetails.time).time}</h2>
                <h2>{state.showTimeDetails.price}</h2>
                <h3>{state.showTimeDetails.hall.name}</h3>
                <button
                  onClick={() => isBooking ? navigate(`/showtimes/${showTimeId}`) : navigate(`/showtimes/${showTimeId}/booking`)}
                  style={{
                    padding: '12px 24px',
                    fontSize: '16px',
                    backgroundColor: isBooking ? '#808080' : '#1677ff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  {isBooking ? 'Cancel' : 'Buy Ticket'}
                </button>
                {isBooking && (
                  <div style={{ marginTop: '20px' }}>
                    <h3>Select your seats</h3>
                    <ShowTimeSeatsMap showTimeId={showTimeId} />
                  </div>
                )}
              </div>
            </div>
            : <div>Loading...</div>
          : state.showTimeDetails
            ? <div style={{ padding: '16px' }}>
              <div style={{ width: isBooking ? '200px' : '300px', margin: '0 auto' }}>
                <div
                  style={{
                    width: isBooking ? '200px' : '300px',
                    height: '150px',
                    backgroundImage: `url(${state.showTimeDetails.movie.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    marginBottom: '16px'
                  }}
                />
              </div>
              <div>
                <h1>{state.showTimeDetails.movie.name}</h1>
                <p>{state.showTimeDetails.movie.releaseDate.toString()}</p>
                <p>{state.showTimeDetails.movie.duration}</p>
                {!isBooking && <p>{state.showTimeDetails.movie.description}</p>}
                <h2>{getDateTimeObject(state.showTimeDetails.time).date} {getDateTimeObject(state.showTimeDetails.time).time}</h2>
                <h2>{state.showTimeDetails.price}</h2>
                <h3>{state.showTimeDetails.hall.name}</h3>
                <button
                  onClick={() => isBooking ? navigate(`/showtimes/${showTimeId}`) : navigate(`/showtimes/${showTimeId}/booking`)}
                  style={{
                    padding: '12px 24px',
                    fontSize: '16px',
                    backgroundColor: isBooking ? '#808080' : '#1677ff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  {isBooking ? 'Cancel' : 'Buy Ticket'}
                </button>
                {isBooking && (
                  <div style={{ marginTop: '20px' }}>
                    <h3>Select your seats</h3>
                    <ShowTimeSeatsMap showTimeId={showTimeId} />
                  </div>
                )}
              </div>
            </div>
            : <div>Loading...</div>
      }

    </MainLayout>
  );
};

export default ShowTime;