import { TimeTableSlot } from "../../models/admin-portal";
import { Hall, Movie, ShowTimeForDate } from "../../models/api.models";
import { getTimeTable } from "../../utils/showtimes";

import './ShowTimeForDateCard.css';

const getClassName = (slot: TimeTableSlot) => {
  if (slot.isAvailable && slot.isEnoughTime) {
    return 'slot-time-button available';
  } else if (slot.isAvailable && !slot.isEnoughTime) {
    return 'slot-time-button not-enough-time';
  }
  return 'slot-time-button unavailable';
}

export const ShowTimeForDateCard = ({ showTimeForDate, selectedMovie, onSlotSelected }
  : { showTimeForDate: ShowTimeForDate, selectedMovie: Movie, onSlotSelected: ({ h, s }: { h: Hall, s: TimeTableSlot }) => void }) => {
  if (!showTimeForDate || !showTimeForDate.hallWithMovies || showTimeForDate.hallWithMovies.length === 0) {
    return <p>No showtimes available for the selected date.</p>;
  }
  else {
    const timeTable = getTimeTable(showTimeForDate, selectedMovie);
    return (
      <div>
        {
          timeTable.map((hallTimeTable, index) => {
            return (
              <div>
                <h3>
                  {hallTimeTable.hall.name}
                </h3>
                <div className="hall-slot-times-container" key={index}>
                  {
                    hallTimeTable.timeTable.map((slot, slotIndex) => {
                      return (
                        <div key={`${index}-${slotIndex}`} className="slot-times-container">
                          <button
                            className={getClassName(slot)}
                            disabled={!(slot.isAvailable && slot.isEnoughTime)}
                            onClick={() => onSlotSelected({ h: hallTimeTable.hall, s: slot })}
                          >
                            {slot.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                          </button>
                        </div>
                      );
                    })
                  }
                </div>
              </div>)
          })
        }
      </div>
    );
  }
}