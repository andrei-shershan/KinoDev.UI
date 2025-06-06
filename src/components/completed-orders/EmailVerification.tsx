import Button from "../../ui/Button"
import { InputType } from "../../ui/types"
import { Input } from "../../ui/Input";
import { useIsLoading } from "../../hooks/useIsLoading";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";
import { ENDPOINTS } from "../../constants/endpoints";
import { URLS } from "../../constants/urls";

export const EmailVerification = ({
  email,
  handleEmailChange,
  setVerificationEmailSent,
  verificationEmailSent
}: {
  email: string;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setVerificationEmailSent: (sent: boolean) => void;
  verificationEmailSent: boolean;
}) => {
  const { setIsLoading } = useIsLoading();

  const { fetchPost } = useInternalApiClient();

  const handleLoadTickets = async () => {
    if (!email) {
      return;
    }

    try {
      setIsLoading(true);
      var resposne = await fetchPost(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.ORDERS.COMPLETED_EMAIL_VERIFICATION}`, { email });
      if (resposne.ok) {
        setVerificationEmailSent(true);
      }
      else {
        setVerificationEmailSent(false);
      }
    } catch (error) {
      setVerificationEmailSent(false);
      console.error('Failed to load tickets:', error);
    }
    finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <p>
        If you don't see your tickets, please enter your email address below to load your tickets.
      </p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Input
          type={InputType.Email}
          value={email}
          onChange={(e) => handleEmailChange(e)}
          placeholder="Enter your email"
        />
        <Button
          onClick={handleLoadTickets}
          text={
            verificationEmailSent
              ? "Resend Verification Code"
              : "Send Verification Code"
          }
        />
      </div></>
  );
}