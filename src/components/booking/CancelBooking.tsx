import { CloseCircleOutlined } from "@ant-design/icons";
import Button from "../../ui/Button";
import { StyleType } from "../../ui/types";
import { useState } from "react";
import { Modal } from "antd";
import { URLS } from "../../constants/urls";
import { ENDPOINTS } from "../../constants/endpoints";
import { ROUTES } from "../../constants/routes";
import { useIsLoading } from "../../hooks/useIsLoading";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";
import { useNavigate } from "react-router-dom";

export const CancelBooking = () => {

  const [showCancelationModel, setShowCancelationModel] = useState(false);
  const { setIsLoading } = useIsLoading();
  const navigate = useNavigate();
  const { fetchDelete } = useInternalApiClient();

  const handleOrderCancelation = async () => {
    try {
      setIsLoading(true);
      var response = await fetchDelete(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.ORDERS.CANCEL_ACTIVE}`);
      if (response.ok) {
        navigate(`/${ROUTES.SHOWTIMES}`);
      }
    }
    catch (error) {
      console.error("Error canceling order:", error);
    }
    finally {
      setIsLoading(false);
    }

    setShowCancelationModel(false);
  }
  return (
    <>
      <Button
        style={StyleType.Icon}
        onClick={() => setShowCancelationModel(true)}
      >
        <CloseCircleOutlined style={{ fontSize: '20px' }} /> Cancel Booking
      </Button>
      <Modal
        title="Cancel your booking"
        open={showCancelationModel}
        onOk={handleOrderCancelation}
        onCancel={() => setShowCancelationModel(false)}
      >
      </Modal>
    </>
  );
}