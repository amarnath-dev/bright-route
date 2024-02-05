import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import API from "../../api";
import { storage } from "../../app/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { mentorProfileObj } from "../../datatypes/Datatypes";

export const SearchMentors = () => {
  const [allMentors, setAllMentors] = useState<mentorProfileObj[]>([]);

  useEffect(() => {
    const mentorProfile = async () => {
      const response = await API.get("/browse-mentors", {
        withCredentials: true,
      });
      if (response.data) {
        const mentorProfile = response.data;
        console.log("response from the server", mentorProfile);
        setAllMentors(mentorProfile.allMentors);
      }
    };
    mentorProfile();
  }, []);

  //fetching img from firebase
  const fetchImg = async (id: string) => {
    try {
      const imageId = id;
      if (imageId) {
        const imageRef = ref(storage, imageId);
        getDownloadURL(imageRef)
          .then((url) => {
            // console.log("img url", url);
            const img = document.getElementById(
              "mentor_img"
            ) as HTMLImageElement;
            img.src = url;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-screen h-full">
        <div className="w-screen h-72 border-2 flex justify-center items-center px-3 py-3">
          <div className="w-full h-full md:w-1/2 md:flex md:justify-center md:items-center md:flex-col">
            <label className="relative flex justify-center items-center">
              <div className="w-full flex justify-end absolute left-28 top-12 mr-4 md:top-12">
                <CiSearch className="text-2xl w-full" />
              </div>

              <input
                className="block bg-white border border-slate-300 rounded-md mt-10 py-2 pl-9 pr-3 w-72 shadow-lg focus:outline-none focus:border-dark-500 placeholder:text-slate-400 placeholder:text-sm focus:ring-dark-500 focus:ring-1 md:w-96 sm:text-lg"
                placeholder="Search by skill or job title"
                type="text"
              />
            </label>

            {/* Material ui component */}
            <div className="flex items-center flex-col md:flex-row">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={top100Films}
                sx={{ width: 300, marginTop: 3, padding: 1 }}
                renderInput={(params) => (
                  <TextField {...params} label="Skills" />
                )}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={top100Films}
                sx={{ width: 300, marginTop: 3, padding: 1 }}
                renderInput={(params) => (
                  <TextField {...params} label="Company" />
                )}
              />
            </div>
          </div>
        </div>

        {/* Card Componenet  */}
        <div className="w-full h-screen flex justify-center items-center flex-col px-4 py-4 mt-28 md:mt-0 md:py-0 md:px-0">
          {allMentors.map(
            (mentor, index) => (
              fetchImg(mentor.profile_img),
              (
                <div
                  key={index}
                  className="w-full mt-80 border-2 rounded-lg px-4 py-4 md:px-2 md:py-2 md:w-9/12 md:mt-10"
                >
                  <div className="flex flex-col px-4 py-4 md:flex-row">
                    <div className="relative flex justify-center h-full">
                      <img
                        alt="mentor_img"
                        className="rounded-lg shadow-md md:w-60 md:h-80"
                        id="mentor_img"
                      />
                      <div className="bg-gradient-to-t from-gray-600 to-transparent w-full h-full px-5 py-5 rounded-lg absolute top-0 md:w-60 md:h-80">
                        <div className="md:hidden mt-36 absolute bottom-5">
                          <h1 className="text-xl font-semibold text-white md:text-gray-800 md:text-3xl md:px-5 md:py-2">
                            {mentor.first_name} {mentor.last_name}
                          </h1>
                          <h1 className="md:px-5 mt-2 md:mt-0 text-sm md:text-xl md:text-gray-800 text-white">
                            {mentor.job_title}
                            <strong className="md:text-gray-800 text-white ml-1">
                              {mentor.company}
                            </strong>
                          </h1>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 md:px-0">
                      <div className="hidden md:block">
                        <h1 className="text-xl mt-2 font-semibold text-gray-800 md:text-3xl md:px-5 md:py-2">
                          {mentor.first_name} {mentor.last_name}
                        </h1>
                        <h1 className="md:px-5 mt-2 md:mt-0 text-md md:text-xl">
                          {mentor.job_title}
                          <strong className="text-gray-800 ml-1">
                            {mentor.company}
                          </strong>
                        </h1>
                      </div>

                      <div className="w-full md:max-w-2xl md:ml-4 mt-6 text-gray-800 md:px-3 md:py-3 text-md">
                        <p className="text-md w-full">{mentor.bio}</p>
                        <div className="w-full mt-5">
                          {mentor.skills.map((skill, index) => (
                            <button
                              key={index}
                              className="border-2 rounded-full px-3 bg-slate-200 mt-2 ml-2"
                            >
                              {skill}
                            </button>
                          ))}
                        </div>
                        {/* Mentor payment setting is not done */}

                        <div className="w-full mt-6 flex justify-between items-center flex-col md:flex-row">
                          <div className="mb-2 w-full">
                            <h1 className="text-2xl md:text-3xl font-bold">
                              $350 <small>/month</small>
                            </h1>
                          </div>

                          <div className="w-full">
                            <button className="w-full border-2 rounded-md px-1 py-1 text-white bg-color-one text-lg font-bold md:h-10 md:w-96">
                              View Profile
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
    </>
  );
};

const top100Films = [
  { label: "The Shawshank Redemption" },
  { label: "The Godfather" },
  { label: "The Godfather: Part II" },
  { label: "The Dark Knight" },
  { label: "12 Angry Men" },
  { label: "Schindler's List" },
  { label: "Pulp Fiction" },
  {
    label: "The Lord of the Rings: The Return of the King",
  },
];
