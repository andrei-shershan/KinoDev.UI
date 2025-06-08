import { OrderSummary } from "../../models/api.models";
import { getDateTimeObject } from "../../utils/date-time";
import { getImageSourceUrl } from "../../utils/images";
import useIsMobile from "../../hooks/useIsMobile";
import { groupTicketsByRow } from "../../utils/tickets";

const BookingDetails = ({
  activeOrderSummary
}: { activeOrderSummary: OrderSummary }) => {

  const { tickets, showTimeSummary, cost } = activeOrderSummary;
  const { movie, time, hall } = showTimeSummary;

  const isMobile = useIsMobile();

  return (
    <>
      <div style={{marginBottom: '20px'}}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ width: isMobile ? '100px' : '200px', flexShrink: 0 }}>
            <img
              src={getImageSourceUrl(movie.url)}
              alt={movie.name}
              width={isMobile ? "100" : "200"}
              height={isMobile ? "100" : "200"}
              style={{ width: '100%', height: 'auto', objectFit: 'cover', marginTop: '10px' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <h2>{movie.name}</h2>
            <br />
            <h3>{getDateTimeObject(time).date} {getDateTimeObject(time).time}</h3>
            <h3>Hall: {hall.name}</h3>
            <br />
            {
              groupTicketsByRow(tickets).map((rowGroup) => (
                <div key={`row-${rowGroup.row}`}>
                  <span>Row <strong>{rowGroup.row}</strong>, Seats: <strong>{rowGroup.seats.join(', ')}</strong></span>
                </div>
              ))
            }
            <span>Total price: <strong>{cost}</strong> ({tickets.length} x {tickets[0].price})</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingDetails;