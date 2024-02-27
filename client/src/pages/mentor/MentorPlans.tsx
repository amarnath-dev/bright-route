import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React from "react";
import { MentorPaymentCard } from "../../componets/mentor/PaymentDetailsCard/MentorPaymentCard";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const MentorPlans = () => {
  const [open, setOpen] = React.useState(false);
  const [mentorPlans, setMentorPlans] = useState([]);
  const [isPlan, setIsPlan] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const [deleteSelected, setDeleteSelected] = useState("");

  const handleOpen = (planType: string) => {
    setDeleteSelected(planType);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchPlans = async () => {
      const response = await axiosPrivate.get("/mentor/plans", {
        withCredentials: true,
      });
      if (response.data.status === "success") {
        const result = response.data.plans;
        if (result.planDetails.length > 0) {
          setIsPlan(true);
          setMentorPlans(response?.data?.plans);
        } else {
          setIsPlan(false);
        }
      } else {
        setIsPlan(false);
      }
    };
    fetchPlans();
  }, [axiosPrivate, deleteSelected]);

  const handleDelete = async () => {
    try {
      const response = await axiosPrivate.delete(
        `mentor/plans/delete/${mentorPlans._id}/${deleteSelected}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status === "success") {
        toast(response.data.message);
        setDeleteSelected("");
        setOpen(false);
      } else {
        toast.error("Delete Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer className="w-40 md:w-80" />
      <div className="w-full h-full md:h-screen mb-10 md:mb-0">
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              <h2 id="parent-modal-title" className="text-xl font-bold">
                Delete Plan
              </h2>
              <p id="parent-modal-description" className="font-semibold mt-1">
                Are you sure you want to delete this Plan?
              </p>
              <div className="flex justify-end mt-3">
                <button onClick={handleClose}>No</button>
                <button className="text-red-500 ml-5" onClick={handleDelete}>
                  Yes
                </button>
              </div>
            </Box>
          </Modal>
        </div>

        {isPlan ? (
          <>
            {mentorPlans?.planDetails?.length >= 2 ? (
              ""
            ) : (
              <div className="w-full h-12 flex justify-end items-center">
                <Link
                  to={"/mentor/plans/new"}
                  className="mr-6 md:mr-40 border-2 px-1 py-1 rounded-md text-white bg-color-one"
                >
                  Create Plans
                </Link>
              </div>
            )}
            <div className="w-full h-full flex justify-center items-center mt-6 md:mt-0">
              <MentorPaymentCard
                mentorPlans={mentorPlans}
                handleOpen={handleOpen}
                mentor={"mentor"}
              />
            </div>
          </>
        ) : (
          <div className="h-screen flex justify-center items-center">
            <div className="shadow-lg">
              <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow text-black hover:bg-gray-100 dark:hover:bg-gray-200">
                <h5 className="mb-2 text-2xl font-bold tracking-tight">
                  You don't have any plans yet. Please create one
                </h5>
                <p className="font-norma">
                  These plans will be visible to the mentees and they can
                  purchase youre plan to Enroll for mentorship.
                </p>
                <div className="mt-5">
                  <Link to={"/mentor/plans/new"}>
                    <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-color-one rounded-lg hover:bg-teal-900 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:hover:bg-dark-700 cursor-pointer">
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
