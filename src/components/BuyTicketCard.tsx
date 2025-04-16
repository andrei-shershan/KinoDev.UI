import { useNavigate } from "react-router-dom";
import { getDateTimeObject } from "../utils/dateFormatter";
import { ROUTES } from "../constants/routes";

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
            <button
                onClick={() => navigate(`/${ROUTES.BOOKING}`)}>
                {'Go to Booking'}
            </button>
        </div>);
    }

    return (
        <div>
            <h2>{getDateTimeObject(time).date} {getDateTimeObject(time).time}</h2>
            <h2>{price}</h2>
            <h3>{hallName}</h3>

            <button
                onClick={() => navigate(`/${ROUTES.SHOWTIMES}/${showTimeId}/booking`)}
            >
                {'Buy Ticket'}
            </button>
        </div>
    );
}

export default BuyTicketCard;
