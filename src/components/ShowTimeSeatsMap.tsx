import { useEffect, useState } from "react";
import { ENDPOINTS } from "../constants/endpoints";
import { URLS } from "../constants/urls";
import { useApplicationContext } from "../context/ApplicationContext";
import { useInternalApiClient } from "../hooks/useInternalApiClient";
import { message } from "antd";
import { ERRORS } from "../constants/errors";

const ShowTimeSeatsMap = ({ showTimeId }: { showTimeId: string }) => {

    const { dispatch } = useApplicationContext();
    const { fetchWithAccessToken } = useInternalApiClient();

    const [seats, setSeats] = useState<any>({});

    useEffect(() => {
        const getShowTimeSeatsData = async () => {
            dispatch({ type: 'SET_SPINNING', payload: true });
            var result = await fetchWithAccessToken(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.SHOW_TIMES.GET_SHOW_TIME_SEATS}/${showTimeId}`);

            try {
                if (result.ok) {
                    // var data: IShowTimeDetails = await result.json();
                    // dispatch({ type: 'GET_SHOW_TIME_DETAILS', payload: data });
                    var d = await result.json();
                    setSeats(d);
                } else {
                    message.error(ERRORS.GENERIC_API_ERROR);
                }

            } catch (error) {
                console.error(error);
                message.error(ERRORS.GENERIC_API_ERROR);
            }

            dispatch({ type: 'SET_SPINNING', payload: false });
        };

        getShowTimeSeatsData();
    }, []);

    console.log(seats);

    return (<div>
        HELLO
    </div>);
}

export default ShowTimeSeatsMap;