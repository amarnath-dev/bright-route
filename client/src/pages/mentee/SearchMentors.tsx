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
        setAllMentors(response.data);
        console.log(response.data);
      }
    };
    mentorProfile();
  }, []);

  //fetching img from firebase
  const fetchImg = async (id: string) => {
    console.log(allMentors);
    try {
      const imageId = id;
      if (imageId) {
        const imageRef = ref(storage, imageId);
        getDownloadURL(imageRef)
          .then((url) => {
            console.log("img url", url);
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
      <div className="w-screen h-screen">
        {/* <div>
          {allMentors}
        </div> */}

        <div className="w-screen h-60 border-2 flex justify-center items-center">
          <div className="w-1/2 h-full flex justify-center items-center flex-col">
            <label className="relative">
              <div className="flex justify-end absolute right-3 top-12">
                <CiSearch className="text-2xl" />
              </div>
              <input
                className="placeholder:text-slate-400 placeholder:text-sm block bg-white border border-slate-300 rounded-md mt-10 py-2 pl-9 pr-3 shadow-lg focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-lg"
                placeholder="Search by skill or job title"
                type="text"
              />
            </label>
            {/* Material ui component */}
            <div className="flex">
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
        <div className="bg-red-300 w-full h-full flex justify-center">
          <div className="w-9/12 h-3/4 bg-slate-500 border-2 rounded-lg">
            <div className="py-4 px-4">
              <img
                src="https://images.ctfassets.net/lh3zuq09vnm2/yBDals8aU8RWtb0xLnPkI/19b391bda8f43e16e64d40b55561e5cd/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png"
                alt="mentor_img"
                className="w-60 h-60 rounded-md"
                id="mentor_img"
              />
            </div>
          </div>
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
