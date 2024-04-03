import React from "react";
import MentorAboutSkill from "../../componets/mentor/ProfileAboutndSkill/MentorAboutSkill";
import MentorProfileCard from "../../componets/mentor/ProfileCard/MentorProfileCard";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import { mentorProfileObj } from "../../datatypes/Datatypes";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MentorPaymentCard from "../../componets/mentor/PaymentDetailsCard/MentorPaymentCard";
import { MentorPlanDetails } from "../../datatypes/PropsTypes";
import NavBar from "../../componets/navbar/Navbar";
import { useAppSelector } from "../../app/hooks";
import { Reviews } from "../../datatypes/Datatypes";
import NoImage from "../../assets/no-profile-image.png";
import Rating from "@mui/material/Rating";

const VisitMentorProfile = () => {
  const { mentorId } = useParams();
  const [mentor, setMentor] = useState<mentorProfileObj>();
  const axiosPrivate = useAxiosPrivate();
  const scrollRef = React.useRef<HTMLInputElement>(null);
  const [mentorPlans, setMentorPlans] = useState<MentorPlanDetails[] | null>(
    null
  );
  const { user } = useAppSelector((state) => state.userAuth);

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const response = await axiosPrivate.get(
          `/visit/mentor-profile/${mentorId}`,
          {
            withCredentials: true,
          }
        );
        if (response.data) {
          console.log(response.data.mentorDetails);
          setMentor(response.data.mentorDetails);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMentorData();
  }, [axiosPrivate, mentorId]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosPrivate.get(`/mentor/plans/${mentorId}`, {
          withCredentials: true,
        });
        if (response.data.status === "success") {
          setMentorPlans(response.data?.plans);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [axiosPrivate, mentorId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <NavBar />
      <div
        className="h-full grid grid-cols-12 bg-background-two"
        ref={scrollRef}
      >
        <div className="col-span-12 px-3 py-3 md:col-span-4 md:px-10 md:py-10">
          <MentorProfileCard mentor={mentor} user={"mentee"} />
        </div>

        <div className="col-span-12 md:col-span-8 md:px-10 md:py-10">
          <MentorAboutSkill mentor={mentor} user={"mentee"} />
        </div>
      </div>
      <div className="flex justify-center bg-background-two py-10">
        <MentorPaymentCard
          mentorPlans={mentorPlans ? mentorPlans : null}
          mentor={""}
          onChildData={() => {}}
          setMentorPlans={
            user?.role === "mentor" ? setMentorPlans : () => () => null
          }
        />
      </div>

      {mentor?.reviews && mentor.reviews.length > 0 ? (
        <>
          <div className="w-full flex">
            <div className="w-full md:flex-1 bg-background-two px-1 py-4">
              <h1 className="text-white text-xl font-bold px-5">
                What other Mentees Say...
              </h1>
              {mentor?.reviews.map((review: Reviews, index: number) => {
                return (
                  <>
                    <div className="w-full px-4 py-2 text-md" key={index}>
                      <div className="flex">
                        <img
                          src={NoImage}
                          alt="profile_img"
                          className="w-14 object-cover py-1"
                        />
                        <div className="flex items-center">
                          <Rating
                            name="read-only"
                            value={review?.rating}
                            readOnly
                            className="px-2"
                          />
                        </div>
                      </div>
                      <div className="flex">
                        <div className="px-3">
                          <p className="text-white text-wrap">
                            {review?.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            <div className="flex-1 bg-background-two"></div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default VisitMentorProfile;
