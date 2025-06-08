import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { StyleType } from "../../ui/types";
import { ROUTES } from "../../constants/routes";
import { getDateTimeObject } from "../../utils/date-time";

import './BuyTicketCard.css';

const BuyTicketCard = ({ isActiveOrderAlredyExist, showTimeId, time, price, hallName }: {
  isActiveOrderAlredyExist: boolean, showTimeId: number, time: Date, price: number, hallName: string
}) => {

  const navigate = useNavigate();
  const location = useLocation();
  if (isActiveOrderAlredyExist) {
    return (<div className="buy-ticket-card">
      <p>
        <span>
          <strong>
            You can only book one show time at a time.
          </strong>
        </span>
      </p>
      <p>
        Cancel or complete your current order to book a new show time.
      </p>
      <br />
      <Button
        style={StyleType.Free}
        onClick={() => navigate(`/${ROUTES.BOOKING}`, { state: { from: location.pathname } })}
        text="Go to Booking"
      />
    </div>);
  }

  return (
    <div className="buy-ticket-card">
      <h2>{getDateTimeObject(time).date} {getDateTimeObject(time).time}</h2>
      <h3>Price: {price}</h3>
      <h3>Hall: {hallName}</h3>
      <br />
      <Button
        text="Buy Ticket"
        onClick={() => navigate(`/${ROUTES.SHOWTIMES}/${showTimeId}/booking`, { state: { from: location.pathname } })}
        style={StyleType.Primary}
      />
    </div>
  );
}

export default BuyTicketCard;
