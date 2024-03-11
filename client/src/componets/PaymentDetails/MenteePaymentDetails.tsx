import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const MenteePaymentDetails = () => {
  const { paymentId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [paymentDetails, setPaymentDetails] = useState();
  const [planDetails, setPlanDetails] = useState();
  const [menteeId, setMenteeId] = useState();

  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.userAuth);

  useEffect(() => {
    const fetchPaymetData = async () => {
      try {
        const response = await axiosPrivate.get(
          `/mentor/paymentDetails/${paymentId}`,
          {
            withCredentials: true,
          }
        );
        console.log("==>", response.data.paymentDetails);
        setMenteeId(response.data?.paymentDetails?.mentee_id);
        setPaymentDetails(response.data.paymentDetails);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPaymetData();
  }, [axiosPrivate, paymentId]);

  useEffect(() => {
    if (paymentDetails) {
      const fetchPlans = async () => {
        const plans = await axiosPrivate.get(
          `/mentor/plan/${paymentDetails?.mentor_plan_id}`
        );
        setPlanDetails(plans.data.plan);
      };
      fetchPlans();
    }
  }, [axiosPrivate, paymentDetails]);

  const copyToClipboard = (razorPay_id: string) => {
    const copyText: string = razorPay_id;
    const isCopy = copy(copyText);
    if (isCopy) {
      toast.success("Copied to Clipboard");
    }
  };

  return (
    <>
      <div className="w-full h-full">
        <div className="w-full h-full flex justify-center px-3 py-2">
          <figure className="w-full bg-slate-100 rounded-xl p-8 md:w-1/2 mt-10">
            {user?.role === "mentor" ? (
              <div className="pt-6 space-y-4">
                <blockquote>
                  <p className="text-lg font-medium">
                    {paymentDetails?.goal_of_mentorship}
                  </p>
                  <p className="text-lg font-medium mt-2">
                    {paymentDetails?.time_to_reach_goal}
                    <div>
                      <small className="text-gray-700 uppercase underline">
                        Message:
                      </small>{" "}
                      <br />
                      <p className="">{paymentDetails?.message_to_mentor}</p>
                    </div>
                  </p>
                </blockquote>
              </div>
            ) : (
              ""
            )}

            <div className="flex justify-center h-96 py-5 mt-2">
              <div className="w-full rounded-md px-2 py-2 shadow-lg bg-white">
                <h1 className="uppercase">Payment Details</h1>
                <div>
                  <h1 className="py-2">
                    Status:
                    <span className="text-green-700 font-bold px-2">
                      Completed <CheckCircleIcon />
                    </span>
                  </h1>
                  <h1>
                    Amount:
                    <span className="font-bold text-green-700 px-2">
                      {planDetails?.planAmount}
                    </span>
                  </h1>
                  <h1 className="mt-2">
                    Plan Type:
                    <span className="font-bold px-2">
                      {planDetails?.planType}
                    </span>
                  </h1>
                  <div className="mt-3">
                    <h1>Services:</h1>
                    {planDetails?.planServices.map((service, index: number) => {
                      return (
                        <div key={index} className="py-1">
                          <h1 className="font-bold">
                            <span className="px-1">
                              {index + 1}
                              {"."}
                            </span>
                            {service?.serviceName}
                            <span className="px-2">
                              {service?.serviceCount ? "Count - " : ""}

                              {service?.serviceCount
                                ? service.serviceCount
                                : ""}
                            </span>
                          </h1>
                        </div>
                      );
                    })}
                  </div>
                  <h1 className="mt-2">Razor Pay ID</h1>
                  <div className="mt-1">
                    <span className="cursor-pointer hover:bg-gray-300 rounded-full">
                      <div>
                        <input
                          className="rounded px-2 py-2"
                          value={paymentDetails?.razorPay_id}
                          disabled
                          type="text"
                        />
                        <span
                          className="px-2"
                          onClick={() =>
                            copyToClipboard(paymentDetails?.razorPay_id)
                          }
                        >
                          <ContentCopyIcon />
                        </span>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              {user?.role === "mentor" ? (
                <button
                  className="bg-color-one text-white px-5 py-2 border rounded"
                  onClick={() => {
                    navigate(`/mentor/mentee-profile/${menteeId}`);
                  }}
                >
                  Mentee Profile
                </button>
              ) : (
                <>
                  <button
                    className="bg-color-one text-white px-5 py-2 border rounded"
                    onClick={() => {
                      navigate(
                        `/my-mentors/mentor-profile/${paymentDetails?.mentor_id}`
                      );
                    }}
                  >
                    Mentor Profile
                  </button>
                </>
              )}
            </div>
          </figure>
        </div>
      </div>
    </>
  );
};

export default MenteePaymentDetails;
