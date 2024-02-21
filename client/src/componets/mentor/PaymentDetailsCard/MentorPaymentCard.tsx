import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const MentorPaymentCard = ({ mentorPlans, handleOpen, mentor }) => {
  return (
    <>
      <div className="w-3/4 h-4/5 flex justify-around items-center rounded-lg py-3">
        {mentorPlans?.planDetails?.map((plan, index) => {
          return (
            <div
              key={index}
              className="w-1/3 h-full bg-white rounded shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]"
            >
              <div className="px-3 py-3 relative">
                <button className="border-2 px-3 py-3 rounded-md">
                  <h1 className="text-xl font-semibold">{plan.planType}</h1>
                </button>
                <span
                  className="flex justify-end absolute top-0 right-2 mt-3"
                  onClick={handleOpen}
                >
                  {mentor ? (
                    <DeleteOutlineIcon className="cursor-pointer" />
                  ) : (
                    ""
                  )}
                </span>
              </div>
              <div className="px-3 py-3">
                <h1 className="text-4xl font-extrabold text-gray-700">
                  {plan.planAmount}
                  <small className="font-semibold text-2xl">/month</small>
                </h1>
              </div>
              <div className="flex-wrap px-3 mb-2">
                <h1 className="text-gray-700 text-lg">
                  {plan.planDescription}
                </h1>
              </div>
              {mentor ? (
                ""
              ) : (
                <div className="mt-48 px-2 py-2">
                  <button className="border-2 w-full bg-color-one text-white py-2 rounded-md shadow-lg">
                    Get Started
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
