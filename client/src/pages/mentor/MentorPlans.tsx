import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import MentorPaymentCard from "../../componets/mentor/PaymentDetailsCard/MentorPaymentCard";
import { MentorPlanDetails } from "../../interfaces/mentor.interface";
import NavBar from "../../componets/Navbar";
import { useAppSelector } from "../../hooks/useAppSelector";

const MentorPlans = () => {
  const [mentorPlans, setMentorPlans] = useState<MentorPlanDetails[] | null>(
    null
  );
  const { user } = useAppSelector((state) => state.userAuth);
  const [isPlan, setIsPlan] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [isDeleted, setIsDeleted] = useState<boolean | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [justMounted, _setJustMounted] = useState<boolean | null>(null);

  const handleChildData = () => {
    setIsDeleted((state) => !state);
  };

  if (justMounted) {
    location.reload();
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosPrivate.get(`/mentor/plans/${user?._id}`, {
          withCredentials: true,
        });
        if (response.data.status === "success") {
          const result = response.data.plans;
          if (result.length > 0) {
            setMentorPlans(result);
            setIsPlan(true);
          } else {
            setIsPlan(false);
          }
        } else {
          setIsPlan(false);
        }
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleted, setIsDeleted, axiosPrivate]);

  return (
    <>
      <NavBar />
      <div className="w-full h-full md:h-screen bg-background-two">
        {isPlan ? (
          <>
            {mentorPlans && mentorPlans?.length >= 2 ? (
              ""
            ) : (
              <>
                <div className="w-full flex justify-end items-center relative">
                  <Link
                    to={"/mentor/new-plan"}
                    className="absolute top-5 right-10 border px-5 py-1 rounded-md text-white bg-color-one"
                  >
                    Create Plans
                  </Link>
                </div>
              </>
            )}
            <div className="w-full h-full flex justify-center items-center md:px-16 py-14">
              <MentorPaymentCard
                mentorPlans={isPlan ? mentorPlans : null}
                mentor={"mentor"}
                onChildData={handleChildData}
                setMentorPlans={
                  user?.role === "mentor" ? setMentorPlans : () => () => null
                }
              />
            </div>
          </>
        ) : (
          <div className="h-screen flex justify-center items-center">
            <div className="shadow-lg">
              <div className="block max-w-sm p-6 bg-gray-800 border border-gray-200 rounded-lg shadow text-black">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                  You don't have any plans yet. Please create one
                </h5>
                <p className="font-norma text-gray-400">
                  These plans will be visible to the mentees and they can
                  purchase youre plan to Enroll for mentorship.
                </p>
                <div className="mt-5">
                  <Link to={"/mentor/new-plan"}>
                    <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-color-five rounded-lg hover:bg-teal-900 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:hover:bg-dark-700 cursor-pointer">
                      Create Plan
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MentorPlans;
