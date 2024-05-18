import React, { Dispatch, SetStateAction } from "react";
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
} from "../../../redux/slices/applySlice";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { MentorPlanDetails } from "../../../interfaces/mentor.interface";
import { PlanService } from "../../../interfaces/mentor.interface";
import Swal from "sweetalert2";

interface MentorPaymentCardProps {
  mentorPlans: MentorPlanDetails[] | null;
  mentor: string | "";
  onChildData: () => void | "";
  setMentorPlans:
    | Dispatch<SetStateAction<MentorPlanDetails[] | null>>
    | (() => Dispatch<SetStateAction<MentorPlanDetails[] | null>>);
}

const MentorPaymentCard: React.FC<MentorPaymentCardProps> = ({
  mentorPlans,
  mentor,
  onChildData,
  setMentorPlans,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const sendDataToParent = () => {
    onChildData();
  };

  const handleDelete = async (planId: string) => {
    Swal.fire({
      title: "Delete this Plan",
      text: "Are you sure you want to delete this plan",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No, Cancel",
      showLoaderOnConfirm: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosPrivate.delete(
            `/mentor/plans/delete/${planId}`,
            {
              withCredentials: true,
            }
          );
          if (response.data.status === "success") {
            const updatedPlans = mentorPlans?.filter(
              (plan) => plan._id !== planId
            );
            if (updatedPlans) {
              setMentorPlans(updatedPlans);
              sendDataToParent();
            }
          } else {
            console.log("Delete Failed");
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleNavigate = async (
    mentor_plan_id: string,
    mentor_id: string,
    mentor_plan_amount: number
  ) => {
    try {
      const response = await axiosPrivate.get(`/check/${mentor_id}`, {
        withCredentials: true,
      });
      if (response.data.status === "spots") {
        Swal.fire({ title: "This Mentor has No Spots Left", icon: "info" });
        return;
      }
      if (response.data.status === "exists") {
        Swal.fire({
          title: "You have already applied to a mentor",
          text: "You can only apply to one plan in a month",
        });
        return;
      }
    } catch (error) {
      console.log(error);
    }
    const plan_amount = mentor_plan_amount.toString();
    dispatch(submitPlanId({ mentor_plan_id }));
    dispatch(submitMentorId({ mentor_id }));
    dispatch(submitPlanAmount({ plan_amount }));
    navigate(`/mentorship/apply/${mentor_plan_id}`);
  };

  return (
    <>
      <div className="w-full h-full flex justify-around flex-col md:flex-row px-6 gap-4 md:px-0">
        {mentorPlans?.map((plan, index: number) => {
          return (
            <>
              {plan?.isDeleted ? (
                ""
              ) : (
                <div
                  key={index}
                  className="w-full md:mt-0 md:w-1/3 h-full bg-gray-800 rounded-lg"
                >
                  <div className="px-3 py-3 relative">
                    <h1 className="text-xl font-bold text-white">
                      {plan?.planType}
                    </h1>
                    <span
                      className="flex justify-end absolute top-0 right-2 mt-3"
                      onClick={() => handleDelete(plan?._id)}
                    >
                      {mentor && (
                        <DeleteOutlineIcon className="cursor-pointer text-gray-300 hover:bg-gray-600 rounded-full" />
                      )}
                    </span>
                  </div>
                  <div className="px-3 py-3">
                    <h1 className="text-4xl font-extrabold text-white">
                      {plan?.planAmount}
                      <small className="font-semibold text-2xl text-white">
                        /month
                      </small>
                    </h1>
                  </div>
                  <div className="flex-wrap px-3 mb-2 text-wrap break-words">
                    <h1 className="text-white text-lg text-wrap">
                      {plan?.planDescription}
                    </h1>
                  </div>
                  <div className="px-3 py-3">
                    <h2 className="text-lg font-bold text-white">
                      Plan Services:
                    </h2>
                    <ul>
                      {plan?.planServices.map(
                        (service: PlanService, serviceIndex: number) => (
                          <li key={serviceIndex} className="mt-3 text-white">
                            {service.serviceName && (
                              <>
                                {serviceIndex === 0 && <CallIcon />}
                                {serviceIndex === 1 && <ChatIcon />}
                                {serviceIndex === 2 && <StarsIcon />}
                              </>
                            )}
                            <span className="ml-2">
                              {service?.serviceName} {service?.serviceCount}
                              {service?.serviceCount ? " (Weekly)" : ""}
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
                        className="w-full bg-color-five text-white py-2 rounded-md shadow-lg"
                        onClick={() =>
                          handleNavigate(
                            mentorPlans[index]?._id,
                            plan?.mentor_id,
                            mentorPlans[index]?.planAmount
                          )
                        }
                      >
                        Get Started
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          );
        })}
      </div>
    </>
  );
};

export default MentorPaymentCard;
