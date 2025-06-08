import { useNavigate } from 'react-router-dom';
import useIsMobile from '../../hooks/useIsMobile';
import { Movie } from '../../models/api.models';
import { ROUTES } from '../../constants/routes';
import { getImageSourceUrl } from '../../utils/images';

import './moviesListAdmin.css';
import { BasicDetails } from '../labels/BasicDetails';
import ClockCircleOutlined from '@ant-design/icons/lib/icons/ClockCircleOutlined';
import { CalendarOutlined } from '@ant-design/icons';

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
    <button
      key={movie.id}
      className='button-style-reset movie-card'
      onClick={() => { navigate(`/${ROUTES.ADMIN_PORTAL.MOVIES}/${movie.id}`) }}
    >
      <div className="movie-card-img" style={{
        width: isMobile ? '100px' : '200px',
        height: isMobile ? '100px' : '200px',
        backgroundImage: `url(${getImageSourceUrl(movie.url)})`,
      }} >
      </div>
      <div className="movie-card-content">
        <h2>{movie.name}</h2>
        <BasicDetails
          details={movie.releaseDate.toString()}
          multiline
        >
          <CalendarOutlined />
        </BasicDetails>
        <BasicDetails
          details={`${movie.duration} minutes`}
        >
          <ClockCircleOutlined />
        </BasicDetails>

        <p>{movie.description?.substring(0, isMobile ? 200 : 400) + '...'}</p>
      </div>
    </button>
  );
}