import {
  useParams,
  useLocation,
  useNavigate
} from 'react-router-dom';
import MainLayout from '../layouts/mainLayout';
import { useEffect } from 'react';
import { useApplicationContext } from '../context/ApplicationContext';
import { ENDPOINTS } from '../constants/endpoints';
import { URLS } from '../constants/urls';
import { useInternalApiClient } from '../hooks/useInternalApiClient';
import { IShowTimeDetails, OrderState } from '../models/applicationContext.model';
import {
  message
} from 'antd';
import { ERRORS } from '../constants/errors';
import ShowTimeDetails from '../components/showtime/ShowTimeDetails';
import { ROUTES } from '../constants/routes';
import BuyTicketCard from '../components/BuyTicketCard';
import ShowTimeSeatsMapSelector from '../components/show-times/ShowTimeSeatsMapSelector';
import { PORTALS_TYPES } from '../constants/portalTypes';

const ShowTime = () => {
  const { showTimeId } = useParams<{ showTimeId: string }>();

  const { state, dispatch } = useApplicationContext();
  const { fetchWithAccessToken } = useInternalApiClient();

  const location = useLocation();
  const isBooking = location.pathname.includes('booking');

  const navigate = useNavigate();

  useEffect(() => {
    const getShowTimeDetails = async () => {
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

    const getActiveOrder = async () => {
      var activeOrderResponse = await fetchWithAccessToken(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.ORDERS.GET_ACTIVE}`);
      if (activeOrderResponse.ok) {
        const orderSummary = await activeOrderResponse.json();
        dispatch({ type: 'SET_ACTIVE_ORDER', payload: orderSummary });
      }
      else {
        dispatch({ type: 'SET_ACTIVE_ORDER', payload: undefined });
      }
    }

    getShowTimeDetails();
    getActiveOrder();

  }, []);

  if (!state.showTimeDetails) {
    return <div>No Data...</div>;
  }

  const isActiveOrderAlredyExist = state.activeOrderSummary?.state === OrderState.NEW;

  if (isActiveOrderAlredyExist) {
    if (isBooking) {
      navigate(`/${ROUTES.SHOWTIMES}/${state.showTimeDetails.id}`);
    }
  }

  return (
    <MainLayout portalType={PORTALS_TYPES.CLIENT} >
      <ShowTimeDetails showTimeDetails={state.showTimeDetails} isBooking={isBooking} />
      {
        isBooking
          ? <ShowTimeSeatsMapSelector
            showTimeDetails={state.showTimeDetails}
          />
          : <BuyTicketCard
            hallName={state.showTimeDetails.hall.name}
            isActiveOrderAlredyExist={isActiveOrderAlredyExist}
            price={state.showTimeDetails.price}
            showTimeId={state.showTimeDetails.id}
            time={state.showTimeDetails.time}
          />
      }
    </MainLayout>
  );
};

export default ShowTime;