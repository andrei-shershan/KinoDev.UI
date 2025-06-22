import { useEffect } from "react";
import { ENDPOINTS } from "../../constants/endpoints";
import { PORTALS_TYPES } from "../../constants/portalTypes";
import { URLS } from "../../constants/urls";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";
import MainLayout from "../../layouts/mainLayout";
import useIsMobile from "../../hooks/useIsMobile";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { Movie } from "../../models/api.models";
import { useApplicationContext } from "../../state-management/providers/AdminContextProvider";
import { getImageSourceUrl } from "../../utils/images";

import "./index.css";
import './../../components/movies/moviesListAdmin.css';
import { HeaderActions } from "../../components/header-actions/headerActions";
import { BasicDetails } from "../../components/labels/BasicDetails";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";

const AdminMovie: React.FC = () => {
  const { fetchGet } = useInternalApiClient();
  const isMobile = useIsMobile();
  const { movieId } = useParams<{ movieId: string }>();

  useEffect(() => {
    const getMovie = async () => {
      dispatch({ type: "GET_MOVIE", payload: undefined });
      const moviesResponse = await fetchGet(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.MOVIES.GET_MOVIES}/${movieId}`);
      if (moviesResponse.ok) {
        const movie: Movie = await moviesResponse.json();
        dispatch({ type: "GET_MOVIE", payload: movie });
      }
    }
    getMovie();
  }, [movieId]);

  const { state, dispatch } = useApplicationContext();
  const navigate = useNavigate();

  const movie = state.movie;

  return (
    <MainLayout portalType={PORTALS_TYPES.ADMIN} >
      <HeaderActions
        action={() => navigate(`/${ROUTES.ADMIN_PORTAL.MOVIES}`)}
        label="Go back to movies List"
        type="back"
      />
      {
        (!movie) &&
        <p>
          No movie was found, please try to find another one.
        </p>
      }
      {
        (movie) &&
        <div className="movie-card">
          <div className="movie-card-img" style={{
            width: isMobile ? '100px' : '200px',
            height: isMobile ? '100px' : '200px',
            backgroundImage: `url(${getImageSourceUrl(movie.url)})`,
          }} >
          </div>
          <div className="movie-card-content">
            <h2>{movie.name}</h2>
            <BasicDetails
              details={movie.releaseDate.toString()}
              multiline
            >
              <CalendarOutlined />
            </BasicDetails>
            <BasicDetails
              details={`${movie.duration} minutes`}
            >
              <ClockCircleOutlined />
            </BasicDetails>

            <p>{movie.description}</p>
          </div>
        </div>
      }

    </MainLayout>
  );
}

export default AdminMovie;