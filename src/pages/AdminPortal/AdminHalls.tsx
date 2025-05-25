import { useEffect } from "react";
import { PORTALS_TYPES } from "../../constants/portalTypes";
import MainLayout from "../../layouts/mainLayout";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";
import { ENDPOINTS } from "../../constants/endpoints";
import { IHall } from "../../models/applicationContext.model";
import { useAdminContext } from "../../context/AdminContext";
import { URLS } from "../../constants/urls";
import Button from "../../ui/Button";
import { SizeType, StyleType } from "../../ui/types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const AdminHalls = () => {
  const { fetchGet } = useInternalApiClient();
  const { state, dispatch } = useAdminContext();
  const navigate = useNavigate();

  useEffect(() => {
    const getHalls = async () => {
      console.log("Fetching halls...");
      console.log(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.HALLS}`);
      var hallsResponse = await fetchGet(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.HALLS.GET_HALLS}`);
      if (hallsResponse.ok) {
        const halls: IHall[] = await hallsResponse.json();
        dispatch({ type: 'GET_HALLS', payload: halls });
      }
    }

    getHalls();
  }, []);

  return (
    <MainLayout portalType={PORTALS_TYPES.ADMIN} >
      <br />
      <Button
        size={SizeType.Medium}
        style={StyleType.Primary}
        text="Add Hall"
        onClick={() => {
          navigate(`/${ROUTES.ADMIN_PORTAL.HALLS_ADD}`)
        }}
      />
      <br />
      <h1>Admin Halls</h1>
      {
        (!state.halls || state.halls.length === 0) &&
        <p>No halls available. Please add a hall.</p>
      }

      {
        state.halls && state.halls.length > 0 &&
        state.halls.map((hall) => (
          <div key={hall.id} className="hall-card">
            <div>
              <span>{hall.name}</span>
            </div>
          </div>
        ))
      }

    </MainLayout>
  );
}

export default AdminHalls;