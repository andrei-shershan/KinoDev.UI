import { useState } from "react";
import { PORTALS_TYPES } from "../../constants/portalTypes";
import MainLayout from "../../layouts/mainLayout";
import { ENDPOINTS } from "../../constants/endpoints";
import { URLS } from "../../constants/urls";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

import "./index.css";

const AdminAddHall = () => {
  const { fetchPost } = useInternalApiClient();
  const navigate = useNavigate();  // Form state
  const [hallData, setHallData] = useState({
    name: "",
    rowsCount: 1,
    seatsCount: 1,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
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
    setIsSubmitting(true);
    setError("");

    try {      
      // Validate form
      if (!hallData.name.trim()) {
        setError("Please enter a hall name");
        setIsSubmitting(false);
        return;
      }
      
      if (hallData.rowsCount < 1 || hallData.rowsCount > 10) {
        setError("Rows count must be between 1 and 10");
        setIsSubmitting(false);
        return;
      }
      
      if (hallData.seatsCount < 1 || hallData.seatsCount > 10) {
        setError("Seats count must be between 1 and 10");
        setIsSubmitting(false);
        return;
      }      // Send the request
      const response = await fetchPost(
        `${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.HALLS.GET_HALLS}`,
        {
          name: hallData.name,
          rowsCount: hallData.rowsCount,
          seatsCount: hallData.seatsCount,
        }
      );
      if (response.ok) {
        // Navigate to halls list page after successful creation
        navigate(`/${ROUTES.ADMIN_PORTAL.HALLS}`);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to add hall");
      }
    } catch (err) {
      setError("An error occurred while adding the hall");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout portalType={PORTALS_TYPES.ADMIN}>
      <p>
        <Link to={`/${ROUTES.ADMIN_PORTAL.HALLS}`} className="admin-movie__back">
          Go back to halls list
        </Link>
      </p>

      <h1>Add Hall</h1>

      <div className="admin-add-movie-container">
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-add-movie-form">          <div className="form-group">
            <label htmlFor="name">Hall Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={hallData.name}
              onChange={handleInputChange}
              placeholder="Enter hall name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rowsCount">Rows Count*</label>
            <input
              type="number"
              id="rowsCount"
              name="rowsCount"
              value={hallData.rowsCount}
              onChange={handleInputChange}
              min="1"
              max="10"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="seatsCount">Seats Count*</label>
            <input
              type="number"
              id="seatsCount"
              name="seatsCount"
              value={hallData.seatsCount}
              onChange={handleInputChange}
              min="1"
              max="10"
              required
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? "Adding Hall..." : "Add Hall"}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default AdminAddHall;