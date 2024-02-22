import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CallIcon from "@mui/icons-material/Call";
import ChatIcon from "@mui/icons-material/Chat";
import StarsIcon from "@mui/icons-material/Stars";
import { useNavigate } from "react-router-dom";

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

export const MentorPaymentCard = ({ mentorPlans, handleOpen, mentor }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex-col px-6 md:px-0 md:flex-row md:w-3/4 md:h-4/5 flex justify-around items-center rounded-lg md:mb-10">
      {mentorPlans?.planDetails?.map((plan: MentorPlan, index: number) => {
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
                {mentor ? <DeleteOutlineIcon className="cursor-pointer" /> : ""}
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
              <h1 className="text-gray-700 text-lg">{plan.planDescription}</h1>
            </div>

            <div className="px-3 py-3">
              <h2 className="text-lg font-semibold">Plan Services:</h2>
              <ul>
                {plan.planServices.map(
                  (service: PlanServices, serviceIndex: number) => (
                    <li key={serviceIndex} className="mt-3">
                      {serviceIndex == 0 ? <CallIcon /> : ""}
                      {serviceIndex == 1 ? <ChatIcon /> : ""}
                      {serviceIndex == 2 ? <StarsIcon /> : ""}
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
                  onClick={() => navigate("/mentor-profile/apply")}
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
