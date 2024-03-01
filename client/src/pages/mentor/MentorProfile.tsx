import { useEffect, useState } from "react";
import { mentorProfileObj } from "../../datatypes/Datatypes";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import React from "react";

const MentorProfileCard = React.lazy(
  () => import("../../componets/mentor/ProfileCard/MentorProfileCard")
);
const MentorAboutSkill = React.lazy(
  () => import("../../componets/mentor/ProfileAboutndSkill/MentorAboutSkill")
);
const ProfileNav = React.lazy(
  () => import("../../componets/mentor/ProfileNavbar/ProfileNav")
);

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
          console.log("Profile details", response.data?.mentorDetails);
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
      <React.Suspense>
        <ProfileNav />
      </React.Suspense>
      <div className="h-full grid grid-cols-12 bg-slate-200">
        <div className="col-span-12  md:col-span-4 px-10 py-10">
          <React.Suspense>
            <MentorProfileCard
              mentor={mentor ? mentor : undefined}
              user={"mentor"}
            />
          </React.Suspense>
        </div>
        <div className="col-span-12 md:col-span-8 md:px-10 md:py-10">
          <React.Suspense>
            <MentorAboutSkill
              mentor={mentor ? mentor : undefined}
              user={"mentor"}
            />
          </React.Suspense>
        </div>
      </div>
    </>
  );
};

export default MentorProfile;
