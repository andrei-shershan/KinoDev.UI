import MainLayout from "../layouts/mainLayout";
import { IOrderSummary, OrderState } from "../models/applicationContext.model";
import { useInternalApiClient } from "../hooks/useInternalApiClient";
import { ENDPOINTS } from "../constants/endpoints";
import { URLS } from "../constants/urls";
import { useEffect, useState } from "react";
import { useApplicationContext } from "../context/ApplicationContext";
import BookingDetails from "../components/booking/BookingDetails";
import BookingGuestEmail from "../components/booking/BookingGuestEmail";
import BookingPayment from "../components/booking/BookingPayment";

const Booking: React.FC = () => {
  const { state, dispatch } = useApplicationContext();
  const [email, setEmail] = useState<string>('');
  const [editMode, setEditMode] = useState<boolean>(true);

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
    const getActive = async () => {
      var response = await fetchWithAccessToken(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.ORDERS.GET_ACTIVE}`);
      if (response.ok) {
        const orderSummary: IOrderSummary = await response.json();
        console.log("orderSummary", orderSummary);
        dispatch({ type: 'SET_ACTIVE_ORDER', payload: orderSummary });
      }
    }

    getActive();
  }, []);

  const { fetchWithAccessToken } = useInternalApiClient();

  if (!state.activeOrderSummary || state.activeOrderSummary.state !== OrderState.NEW) {
    return <MainLayout>
      <h1>No booking data found</h1>
    </MainLayout>
  }

  return state.activeOrderSummary &&
    <MainLayout>
      <BookingDetails
        activeOrderSummary={state.activeOrderSummary}
      />

      <BookingGuestEmail
        editMode={editMode}
        onEmailSubmit={handleEmailSubmit}
        submittedEmail={email}
      />

      {
        email && <BookingPayment orderSummary={state.activeOrderSummary} />
      }
    </MainLayout>
}

export default Booking;