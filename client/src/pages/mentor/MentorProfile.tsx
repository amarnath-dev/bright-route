import { useEffect, useState } from "react";
import { mentorProfileObj } from "../../datatypes/Datatypes";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../app/firebase";
import { ProfileNav } from "../../componets/mentor/ProfileNavbar/ProfileNav";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import { MentorProfileCard } from "../../componets/mentor/ProfileCard/MentorProfileCard";
import { MentorAboutSkill } from "../../componets/mentor/ProfileAboutndSkill/MentorAboutSkill";

export const MentorProfile = () => {
  const [mentor, setMentor] = useState<mentorProfileObj>();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const response = await axiosPrivate.get("/mentor/profile", {
          withCredentials: true,
        });
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
    const imageId = mentor?.profile_img;
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
  }, [mentor]);

  return (
    <>
      <ProfileNav />
      <div className="h-full grid grid-cols-12 bg-slate-200">
        <div className="col-span-12  md:col-span-4 px-10 py-10">
          <MentorProfileCard mentor={mentor} user={"mentor"} />
        </div>

        <div className="col-span-12 md:col-span-8 md:px-10 md:py-10">
          <MentorAboutSkill mentor={mentor} />
        </div>
      </div>
    </>
  );
};
