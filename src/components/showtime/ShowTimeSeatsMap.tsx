import { useEffect, useState } from "react";
import { ENDPOINTS } from "../../constants/endpoints";
import { URLS } from "../../constants/urls";
import { useApplicationContext } from "../../context/ApplicationContext";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";
import { Grid, message } from "antd";
import { ERRORS } from "../../constants/errors";
import { IShowTimeSeat, IShowTimeSeats } from "../../models/applicationContext.model";
const { useBreakpoint } = Grid;

const getSeatsMap = (seats: IShowTimeSeat[]) => {
    if (!seats || seats.length === 0) {
        return [[]];
    }

    // Group seats by row
    const maxRow = Math.max(...seats.map(seat => seat.row));
    const maxNumber = Math.max(...seats.map(seat => seat.number));

    // Initialize 2D array with null values
    const seatMap: (IShowTimeSeat | null)[][] = Array(maxRow)
        .fill(null)
        .map(() => Array(maxNumber).fill(null));

    // Fill in the seats
    seats.forEach(seat => {
        seatMap[seat.row - 1][seat.number - 1] = seat;
    });

    return seatMap;
}

const getSeatStyle = (isLargeScreen: boolean, isAvailable?: boolean, isSelected?: boolean) => ({
    width: isLargeScreen ? '50px' : '30px',
    height: isLargeScreen ? '50px' : '30px',
    display: 'inline-block',
    margin: isLargeScreen ? '5px' : '2px',
    padding: '5px',
    border: '1px solid black',
    cursor: 'pointer',
    backgroundColor: !isAvailable ? '#c0c0c0' : isSelected ? 'lightgreen' : 'transparent'
});

const drawSeatsMap = (
    seatMap: (IShowTimeSeat | null)[][],
    onSeatClick: (seat: IShowTimeSeat) => void,
    selectedSeats: IShowTimeSeat[]
) => {
    const screens = useBreakpoint();

    return seatMap.map((row, rowIndex) => (
        <div key={rowIndex}
            style={{
                ...(screens.sm
                    ? { maxWidth: '600px' }
                    : { display: 'flex', justifyContent: 'center' })
            }}>
            {row.map((seat, seatIndex) => (
                <div
                    key={seatIndex}
                    style={getSeatStyle(
                        screens.sm ?? false,
                        seat?.isAvailable,
                        (seat && selectedSeats.some(s => s.row === seat.row && s.number === seat.number)) ?? false
                    )}
                    onClick={() => seat && onSeatClick(seat)}
                >
                </div>
            ))}
        </div>
    ));
}

const ShowTimeSeatsMap = ({ showTimeId, onSelectSeat }:
    {
        showTimeId: string,
        onSelectSeat: (selectedSeats: IShowTimeSeat[]) => void
    }) => {
    const { dispatch } = useApplicationContext();
    const { fetchGet } = useInternalApiClient();

    const [seats, setSeats] = useState<IShowTimeSeats>();
    const [selectedSeats, setSelectedSeats] = useState<IShowTimeSeat[]>([]);

    useEffect(() => {
        onSelectSeat(selectedSeats);
    }, [selectedSeats]);

    const handleSeatClick = (seat: IShowTimeSeat) => {
        if (!seat.isAvailable) return;

        if (selectedSeats.some(s => s.row === seat.row && s.number === seat.number)) {
            setSelectedSeats(selectedSeats.filter(s => !(s.row === seat.row && s.number === seat.number)));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
            console.log(`Added seat - Row: ${seat.row}, Number: ${seat.number}`);
        }
    };

    useEffect(() => {
        const getShowTimeSeatsData = async () => {
            dispatch({ type: 'SET_SPINNING', payload: true });
            var result = await fetchGet(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.SHOW_TIMES.GET_SHOW_TIME_SEATS}/${showTimeId}`);

            try {
                if (result.ok) {
                    var data: IShowTimeSeats = await result.json();
                    // dispatch({ type: 'GET_SHOW_TIME_DETAILS', payload: data });
                    setSeats(data);
                } else {
                    message.error(ERRORS.GENERIC_API_ERROR);
                }
                

            } catch (error) {
                console.error(error);
                message.error(ERRORS.GENERIC_API_ERROR);
            }

            dispatch({ type: 'SET_SPINNING', payload: false });
        };

        getShowTimeSeatsData();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
                width: '200px',
                height: '20px',
                backgroundColor: '#d3d3d3',
                margin: '20px auto',
                textAlign: 'center',
                lineHeight: '20px',
                border: '1px solid #888'
            }}>
                Screen
            </div>
            {drawSeatsMap(getSeatsMap(seats?.seats || []), handleSeatClick, selectedSeats)}
        </div>
    );
}

export default ShowTimeSeatsMap;