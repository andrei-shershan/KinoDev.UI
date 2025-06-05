import { useEffect } from "react";
import { PORTALS_TYPES } from "../../constants/portalTypes";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";
import MainLayout from "../../layouts/mainLayout";
import { useNavigate } from "react-router-dom";
import { useApplicationContext } from "../../state-management/providers/AdminContextProvider";
import { getMovies } from "../../api-calls/movies";
import { MoviesListAdmin } from "../../components/movies/moviesListAdmin";
import { PageHeader } from "../../components/headers/pageHeader";
import { ROUTES } from "../../constants/routes";

import "./index.css";

const AdminMovies: React.FC = () => {
  const apiClient = useInternalApiClient();
  const { state, dispatch } = useApplicationContext();

  useEffect(() => {
    getMovies(apiClient, dispatch);
  }, []);

  const navigate = useNavigate();

  return (
    <MainLayout portalType={PORTALS_TYPES.ADMIN} >
      <PageHeader
        header="Movies List"
        actionLabel="Add Movie"
        action={() => { navigate(`/${ROUTES.ADMIN_PORTAL.MOVIES_ADD}`) }}
        type="add"
      />

      {
        (!state.movies || state.movies.length === 0) &&
        <p>
          No movies available. Please add some movies to the list.
        </p>
      }

      {
        state.movies && state.movies?.length > 0 &&
        <div>
          {state.movies.map((movie) => (
            <MoviesListAdmin
              movie={movie}
            />
          ))}
        </div>
      }
    </MainLayout>
  );
}

export default AdminMovies;