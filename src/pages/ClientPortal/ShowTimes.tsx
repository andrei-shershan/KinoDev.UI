import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ShowingMoviesDatePicker from "../../components/show-times/showingMoviesDatePicker";
import { PORTALS_TYPES } from "../../constants/portalTypes";
import { ROUTES } from "../../constants/routes";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";
import MainLayout from "../../layouts/mainLayout";
import { useApplicationContext } from "../../state-management/providers/AdminContextProvider";
import { getShowingMovies } from "../../api-calls/movies";
import { useIsLoading } from "../../hooks/useIsLoading";
import { PageHeader } from "../../components/headers/pageHeader";
import { ShowingMovieCard } from "../../components/show-times/showingMovieCard";

const ShowTimes: React.FC = () => {

  const { state, dispatch } = useApplicationContext();
  const apiClient = useInternalApiClient();
  const { date } = useParams<{ date?: string }>();
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState<string>(date ? date : today);

  const { setIsLoading } = useIsLoading();

  const getDateString = (): string => {
    if (date) {
      return date;
    }
    return today;
  };

  useEffect(() => {
    getShowingMovies(apiClient, dispatch, getDateString(), setIsLoading);
  }, [selectedDate]);

  const handleShowTimeClick = (showTimeId: number) => {
    navigate(`/${ROUTES.SHOWTIMES}/${showTimeId}`, {
      state: {
        from: location.pathname
      }
    });
  }

  return (
    <MainLayout portalType={PORTALS_TYPES.CLIENT} >
      <PageHeader
        header='Showing Movies'
      />

      <ShowingMoviesDatePicker
        selectedDate={getDateString()}
        callBack={(pickedDate: string) => {
          setSelectedDate(pickedDate);
          navigate(`/showing/${pickedDate}`);
        }}
      />

      {
        state.showingMovies && state.showingMovies?.length > 0
          ? state.showingMovies.map((movie) =>
            <ShowingMovieCard movie={movie} handleShowTimeClick={handleShowTimeClick} />
          )
          : <p>
            No movies are currently showing
          </p>
      }
    </MainLayout >
  );
}

export default ShowTimes;