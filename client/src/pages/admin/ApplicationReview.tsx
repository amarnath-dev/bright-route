import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { singleApplicationObj } from "../../datatypes/Datatypes";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../app/firebase";
import API from "../../api";
import { useAppDispatch } from "../../app/hooks";
import { approveApplication } from "../../services/adminServices";
import { useNavigate } from "react-router-dom";

export const ApplicationReview = () => {
  const { mentor } = useParams();
  const [applicationData, setApplicationData] =
    useState<singleApplicationObj>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
        throw new Error("Application data fetch failed");
      }
    };
    application();
  }, [mentor]);

  //fetching img from firebase
  useEffect(() => {
    console.log(applicationData);
    const imageId = applicationData?.profile_img;
    //if check for avoiding root error
    if (imageId) {
      const imageRef = ref(storage, imageId);
      getDownloadURL(imageRef)
        .then((url) => {
          console.log("img url", url);
          const img = document.getElementById(
            "profile-image"
          ) as HTMLImageElement;
          img.src = url;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [applicationData]);

  const handleApprove = async (id: string) => {
    try {
      if (mentor) {
        const response = await dispatch(approveApplication(id));
        if (response.payload) {
          navigate("/admin/mentor-application");
        }
      }
    } catch (error) {
      throw new Error("Application rejection failed");
    }
  };

  return (
    <>
      <div className="md:ml-52 h-full mt-16 rounded-md border-2 px-1 py-1 shadow-lg ml-2 mr-2 md:w-2/3">
        <div className="md:flex relative">
          <div className="md:shrink-0 absolute right-0 md:right-2 md:mt-2">
            <img
              className="h-20 w-20 object-cover rounded-md border-2 md:h-40 md:w-40"
              alt="mentor_img"
              id="profile-image"
            />
          </div>
          <div className="md:ml-5">
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
            <div className="mt-4 flex">
              <span className="text-sm md:text-lg mt-2">Skills:</span>
              {applicationData?.skills.map((skill) => {
                return (
                  <div className="px-1 py-1 w-full flex flex-row">
                    <h1 className="font-bold text-color-one mt-1 text-lg">
                      {skill}
                    </h1>
                  </div>
                );
              })}
            </div>
            <div className="border-2 mt-3 py-2">
              <div className="mx-2">
                <h1 className="font-bold">Q: Why Mentor ?</h1>
                <h2 className="mt-3">{applicationData?.why_mentor}</h2>
              </div>
              <div className="mt-4 mx-2">
                <h1 className="font-bold">Q:Achievement?</h1>
                <h2 className="mt-3">{applicationData?.achievement}</h2>
              </div>
            </div>
            <small className="ml-2 text-sm">
              Above questions are asked when the mentor apply
            </small>
          </div>
        </div>
      </div>
      <div className="mb-5 w-full flex justify-center items-center">
        <div className="w-2/3 flex justify-end items-center px-1 py-1 mt-4 mb-20">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Reject
          </button>
          <button
            type="button"
            className="text-white bg-gradient-to-r bg-color-one via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => {
              if (mentor) {
                handleApprove(mentor);
              }
            }}
          >
            Approve
          </button>
        </div>
      </div>
    </>
  );
};
