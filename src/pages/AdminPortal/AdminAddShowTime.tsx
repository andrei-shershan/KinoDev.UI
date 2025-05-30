import { Link, useNavigate } from "react-router-dom";
import { PORTALS_TYPES } from "../../constants/portalTypes";
import MainLayout from "../../layouts/mainLayout";
import { ROUTES } from "../../constants/routes";
import { useEffect, useState } from "react";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";
import { ENDPOINTS } from "../../constants/endpoints";
import { URLS } from "../../constants/urls";
import { IHall, IMovie, IShowTimeForDate } from "../../models/applicationContext.model";
import Dropdown from "../../ui/Dropdown";
import { getImageSource } from "../../utils/imageSource";
import { getDays } from "./AdminShowTimes";
import Button from "../../ui/Button";
import { SizeType, StyleType } from "../../ui/types";
import { Modal } from "antd";

interface AddShowTimeRequestModel {
  movieId: number;
  hallId: number;
  time: Date;
  price: number;
}

const AdminAddShowTime = () => {
  const { fetchGet, fetchPost } = useInternalApiClient();
  const navigate = useNavigate();

  const [movies, setMovies] = useState<IMovie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showTimeForDate, setShowTimeForDate] = useState<IShowTimeForDate | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [addShowTimeRequestModel, setAddShowTimeRequestModel] = useState<AddShowTimeRequestModel | null>();
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

  useEffect(() => {
    const getMovies = async () => {
      setAddShowTimeRequestModel(null);
      const moviesResponse = await fetchGet(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.MOVIES.GET_MOVIES}`);
      if (moviesResponse.ok) {
        const moviesResult: IMovie[] = await moviesResponse.json();
        setMovies(moviesResult);
      }
      else {
        setShowTimeForDate(null);
      }
    };
    getMovies();
  }, []);

  useEffect(() => {
    const getShowTimesSlots = async () => {
      setAddShowTimeRequestModel(null);
      const showtimesSlotsResponse = await fetchGet(
        `${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.SHOW_TIMES.GET_SHOW_TIMES_SLOTS}/${selectedDate?.toISOString().split('T')[0]}`);
      if (showtimesSlotsResponse.ok) {
        const showtimesSlots: IShowTimeForDate = await showtimesSlotsResponse.json();
        setShowTimeForDate(showtimesSlots);
      }
    }

    if (selectedDate) {
      getShowTimesSlots();
    }
  }, [selectedDate]);

  const handleMovieChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const movieId = e.target.value;
    const movie = movies.find(m => m.id.toString() === movieId) || null;
    setSelectedMovie(movie);
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dateValue = e.target.value;
    setSelectedDate(dateValue ? new Date(dateValue) : null);
  };

  const handleAddShowTime = async () => {
    try {
      const timeAndPriceAdjustedModel = {
        ...addShowTimeRequestModel,
        time: new Date(addShowTimeRequestModel.time.getTime() - (addShowTimeRequestModel.time.getTimezoneOffset() * 60000)), // Adjust for timezone
        price: price
      }

      const addShowTimeRequestResponse = await fetchPost(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.SHOW_TIMES.GET_SHOW_TIMES}`, timeAndPriceAdjustedModel);
      if (addShowTimeRequestResponse.ok) {
        navigate(`/${ROUTES.ADMIN_PORTAL.SHOWTIMES}`);
      }
      else {
        alert("Failed to add show time. Please try again.");
      }
    }
    finally {
      setShowConfirmationModal(false);
    }
  }

  return (
    <MainLayout portalType={PORTALS_TYPES.ADMIN}>
      <p>
        <Link to={`/${ROUTES.ADMIN_PORTAL.SHOWTIMES}`} className="admin-movie__back">
          Go back to showtimes List
        </Link>
      </p>

      <div>
        <div>
          <Dropdown
            options={movies.map(movie => ({ value: movie.id.toString(), label: movie.name }))}
            onChange={handleMovieChange}
            labelText="Select Movie:"
            id="movieDropdown"
            selectedValue={selectedMovie ? selectedMovie.id.toString() : ""}
          />
        </div>

        {
          selectedMovie && (
            <div>
              <h3>Selected Movie: {selectedMovie.name}</h3>
              <p>Duration: {selectedMovie.duration} minutes</p>
              <div className="movie-card-img" style={{
                width: '200px',
                height: '200px',
                backgroundImage: `url(${getImageSource(selectedMovie.url)})`,
                backgroundSize: 'cover',
                display: 'inline-block',
                verticalAlign: 'top'
              }} >
              </div>
            </div>
          )
        }

        <br />

        <div>
          <Dropdown
            id="startDateDropdown"
            options={getDays()}
            onChange={handleDateChange}
            selectedValue={selectedDate ? selectedDate.toISOString().split('T')[0] : ""}
            labelText="Select date:"
          />
        </div>

        <br />

        <div>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            style={{ width: '100px', marginRight: '10px' }}
          ></input>

        </div>

        <br />
        <br />

        {
          !addShowTimeRequestModel && selectedDate && selectedMovie && showTimeForDate && (
            <ShotTimeForDateCard
              showTimeForDate={showTimeForDate}
              selectedMovie={selectedMovie}
              onSlotSelected={({ h, s }) => {
                setAddShowTimeRequestModel({
                  movieId: selectedMovie.id,
                  hallId: h.id,
                  time: s.time,
                  price: 0
                });
              }}
            />
          )
        }

        {
          addShowTimeRequestModel && (
            <div>
              <h3>Selected Slot:</h3>
              <p>Hall: {showTimeForDate?.hallWithMovies?.find(x => x.hall.id === addShowTimeRequestModel?.hallId)?.hall?.name}</p>
              <p>{addShowTimeRequestModel.time.toTimeString()}</p>

              <Button
                size={SizeType.Small}
                style={StyleType.None}
                onClick={() => setAddShowTimeRequestModel(null)}
                text="Change Slot"
              />
            </div>
          )
        }

        <Button
          disabled={!addShowTimeRequestModel || price <= 0}
          size={SizeType.Medium}
          style={StyleType.Primary}
          onClick={() => setShowConfirmationModal(true)}
          text="Add Show Time"
        />

        <Modal
          title="Confirm Adding Show Time"
          open={showConfirmationModal}
          onOk={handleAddShowTime}
          onCancel={() => setShowConfirmationModal(false)}
        >
          <p>Are you sure you want to add this show time?</p>
          <p>Movie: {selectedMovie?.name}</p>
          <p>Hall: {showTimeForDate?.hallWithMovies?.find(x => x.hall.id === addShowTimeRequestModel?.hallId)?.hall?.name}</p>
          <p>Time: {addShowTimeRequestModel?.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
          <p>Price: {price}</p>
        </Modal>
      </div>
    </MainLayout >
  );
}

