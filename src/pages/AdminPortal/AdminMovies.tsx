import { useEffect } from "react";
import { PORTALS_TYPES } from "../../constants/portalTypes";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";
import MainLayout from "../../layouts/mainLayout";

import "./index.css";
import { useNavigate } from "react-router-dom";
import { useApplicationContext } from "../../state-management/providers/AdminContextProvider";
import { getMovies } from "../../api-calls/movies";
import { MoviesListAdmin } from "../../components/movies/moviesListAdmin";
import { AdminPageHeader } from "../../components/headers/adminPageHeader";
import { ROUTES } from "../../constants/routes";

const AdminMovies: React.FC = () => {
  const apiClient = useInternalApiClient();
  const { state, dispatch } = useApplicationContext();

  useEffect(() => {
    getMovies(apiClient, dispatch);
  }, []);

  const navigate = useNavigate();

  return (
    <MainLayout portalType={PORTALS_TYPES.ADMIN} >
      <AdminPageHeader
        header="Movies List"
        addActionLabel="Add Movie"
        addAction={() => { navigate(`/${ROUTES.ADMIN_PORTAL.MOVIES_ADD}`) }}
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