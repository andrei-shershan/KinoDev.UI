import {
  useParams,
  // useNavigate,
  useLocation
} from 'react-router-dom';
import MainLayout from '../layouts/mainLayout';
import { useEffect } from 'react';
import { useApplicationContext } from '../context/ApplicationContext';
import { ENDPOINTS } from '../constants/endpoints';
import { URLS } from '../constants/urls';
import { useInternalApiClient } from '../hooks/useInternalApiClient';
import { IShowTimeDetails } from '../models/applicationContext.model';
import {
  // Grid, 
  message
} from 'antd';
import { ERRORS } from '../constants/errors';
// import { getDateTimeObject } from '../utils/dateFormatter';
// import ShowTimeSeatsMap from '../components/show-times/ShowTimeSeatsMap';
import ShowTimeHeader from '../components/show-times/showTimeHeader';
import ShowTimeContent from '../components/show-times/showTimeContent';
// const { useBreakpoint } = Grid;

// const styles = {
//   movieImage: (width: string, height: string) => ({
//     width,
//     height,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center'
//   }),
//   container: {
//     display: 'flex',
//     gap: '24px'
//   },
//   mobileContainer: {
//     padding: '16px'
//   },
//   imageWrapper: (width: string) => ({
//     width,
//     flexShrink: 0
//   }),
//   button: (isBooking: boolean) => ({
//     padding: '12px 24px',
//     fontSize: '16px',
//     backgroundColor: isBooking ? '#808080' : '#1677ff',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer'
//   }),
//   bookingSection: {
//     marginTop: '20px'
//   }
// };

// const MovieDetails = ({ movie, isBooking }: { movie: IShowTimeDetails['movie'], isBooking: boolean }) => (
//   <>
//     <h1>{movie.name}</h1>
//     <p>{movie.releaseDate.toString()}</p>
//     <p>{movie.duration}</p>
//     {!isBooking && <p>{movie.description}</p>}
//   </>
// );

// const BookingSection = ({ showTimeId }: { showTimeId: string }) => (
//   <div style={styles.bookingSection}>
//     <h3>Select your seats</h3>
//     <ShowTimeSeatsMap showTimeId={showTimeId} />
//   </div>
// );

// const DesktopLayout = ({ showTimeDetails, isBooking, showTimeId, onButtonClick }: any) => (
//   <div style={styles.container}>
//     <div style={styles.imageWrapper('300px')}>
//       <div
//         style={{
//           ...styles.movieImage('300px', isBooking ? '150px' : '300px'),
//           backgroundImage: `url(${showTimeDetails.movie.url})`
//         }}
//       />
//     </div>
//     <div style={{ flex: 1 }}>
//       <MovieDetails movie={showTimeDetails.movie} isBooking={isBooking} />
//       <h2>{getDateTimeObject(showTimeDetails.time).date} {getDateTimeObject(showTimeDetails.time).time}</h2>
//       <h2>{showTimeDetails.price}</h2>
//       <h3>{showTimeDetails.hall.name}</h3>
//       <button
//         onClick={onButtonClick}
//         style={styles.button(isBooking)}
//       >
//         {isBooking ? 'Cancel' : 'Buy Ticket'}
//       </button>
//       {isBooking && <BookingSection showTimeId={showTimeId} />}
//     </div>
//   </div>
// );

// const MobileLayout = ({ showTimeDetails, isBooking, showTimeId, onButtonClick }: any) => (
//   <div style={styles.mobileContainer}>
//     <div style={{ width: isBooking ? '200px' : '300px', margin: '0 auto' }}>
//       <div
//         style={{
//           ...styles.movieImage(isBooking ? '200px' : '300px', '150px'),
//           backgroundImage: `url(${showTimeDetails.movie.url})`,
//           marginBottom: '16px'
//         }}
//       />
//     </div>
//     <div>
//       <MovieDetails movie={showTimeDetails.movie} isBooking={isBooking} />
//       <h2>{getDateTimeObject(showTimeDetails.time).date} {getDateTimeObject(showTimeDetails.time).time}</h2>
//       <h2>{showTimeDetails.price}</h2>
//       <h3>{showTimeDetails.hall.name}</h3>
//       <button
//         onClick={onButtonClick}
//         style={{ ...styles.button(isBooking), width: '100%' }}
//       >
//         {isBooking ? 'Cancel' : 'Buy Ticket'}
//       </button>
//       {isBooking && <BookingSection showTimeId={showTimeId} />}
//     </div>
//   </div>
// );

const ShowTime = () => {
  const { showTimeId } = useParams<{ showTimeId: string }>();
  // const navigate = useNavigate();
  const location = useLocation();
  const isBooking = location.pathname.includes('booking');

  console.log('isBooking', isBooking);
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

  // const screens = useBreakpoint();

  if (!state.showTimeDetails) {
    return <div>Loading...</div>
  }

  return (
    <MainLayout>
      <ShowTimeHeader showTimeDetails={state.showTimeDetails} isBooking={isBooking} />
      <ShowTimeContent showTimeDetails={state.showTimeDetails} isBooking={isBooking} />
    </MainLayout>
  );

  // return (
  //   <MainLayout>
  //     {state.showTimeDetails ? (
  //       screens.sm ? (
  //         <DesktopLayout
  //           showTimeDetails={state.showTimeDetails}
  //           isBooking={isBooking}
  //           showTimeId={showTimeId}
  //           onButtonClick={() => isBooking ? navigate(`/showtimes/${showTimeId}`) : navigate(`/showtimes/${showTimeId}/booking`)}
  //         />
  //       ) : (
  //         <MobileLayout
  //           showTimeDetails={state.showTimeDetails}
  //           isBooking={isBooking}
  //           showTimeId={showTimeId}
  //           onButtonClick={() => isBooking ? navigate(`/showtimes/${showTimeId}`) : navigate(`/showtimes/${showTimeId}/booking`)}
  //         />
  //       )
  //     ) : (
  //       <div>Loading...</div>
  //     )}
  //   </MainLayout>
  // );
};

export default ShowTime;