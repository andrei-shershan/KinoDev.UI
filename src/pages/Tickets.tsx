import { ENDPOINTS } from "../constants/endpoints";
import { URLS } from "../constants/urls";
import { useInternalApiClient } from "../hooks/useInternalApiClient";
import MainLayout from "../layouts/mainLayout";
import { useState } from "react";
import Button from "../ui/Button";


const inputStyle = {
  padding: '0.5rem',
  fontSize: '1rem',
  borderRadius: '4px',
  border: '1px solid #ccc'
};

const Tickets = () => {
  const [email, setEmail] = useState("");
  const { fetchPost } = useInternalApiClient();

  const handleLoadTickets = async () => {
    if (!email) return;
    try {
      await fetchPost(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.ORDERS.COMPLETED}`, { email });
    } catch (error) {
      console.error('Failed to load tickets:', error);
    }
  };

  return (
    <MainLayout>
      <div>
        <p>
          To get your tickets, please enter your email address:
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
          >
            Load Tickets
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Tickets;