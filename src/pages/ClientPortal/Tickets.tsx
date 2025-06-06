import { useEffect, useState } from "react";
import { ENDPOINTS } from "../../constants/endpoints";
import { PORTALS_TYPES } from "../../constants/portalTypes";
import { URLS } from "../../constants/urls";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";
import MainLayout from "../../layouts/mainLayout";
import { OrderSummary } from "../../models/api.models";
import { useIsLoading } from "../../hooks/useIsLoading";
import { CompletedOrders } from "../../components/completed-orders/CompletedOrders";
import { PageHeader } from "../../components/headers/pageHeader";
import { EmailVerification } from "../../components/completed-orders/EmailVerification";
import { VerifyCode } from "../../components/completed-orders/VerifyCode";

const Tickets = () => {
  const [code, setCode] = useState("");
  const { fetchGet } = useInternalApiClient();
  const [completedOrders, setCompletedOrders] = useState<OrderSummary[]>([]);
  const { setIsLoading } = useIsLoading();
  const [verificationEmailSent, setVerificationEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  const getCompetedOrders = async () => {
    try {
      var response = await fetchGet(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.ORDERS.COMPLETED}`);
      if (response.ok) {
        const data: OrderSummary[] = await response.json();
        if (data?.length > 0) {
          setCompletedOrders(data);
        }
        else {
          setCompletedOrders([]);
        }
      }
    } catch (error) {
      setCompletedOrders([]);
      console.error('Failed to fetch completed orders:', error);
    }
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCompetedOrders();
  }, []);

  return (
    <MainLayout portalType={PORTALS_TYPES.CLIENT} >
      <PageHeader
        header="Your Tickets"
      />

      <CompletedOrders completedOrders={completedOrders} />

      <EmailVerification
        email={email}
        handleEmailChange={(e) => setEmail(e.target.value)}
        setVerificationEmailSent={setVerificationEmailSent}
        verificationEmailSent={verificationEmailSent}
      />

      {
        verificationEmailSent &&
        <VerifyCode
          code={code}
          setCode={setCode}
          email={email}
          getCompetedOrders={getCompetedOrders}
          setVerificationEmailSent={setVerificationEmailSent}
        />
      }
    </MainLayout>
  );
};

export default Tickets;