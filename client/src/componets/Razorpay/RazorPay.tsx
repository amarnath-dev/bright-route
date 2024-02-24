import { useCallback } from "react";
import useRazorpay, { RazorpayOptions } from "react-razorpay";
import { useAppSelector } from "../../app/hooks";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  submitForm,
  submitMentorId,
  submitPlanAmount,
  submitPlanId,
} from "../../redux/applyForm/applySlice";

export const RazorPay = () => {
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
      amount: parseInt(planAmount?.mentor_plan_amount || "0", 10) * 100,
      currency: "INR",
      name: "Bright Route.prvt",
      description: "Test Transaction",
      image:
        "https://t3.ftcdn.net/jpg/02/17/18/84/360_F_217188426_smgwnDFnQC5DHQ8mKGkdsMO7oDDP5nZn.jpg",
      handler: (res) => {
        console.log(res);
        const sentDetails = async () => {
          try {
            const paymentObj = {
              razorPay_id: res.razorpay_payment_id,
              mentor_id: mentorId?.mentor_id,
              mentor_plan_id: planId?.mentor_plan_id,
              mentee_id: user?._id,
              mentor_plan_amount: planAmount?.mentor_plan_amount,
              goal_of_mentorship: form?.mentorship_goal,
              time_to_reach_goal: form?.time_to_reach,
              message_to_mentor: form?.message_to_mentor,
            };
            const sendData = await axiosPrivate.post(
              "/payment-suceess",
              paymentObj,
              { withCredentials: true }
            );
            console.log("response of payment data sending", sendData.data);
            if (sendData.data.status === "success") {
              dispatch(submitForm(null));
              dispatch(submitMentorId(null));
              dispatch(submitPlanAmount(null));
              dispatch(submitPlanId(null));
              navigate("/mentor-profile/apply/checkout/success");
            }
          } catch (error) {
            console.log(error);
          }
        };
        sentDetails();
      },
      prefill: {
        mentee_id: user?._id,
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
  }, [Razorpay]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <button
        onClick={handlePayment}
        className="border px-6 py-2 text-white bg-black"
      >
        Make Payment
      </button>
    </div>
  );
};
