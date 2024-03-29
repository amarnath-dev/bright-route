import { useEffect, useState } from "react";
import { mentorProfileObj } from "../../datatypes/Datatypes";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import NavBar from "../../componets/navbar/Navbar";
import MentorProfileCard from "../../componets/mentor/ProfileCard/MentorProfileCard";
import MentorAboutSkill from "../../componets/mentor/ProfileAboutndSkill/MentorAboutSkill";

// const MentorProfileCard = React.lazy(
//   () => import("../../componets/mentor/ProfileCard/MentorProfileCard")
// );
// const MentorAboutSkill = React.lazy(
//   () => import("../../componets/mentor/ProfileAboutndSkill/MentorAboutSkill")
// );

const MentorProfile = () => {
  const [mentor, setMentor] = useState<mentorProfileObj>();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const response = await axiosPrivate.get("/mentor/profile", {
          withCredentials: true,
        });
        if (response.data) {
          setMentor(response.data?.mentorDetails);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMentorData();
  }, [axiosPrivate]);

  return (
    <>
      <NavBar />
      <div className="h-full grid grid-cols-12 bg-background-two">
        <div className="col-span-12  md:col-span-4 px-10 py-10">
          <MentorProfileCard
            mentor={mentor ? mentor : undefined}
            user={"mentor"}
          />
        </div>
        <div className="col-span-12 md:col-span-8 md:px-10 md:py-10">
          <MentorAboutSkill
            mentor={mentor ? mentor : undefined}
            user={"mentor"}
          />
        </div>
      </div>
    </>
  );
};

export default MentorProfile;
