import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import ShowTimeSeatsMap from "../showtime/ShowTimeSeatsMap";
import { IShowTimeDetails, IShowTimeSeat } from "../../models/applicationContext.model";
import { useState } from "react";
import SelectedSeatsDetails from "../showtime/SelectedSeatsDetails";
import Button from "../../ui/Button";
import { StyleType } from "../../ui/types";

const ShowTimeSeatsMapSelector = ({
    showTimeDetails,
}: {
    showTimeDetails: IShowTimeDetails;
}) => {
    const navigate = useNavigate();

    const [selectedSeats, setSelectedSeats] = useState<IShowTimeSeat[]>([]);

    console.log("Selected seats: ", selectedSeats);

    return (
        <div className="showtime-content">
            <h1>Show Time Content</h1>
            <Button style={StyleType.None} onClick={() => navigate(`/${ROUTES.SHOWTIMES}/${showTimeDetails.id}`)}>
                Cancel Booking
            </Button>
            {
                selectedSeats?.length > 0 && (
                    <SelectedSeatsDetails
                        showTimeDetails={showTimeDetails}
                        selectedSeats={selectedSeats}
                    />
                )
            }
            <p>Select your seats:</p>
            <div>
                <ShowTimeSeatsMap
                    showTimeId={showTimeDetails.id.toString()}
                    onSelectSeat={(selectedSeats: IShowTimeSeat[]) => setSelectedSeats(selectedSeats)} />
            </div>
        </div>
    );
}

export default ShowTimeSeatsMapSelector;