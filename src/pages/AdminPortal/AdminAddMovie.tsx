import { useState } from "react";
import { ENDPOINTS } from "../../constants/endpoints";
import { PORTALS_TYPES } from "../../constants/portalTypes";
import { URLS } from "../../constants/urls";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";
import MainLayout from "../../layouts/mainLayout";

import "./index.css";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { Movie } from "../../models/api.models";
import { PageHeader } from "../../components/headers/pageHeader";
import { Input } from "../../ui/Input";
import { InputType, StyleType } from "../../ui/types";
import { TextArea } from "../../ui/TextArea";
import Button from "../../ui/Button";
import { SyncOutlined } from "@ant-design/icons";

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
    setError("");

    try {
      // Validate form
      if (!movieData.name || !movieData.description || !movieData.releaseDateDay || !movieData.releaseDateMonth || !movieData.releaseDateYear || !poster) {
        setError("Please fill all required fields and upload a poster");
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
      
    }
  };

  return (
    <MainLayout portalType={PORTALS_TYPES.ADMIN} >
      <PageHeader
        header="Add Movie"
        actionLabel="Go back to movies list"
        action={() => navigate(`/${ROUTES.ADMIN_PORTAL.MOVIES}`)}
        type="back"
      />

      <div>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>

          <Input
            type={InputType.Text}
            id="name"
            name="name"
            value={movieData.name}
            onChange={handleInputChange}
            labelText="Movie Name*"
            placeholder="Enter movie name"
            required
          />

          <TextArea
            id="description"
            name="description"
            value={movieData.description}
            onChange={handleInputChange}
            rows={5}
            required
            placeholder="Enter movie description"
            labelText="Description*"
          />

          <div style={{ display: 'flex', gap: '10px' }}>
            <Input
              type={InputType.Number}
              id="releaseDateDay"
              name="releaseDateDay"
              value={movieData.releaseDateDay}
              onChange={handleInputChange}
              required
              min={1}
              max={31}
              labelText="Release Day*"
              width={100}
            />

            <Input
              type={InputType.Number}
              id="releaseDateMonth"
              name="releaseDateMonth"
              value={movieData.releaseDateMonth}
              onChange={handleInputChange}
              required
              min={1}
              max={12}
              labelText="Release Month*"
              width={100}
            />

            <Input
              type={InputType.Number}
              id="releaseDateYear"
              name="releaseDateYear"
              value={movieData.releaseDateYear}
              onChange={handleInputChange}
              required
              min={1900}
              max={new Date().getFullYear() + 1}
              labelText="Release Year*"
              width={100}
            />
          </div>

          <Input
            type={InputType.Number}
            id="duration"
            name="duration"
            value={movieData.duration}
            onChange={handleInputChange}
            required
            min={1}
            max={300}
            labelText="Duration (minutes)*"
          />

          <Input
            type={InputType.File}
            id="poster"
            name="poster"
            accept="image/*"
            onChange={handleFileChange}
            labelText="Movie Poster*"
            required
          />

          {posterPreview && (
            <div className="poster-preview">
              <img src={posterPreview} alt="Movie poster preview" style={{ maxWidth: '200px', marginTop: '10px' }} />
            </div>
          )}

          <br />

          <Button
            type="submit"
            style={StyleType.Primary}
            text={"Add Movie"}
            disabled={!movieData.name.trim() || !movieData.description.trim() || !movieData.releaseDateDay || !movieData.releaseDateMonth || !movieData.releaseDateYear || !poster}
          />

          <Button
            type="button"
            style={StyleType.Free}
            onClick={() => { setMovieData({
              name: "",
              description: "",
              releaseDateDay: "",
              releaseDateMonth: "",
              releaseDateYear: "",
              duration: 0,

            });
              setPoster(null);
              setPosterPreview("");
            }}
          >
            <SyncOutlined /> Reset
          </Button>
        </form>
      </div>
    </MainLayout>
  );
}

export default AdminAddMovie;