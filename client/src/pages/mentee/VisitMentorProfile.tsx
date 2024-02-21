import { MentorAboutSkill } from "../../componets/mentor/ProfileAboutndSkill/MentorAboutSkill";
import { MentorProfileCard } from "../../componets/mentor/ProfileCard/MentorProfileCard";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import { mentorProfileObj } from "../../datatypes/Datatypes";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MentorPaymentCard } from "../../componets/mentor/PaymentDetailsCard/MentorPaymentCard";

export const VisitMentorProfile = () => {
  const { mentorId } = useParams();
  const [mentor, setMentor] = useState<mentorProfileObj>();
  const axiosPrivate = useAxiosPrivate();

  const [mentorPlans, setMentorPlans] = useState([]);

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
          setMentor(response.data.mentorDetails);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMentorData();
  }, []);

  useEffect(() => {
    const fetchPlans = async () => {
      const response = await axiosPrivate.get(`/mentor/plans/${mentorId}`, {
        withCredentials: true,
      });
      if (response.data.status === "success") {
        console.log("this is mentor deatails", response.data.plans);
        setMentorPlans(response?.data?.plans);
      }
    };
    fetchPlans();
  }, []);

  return (
    <>
      <div className="h-full grid grid-cols-12 bg-slate-200">
        <div className="col-span-12  md:col-span-4 px-10 py-10">
          <MentorProfileCard mentor={mentor} user={"mentee"} />
        </div>

        <div className="col-span-12 md:col-span-8 md:px-10 md:py-10">
          <MentorAboutSkill mentor={mentor} />
        </div>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <MentorPaymentCard
          mentorPlans={mentorPlans}
          handleOpen={""}
          mentor={""}
        />
      </div>
    </>
  );
};