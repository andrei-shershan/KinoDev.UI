import { useNavigate } from 'react-router-dom';
import useIsMobile from '../../hooks/useIsMobile';
import { Movie } from '../../models/api.models';
import { ROUTES } from '../../constants/routes';
import { getImageSourceUrl } from '../../utils/images';

import './moviesListAdmin.css';

export const MoviesListAdmin = (
  {
    movie
  }: {
    movie: Movie
  }
) => {

  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="movie-card">
      <button
        key={movie.id}
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
          backgroundImage: `url(${getImageSourceUrl(movie.url)})`,
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
  );
}