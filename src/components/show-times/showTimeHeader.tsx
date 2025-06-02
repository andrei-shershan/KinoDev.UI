import { Grid } from "antd";
import DataLoading from "../dataLoading";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import Button from "../../ui/Button";
import { ShowTimeDetailsApiModel } from "../../models/api.models";
import { useApplicationContext } from "../../state-management/providers/AdminContextProvider";
import { getDateTimeObject } from "../../utils/date-time";
const { useBreakpoint } = Grid;

const BuyTicketCard = ({ showTimeDetails }: { showTimeDetails: ShowTimeDetailsApiModel }) => {
    const navigate = useNavigate();

    return (
        <div>
            <h2>{getDateTimeObject(showTimeDetails.time).date} {getDateTimeObject(showTimeDetails.time).time}</h2>
            <h2>{showTimeDetails.price}</h2>
            <h3>{showTimeDetails.hall.name}</h3>

            <Button
                onClick={() => navigate(`/${ROUTES.SHOWTIMES}/${showTimeDetails.id}/booking`)}
            >
                {'Buy Ticket'}
            </Button>
        </div>
    );
}

const MovieDetails = ({ showTimeDetails, isBooking }: { showTimeDetails: ShowTimeDetailsApiModel, isBooking: boolean }) => {
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

const DesktopLayout = ({ showTimeDetails, isBooking }: { showTimeDetails: ShowTimeDetailsApiModel, isBooking: boolean }) => {
    return (<>
        <MovieDetails showTimeDetails={showTimeDetails} isBooking={isBooking} />
    </>);
}

const MobileLayout = ({ showTimeDetails, isBooking }: { showTimeDetails: ShowTimeDetailsApiModel, isBooking: boolean }) => {
    return (<>
        <MovieDetails showTimeDetails={showTimeDetails} isBooking={isBooking} />
    </>);
}

const ShowTimeHeader = ({ showTimeDetails, isBooking }: { showTimeDetails: ShowTimeDetailsApiModel, isBooking: boolean }) => {
    if (!showTimeDetails) {
        return <DataLoading />;
    }

    const { state } = useApplicationContext();
    const navigate = useNavigate();

    if (state.activeOrderSummary) {
        return (
            <div>
                <div>
                    <br />
                    <br />
                    Opps, you already have an active order. Please complete the order before booking a new one.
                    <Button
                        onClick={() => navigate(`/${ROUTES.BOOKING}`)}
                    >
                        {'Go to basket'}
                    </Button>
                </div>
            </div>
        );
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