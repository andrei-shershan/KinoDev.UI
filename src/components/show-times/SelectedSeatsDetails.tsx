import Button from "../../ui/Button";
import { StyleType } from "../../ui/types";
import { BokingStorageData, ShowTimeDetailsApiModel, ShowTimeSeat } from "../../models/api.models";
import { getDateTimeObject } from "../../utils/date-time";
import { useState } from "react";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";
import { useNavigate } from "react-router-dom";
import { useIsLoading } from "../../hooks/useIsLoading";
import { URLS } from "../../constants/urls";
import { ROUTES } from "../../constants/routes";
import { ENDPOINTS } from "../../constants/endpoints";
import { message, Modal } from "antd";
import { ResetSeats } from "./ResetSeats";

const SelectedSeatsDetails = ({ showTimeDetails, selectedSeats, resetSelectedSeats }:
  {
    showTimeDetails: ShowTimeDetailsApiModel,
    selectedSeats: ShowTimeSeat[],
    resetSelectedSeats: () => void
  }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { fetchPost } = useInternalApiClient();

  const navigate = useNavigate();
  const { setIsLoading } = useIsLoading();

  const handleCancel = () => {
    setIsModalOpen(false);
  };


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
      setIsLoading(true);
      var response = await fetchPost(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.ORDERS.CREATE}`, body);
      if (response.ok) {
        navigate(`/${ROUTES.BOOKING}`);
      }
      else {
        message.error("Error creating order. Please try again.");
      }
    }
    finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <h2>{getDateTimeObject(showTimeDetails.time).date} {getDateTimeObject(showTimeDetails.time).time}</h2>
      <h3>Hall: {showTimeDetails.hall.name}</h3>
      <br />
      {
        selectedSeats?.length > 0 &&
        <div>
          <span>
            You selected: <strong> {selectedSeats.length}</strong>
            <br />Total price: <strong>{selectedSeats.length * showTimeDetails.price}</strong>
          </span>
          <br />
          <br />
          <div>
            <Button text="Book" style={StyleType.Primary} onClick={() => setIsModalOpen(true)} />

            <ResetSeats
              resetSelectedSeats={resetSelectedSeats}
            />
          </div>
        </div>
      }

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