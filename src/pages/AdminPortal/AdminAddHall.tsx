import { useState } from "react";
import { PORTALS_TYPES } from "../../constants/portalTypes";
import MainLayout from "../../layouts/mainLayout";
import { ENDPOINTS } from "../../constants/endpoints";
import { URLS } from "../../constants/urls";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useApplicationContext } from "../../state-management/providers/AdminContextProvider";
import Button from "../../ui/Button";
import { InputType, StyleType } from "../../ui/types";
import { APPLICATION_ACTIONS_CONSTS } from "../../state-management/action-constants/application";
import { PageHeader } from "../../components/headers/pageHeader";
import { Input } from "../../ui/Input";
import { SyncOutlined } from "@ant-design/icons";
import "./index.css";

const AdminAddHall = () => {
  const { fetchPost } = useInternalApiClient();
  const navigate = useNavigate();
  const [hallData, setHallData] = useState({
    name: "",
    rowsCount: 1,
    seatsCount: 1,
  });
  const [error, setError] = useState("");
  const { dispatch } = useApplicationContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "rowsCount" || name === "seatsCount") {
      const numValue = parseInt(value);
      if (!isNaN(numValue) && numValue >= 1 && numValue <= 10) {
        setHallData({
          ...hallData,
          [name]: numValue,
        });
      }
    } else {
      setHallData({
        ...hallData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Validate form
      if (!hallData.name.trim()) {
        setError("Please enter a hall name");
        return;
      }

      if (hallData.rowsCount < 1 || hallData.rowsCount > 10) {
        setError("Rows count must be between 1 and 10");
        return;
      }

      if (hallData.seatsCount < 1 || hallData.seatsCount > 10) {
        setError("Seats count must be between 1 and 10");
        return;
      }

      dispatch({ type: APPLICATION_ACTIONS_CONSTS.SET_SPINNING, payload: true });

      const response = await fetchPost(
        `${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.HALLS.GET_HALLS}`,
        {
          name: hallData.name,
          rowsCount: hallData.rowsCount,
          seatsCount: hallData.seatsCount,
        }
      );
      if (response.ok) {
        navigate(`/${ROUTES.ADMIN_PORTAL.HALLS}`);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to add hall");
      }
    } catch (err) {
      setError("An error occurred while adding the hall");
      console.error(err);
    } finally {
      dispatch({ type: APPLICATION_ACTIONS_CONSTS.SET_SPINNING, payload: false });
    }
  };

  return (
    <MainLayout portalType={PORTALS_TYPES.ADMIN}>
      <PageHeader
        header="Add Hall"
        actionLabel="Go back to halls list"
        action={() => navigate(`/${ROUTES.ADMIN_PORTAL.HALLS}`)}
        type="back"
      />

      <div>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>

          <Input
            type={InputType.Text}
            id="name"
            name="name"
            value={hallData.name}
            onChange={handleInputChange}
            placeholder="Enter hall name"
            labelText="Hall Name*"
            required
          />

          <Input
            type={InputType.Number}
            id="rowsCount"
            name="rowsCount"
            value={hallData.rowsCount}
            onChange={handleInputChange}
            placeholder="Enter rows count"
            labelText="Rows count*"
            required
            min={1}
            max={10}
          />

          <Input
            type={InputType.Number}
            id="seatsCount"
            name="seatsCount"
            value={hallData.seatsCount}
            onChange={handleInputChange}
            placeholder="Enter seats count"
            labelText="Seats count*"
            required
            min={1}
            max={10}
          />

          <br />
          <Button
            type={"submit"}
            style={StyleType.Primary}
            text="Add Hall"
            disabled={!hallData.name.trim() || hallData.rowsCount < 1 || hallData.seatsCount < 1}
          />

          <Button
            type="button"
            style={StyleType.Icon}
            onClick={() => {
              setHallData({
                name: "",
                rowsCount: 1,
                seatsCount: 1,
              });
            }}
          >
            <SyncOutlined /> Reset
          </Button>

        </form>
      </div>
    </MainLayout>
  );
};

export default AdminAddHall;