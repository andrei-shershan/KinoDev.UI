import { useParams } from 'react-router-dom';
import MainLayout from '../layouts/mainLayout';

const ShowTime = () => {
  const { showTimeId } = useParams<{ showTimeId: string }>();

  if (!showTimeId) {
    return <div>Show time ID is required</div>;
  }

  return (
    <MainLayout>
      <div>
        <h1>Show Time Details</h1>
        <p>Show Time ID: {showTimeId}</p>
      </div>
    </MainLayout>
  );
};

export default ShowTime;