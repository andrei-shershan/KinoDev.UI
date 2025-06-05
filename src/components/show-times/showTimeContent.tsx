import {
    message,
    // Grid,
    Modal
} from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

import DataLoading from "../dataLoading";
import { useState } from "react";
import { URLS } from "../../constants/urls";
import { ENDPOINTS } from "../../constants/endpoints";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";
import Button from "../../ui/Button";
import { StyleType } from "../../ui/types";
import { BokingStorageData, ShowTimeDetailsApiModel, ShowTimeSeat } from "../../models/api.models";
import { getDateTimeObject } from "../../utils/date-time";
import ShowTimeSeatsMap from "./ShowTimeSeatsMap";

// const { useBreakpoint } = Grid;

const CancelBookingButton = ({ showTimeId }: { showTimeId: number }) => {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(`/${ROUTES.SHOWTIMES}/${showTimeId}`)}>
            Cancel Booking
        </button>
    );
}

const ShowTimeDetails = ({ showTimeDetails, isBooking, selectedSeats }:
    {
        showTimeDetails: ShowTimeDetailsApiModel,
        isBooking: boolean,
        selectedSeats: ShowTimeSeat[]
    }) => {

    const { fetchPost } = useInternalApiClient();

    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOk = async () => {
        const bookingData: BokingStorageData = {
            id: showTimeDetails.id,
            hallId: showTimeDetails.hall.id,
            time: showTimeDetails.time,
            price: showTimeDetails.price,
            seats: selectedSeats,
            movie: showTimeDetails.movie,
            hall: showTimeDetails.hall,
        };

        const body = {
            showTimeId: bookingData.id,
            selectedSeatIds: bookingData.seats.map(seat => seat.id)
        };

        try {
            var response = await fetchPost(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.ORDERS.CREATE}`, body);
            if (response.ok) {
                navigate(`/${ROUTES.BOOKING}`);
            }
            else {
                message.error("Error creating order. Please try again.");
            }
        }
        finally {
            setIsModalOpen(false);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (<div>
        {isBooking &&
            <div>
                <CancelBookingButton showTimeId={showTimeDetails.id} />
                <h2>{getDateTimeObject(showTimeDetails.time).date} {getDateTimeObject(showTimeDetails.time).time}</h2>
                <h2>{showTimeDetails.price}</h2>
                <h3>{showTimeDetails.hall.name}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '60px' }}>
                    {
                        selectedSeats?.length > 0 &&
                        <>
                            <div style={{ marginBottom: '10px' }}>
                                You selected {selectedSeats.length}, total price: {selectedSeats.length * showTimeDetails.price}
                            </div>
                            <div>
                              <Button style={StyleType.Primary} text="Book" onClick={() => setIsModalOpen(true)} />
                            </div>
                        </>
                    }
                </div>
                <Modal
                    title="Booking Confirmation"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <p>Total price: {selectedSeats.length * showTimeDetails.price}</p>
                    <p>Selected seats:</p>
                    {selectedSeats.map((seat, index) => (
                        <p key={index}>Row: {seat.row}, Seat: {seat.number}</p>
                    ))}
                </Modal>
            </div>
        }
    </div>);
}

const ShowTimeContent = ({ showTimeDetails, isBooking }: { showTimeDetails: ShowTimeDetailsApiModel, isBooking: boolean }) => {
    if (!showTimeDetails || !isBooking) {
        return <DataLoading />
    }

    const [selectedSeats, setSelectedSeats] = useState<ShowTimeSeat[]>([]);
    // const screens = useBreakpoint();

    return (<div>
        <ShowTimeDetails
            isBooking={isBooking}
            showTimeDetails={showTimeDetails}
            selectedSeats={selectedSeats}
        />
        <ShowTimeSeatsMap
            showTimeId={showTimeDetails.id.toString()}
            onSelectSeat={(selectedSeatsCount: ShowTimeSeat[]) => setSelectedSeats(selectedSeatsCount)} />
    </div>);
}

export default ShowTimeContent;