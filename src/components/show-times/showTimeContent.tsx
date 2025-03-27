import { 
    // Grid,
     Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { IBokingStorageData, IShowTimeDetails, IShowTimeSeat, 
    // IShowTimeSeats
 } from "../../models/applicationContext.model";
import DataLoading from "../dataLoading";
import { getDateTimeObject } from "../../utils/dateFormatter";
import ShowTimeSeatsMap from "./ShowTimeSeatsMap";
import { useState } from "react";
import { STORAGE } from "../../constants/storage";

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
        showTimeDetails: IShowTimeDetails,
        isBooking: boolean,
        selectedSeats: IShowTimeSeat[]
    }) => {

    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOk = () => {
        const bookinData: IBokingStorageData = {
            id: showTimeDetails.id,
            hallId: showTimeDetails.hall.id,
            time: showTimeDetails.time,
            price: showTimeDetails.price,
            seats: selectedSeats,
            movie: showTimeDetails.movie,
            hall: showTimeDetails.hall,
        };
        
        localStorage.setItem(STORAGE.BOOKING, JSON.stringify(bookinData));
        setIsModalOpen(false);
        navigate(`/${ROUTES.BOOKING}`);
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
            </div>
        }
    </div>);
}

const ShowTimeContent = ({ showTimeDetails, isBooking }: { showTimeDetails: IShowTimeDetails, isBooking: boolean }) => {
    if (!showTimeDetails || !isBooking) {
        return <DataLoading />
    }

    const [selectedSeats, setSelectedSeats] = useState<IShowTimeSeat[]>([]);
    // const screens = useBreakpoint();

    return (<div>
        <ShowTimeDetails
            isBooking={isBooking}
            showTimeDetails={showTimeDetails}
            selectedSeats={selectedSeats}
        />
        <ShowTimeSeatsMap
            showTimeId={showTimeDetails.id.toString()}
            onSelectSeat={(selectedSeatsCount: IShowTimeSeat[]) => setSelectedSeats(selectedSeatsCount)} />
    </div>);
}

export default ShowTimeContent;