export default AdminAddShowTime;

interface HallTimeTable {
  hall: IHall,
  timeTable: TimeTableSlot[],
}

interface TimeTableSlot {
  time: Date,
  isAvailable: boolean,
  isEnoughTime: boolean,
}

const getTimeTable = (showTimeForDate: IShowTimeForDate, selectedMovie: IMovie) => {
  if (!showTimeForDate || !showTimeForDate.hallWithMovies || showTimeForDate.hallWithMovies.length === 0) {
    return [];
  }

  const result: HallTimeTable[] = [];
  showTimeForDate.hallWithMovies.forEach(hallWithMovies => {
    let startTime = new Date(showTimeForDate.date);
    startTime.setHours(9, 0); // Assuming start time is 10:00 AM
    let endTime = new Date(showTimeForDate.date);
    endTime.setHours(22, 0); // Assuming end time is 10:00 PM

    let time = new Date(startTime);
    const timeInterval = 30; // Assuming time slots are 30 minutes apart

    const timeTableSlots: TimeTableSlot[] = [];
    while (time <= endTime) {
      timeTableSlots.push({
        time: new Date(time),
        isAvailable: !hallWithMovies.movies.some(movie => {
          const movieStartTime = new Date(movie.time);
          const movieEndTime = new Date(movieStartTime.getTime() + movie.duration * 60000);

          // Check if the current time slot overlaps with any scheduled movie
          return (time >= movieStartTime && time < movieEndTime) ||
            (new Date(time.getTime() + timeInterval * 60000) > movieStartTime && time < movieEndTime);
        }),
        isEnoughTime: true
      });

      time = new Date(time.getTime() + timeInterval * 60000); // Increment time by 30 minutes
    }

    for (let i = 0; i < timeTableSlots.length; i++) {
      let totalAvailableTimeInMin = 0;

      for (let j = i; j < timeTableSlots.length - 1; j++) {
        totalAvailableTimeInMin += timeInterval;
        if (timeTableSlots[j + 1].isAvailable) {
          continue;
        } else {
          if (totalAvailableTimeInMin >= selectedMovie.duration) {
            timeTableSlots[i].isEnoughTime = true;
          }
          else {
            timeTableSlots[i].isEnoughTime = false;
          }
          break;
        }
      }
    }

    const hallTimeTable: HallTimeTable = {
      hall: hallWithMovies.hall,
      timeTable: timeTableSlots,
    };

    result.push(hallTimeTable);
  });

  return result;
}

const ShotTimeForDateCard = ({ showTimeForDate, selectedMovie, onSlotSelected }
  : { showTimeForDate: IShowTimeForDate, selectedMovie: IMovie, onSlotSelected: ({ h, s }: { h: IHall, s: TimeTableSlot }) => void }) => {
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
                <div>
                  {hallTimeTable.hall.name}
                </div>
                <div>
                  {
                    hallTimeTable.timeTable.map((slot, slotIndex) => {
                      return (
                        <div key={`${index}-${slotIndex}`} style={{ display: 'inline-block', margin: '5px' }}>
                          <button
                            disabled={!(slot.isAvailable && slot.isEnoughTime)}
                            style={{
                              padding: '10px',
                              // border: slot.isAvailable ? '3px solid #00FF00' : '3px solid #FF0000',
                              border: slot.isAvailable && slot.isEnoughTime
                                ? '3px solid #00FF00'
                                : slot.isAvailable && !slot.isEnoughTime
                                  ? '3px solid #FFFF00'
                                  : '3px solid #FF0000',
                              width: '60px',
                            }}
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

