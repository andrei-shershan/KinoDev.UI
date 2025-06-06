import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import Button from '../ui/Button';
import { getDateTimeObject } from "../utils/date-time";
import { StyleType } from "../ui/types";

const BuyTicketCard = ({ isActiveOrderAlredyExist, showTimeId, time, price, hallName }: {
  isActiveOrderAlredyExist: boolean, showTimeId: number, time: Date, price: number, hallName: string
}) => {

  const navigate = useNavigate();
  const location = useLocation();
  if (isActiveOrderAlredyExist) {
    return (<div>
      <p>
        <span>
          You can only book one show time at a time.
        </span>
      </p>
      <p>
        Cancel or complete your current order to book a new show time.
      </p>
      <Button
        style={StyleType.Free}
        onClick={() => navigate(`/${ROUTES.BOOKING}`, { state: { from: location.pathname } })}
        text="Go to Booking"
      />
    </div>);
  }

  return (
    <div>
      <h2>{getDateTimeObject(time).date} {getDateTimeObject(time).time}</h2>
      <h2>{price}</h2>
      <h3>{hallName}</h3>

      <Button
        text="Buy Ticket"
        onClick={() => navigate(`/${ROUTES.SHOWTIMES}/${showTimeId}/booking`, { state: { from: location.pathname } })}
        style={StyleType.Primary}
      />      
    </div>
  );
}

export default BuyTicketCard;
