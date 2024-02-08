import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { singleApplicationObj } from "../../datatypes/Datatypes";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../app/firebase";
import API from "../../api";
import { useAppDispatch } from "../../app/hooks";
import { approveApplication } from "../../services/adminServices";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AdminModalApprove,
  AdminModalReject,
} from "../../componets/adminModal/AdminModal";
import { Button } from "@mui/material";
import React from "react";

export const ApplicationReview = () => {
  const { mentor } = useParams();
  const [applicationData, setApplicationData] =
    useState<singleApplicationObj>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // application accept reject modal controllers
  const [open, setOpen] = React.useState(false);
  const [openModalTwo, setOpenModalTwo] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenTwo = () => {
    setOpenModalTwo(true);
  };

  const handleCloseTwo = () => {
    setOpenModalTwo(false);
  };

  const handleApprove = async (id: string) => {
    try {
      if (mentor) {
        const response = await dispatch(approveApplication(id));
        if (response.payload) {
          navigate("/admin/mentor-application");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Approval failed,Try Again");
    }
  };

  const handleReject = async (id: string) => {
    try {
      if (mentor) {
        const response = await dispatch(approveApplication(id));
        if (response.payload) {
          navigate("/admin/mentor-application");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Approval failed,Try Again");
    }
  };

  useEffect(() => {
    const application = async () => {
      try {
        const response = await API.get(`admin/single-application/${mentor}`, {
          withCredentials: true,
        });
        if (response.status) {
          const application = response.data.applications[0];
          setApplicationData(application);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };
    application();
  }, [mentor]);

  useEffect(() => {
    const imageId = applicationData?.profile_img;
    //if check for avoiding root error
    if (imageId) {
      const imageRef = ref(storage, imageId);
      getDownloadURL(imageRef)
        .then((url) => {
          const img = document.getElementById(
            "profile-image"
          ) as HTMLImageElement;
          img.src = url;
        })
        .catch((error) => {
          console.log(error);
          toast.error("Image fetch failed");
        });
    }
  }, [applicationData]);

  return (
    <>
      <div>
        <AdminModalApprove
          open={open}
          handleOpen={handleOpen}
          mentor={mentor}
          handleClose={handleClose}
          handleApprove={handleApprove}
        />

        <AdminModalReject
          openModalTwo={openModalTwo}
          mentor={mentor}
          handleOpenTwo={handleOpenTwo}
          handleCloseTwo={handleCloseTwo}
          handleReject={handleReject}
        />
      </div>

      <ToastContainer className="w-40 md:w-80" />
      <div className="md:ml-52 h-full mt-16 rounded-md border-2 px-1 py-1 shadow-lg ml-2 mr-2 md:w-2/3">
        <div className="md:flex relative">
          <div className="md:shrink-0 absolute right-0 md:right-2 md:mt-2">
            <img
              className="h-20 w-20 object-cover rounded-md border-2 md:h-40 md:w-40"
              alt="mentor_img"
              id="profile-image"
            />
          </div>
          <div className="md:ml-5 w-full">
            <div className="tracking-wide text-lg font-semibold">
              <h1 className="font-bold text-lg md:text-2xl mt-3">
                <small className="text-gray-700">Name: </small>
                {applicationData?.first_name} {applicationData?.last_name}
              </h1>
              <p className="mt-2 text-gray-700 text-sm md:text-lg font-medium">
                Email: {applicationData?.mentorEmail}
              </p>
            </div>
            <span className="block mt-1 text-sm md:text-lg leading-tight font-medium text-gray-700">
              Job Position: {applicationData?.job_title}
            </span>
            <p className="mt-2 text-gray-700 text-sm md:text-lg font-medium">
              Company: {applicationData?.company}
            </p>
            <p className="mt-2 text-gray-700 text-sm md:text-lg font-medium">
              Department:
              {applicationData?.category ? applicationData.category : "null"}
            </p>

            <p className="mt-2 text-gray-700 text-sm md:text-lg font-medium">
              State: {applicationData?.state}
            </p>
            <div className="mt-4 flex w-full flex-col">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                <h1 className="font-bold text-black">Mentor Skills:</h1>
              </label>
              <div className="flex flex-row placeholder:text-bold flex-wrap p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {applicationData?.skills.map((skill) => {
                  return (
                    <span className="font-bold text-color-one mt-1 text-md rounded border-2 px-1 py-1 ml-2">
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="border-2 mt-3 py-2 w-full rounded-md">
              <div className="mx-2">
                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    <h1 className="font-bold text-black">Q: Why Mentor ?</h1>
                  </label>

                  <textarea
                    id="message"
                    rows={5}
                    className="placeholder:text-bold  block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    disabled
                    placeholder={applicationData?.why_mentor}
                  ></textarea>
                </div>
              </div>
              <div className="mt-4 mx-2">
                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    <h1 className="font-bold text-black">Q:Achievement?</h1>
                  </label>

                  <textarea
                    id="message"
                    rows={5}
                    className="placeholder:text-bold  block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    disabled
                    placeholder={applicationData?.achievement}
                  ></textarea>
                </div>
              </div>
            </div>
            <small className="ml-2 mt-4 text-sm">
              Above two questions are asked when the mentor apply
            </small>
          </div>
        </div>
      </div>

      <div className="mb-5 w-full flex justify-center items-center">
        <div className="w-2/3 flex justify-end items-center px-1 py-1 mt-4 mb-20">
          <Button color="error" onClick={handleOpenTwo}>
            Reject
          </Button>
          <Button onClick={handleOpen}>Approve</Button>
        </div>
      </div>
    </>
  );
};
