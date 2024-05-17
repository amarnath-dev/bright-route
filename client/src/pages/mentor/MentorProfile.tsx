import { useEffect, useState } from "react";
import { MentorProfileObj } from "../../interfaces/mentor.interface";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import NavBar from "../../componets/Navbar";
import MentorProfileCard from "../../componets/mentor/ProfileCard";
import MentorAboutSkill from "../../componets/mentor/AboutAndSkill";

const MentorProfile = () => {
  const [mentor, setMentor] = useState<MentorProfileObj>();
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
