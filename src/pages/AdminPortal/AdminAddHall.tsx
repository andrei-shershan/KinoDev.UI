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
  const navigate = useNavigate();

  // Form state
  const [hallName, setHallName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHallName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Validate form
      if (!hallName.trim()) {
        setError("Please enter a hall name");
        setIsSubmitting(false);
        return;
      }

      // Send the request
      const response = await fetchPost(
        `${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.HALLS.GET_HALLS}`,
        {
          name: hallName,
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

        <form onSubmit={handleSubmit} className="admin-add-movie-form">
          <div className="form-group">
            <label htmlFor="name">Hall Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={hallName}
              onChange={handleInputChange}
              placeholder="Enter hall name"
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