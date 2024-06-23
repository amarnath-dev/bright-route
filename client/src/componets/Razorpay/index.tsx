import { useCallback, useContext } from "react";
import useRazorpay, { RazorpayOptions } from "react-razorpay";
import { useAppSelector } from "../../hooks/useAppSelector";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  submitForm,
  submitMentorId,
  submitPlanAmount,
  submitPlanId,
} from "../../redux/slices/applySlice";
import SocketContext from "../../context/socketContext";

export const RazorPay = () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.userAuth);
  const dispatch = useDispatch();

  const { form, planId, mentorId, planAmount } = useAppSelector(
    (state) => state.applySlice
  );

  const axiosPrivate = useAxiosPrivate();
  const [Razorpay] = useRazorpay();

  const handlePayment = useCallback(() => {
    const options: RazorpayOptions = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID as string,
      amount: (parseInt(planAmount?.plan_amount || "0", 10) * 100).toString(),
      currency: "INR",
      name: "Bright Route",
      description: "Test Transaction",
      handler: (res) => {
        const sentDetails = async () => {
          try {
            const paymentObj = {
              razorPay_id: res.razorpay_payment_id,
              mentor_id: mentorId?.mentor_id,
              mentor_plan_id: planId?.mentor_plan_id,
              mentee_id: user?._id,
              mentor_plan_amount: planAmount?.plan_amount,
              goal_of_mentorship: form?.mentorship_goal,
              time_to_reach_goal: form?.time_to_reach,
              message_to_mentor: form?.message_to_mentor,
            };
            const sendData = await axiosPrivate.post(
              "/payment-suceess",
              paymentObj,
              { withCredentials: true }
            );
            if (sendData.data.status === "success") {
              const text = "Payment Completed Successfully 🤝";
              const mentorText = `${user?.first_name} has purchased your mentorship plan!🎉`;
              await axiosPrivate.post(
                "/notification/paymentMessage",
                { text },
                {
                  withCredentials: true,
                }
              );
              await axiosPrivate.post(
                `/notification/mentorNotification/${mentorId?.mentor_id}`,
                { mentorText },
                { withCredentials: true }
              );
              socket?.current?.emit("sendNotification", {
                senderId: user?._id,
                receiverId: user?._id,
                content: text,
                type: "mentee",
              });
              socket?.current?.emit("sendNotification", {
                senderId: user?._id,
                receiverId: mentorId?.mentor_id,
                content: mentorText,
                type: "mentor",
              });
              dispatch(submitForm(null));
              dispatch(submitMentorId(null));
              dispatch(submitPlanAmount(null));
              dispatch(submitPlanId(null));
              navigate(
                `/mentor-profile/apply/checkout/success/${mentorId?.mentor_id}`
              );
            }
          } catch (error) {
            console.log(error);
          }
        };
        sentDetails();
      },
      prefill: {
        contact: user?._id,
        name: user?.first_name,
        email: user?.email,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzpay = new Razorpay(options);
    rzpay.open();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    Razorpay,
    axiosPrivate,
    dispatch,
    form?.mentorship_goal,
    form?.message_to_mentor,
    form?.time_to_reach,
    mentorId?.mentor_id,
    navigate,
    planAmount?.plan_amount,
    planId?.mentor_plan_id,
    user?._id,
    user?.email,
    user?.first_name,
  ]);

  return (
    <div className="w-full h-screen flex justify-center py-20 bg-background-two">
      <div className="text-white text-lg flex flex-col px-5 text-wrap">
        <li className="py-3">
          Please make sure that you have a stable internet connection
        </li>
        <li className="py-3">
          Do not close or cancel the window during the Transaction
        </li>
        <li className="py-3">
          Once you payment is completed you can check the payment details
        </li>
        <li className="py-3 font-bold">
          Your Plan will be valid for 30 days starting from the purchase Date
        </li>
        <div className="w-full flex justify-center py-10">
          <button
            onClick={handlePayment}
            className="border px-6 py-2 rounded-sm text-white bg-color-five"
          >
            Proceed to Transaction
          </button>
        </div>
      </div>
    </div>
  );
};
