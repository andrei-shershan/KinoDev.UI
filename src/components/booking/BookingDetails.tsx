import { OrderSummary } from "../../models/api.models";
import { getDateTimeObject } from "../../utils/date-time";
import { getImageSourceUrl } from "../../utils/images";
import useIsMobile from "../../hooks/useIsMobile";

const BookingDetails = ({
  activeOrderSummary
}: { activeOrderSummary: OrderSummary }) => {

  const { tickets, showTimeSummary, cost } = activeOrderSummary;
  const { movie, time, hall } = showTimeSummary;

  const isMobile = useIsMobile();

  return (
    <>
      <div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ width: isMobile ? '100px' : '200px', flexShrink: 0 }}>
            <img
              src={getImageSourceUrl(movie.url)}
              alt={movie.name}
              width={isMobile ? "100" : "200"}
              height={isMobile ? "100" : "200"}
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <h2>{movie.name}</h2>
            <br />
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
              <span>Total price: {cost}</span> <br />
              <span>{tickets.length} x {tickets[0].price}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingDetails;