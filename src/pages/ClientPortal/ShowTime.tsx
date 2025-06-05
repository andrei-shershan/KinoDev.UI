import {
  useParams,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { useEffect } from 'react';

import {
  message
} from 'antd';
import { useApplicationContext } from '../../state-management/providers/AdminContextProvider';
import BuyTicketCard from '../../components/BuyTicketCard';
import ShowTimeSeatsMapSelector from '../../components/show-times/ShowTimeSeatsMapSelector';
import { ENDPOINTS } from '../../constants/endpoints';
import { ERRORS } from '../../constants/errors';
import { PORTALS_TYPES } from '../../constants/portalTypes';
import { ROUTES } from '../../constants/routes';
import { URLS } from '../../constants/urls';
import { useInternalApiClient } from '../../hooks/useInternalApiClient';
import MainLayout from '../../layouts/mainLayout';
import { ShowTimeDetailsApiModel } from '../../models/api.models';
import { OrderState } from '../../models/enums.model';
import ShowTimeDetailsComponent from '../../components/show-times/ShowTimeDetails';
import { APPLICATION_ACTIONS_CONSTS } from '../../state-management/action-constants/application';


const ShowTime = () => {
  const { showTimeId } = useParams<{ showTimeId: string }>();

  const { state, dispatch } = useApplicationContext();
  const { fetchGet } = useInternalApiClient();

  const location = useLocation();
  const isBooking = location.pathname.includes('booking');

  const navigate = useNavigate();

  useEffect(() => {
    const getShowTimeDetails = async () => {
      dispatch({ type: APPLICATION_ACTIONS_CONSTS.SET_SPINNING, payload: true });
      var result = await fetchGet(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.SHOW_TIMES.GET_SHOW_TIME_DETAILS}/${showTimeId}`);

      try {
        if (result.ok) {
          var data: ShowTimeDetailsApiModel = await result.json();
          dispatch({ type: 'GET_SHOW_TIME_DETAILS', payload: data });
        } else {
          message.error(ERRORS.GENERIC_API_ERROR);
        }

      } catch (error) {
        console.error(error);
        message.error(ERRORS.GENERIC_API_ERROR);
      }

      dispatch({ type: APPLICATION_ACTIONS_CONSTS.SET_SPINNING, payload: false });
    };

    const getActiveOrder = async () => {
      var activeOrderResponse = await fetchGet(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.ORDERS.GET_ACTIVE}`);
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
      <ShowTimeDetailsComponent showTimeDetails={state.showTimeDetails} isBooking={isBooking} />
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