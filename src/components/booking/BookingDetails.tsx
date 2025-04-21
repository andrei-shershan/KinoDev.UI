import { Grid, Modal } from "antd";
import { IOrderSummary } from "../../models/applicationContext.model";
import { getDateTimeObject } from "../../utils/dateFormatter";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";
import { URLS } from "../../constants/urls";
import { ENDPOINTS } from "../../constants/endpoints";
import { ROUTES } from "../../constants/routes";

const BookingDetails = ({
  activeOrderSummary
}: { activeOrderSummary: IOrderSummary }) => {

  const { useBreakpoint } = Grid;
  const { sm } = useBreakpoint();
  const navigate = useNavigate();
  const { fetchDelete } = useInternalApiClient();

  const { tickets, showTimeSummary, orderCost } = activeOrderSummary;
  const { movie, time, hall } = showTimeSummary;

  const [showCancelationModel, setShowCancelationModel] = useState(false);

  const handleOrderCancelation = async () => {
    try {
      var response = await fetchDelete(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.ORDERS.CANCEL_ACTIVE}`);
      if (response.ok) {
        console.log("Order canceled successfully");
        navigate(`/${ROUTES.SHOWTIMES}`);
      }
    }
    catch (error) {
      console.error("Error canceling order:", error);
    }

    setShowCancelationModel(false);
  }

  return (
    <>
      {
        sm
          ? <div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ width: '200px', flexShrink: 0 }}>
                <img src={movie.url} alt={movie.name} width="200" height="200" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <h2>{movie.name}</h2>
              </div>
            </div>
          </div>
          : <div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ width: '100px', flexShrink: 0 }}>
                <img src={movie.url} alt={movie.name} width="100" height="100" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <h2>{movie.name}</h2>
              </div>
            </div>
          </div>
      }

      <div>
        <span>{getDateTimeObject(time).date} {getDateTimeObject(time).time}</span> <br />
        <span>{hall.name}</span> <br />
        {
          tickets.map(ticket => {
            return (
              <>
                <span key={ticket.seatId}>Row: {ticket.row}, number: {ticket.number}</span> <br />
              </>
            );
          })
        }
        <br />
        <span>Total price: {orderCost}</span> <br />
        <span>{tickets.length} x {tickets[0].price}</span>
      </div>

      <div>
        Cancel your booking: <button onClick={() => setShowCancelationModel(true)}>Cancel</button>

        <Modal
          title="Cancel your booking"
          open={showCancelationModel}
          onOk={handleOrderCancelation}
          onCancel={() => setShowCancelationModel(false)}          
        >
        </Modal>

      </div>
    </>
  );
}

export default BookingDetails;