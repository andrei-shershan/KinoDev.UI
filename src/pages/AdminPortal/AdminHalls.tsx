import { useEffect } from "react";
import { PORTALS_TYPES } from "../../constants/portalTypes";
import MainLayout from "../../layouts/mainLayout";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useApplicationContext } from "../../state-management/providers/AdminContextProvider";
import { getHalls } from "../../api-calls/halls";
import { PageHeader } from "../../components/headers/pageHeader";

import './index.css';
import { HallSummary } from "../../models/api.models";

const getHallStats = (hall: HallSummary) => {
  // If no seats, return empty stats
  if (!hall.seats || hall.seats.length === 0) {
    return { rowsCount: 0, seatsPerRow: 0 };
  }

  // Get unique rows
  const rows = [...new Set(hall.seats.map(seat => seat.row))];
  const rowsCount = rows.length;

  const seatsPerRow = hall.seats.filter(seat => seat.row === rows[0]).length;
  return {
    rowsCount,
    seatsPerRow
  };
};

const AdminHalls = () => {
  const apiClient = useInternalApiClient();
  const { state, dispatch } = useApplicationContext();
  const navigate = useNavigate();

  useEffect(() => {
    getHalls(apiClient, dispatch);
  }, []);

  return (
    <MainLayout portalType={PORTALS_TYPES.ADMIN} >
      <PageHeader
        header="Halls"
        action={() => navigate(`/${ROUTES.ADMIN_PORTAL.HALLS_ADD}`)}
        actionLabel="Add a new hall"
        type="add"
      />
      {
        (!state.halls || state.halls.length === 0) &&
        <p>No halls available. Please add a hall.</p>
      }

      {
        state.halls && state.halls.length > 0 &&
        state.halls.map((hall) => (
          <div key={hall.id} className="hall-card">
            <h3>{hall.name}</h3>
            <p>Seats: <strong>{hall.seats.length}</strong> ({`${getHallStats(hall).rowsCount} x ${getHallStats(hall).seatsPerRow}`})</p>
          </div>
        ))
      }

    </MainLayout>
  );
}

export default AdminHalls;