import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { FormEvent } from "react";
import { IOrderSummary } from "../../models/applicationContext.model";
import { ENDPOINTS } from "../../constants/endpoints";
import { URLS } from "../../constants/urls";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";


const stripePromise = loadStripe('pk_test_51R312X01BnhxNbMc13npKhobKSEDspHTsphDdFtmA3jyxdWXcfpZfIiYhkgaTn86EIkyfNfi2qjbXtYFKRK1Ttxq00zZDSeWoJ');

const CheckoutForm = (
  {
    orderSummary,
  }: { orderSummary: IOrderSummary }) => {
  const stripe = useStripe();
  const elements = useElements();

  const { fetchPost } = useInternalApiClient();

  if (elements === null || stripe === null) {
    return null;
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Create a PaymentIntent by calling your backend
    const response = await fetch(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.PAYMENTS.CREATE_PAYMENT_INTENT}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: 1000, // e.g., $10.00 in cents
        currency: 'usd',
        metadata: {
          orderId: orderSummary.id?.toString() || '',
          movieName: orderSummary?.showTimeSummary?.movie?.name || '',
          seats: orderSummary?.tickets?.map(s => `Row:${s.row},Num:${s.number}`).join(';') || ''
        }
      })
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

        console.log(completeResult, "Payment completed successfully!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{ hidePostalCode: true }} />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
}

const BookingPayment = ({
  orderSummary
}: {
  orderSummary: IOrderSummary
}) => {
  return (
    <div><br /><br /><Elements stripe={stripePromise}>
      <CheckoutForm orderSummary={orderSummary} />
    </Elements>
    </div>
  );
}

export default BookingPayment;