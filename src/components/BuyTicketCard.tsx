import { useNavigate } from "react-router-dom";
import { getDateTimeObject } from "../utils/dateFormatter";
import { ROUTES } from "../constants/routes";
import Button from '../ui/Button';

const BuyTicketCard = ({ isActiveOrderAlredyExist, showTimeId, time, price, hallName }: {
  isActiveOrderAlredyExist: boolean, showTimeId: number, time: Date, price: number, hallName: string
}) => {
  const navigate = useNavigate();

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
        onClick={() => navigate(`/${ROUTES.BOOKING}`)}>
        {'Go to Booking'}
      </Button>
    </div>);
  }

  return (
    <div>
      <h2>{getDateTimeObject(time).date} {getDateTimeObject(time).time}</h2>
      <h2>{price}</h2>
      <h3>{hallName}</h3>

      <Button text="Buy Ticket" onClick={() => navigate(`/${ROUTES.SHOWTIMES}/${showTimeId}/booking`)} />

    </div>
  );
}

export default BuyTicketCard;
