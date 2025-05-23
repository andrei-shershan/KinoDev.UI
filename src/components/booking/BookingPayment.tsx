import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";
import { IOrderSummary } from "../../models/applicationContext.model";
import { ENDPOINTS } from "../../constants/endpoints";
import { URLS } from "../../constants/urls";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import Button from "../../ui/Button";
import { StyleType } from "../../ui/types";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      fontFamily: '"Ideal Sans", system-ui, sans-serif',
      letterSpacing: '0.025em',
      lineHeight: '24px',
      backgroundColor: '#f8f9fa',
      '::placeholder': {
        color: '#aab7c4',
      },
      // You can even set padding, border, boxShadow, etc.
      padding: '12px 14px',
      border: '1px solid #ced4da',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      borderRadius: '4px',
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
  hidePostalCode: true,
};

const stripePromise = loadStripe('pk_test_51R312X01BnhxNbMc13npKhobKSEDspHTsphDdFtmA3jyxdWXcfpZfIiYhkgaTn86EIkyfNfi2qjbXtYFKRK1Ttxq00zZDSeWoJ');

const CheckoutForm = ({
  email }: {
    email: string
  }) => {

  const [payButtonDisabled, setPaymentButtonDisabled] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const { fetchPost } = useInternalApiClient();
  const navigate = useNavigate();

  if (elements === null || stripe === null) {
    return null;
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setPaymentButtonDisabled(true);

    try {

      // Create a PaymentIntent by calling your backend
      const response = await fetchPost(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.PAYMENTS.CREATE_PAYMENT}`, {
        email
      });

      const { clientSecret } = await response.json();

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        return;
      }

      // Confirm the card payment on the client
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        }
      });

      if (result.error) {
        // Show error to your customer
        console.error(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          console.log("Payment succeeded!");
          var completeResult = await fetchPost(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.ORDERS.COMPLETE_ORDER}`, {
            paymentIntentId: result.paymentIntent.id,
          });

          if (completeResult.ok) {
            navigate(`/${ROUTES.TICKETS}`);
          } else {
            console.error("Error completing order");
          }

          console.log(completeResult, "Payment completed successfully!");
        }
      }
    }
    finally {
      setPaymentButtonDisabled(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <Button text="Pay with Stripe" type="submit" style={StyleType.Primary} disabled={!stripe || payButtonDisabled} />

    </form>
  );
}

const BookingPayment = ({
  // orderSummary,
  email
}: {
  orderSummary: IOrderSummary,
  email: string
}) => {
  return (
    <div><br /><br /><Elements stripe={stripePromise}>
      <CheckoutForm email={email} />
    </Elements>
    </div>
  );
}

export default BookingPayment;