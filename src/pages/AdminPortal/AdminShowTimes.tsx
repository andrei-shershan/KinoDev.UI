import { useEffect, useState } from "react";
import { PORTALS_TYPES } from "../../constants/portalTypes";
import { useAdminContext } from "../../context/AdminContext";
import MainLayout from "../../layouts/mainLayout";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";
import { URLS } from "../../constants/urls";
import { ENDPOINTS } from "../../constants/endpoints";
import { IShowTimeDetails } from "../../models/applicationContext.model";
import Dropdown from "../../ui/Dropdown";
import useIsMobile from "../../hooks/useIsMobile";
import { getImageSource } from "../../utils/imageSource";
import { getShowTimeTime } from "../../components/show-times/showTimeButton";
import Button from "../../ui/Button";
import { SizeType, StyleType } from "../../ui/types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const getDateTime = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;//T00:00:00`;
}

const today = new Date();

// TODO: Move this to a utility file
export const getDays = () => {
  const days = [];
  let date = new Date(today);

  for (let i = 0; i < 30; i++) {

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    var value = `${year}-${month}-${day}`;
    var label = `${year % 2000}-${month}-${day}`;

    var obj = {
      value,
      label
    };

    days.push(obj);
    date.setDate(date.getDate() + 1); // Increment the date by 1
  }

  return days;
}

interface ShowTimeGroupByMovie {
  movieId: string;
  movieName: string;
  url: string;
  duration?: number;
  showTimes: IShowTimeDetails[];
}


interface ShowTimeGroupedByDate {
  dateKey: string;
  movies: ShowTimeGroupByMovie[];
}

const getShowTimesGroupedByDate = (showTimes: IShowTimeDetails[]): ShowTimeGroupedByDate[] => {
  let result: ShowTimeGroupedByDate[] = [];

  for (let i = 0; i < showTimes.length; i++) {
    const dateKey = new Date(showTimes[i].time).toISOString().split("T")[0];
    if (!result.find(x => x.dateKey === dateKey)) {
      result.push({
        dateKey: dateKey,
        movies: []
      });
    }

    const movies = result.find(x => x.dateKey === dateKey)?.movies;
    const movieShowTimes = movies?.find(x => x.movieId === showTimes[i].movie.id.toString())?.showTimes;
    if (movieShowTimes) {
      movieShowTimes.push(showTimes[i]);
    }
    else if (movies) {
      movies.push({
        movieId: showTimes[i].movie.id.toString(),
        movieName: showTimes[i].movie.name,
        url: showTimes[i].movie.url,
        duration: showTimes[i].movie.duration,
        showTimes: [showTimes[i]]
      });
    }
  }

  return result;
}

const AdminShowTimes = () => {
  const { state, dispatch } = useAdminContext();
  const [startDate, setStartDate] = useState(getDateTime(new Date()));
  const [endDate, setEndDate] = useState(getDateTime(new Date()));
  const navigate = useNavigate();

  const { fetchGet } = useInternalApiClient();

  const isMobile = useIsMobile();

  useEffect(() => {
    const getShowTimes = async () => {
      const getShowTimesResponse
        = await fetchGet(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.SHOW_TIMES.GET_SHOW_TIMES}/${startDate}/${endDate}`);
      if (getShowTimesResponse.ok) {
        const showTimes: IShowTimeDetails[] = await getShowTimesResponse.json();
        // TODO: use AdminActions 
        dispatch({ type: "GET_SHOW_TIMES", payload: showTimes });
      } else {
        if (getShowTimesResponse.status === 404) {
          dispatch({ type: "GET_SHOW_TIMES", payload: [] });
        }
      }
    }

    getShowTimes();
  }, [startDate, endDate]);

  const handleStartDateDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEndDate(e.target.value);
  };

  if (state.showTimes) {
    const showTimesGroupedByDate = getShowTimesGroupedByDate(state.showTimes);
    console.log("showTimesGroupedByDate", showTimesGroupedByDate);
  }


  return (
    <MainLayout portalType={PORTALS_TYPES.ADMIN} >

      <div className="admin-showtimes">
        <h1>Admin Show Times</h1>

        <br />
        <Button
          text="Add Show time"
          size={SizeType.Medium}
          style={StyleType.Primary}
          onClick={() => { navigate(`/${ROUTES.ADMIN_PORTAL.SHOWTIMES_ADD}`) }}
        />
        <br />

        <p>Select start and end dates</p>

        <div className="dropdown-container">
          <Dropdown
            id="startDateDropdown"
            options={getDays()}
            onChange={handleStartDateDropdownChange}
            selectedValue={startDate}
            labelText="Select start date:"
          />
          <Dropdown
            id="endDateDropdown"
            options={getDays()}
            onChange={handleEndDateDropdownChange}
            selectedValue={endDate}
            labelText="Select end date:"
          />
        </div>

        <br />
        {
          getShowTimesGroupedByDate(state.showTimes || []).map((group) => (
            <div key={group.dateKey} className="showtime-group">
              <h3>{group.dateKey}</h3>
              {
                group.movies.map((movie) => (
                  <div key={movie.movieId} className="showtime-movie">

                    <div className="showtime-details" style={{ display: 'block' }} >
                      <div className="movie-card-img" style={{
                        width: isMobile ? '100px' : '200px',
                        height: isMobile ? '100px' : '200px',
                        backgroundImage: `url(${getImageSource(movie.url)})`,
                        backgroundSize: 'cover',
                        display: 'inline-block',
                        verticalAlign: 'top'
                      }} >
                      </div>
                      <div style={{ display: 'inline-block' }}>
                        <h3>{movie.movieName}</h3>
                        {
                          movie.showTimes.map((showTime) => (
                            <div>
                              <strong>{getShowTimeTime(showTime.time)}</strong>
                              <span>Hall: {showTime.hall.name}</span>
                            </div>
                          ))
                        }
                      </div>

                    </div>
                  </div>
                ))
              }

            </div>))
        }
      </div>
    </MainLayout>
  );
}

export default AdminShowTimes;