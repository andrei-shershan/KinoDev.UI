import { InputType } from "../../ui/types";
import Button from "../../ui/Button";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";
import { useIsLoading } from "../../hooks/useIsLoading";
import { ENDPOINTS } from "../../constants/endpoints";
import { URLS } from "../../constants/urls";
import { Input } from "../../ui/Input";
import { message } from "antd";

export const VerifyCode = ({
  code,
  setCode,
  email,
  getCompetedOrders,
  setVerificationEmailSent
}: {
  code: string;
  setCode: (code: string) => void;
  email: string;
  getCompetedOrders: () => Promise<void>;
  setVerificationEmailSent: (sent: boolean) => void;
}) => {
  const { fetchPost } = useInternalApiClient();
  const { setIsLoading } = useIsLoading();

  const handleVerifyCode = async () => {
    if (!code) {
      return
    };
    
    try {
      setIsLoading(true);
      var response = await fetchPost(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.ORDERS.GET_COMPLETED_ORDER_COOKIE}`, { email, code });
      if (response.ok) {
        setVerificationEmailSent(false);
        await getCompetedOrders();
      }
      else {
        message.error('Invalid verification code. Please try again.');
      }
    } catch (error) {
      console.error('Failed to verify code:', error);
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <p>
        A verification code has been sent to your email. Please check your inbox.
      </p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Input
          type={InputType.Number}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter verification code"
        />
        <Button
          onClick={handleVerifyCode}
          text="Verify Code"
        />
      </div>
    </div>
  );
}