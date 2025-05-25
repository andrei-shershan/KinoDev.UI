import { useEffect } from "react";
import { ENDPOINTS } from "../../constants/endpoints";
import { PORTALS_TYPES } from "../../constants/portalTypes";
import { URLS } from "../../constants/urls";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";
import MainLayout from "../../layouts/mainLayout";
import { useAdminContext } from "../../context/AdminContext";

import "./index.css";
import useIsMobile from "../../hooks/useIsMobile";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { getImageSource } from "../../utils/imageSource";
import Button from "../../ui/Button";
import { SizeType, StyleType } from "../../ui/types";

const AdminMovies: React.FC = () => {
  const { fetchGet } = useInternalApiClient();
  const isMobile = useIsMobile();

  useEffect(() => {
    const getMovies = async () => {
      const moviesResponse = await fetchGet(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.MOVIES.GET_MOVIES}`);
      if (moviesResponse.ok) {
        const movies = await moviesResponse.json();
        dispatch({ type: "GET_MOVIES", payload: movies });
      }
    }
    getMovies();
  }, []);

  const { state, dispatch } = useAdminContext();

  const navigate = useNavigate();

  return (
    <MainLayout portalType={PORTALS_TYPES.ADMIN} >
      {
        (!state.movies || state.movies.length === 0) &&
        <p>
          No movies available. Please add some movies to the list.
        </p>
      }

      <br />

      <Button 
        text="Add Movie"
        size={SizeType.Medium} 
        style={StyleType.Primary} 
        onClick={() => { navigate(`/${ROUTES.ADMIN_PORTAL.MOVIES_ADD}`) }}
      />

      <br />

      {
        state.movies?.length > 0 &&
        <div>
          <h1>Movies List</h1>
          {state.movies.map((movie) => (
            <div className="movie-card">
              <button
                key={movie.id} // Don't forget to add a key for list items
                style={{
                  // Reset button-specific styles
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  margin: 0,
                  width: '100%',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                  cursor: 'pointer',
                  // Your existing styles
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block'
                }}
                onClick={() => { navigate(`/${ROUTES.ADMIN_PORTAL.MOVIES}/${movie.id}`) }}
              >
                <div className="movie-card-img" style={{
                  width: isMobile ? '100px' : '200px',
                  height: isMobile ? '100px' : '200px',
                  backgroundImage: `url(${getImageSource(movie.url)})`,
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
                  <p>{movie.description?.substring(0, isMobile ? 200 : 400) + '...'}</p>
                </div>
              </button>
            </div>
          ))}
        </div>
      }

    </MainLayout>
  );
}

export default AdminMovies;