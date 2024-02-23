import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import useAxiosPrivate from "../../app/useAxiosPrivate";

export const StripePayment = () => {
  const axiosPrivate = useAxiosPrivate();
  const [tokenDetails, setTokenDetails] = useState(null);

  const onToken = (token) => {
    setTokenDetails(token);
    console.log("this is the payment object", token);
  };

  useEffect(() => {
    const serverRequest = async () => {
      await axiosPrivate.post(
        "/payments",
        { tokenId: tokenDetails.id, amount: 10000 },
        { withCredentials: true }
      );
      console.log("This is the response from server", serverRequest);
    };
    serverRequest();
  }, [tokenDetails]);

  return (
    <div>
      <StripeCheckout
        name="Bright Route pvrt"
        description="Apply for mentorship"
        billingAddress
        shippingAddress
        amount={100000}
        token={onToken}
        image="https://cdn5.vectorstock.com/i/1000x1000/10/74/pay-isolated-icon-simple-element-from-payment-vector-28231074.jpg"
        stripeKey={import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string}
      >
        <button
          className="py-1 px-1 text-white bg-color-one rounded-md"
          // onClick={handlePayment}
        >
          Check out
        </button>
      </StripeCheckout>
    </div>
  );
};
