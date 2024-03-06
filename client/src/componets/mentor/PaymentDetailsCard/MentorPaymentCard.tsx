import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CallIcon from "@mui/icons-material/Call";
import ChatIcon from "@mui/icons-material/Chat";
import StarsIcon from "@mui/icons-material/Stars";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  submitPlanId,
  submitMentorId,
  submitPlanAmount,
} from "../../../redux/applyForm/applySlice";
import useAxiosPrivate from "../../../app/useAxiosPrivate";
import { useState } from "react";

interface PlanServices {
  serviceName: string;
  serviceCount: number | null;
}

interface MentorPlan {
  planType: string;
  planAmount: number;
  planDescription: string;
  planServices: Array<{
    serviceName: string;
    serviceCount: number | null;
  }>;
}

const MentorPaymentCard = ({ mentorPlans, mentor, onChildData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const [open, setOpen] = useState(false);
  const [deleteSelected, setDeleteSelected] = useState("");

  const sendDataToParent = () => {
    onChildData(true);
  };

  const handleOpen = (planType: string) => {
    setDeleteSelected(planType);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await axiosPrivate.delete(
        `/mentor/plans/delete/${mentorPlans._id}/${deleteSelected}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status === "success") {
        setDeleteSelected("");
        setOpen(false);
        sendDataToParent();
      } else {
        console.log("Delete Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigate = (
    mentor_plan_id: string,
    mentor_id: string,
    mentor_plan_amount: string
  ) => {
    dispatch(submitPlanId({ mentor_plan_id }));
    dispatch(submitMentorId({ mentor_id }));
    dispatch(submitPlanAmount({ mentor_plan_amount }));
    navigate("/mentorship/apply");
  };
  return (
    <>
      <div className="w-full h-full flex-col px-6 md:px-0 md:flex-row md:w-3/4 md:h-4/5 flex justify-around items-center rounded-lg md:mb-10">
        {open ? (
          <div className="w-full h-full flex justify-center items-center">
            <div
              id="popup-modal"
              tabIndex={-1}
              className="overflow-y-auto overflow-x-hidden flex z-50 justify-center items-center w-full md:inset-0 max-h-full"
            >
              <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button
                    type="button"
                    className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="popup-modal"
                    onClick={handleClose}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="p-4 md:p-5 text-center">
                    <svg
                      className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure you want to delete this plan?
                    </h3>
                    <button
                      data-modal-hide="popup-modal"
                      type="button"
                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                      onClick={handleDelete}
                    >
                      Yes, I'm sure
                    </button>
                    <button
                      onClick={handleClose}
                      data-modal-hide="popup-modal"
                      type="button"
                      className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      No, cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {mentorPlans?.planDetails?.map(
              (plan: MentorPlan, index: number) => {
                return (
                  <div
                    key={index}
                    className="w-full mt-5 md:mt-0 md:w-1/3 h-full rounded shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]"
                  >
                    <div className="px-3 py-3 relative">
                      <button className="md:px-3 md:py-3 rounded-md">
                        <h1 className="text-xl font-bold">{plan.planType}</h1>
                      </button>
                      <span
                        className="flex justify-end absolute top-0 right-2 mt-3"
                        onClick={() => handleOpen(plan.planType)}
                      >
                        {mentor ? (
                          <DeleteOutlineIcon className="cursor-pointer" />
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                    <div className="px-3 py-3">
                      <h1 className="text-4xl font-extrabold text-green-800">
                        {plan.planAmount}
                        <small className="font-semibold text-2xl text-gray-700">
                          /month
                        </small>
                      </h1>
                    </div>
                    <div className="flex-wrap px-3 mb-2">
                      <h1 className="text-gray-700 text-lg">
                        {plan.planDescription}
                      </h1>
                    </div>

                    <div className="px-3 py-3">
                      <h2 className="text-lg font-semibold">Plan Services:</h2>
                      <ul>
                        {plan.planServices.map(
                          (service: PlanServices, serviceIndex: number) => (
                            <li key={serviceIndex} className="mt-3">
                              {service.serviceName && (
                                <>
                                  {serviceIndex === 0 && <CallIcon />}
                                  {serviceIndex === 1 && <ChatIcon />}
                                  {serviceIndex === 2 && <StarsIcon />}
                                </>
                              )}
                              <span className="ml-2">
                                {service.serviceName} {service.serviceCount}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    {mentor ? (
                      ""
                    ) : (
                      <div className="mt-10 px-2 py-2">
                        <button
                          className="border-2 w-full bg-color-one text-white py-2 rounded-md shadow-lg"
                          onClick={() =>
                            handleNavigate(
                              mentorPlans.planDetails[index]._id,
                              mentorPlans.mentor_id,
                              mentorPlans.planDetails[index].planAmount
                            )
                          }
                        >
                          Get Started
                        </button>
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MentorPaymentCard;
