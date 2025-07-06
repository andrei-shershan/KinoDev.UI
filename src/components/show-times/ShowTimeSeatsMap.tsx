import { useEffect, useState } from "react";
import { ENDPOINTS } from "../../constants/endpoints";
import { URLS } from "../../constants/urls";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";
import { message } from "antd";
import { ERRORS } from "../../constants/errors";
import { ShowTimeSeat, ShowTimeSeats } from "../../models/api.models";
import { useIsLoading } from "../../hooks/useIsLoading";
import useIsMobile from "../../hooks/useIsMobile";

import './ShowTimeSeatsMap.css';

const getSeatsMap = (seats: ShowTimeSeat[]) => {
  if (!seats || seats.length === 0) {
    return [[]];
  }

  // Group seats by row
  const maxRow = Math.max(...seats.map(seat => seat.row));
  const maxNumber = Math.max(...seats.map(seat => seat.number));

  // Initialize 2D array with null values
  const seatMap: (ShowTimeSeat | null)[][] = Array(maxRow)
    .fill(null)
    .map(() => Array(maxNumber).fill(null));

  // Fill in the seats
  seats.forEach(seat => {
    seatMap[seat.row - 1][seat.number - 1] = seat;
  });

  return seatMap;
}

const getSeatStyle = (isLargeScreen: boolean, isAvailable?: boolean, isSelected?: boolean) => ({
  width: isLargeScreen ? '50px' : '25px',
  height: isLargeScreen ? '50px' : '25px',
  display: 'inline-block',
  margin: isLargeScreen ? '5px' : '2px',
  padding: '5px',
  border: '1px solid black',
  cursor: isAvailable ? 'pointer' : 'none',
  position: 'relative',
  backgroundColor: !isAvailable ? '#c0c0c0' : isSelected ? 'lightgreen' : 'transparent'
});

const drawSeatsMap = (
  seatMap: (ShowTimeSeat | null)[][],
  onSeatClick: (seat: ShowTimeSeat) => void,
  selectedSeats: ShowTimeSeat[]
) => {
  const isMobile = useIsMobile();

  return seatMap.map((row, rowIndex) => (
    <div key={rowIndex}
      style={{ justifyContent: 'center' }}
    >
      <div style={{ width: 'max-content', margin: '0 auto' }}>
        <div className="row-label">
          <span>row {rowIndex + 1}</span>
        </div>
        <div>
          {row.map((seat, seatIndex) => (<div
            key={seatIndex}
            style={{
              ...getSeatStyle(
                !isMobile,
                seat?.isAvailable,
                (seat && selectedSeats.some(s => s.row === seat.row && s.number === seat.number)) ?? false
              ),
              position: 'relative'
            }}
            onClick={() => seat && onSeatClick(seat)}
          >
            <div className="seat-content">
              {seat?.number}
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  ));
}

const ShowTimeSeatsMap = ({ showTimeId, onSelectSeat, reset }:
  {
    showTimeId: string,
    onSelectSeat: (selectedSeats: ShowTimeSeat[]) => void,
    reset: boolean
  }) => {
  const { fetchGet } = useInternalApiClient();
  const { setIsLoading } = useIsLoading();

  const [seats, setSeats] = useState<ShowTimeSeats>();
  const [selectedSeats, setSelectedSeats] = useState<ShowTimeSeat[]>([]);

  useEffect(() => {
    if (reset) {
      setSelectedSeats([]);
    }
  }, [reset]);

  useEffect(() => {
    onSelectSeat(selectedSeats);
  }, [selectedSeats]);

  const handleSeatClick = (seat: ShowTimeSeat) => {
    if (!seat.isAvailable) {
      return;
    }

    if (selectedSeats.some(s => s.row === seat.row && s.number === seat.number)) {
      setSelectedSeats(selectedSeats.filter(s => !(s.row === seat.row && s.number === seat.number)));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  useEffect(() => {
    const getShowTimeSeatsData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchGet(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.SHOW_TIMES.GET_SHOW_TIME_SEATS}/${showTimeId}`);
        if (result.ok) {
          const data: ShowTimeSeats = await result.json();
          setSeats(data);
        } else {
          message.error(ERRORS.GENERIC_API_ERROR);
        }
      } catch (error) {
        console.error(error);
        message.error(ERRORS.GENERIC_API_ERROR);
      }
      finally {
        setIsLoading(false);
      }
    };

    getShowTimeSeatsData();
  }, []);

  return (
    <div className="seat-map-wrapper">
      <div 
        className="screen-div"
        style={{
          width: '200px',
          height: '20px',
          backgroundColor: '#d3d3d3',
          margin: '50px auto 0 auto',
          textAlign: 'center',
          lineHeight: '20px',
          border: '1px solid #888'
        }}
      >
        Screen
      </div>
      {drawSeatsMap(getSeatsMap(seats?.seats || []), handleSeatClick, selectedSeats)}
    </div>
  );
}

export default ShowTimeSeatsMap;