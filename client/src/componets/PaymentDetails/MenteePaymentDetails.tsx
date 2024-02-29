import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import { storage } from "../../app/firebase";
import { getDownloadURL, ref } from "firebase/storage";

const MenteePaymentDetails = () => {
  const { paymentId, profileImg } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [paymentDetails, setPaymentDetails] = useState();

  useEffect(() => {
    const fetchPaymetData = async () => {
      try {
        const response = await axiosPrivate.get(
          `/mentor/paymentDetails/${paymentId}`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data.paymentDetails);
        setPaymentDetails(response.data.paymentDetails);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPaymetData();
  }, [axiosPrivate, paymentId]);

  useEffect(() => {
    const imageId = profileImg;
    if (imageId) {
      const imageRef = ref(storage, imageId);
      getDownloadURL(imageRef)
        .then((url) => {
          const img = document.getElementById(
            "profile_img"
          ) as HTMLImageElement;
          img.src = url;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [profileImg]);

  return (
    <>
      <div className="w-full h-screen bg-green-200">
        <div className="w-full flex justify-center">
          <figure className="bg-slate-100 rounded-xl p-8 w-1/2 mt-10">
            <div>
              <img
                className="w-24 h-24 rounded-full object-cover"
                id="profile_img"
                alt="profile_img"
                width="384"
                height="512"
              />
            </div>
            <div className="pt-6 space-y-4">
              <blockquote>
                <p className="text-lg font-medium">
                  {paymentDetails?.goal_of_mentorship}
                </p>
                <p className="text-lg font-medium">
                  {paymentDetails?.time_to_reach_goal}
                </p>
              </blockquote>
              <div>
                <h1>Message: </h1>
                <p>{paymentDetails?.message_to_mentor}</p>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </>
  );
};

export default MenteePaymentDetails;
