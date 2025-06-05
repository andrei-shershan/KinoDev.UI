import { useEffect } from "react";
import { ENDPOINTS } from "../../constants/endpoints";
import { PORTALS_TYPES } from "../../constants/portalTypes";
import { URLS } from "../../constants/urls";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";
import MainLayout from "../../layouts/mainLayout";
import useIsMobile from "../../hooks/useIsMobile";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { Movie } from "../../models/api.models";
import { useApplicationContext } from "../../state-management/providers/AdminContextProvider";
import { getImageSourceUrl } from "../../utils/images";
import { getDateTimeObject } from "../../utils/date-time";

import "./index.css";
import { AdminAction } from "../../components/admin-actions/addAction";

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
      <AdminAction 
        action={() =>navigate(`/${ROUTES.ADMIN_PORTAL.MOVIES}`)}
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
        <div className="admin-movie">
          <div className="movie-card">
            <div className="movie-card-img" style={{
              width: isMobile ? '100px' : '200px',
              height: isMobile ? '100px' : '200px',
              backgroundImage: `url(${getImageSourceUrl(movie.url)})`,
              backgroundSize: 'cover',
              display: 'inline-block',
              verticalAlign: 'top'
            }} >
            </div>
            <div className="movie-card-content" style={{
              display: 'inline-block',
              verticalAlign: 'top',
              maxWidth: isMobile ? 'calc(100% - 110px)' : 'calc(100% - 210px)',
              marginLeft: '10px'
            }}>
              <h2>{movie.name}</h2>
              <br />
              <p><strong>Release Date:</strong>{getDateTimeObject(movie.releaseDate).date} </p>

              <br />
              <p><strong>Duration</strong>{movie.duration}</p>
              <br />
              <p>{movie.description}</p>
            </div>
          </div>
        </div>
      }

    </MainLayout>
  );
}

export default AdminMovie;