import { useEffect, useState } from "react";
import BookingDetails from "../../components/booking/BookingDetails";
import BookingGuestEmail from "../../components/booking/BookingGuestEmail";
import BookingPayment from "../../components/booking/BookingPayment";
import { ENDPOINTS } from "../../constants/endpoints";
import { PORTALS_TYPES } from "../../constants/portalTypes";
import { URLS } from "../../constants/urls";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";
import MainLayout from "../../layouts/mainLayout";
import { OrderSummary } from "../../models/api.models";
import { OrderState } from "../../models/enums.model";
import { useApplicationContext } from "../../state-management/providers/AdminContextProvider";
import { useIsLoading } from "../../hooks/useIsLoading";
import { APPLICATION_ACTIONS_CONSTS } from "../../state-management/action-constants/application";

const Booking: React.FC = () => {
  const { state, dispatch } = useApplicationContext();
  const [email, setEmail] = useState<string>('');
  const [editMode, setEditMode] = useState<boolean>(true);
  const { setIsLoading } = useIsLoading();

  const handleEmailSubmit = (email: string) => {
    if (email) {
      setEmail(email);
      setEditMode(false);
    } else {
      setEmail('');
      setEditMode(true);
    }
  }

  useEffect(() => {
    const getActiveOrder = async () => {
      try {
        setIsLoading(true);

        var response = await fetchGet(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.ORDERS.GET_ACTIVE}`);
        if (response.ok) {
          const orderSummary: OrderSummary = await response.json();
          dispatch({ type: APPLICATION_ACTIONS_CONSTS.SET_ACTIVE_ORDER, payload: orderSummary });
        }
        else {
          dispatch({ type: APPLICATION_ACTIONS_CONSTS.SET_ACTIVE_ORDER, payload: undefined });
        }
      } catch (error) {
        console.error("Error fetching active order:", error);
      }
      finally {
        setIsLoading(false);
      }
    }

    getActiveOrder();
  }, []);

  const { fetchGet } = useInternalApiClient();

  if (!state.activeOrderSummary || state.activeOrderSummary.state !== OrderState.NEW) {
    return <MainLayout portalType={PORTALS_TYPES.CLIENT} >
      <h1>No booking data found</h1>
    </MainLayout>
  }

  return state.activeOrderSummary &&
    <MainLayout portalType={PORTALS_TYPES.CLIENT} >
      <BookingDetails
        activeOrderSummary={state.activeOrderSummary}
      />

      <BookingGuestEmail
        editMode={editMode}
        onEmailSubmit={handleEmailSubmit}
        submittedEmail={email}
      />

      {
        email && <BookingPayment orderSummary={state.activeOrderSummary} email={email} />
      }
    </MainLayout>
}

export default Booking;