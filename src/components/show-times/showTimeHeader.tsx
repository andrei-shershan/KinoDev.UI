import { Grid } from "antd";
import { IMovie, IShowTimeDetails } from "../../models/applicationContext.model";
import DataLoading from "../dataLoading";
import { getDateTimeObject } from "../../utils/dateFormatter";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
const { useBreakpoint } = Grid;

const BuyTicketCard = ({ showTimeDetails }: { showTimeDetails: IShowTimeDetails }) => {
    const navigate = useNavigate();

    return (
        <div>
            <h2>{getDateTimeObject(showTimeDetails.time).date} {getDateTimeObject(showTimeDetails.time).time}</h2>
            <h2>{showTimeDetails.price}</h2>
            <h3>{showTimeDetails.hall.name}</h3>

            <button
                onClick={() => navigate(`/${ROUTES.SHOWTIMES}/${showTimeDetails.id}/booking`)}
            >
                {'Buy Ticket'}
            </button>
        </div>
    );
}

const MovieDetails = ({ showTimeDetails, isBooking }: { showTimeDetails: IShowTimeDetails, isBooking: boolean }) => {
    const screens = useBreakpoint();

    const { movie } = showTimeDetails;

    if (screens.sm) {
        return (
            isBooking
                ? <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{
                        width: '150px',
                        height: '150px',
                        backgroundImage: `url(${movie.url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}>
                    </div>
                    <div style={{ flex: 1 }}>
                        <h1>{movie.name}</h1>
                        <p>{movie.releaseDate.toString()}</p>
                        <p>{movie.duration}</p>
                    </div>
                </div>
                : <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{
                        width: '300px',
                        height: '300px',
                        backgroundImage: `url(${movie.url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}>
                    </div>
                    <div style={{ flex: 1 }}>
                        <h1>{movie.name}</h1>
                        <p>{movie.releaseDate.toString()}</p>
                        <p>{movie.duration}</p>
                        <p>{movie.description}</p>
                        <BuyTicketCard showTimeDetails={showTimeDetails} />
                    </div>
                </div>
        );
    }
    else {
        return (
            isBooking
                ? <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        backgroundImage: `url(${movie.url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}>
                    </div>
                    <div style={{ flex: 1 }}>
                        <h1>{movie.name}</h1>
                        <p>{movie.releaseDate.toString()}</p>
                        <p>{movie.duration}</p>
                    </div>
                </div>
                : <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{
                        width: '150px',
                        height: '150px',
                        backgroundImage: `url(${movie.url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}>
                    </div>
                    <div style={{ flex: 1 }}>
                        <h1>{movie.name}</h1>
                        <p>{movie.releaseDate.toString()}</p>
                        <p>{movie.duration}</p>
                        <BuyTicketCard showTimeDetails={showTimeDetails} />
                    </div>
                </div>
        );
    }
};

const DesktopLayout = ({ showTimeDetails, isBooking }: { showTimeDetails: IShowTimeDetails, isBooking: boolean }) => {
    return (<p>
        <MovieDetails showTimeDetails={showTimeDetails} isBooking={isBooking} />
    </p>);
}

const MobileLayout = ({ showTimeDetails, isBooking }: { showTimeDetails: IShowTimeDetails, isBooking: boolean }) => {
    return (<p>
        <MovieDetails showTimeDetails={showTimeDetails} isBooking={isBooking} />
    </p>);
}

const ShowTimeHeader = ({ showTimeDetails, isBooking }: { showTimeDetails: IShowTimeDetails, isBooking: boolean }) => {

    if (!showTimeDetails) {
        return <DataLoading />;
    }
    const screens = useBreakpoint();

    if (screens.md) {
        return <DesktopLayout showTimeDetails={showTimeDetails} isBooking={isBooking} />;
    }
    else {
        return <MobileLayout showTimeDetails={showTimeDetails} isBooking={isBooking} />;
    }
}

export default ShowTimeHeader;