import { useState } from "react";
import { ShowTimeDetailsApiModel, ShowTimeSeat } from "../../models/api.models";
import SelectedSeatsDetails from "./SelectedSeatsDetails";
import ShowTimeSeatsMap from "./ShowTimeSeatsMap";

const ShowTimeSeatsMapSelector = ({
  showTimeDetails,
}: {
  showTimeDetails: ShowTimeDetailsApiModel;
}) => {

  const [selectedSeats, setSelectedSeats] = useState<ShowTimeSeat[]>([]);

  return (
    <>
      <SelectedSeatsDetails
        showTimeDetails={showTimeDetails}
        selectedSeats={selectedSeats}
        resetSelectedSeats={() => setSelectedSeats([])}
      />
      <ShowTimeSeatsMap
        reset={selectedSeats.length === 0}
        showTimeId={showTimeDetails.id.toString()}
        onSelectSeat={(selectedSeats: ShowTimeSeat[]) => setSelectedSeats(selectedSeats)} />
    </>
  );
}

export default ShowTimeSeatsMapSelector;