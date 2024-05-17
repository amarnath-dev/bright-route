import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import NavBar from "../Navbar";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { Payment } from "../../interfaces/mentee.interface";
import { Plan } from "../../interfaces/mentee.interface";

const MenteePaymentDetails = () => {
  const { paymentId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [paymentDetails, setPaymentDetails] = useState<Payment | null>(null);
  const [planDetails, setPlanDetails] = useState<Plan | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_menteeId, setMenteeId] = useState();

  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.userAuth);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosPrivate.get(
          `/mentor/paymentDetails/${paymentId}`,
          {
            withCredentials: true,
          }
        );
        setMenteeId(response.data?.paymentDetails?.mentee_id);
        setPaymentDetails(response.data.paymentDetails);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [axiosPrivate, paymentId]);

  useEffect(() => {
    if (paymentDetails) {
      const fetchPlans = async () => {
        const plans = await axiosPrivate.get(
          `/mentor/plan/${paymentDetails?.mentor_plan_id}`
        );
        setPlanDetails(plans.data?.plan);
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
      <NavBar />
      <div className="w-full h-screen bg-background-two text-white">
        <div className="w-full h-full flex justify-center px-6 py-3">
          <figure className="w-full bg-gray-800 rounded-xl px-8 md:w-1/2">
            {user?.role === "mentor" ? (
              <div className="pt-6 space-y-4">
                <blockquote>
                  <p className="text-lg font-medium">
                    {paymentDetails?.goal_of_mentorship}
                  </p>
                  <p className="text-lg font-medium mt-2">
                    {paymentDetails?.time_to_reach_goal}
                    <div>
                      <small className="text-gray-100 uppercase underline">
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
            <div className="flex justify-center py-5 mt-2">
              <div className="w-full rounded-md px-2 py-2 bg-gray-800">
                <h1 className="uppercase text-white font-bold py-2">
                  Payment Details
                </h1>
                <hr />
                <div>
                  <h1 className="py-2 text-white">
                    Status:
                    <span className="text-green-500 font-bold px-2 bg-gray-800">
                      Completed <CheckCircleIcon />
                    </span>
                  </h1>
                  <h1 className="text-white">
                    Amount:
                    <span className="font-bold text-green-500 text-xl px-2">
                      {planDetails?.planAmount}
                    </span>
                  </h1>
                  <h1 className="mt-2 text-white">
                    Plan Type:
                    <span className="font-bold px-2">
                      {planDetails?.planType}
                    </span>
                  </h1>
                  <div className="mt-3">
                    <h1 className="text-white">Services:</h1>
                    {planDetails?.planServices.map((service, index: number) => {
                      return (
                        <>
                          <div key={index} className="py-1 text-white">
                            <h1 className="font-bold">
                              <span className="px-1">
                                {index + 1}
                                {"."}
                              </span>
                              {service?.serviceName}
                              <span className="px-2">
                                {service?.serviceCount
                                  ? "(Weekly) Count - "
                                  : ""}
                                {service?.serviceCount
                                  ? service.serviceCount
                                  : ""}
                              </span>
                            </h1>
                          </div>
                        </>
                      );
                    })}
                  </div>
                  <h1 className="mt-2 text-white">Razor Pay ID</h1>
                  <div className="mt-1">
                    <span className="cursor-pointer hover:bg-gray-300 rounded-full">
                      <div>
                        <input
                          className="rounded px-2 py-2 bg-gray-800"
                          value={paymentDetails?.razorPay_id}
                          disabled
                          type="text"
                        />
                        <span
                          className="px-2"
                          onClick={() =>
                            copyToClipboard(
                              paymentDetails?.razorPay_id as string
                            )
                          }
                        >
                          <ContentCopyIcon className="text-gray-400" />
                        </span>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              {user?.role === "mentor" ? (
                <>
                  {/* <button
                    className="bg-color-one text-white px-5 py-2 border rounded w-full"
                    onClick={() => {
                      navigate(`/mentor/mentee-profile/${menteeId}`);
                    }}
                  >
                    Mentee Profile
                  </button> */}
                </>
              ) : (
                <>
                  <button
                    className="bg-color-five w-full text-white px-5 py-2 rounded"
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
