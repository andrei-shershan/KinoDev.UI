import { STORAGE } from "../constants/storage";
import MainLayout from "../layouts/mainLayout";
import { IBokingStorageData, IOrder } from "../models/applicationContext.model";
import { Grid } from "antd";
import { getDateTimeObject } from "../utils/dateFormatter";
import { useInternalApiClient } from "../hooks/useInternalApiClient";
import { ENDPOINTS } from "../constants/endpoints";
import { URLS } from "../constants/urls";
import { useEffect, useState } from "react";

const Booking: React.FC = () => {
  const [storageBookingData, setStorageBookingData] = useState<IBokingStorageData | null>(null);
  const [storageOrderData, setStorageOrderData] = useState<IOrder | null>(null);

  useEffect(() => {
    const storageBookingDataStr = localStorage.getItem(STORAGE.BOOKING);
    const storageBookingData = storageBookingDataStr
      ? JSON.parse(storageBookingDataStr) as IBokingStorageData
      : null;

    const storageOrderDataStr = localStorage.getItem(STORAGE.ORDER);
    const storageOrderData = storageOrderDataStr
      ? JSON.parse(storageOrderDataStr) as IOrder
      : null;

    setStorageBookingData(storageBookingData);
    setStorageOrderData(storageOrderData);
  }, []);


  const { fetchPost } = useInternalApiClient();

  const handleBuyTicketsClick = async () => {
    if (!storageBookingData) {
      return;
    }

    const body = {
      showTimeId: storageBookingData.id,
      selectedSeatIds: storageBookingData.seats.map(seat => seat.id)
    };

    var response = await fetchPost(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.ORDERS.CREATE}`, body);
    if (response.ok) {
      const data: IOrder = await response.json();
      localStorage.setItem(STORAGE.ORDER, JSON.stringify(data));
    }
  }

  const { useBreakpoint } = Grid;
  const { sm } = useBreakpoint();

  if (!storageBookingData) {
    return <MainLayout>
      <h1>No booking data found</h1>
    </MainLayout>
  }

  return storageBookingData &&
    < MainLayout >
      {
        sm
          ? <div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ width: '200px', flexShrink: 0 }}>
                <img src={storageBookingData.movie.url} alt={storageBookingData.movie.name} width="200" height="200" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <h2>{storageBookingData.movie.name}</h2>
              </div>
            </div>
          </div>
          :
          <div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ width: '100px', flexShrink: 0 }}>
                <img src={storageBookingData.movie.url} alt={storageBookingData.movie.name} width="100" height="100" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <h2>{storageBookingData.movie.name}</h2>
              </div>
            </div>
          </div>
      }

      <div>
        <span>{getDateTimeObject(storageBookingData.time).date} {getDateTimeObject(storageBookingData.time).time}</span> <br />
        <span>{storageBookingData.hall.name}</span> <br />
        {
          storageBookingData.seats.map(seat => {
            return (
              <>
                <span key={seat.id}>Row: {seat.row}, number: {seat.number}</span> <br />
              </>
            );
          })
        }
        <br />
        <span>Total price: {storageBookingData.price * storageBookingData.seats.length}</span> <br />
        <span>{storageBookingData.seats.length} x {storageBookingData.price}</span>
      </div>

      {
        storageBookingData && !storageOrderData && <button onClick={handleBuyTicketsClick}>
          Buy tickets
        </button>
      }

      {
        storageOrderData && <div>
          PAYMENT
        </div>
      }

    </MainLayout >
}

export default Booking;