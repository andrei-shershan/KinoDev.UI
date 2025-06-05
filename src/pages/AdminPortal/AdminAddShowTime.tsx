import { useNavigate } from "react-router-dom";
import { PORTALS_TYPES } from "../../constants/portalTypes";
import MainLayout from "../../layouts/mainLayout";
import { ROUTES } from "../../constants/routes";
import { useEffect, useState } from "react";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";
import { ENDPOINTS } from "../../constants/endpoints";
import { URLS } from "../../constants/urls";
import Dropdown from "../../ui/Dropdown";
import { getDays } from "./AdminShowTimes";
import Button from "../../ui/Button";
import { InputType, SizeType, StyleType } from "../../ui/types";
import { message } from "antd";
import { Movie, ShowTimeForDate } from "../../models/api.models";
import { getImageSourceUrl } from "../../utils/images";
import { PageHeader } from "../../components/headers/pageHeader";
import { Input } from "../../ui/Input";
import { useApplicationContext } from "../../state-management/providers/AdminContextProvider";
import { APPLICATION_ACTIONS_CONSTS } from "../../state-management/action-constants/application";
import { SyncOutlined } from "@ant-design/icons";
import { ShowTimeForDateCard } from "../../components/show-times/ShowTimeForDateCard";
import { useIsLoading } from "../../hooks/useIsLoading";

interface AddShowTimeRequestModel {
  movieId: number;
  hallId: number;
  time: Date;
  price: number;
}

const AdminAddShowTime = () => {
  const { fetchGet, fetchPost } = useInternalApiClient();
  const navigate = useNavigate();
  const { dispatch } = useApplicationContext();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showTimeForDate, setShowTimeForDate] = useState<ShowTimeForDate | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [addShowTimeRequestModel, setAddShowTimeRequestModel] = useState<AddShowTimeRequestModel | null>();
  const { setIsLoading } = useIsLoading();

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true);
        setAddShowTimeRequestModel(null);
        const moviesResponse = await fetchGet(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.MOVIES.GET_MOVIES}`);
        if (moviesResponse.ok) {
          const moviesResult: Movie[] = await moviesResponse.json();
          setMovies(moviesResult);
        }
        else {
          setShowTimeForDate(null);
        }
      }
      catch (error) {
        console.error("Failed to fetch movies:", error);
      }
      finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, []);

  useEffect(() => {
    const getShowTimesSlots = async () => {
      try {
        setIsLoading(true);
        setAddShowTimeRequestModel(null);
        const showtimesSlotsResponse = await fetchGet(
          `${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.SHOW_TIMES.GET_SHOW_TIMES_SLOTS}/${selectedDate?.toISOString().split('T')[0]}`);
        if (showtimesSlotsResponse.ok) {
          const showtimesSlots: ShowTimeForDate = await showtimesSlotsResponse.json();
          setShowTimeForDate(showtimesSlots);
        }
      }
      catch (error) {
        console.error("Failed to fetch show times slots:", error);
      }
      finally {
        setIsLoading(false);
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
      dispatch({ type: APPLICATION_ACTIONS_CONSTS.SET_SPINNING, payload: true });
      const timeAndPriceAdjustedModel = {
        ...addShowTimeRequestModel,
        time: addShowTimeRequestModel
          ? new Date(addShowTimeRequestModel.time.getTime() - (addShowTimeRequestModel.time.getTimezoneOffset() * 60000)) // Adjust for timezone
          : new Date(),
        price: price
      }

      const addShowTimeRequestResponse = await fetchPost(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.SHOW_TIMES.GET_SHOW_TIMES}`, timeAndPriceAdjustedModel);
      if (addShowTimeRequestResponse.ok) {
        dispatch({ type: APPLICATION_ACTIONS_CONSTS.SET_SPINNING, payload: false });
        navigate(`/${ROUTES.ADMIN_PORTAL.SHOWTIMES}`);
      }
      else {
        message.error("Failed to add show time. Please try again.");
      }
    }
    finally {
      dispatch({ type: APPLICATION_ACTIONS_CONSTS.SET_SPINNING, payload: false });
    }
  }

  return (
    <MainLayout portalType={PORTALS_TYPES.ADMIN}>
      <PageHeader
        header="Add Hall"
        actionLabel="Go back to Showtimes list"
        action={() => navigate(`/${ROUTES.ADMIN_PORTAL.SHOWTIMES}`)}
        type="back"
      />

      <div>

        <Dropdown
          options={movies.map(movie => ({ value: movie.id.toString(), label: movie.name }))}
          onChange={handleMovieChange}
          labelText="Select Movie:"
          id="movieDropdown"
          selectedValue={selectedMovie ? selectedMovie.id.toString() : ""}
        />

        {
          selectedMovie && (
            <div>
              <h3>Selected Movie: {selectedMovie.name}</h3>
              <p>Duration: {selectedMovie.duration} minutes</p>
              <div className="movie-card-img" style={{
                width: '200px',
                height: '200px',
                backgroundImage: `url(${getImageSourceUrl(selectedMovie.url)})`,
                backgroundSize: 'cover',
                display: 'inline-block',
                verticalAlign: 'top'
              }} >
              </div>
            </div>
          )
        }

        <br />

        <Dropdown
          id="startDateDropdown"
          options={getDays()}
          onChange={handleDateChange}
          selectedValue={selectedDate ? selectedDate.toISOString().split('T')[0] : ""}
          labelText="Select date:"
        />

        <br />

        <Input
          type={InputType.Number}
          id="price"
          name="price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Enter price"
          labelText="Price*"
          required
          min={0}
        />

        <br />

        {
          !addShowTimeRequestModel && selectedDate && selectedMovie && showTimeForDate && (
            <ShowTimeForDateCard
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

        <br />

        <Button
          disabled={!addShowTimeRequestModel || price <= 0}
          size={SizeType.Medium}
          style={StyleType.Primary}
          onClick={handleAddShowTime}
          text="Add Show Time"
        />

        <Button
          type="button"
          style={StyleType.Free}
          onClick={() => {
            setSelectedMovie(null);
            setSelectedDate(null);
            setShowTimeForDate(null);
            setAddShowTimeRequestModel(null);
            setPrice(0);
          }}
        >
          <SyncOutlined /> Reset
        </Button>
      </div>
    </MainLayout >
  );
}

export default AdminAddShowTime;