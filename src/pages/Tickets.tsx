import { ENDPOINTS } from "../constants/endpoints";
import { URLS } from "../constants/urls";
import { useInternalApiClient } from "../hooks/useInternalApiClient";
import MainLayout from "../layouts/mainLayout";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { IOrderSummary } from "../models/applicationContext.model";
import { getDateTimeObject } from "../utils/dateFormatter";
import { PORTALS_TYPES } from "../constants/portalTypes";


const inputStyle = {
  padding: '0.5rem',
  fontSize: '1rem',
  borderRadius: '4px',
  border: '1px solid #ccc'
};

const Tickets = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const { fetchGet, fetchPost } = useInternalApiClient();
  const [completedOrders, setCompletedOrders] = useState<IOrderSummary[]>([]);
  const [verificationEmailSent, setVerificationEmailSent] = useState(false);

  const getCompetedOrders = async () => {
    var response = await fetchGet(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.ORDERS.COMPLETED}`);
    if (response.ok) {
      const data: IOrderSummary[] = await response.json();
      if (data?.length > 0) {
        setCompletedOrders(data);
      }
    }
  };

  useEffect(() => {
    getCompetedOrders();
  }, []);

  const handleLoadTickets = async () => {
    if (!email) return;
    try {
      var resposne = await fetchPost(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.ORDERS.COMPLETED_EMAIL_VERIFICATION}`, { email });
      if (resposne.ok) {
        setVerificationEmailSent(true);
      }
    } catch (error) {
      console.error('Failed to load tickets:', error);
    }
  };

  const handleVerifyCode = async () => {
    if (!code) return;
    try {
      var response = await fetchPost(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.ORDERS.GET_COMPLETED_ORDER_COOKIE}`, { email, code });
      if (response.ok) {
        setVerificationEmailSent(false);
        await getCompetedOrders();
      }
    } catch (error) {
      console.error('Failed to verify code:', error);
    }
  }

  return (
    <MainLayout portalType={PORTALS_TYPES.CLIENT} >
      <div>
        {
          completedOrders.length > 0 ? (
            <div>
              <h2>Your Tickets</h2>
              {completedOrders
                .sort((a, b) => new Date(b.showTimeSummary.time).getTime() - new Date(a.showTimeSummary.time).getTime())
                .map((order, index) => (
                  <div key={order.id || index}>
                    <span>{getDateTimeObject(order.showTimeSummary.time).date} {getDateTimeObject(order.showTimeSummary.time).time}</span>
                    <br />
                    <span>{order.showTimeSummary.movie.name}</span>
                    <br />
                    <span>{order.showTimeSummary.hall.name}</span>
                    <br />
                    {
                      order.tickets.map((ticket) => (
                        <div key={ticket.ticketId}>
                          <span>row {ticket.row}, number {ticket.number}</span>
                        </div>
                      ))
                    }
                  </div>
                ))}
            </div>
          ) : (
            <p>No tickets found.</p>
          )
        }
      </div>
      <div>
        <p>
          If you don't see your tickets, please enter your email address below to load your tickets.
        </p>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={inputStyle}
          />
          <Button
            onClick={handleLoadTickets}
            text={
              verificationEmailSent
                ? "Resend Verification Code"
                : "Send Verification Code"
            }
          />
          {
            verificationEmailSent && (
              <div>
                <p>
                  A verification code has been sent to your email. Please check your inbox.
                </p>
                <input
                  type="number"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter verification code"
                  style={inputStyle}
                />
                <Button
                  onClick={handleVerifyCode}
                  text="Verify Code"
                />
              </div>
            )
          }
        </div>
      </div>
    </MainLayout>
  );
};

export default Tickets;