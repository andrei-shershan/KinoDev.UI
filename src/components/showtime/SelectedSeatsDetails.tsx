import { useNavigate } from "react-router-dom";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";
import { IBokingStorageData, IShowTimeDetails, IShowTimeSeat } from "../../models/applicationContext.model";
import { useState } from "react";
import { URLS } from "../../constants/urls";
import { ENDPOINTS } from "../../constants/endpoints";
import { ROUTES } from "../../constants/routes";
import { message } from "antd";
import { getDateTimeObject } from "../../utils/dateFormatter";
import Modal from "antd/es/modal/Modal";

const SelectedSeatsDetails = ({ showTimeDetails, selectedSeats }:
    {
        showTimeDetails: IShowTimeDetails,
        selectedSeats: IShowTimeSeat[]
    }) => {

    const { fetchPost } = useInternalApiClient();

    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOk = async () => {
        const bookingData: IBokingStorageData = {
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
                        <button onClick={() => setIsModalOpen(true)}>Book</button>
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
    </div>);
}


export default SelectedSeatsDetails;