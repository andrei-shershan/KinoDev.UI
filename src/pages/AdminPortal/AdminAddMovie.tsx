import { useState } from "react";
import { ENDPOINTS } from "../../constants/endpoints";
import { PORTALS_TYPES } from "../../constants/portalTypes";
import { URLS } from "../../constants/urls";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";
import MainLayout from "../../layouts/mainLayout";

import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { Movie } from "../../models/api.models";

const AdminAddMovie: React.FC = () => {
  const { fetchPost } = useInternalApiClient();
  const navigate = useNavigate();

  // Form state
  const [movieData, setMovieData] = useState({
    name: "",
    description: "",
    releaseDateDay: "",
    releaseDateMonth: "",
    releaseDateYear: "",
    duration: 0,
  });
  const [poster, setPoster] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMovieData({
      ...movieData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPoster(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPosterPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Validate form
      if (!movieData.name || !movieData.description || !movieData.releaseDateDay || !movieData.releaseDateMonth || !movieData.releaseDateYear || !poster) {
        setError("Please fill all required fields and upload a poster");
        setIsSubmitting(false);
        return;
      }

      // Create FormData object to send multipart/form-data
      const formData = new FormData();
      formData.append("name", movieData.name);
      formData.append("description", movieData.description);
      formData.append("releaseDate", '2025-02-01'); //new Date(movieData.releaseDate).toISOString());
      formData.append("duration", movieData.duration.toString());
      if (poster) {
        formData.append("file", poster);
      }
      // Let's examine the useInternalApiClient hook to see how it handles FormData
      const response = await fetchPost(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.MOVIES.GET_MOVIES}`, formData);
      if (response.ok) {
        const newMovie: Movie = await response.json();
        // Navigate to movie details page after successful creation
        navigate(`/${ROUTES.ADMIN_PORTAL.MOVIES}/${newMovie.id}`);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to add movie");
      }
    } catch (err) {
      setError("An error occurred while adding the movie");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout portalType={PORTALS_TYPES.ADMIN} >
      <p>
        <Link to={`/${ROUTES.ADMIN_PORTAL.MOVIES}`} className="admin-movie__back">
          Go back to movies List
        </Link>
      </p>

      <h1>Upload Movie</h1>

      <div className="admin-add-movie-container">
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-add-movie-form">
          <div className="form-group">
            <label htmlFor="name">Movie Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={movieData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description*</label>
            <textarea
              id="description"
              name="description"
              value={movieData.description}
              onChange={handleInputChange}
              rows={5}
              required
            />
          </div>

          <div className="form-group" >
            <label htmlFor="releaseDate">Release Date*</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="number"
                id="releaseDateDay"
                name="releaseDateDay"
                value={movieData.releaseDateDay}
                onChange={handleInputChange}
                required
                min={1}
                max={31}
              />
              <input
                type="number"
                id="releaseDateMonth"
                name="releaseDateMonth"
                value={movieData.releaseDateMonth}
                onChange={handleInputChange}
                required
                min={1}
                max={12}
              />
              <input
                type="number"
                id="releaseDateYear"
                name="releaseDateYear"
                value={movieData.releaseDateYear}
                onChange={handleInputChange}
                required
                min={1900}
                max={new Date().getFullYear() + 1} // Allow up to next year
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration (minutes)*</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={movieData.duration}
              onChange={handleInputChange}
              min="1"
              max={300} // Assuming max duration is 5 hours
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="poster">Movie Poster*</label>
            <input
              type="file"
              id="poster"
              name="poster"
              accept="image/*"
              onChange={handleFileChange}
              required
            />

            {posterPreview && (
              <div className="poster-preview">
                <img src={posterPreview} alt="Movie poster preview" style={{ maxWidth: '200px', marginTop: '10px' }} />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? "Adding Movie..." : "Add Movie"}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}

export default AdminAddMovie;