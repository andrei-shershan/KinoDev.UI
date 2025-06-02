import { Grid } from "antd";
import { IShowTimeDetails } from "../../models/api.models";
const { useBreakpoint } = Grid;

const ShowTimeDetails = (
    {
        showTimeDetails,
        isBooking
    }:
        {
            showTimeDetails: IShowTimeDetails,
            isBooking: boolean
        }) => {

    const { movie } = showTimeDetails;

    const screens = useBreakpoint();
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
                    </div>
                </div>
        );
    }

}

export default ShowTimeDetails;