import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { singleApplicationObj } from "../../datatypes/Datatypes";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../app/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import Swal from "sweetalert2";

const ApplicationReview = () => {
  const { mentor } = useParams();
  const [applicationData, setApplicationData] =
    useState<singleApplicationObj>();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const handleApprove = async (id: string) => {
    Swal.fire({
      title: "Approve Application",
      text: "Are you sure to procced ?",
      showCancelButton: true,
      icon: "warning",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (mentor) {
            const response = await axiosPrivate.patch(
              `/admin/single-application/approve/${id}`,
              {},
              { withCredentials: true }
            );
            if (response.data && response.data.status == "success") {
              toast.success(response.data.message);
              navigate("/admin/mentor-application");
            }
          }
        } catch (error) {
          console.log(error);
          toast.error("Approval Failed");
        }
      }
    });
  };

  const handleReject = async (id: string) => {
    Swal.fire({
      title: "Reject Application",
      text: "Proceed with Action ?",
      showCancelButton: true,
      icon: "warning",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (mentor) {
            const response = await axiosPrivate.patch(
              `/admin/single-application/reject/${id}`,
              {},
              { withCredentials: true }
            );
            if (response.data.status === "success") {
              toast.success(response.data.message);
              navigate("/admin/mentor-application");
            }
          }
        } catch (error) {
          console.log(error);
          toast.error("Reject Failed");
        }
      }
    });
  };

  useEffect(() => {
    const application = async () => {
      try {
        const response = await axiosPrivate.get(
          `/admin/single-application/${mentor}`,
          {
            withCredentials: true,
          }
        );
        if (response.data) {
          console.log(response.data);
          const application = response.data.applications[0];
          setApplicationData(application);
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    application();
  }, [mentor, axiosPrivate]);

  useEffect(() => {
    const imageId = applicationData?.profile_img;
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
        });
    }
  }, [applicationData]);

  return (
    <>
      <div className="w-full h-full bg-background-two">
        <div className="w-full h-full flex justify-center">
          <figure className="rounded-xl p-8 w-full md:w-2/3 bg-gray-800">
            <div>
              <img className="w-24 h-24 rounded-md" id="profile-image" alt="" />
              <div className="pt-6 space-y-4 text-gray-400">
                <div className="flex gap-3">
                  Name:
                  <h1>
                    {applicationData?.first_name} {applicationData?.last_name}
                  </h1>
                </div>
                <div className="flex gap-3">
                  Email:
                  <h1>{applicationData?.mentorEmail}</h1>
                </div>
                <div className="flex gap-3">
                  Job Title: <h1>{applicationData?.job_title}</h1>
                </div>
                <div className="flex gap-3">
                  Company: <h1>{applicationData?.company}</h1>
                </div>
                <div className="flex gap-3">
                  State: <h1>{applicationData?.state}</h1>
                </div>
                <div>
                  <p className="font-semibold">{applicationData?.bio}</p>
                </div>
                <div>
                  <div className="flex flex-row placeholder:text-bold flex-wrap p-2.5 w-full text-sm text-gray-900 bg-gray-800 rounded-lg overflow-x-scroll">
                    {applicationData?.skills.map((skill) => {
                      return (
                        <span className="font-bold text-gray-400 mt-1 text-md rounded border px-1 py-1 ml-2">
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h1 className="font-semibold">
                    Why do you want to be a Mentor ?
                    <br />
                    <span> Answer:</span>
                  </h1>
                  <textarea
                    rows={6}
                    className="w-full border border-background-two bg-gray-800 rounded-md py-1 px-1 font-semibold"
                    disabled
                    value={applicationData?.why_mentor}
                  ></textarea>
                </div>
                <div>
                  <h1 className="font-semibold">
                    What is your Biggest Achievement ?
                    <br />
                    <span> Answer:</span>
                  </h1>
                  <textarea
                    rows={6}
                    className="w-full border border-background-two bg-gray-800 rounded-md py-1 px-2"
                    disabled
                    value={applicationData?.why_mentor}
                  ></textarea>
                  <small>Above questions were asked when mentor applied</small>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center md:justify-end gap-4 py-4">
              <button
                className="px-3 py-1 border rounded-md bg-red-500"
                onClick={() => handleReject(applicationData?._id as string)}
              >
                Reject
              </button>
              <button
                className="px-3 py-1 border rounded-md bg-color-five text-white"
                onClick={() => handleApprove(applicationData?._id as string)}
              >
                Approve
              </button>
            </div>
          </figure>
        </div>
      </div>
    </>
  );
};

export default ApplicationReview;
