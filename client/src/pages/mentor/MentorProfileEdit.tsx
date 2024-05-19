import React, { useEffect, useState } from "react";
import { MentorProfileObj } from "../../interfaces/mentor.interface";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import NavBar from "../../componets/Navbar";
import "react-image-crop/dist/ReactCrop.css";
import "react-toastify/dist/ReactToastify.css";
import Croper from "../../componets/Crop/Croper";
import NoImage from "../../assets/images/no-profile-image.png";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MentorProfileSchema } from "../../validations/mentorProfileValidation";
import { MentorData } from "../../interfaces/mentor.interface";
import { topSkills } from "../../interfaces/mentor.interface";

const MentorProfileEdit: React.FC = () => {
  const navigate = useNavigate();
  const [mentor, setMentor] = useState<MentorProfileObj>();
  const axiosPrivate = useAxiosPrivate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<MentorData>({
    resolver: zodResolver(MentorProfileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      mentorEmail: "",
      company: "",
      linkedIn: "",
      twitter: "",
      job_title: "",
      bio: "",
      category: "",
      state: "",
      skills: [],
    },
  });

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const response = await axiosPrivate.get("/mentor/profile", {
          withCredentials: true,
        });
        if (response.data) {
          const mentorDetails = response.data.mentorDetails;
          setMentor(mentorDetails);
          const skillValues = mentorDetails.skills.map((skill: string) => ({
            title: skill,
          }));
          setValue("skills", skillValues);
          Object.keys(mentorDetails).forEach((key) => {
            if (key !== "skills") {
              setValue(key as keyof MentorData, mentorDetails[key]);
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMentorData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [mentor?.profile_img]);

  const submitData = async (data: MentorData) => {
    if (data.skills.length > 10) {
      toast.error("Select atmost 10 skills");
      return;
    } else if (data.skills.length < 5) {
      toast.error("Select atleast 5 skills");
      return;
    }
    try {
      const response = await axiosPrivate.post(
        "/mentor/profile/update",
        { mentorData: data },
        {
          withCredentials: true,
        }
      );
      if (response.data.status === "success") {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/mentor/profile");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="w-screen h-full bg-background-two text-white">
        <div className="w-full h-full">
          <div className="w-full">
            <div className="w-full items-center text-center py-4">
              <div className="w-full flex justify-center">
                <img
                  alt="profile_img"
                  className="w-36 h-36 rounded-full object-cover border-2 border-gray-200"
                  id="profile_img"
                  src={NoImage}
                />
              </div>
              <div className="py-2">
                <Croper />
              </div>
            </div>
          </div>

          <form
            className="flex-col justify-center items-center"
            onSubmit={handleSubmit(submitData)}
          >
            <div className="w-full flex flex-col justify-around items-center md:mt-2">
              <div className="md:w-full md:flex justify-around items-center">
                <label>
                  <h1 className="text-gray-400">First Name</h1>
                  <input
                    type="text"
                    id="first_name"
                    className="bg-gray-800 border-gray-800 text-md rounded-lg w-80 p-2.5"
                    {...register("first_name")}
                  />
                  {errors.first_name && (
                    <p className="text-red-500">{errors.first_name.message}</p>
                  )}
                </label>
                <label>
                  <h1 className="text-gray-400">Last Name</h1>
                  <input
                    type="text"
                    id="last_name"
                    className="bg-gray-800 border-gray-800 text-md rounded-lg w-80 p-2.5"
                    {...register("last_name")}
                  />
                  {errors.last_name && (
                    <p className="text-red-500">{errors.last_name.message}</p>
                  )}
                </label>
                <label>
                  <h1 className="text-gray-400">Email</h1>
                  <input
                    type="text"
                    id="email"
                    disabled
                    className="bg-gray-800 border-gray-800 text-md rounded-lg w-80 p-2.5"
                    {...register("mentorEmail")}
                  />
                  {errors.mentorEmail && (
                    <p className="text-red-500">{errors.mentorEmail.message}</p>
                  )}
                </label>
              </div>

              <div className="md:w-full md:flex justify-around items-center">
                <label>
                  <h1 className="text-gray-400">Company</h1>
                  <input
                    type="text"
                    id="company"
                    className="bg-gray-800 border-gray-800 text-md rounded-lg w-80 p-2.5"
                    {...register("company")}
                  />
                  {errors.company && (
                    <p className="text-red-500">{errors.company.message}</p>
                  )}
                </label>
                <label>
                  <h1 className="text-gray-400">LinkedIn</h1>
                  <input
                    type="text"
                    id="linkedIn"
                    className="bg-gray-800 border-gray-800 text-md rounded-lg w-80 p-2.5"
                    {...register("linkedIn")}
                  />
                  {errors.linkedIn && (
                    <p className="text-red-500">{errors.linkedIn.message}</p>
                  )}
                </label>
                <label>
                  <h1 className="text-gray-400">Twitter</h1>
                  <input
                    type="text"
                    id="twitter"
                    className="bg-gray-800 border-gray-800 text-md rounded-lg w-80 p-2.5"
                    {...register("twitter")}
                  />
                  {errors.twitter && (
                    <p className="text-red-500">{errors.twitter.message}</p>
                  )}
                </label>
              </div>

              <div className="md:w-full md:flex justify-around items-center">
                <label>
                  <h1 className="text-gray-400">Job Title</h1>
                  <input
                    type="text"
                    id="job_title"
                    className="bg-gray-800 border-gray-800 text-md rounded-lg w-80 p-2.5"
                    {...register("job_title")}
                  />
                  {errors.job_title && (
                    <p className="text-red-500">{errors.job_title.message}</p>
                  )}
                </label>
                <label>
                  <h1 className="text-gray-400">State</h1>
                  <input
                    type="text"
                    id="state"
                    className="bg-gray-800 border-gray-800 text-md rounded-lg w-80 p-2.5"
                    {...register("state")}
                  />
                  {errors.state && (
                    <p className="text-red-500">{errors.state.message}</p>
                  )}
                </label>
                <label>
                  <h1 className="font-bold">Select Category</h1>
                  <select
                    id="category"
                    {...register("category")}
                    className="bg-gray-800 border-gray-800 text-md rounded-lg w-80 p-2.5"
                  >
                    <option value="null">-------</option>
                    <option value="Software Development">
                      Software Development
                    </option>
                    <option value="Engineering & Data">
                      Engineering & Data
                    </option>
                    <option value="UI & UX Design">UI & UX Design</option>
                    <option value="Bussiness & Managment">
                      Bussiness & Managment
                    </option>
                    <option value="Product & Marketing">
                      Product & Marketing
                    </option>
                  </select>
                  {errors.category && (
                    <p className="text-red-500">{errors.category.message}</p>
                  )}
                </label>
              </div>
            </div>

            <div className="w-full">
              <div className="w-full md:px-10">
                <div className="px-2 md:px-0">
                  <label
                    htmlFor="message"
                    className="block py-2 text-sm font-medium"
                  >
                    ABOUT ME
                  </label>
                  <textarea
                    id="bio"
                    rows={10}
                    {...register("bio")}
                    className="block p-2.5 w-full text-lg rounded-lg focus:border-gray-800 bg-gray-800 text-white"
                  ></textarea>
                  {errors.bio && (
                    <p className="text-red-500">{errors.bio.message}</p>
                  )}
                </div>
                <h1 className="py-2 font-bold">Update your Skills</h1>
                <div className="px-1 py-1 bg-gray-300 rounded-md">
                  <Stack spacing={3} className="text-gray-400">
                    <Controller
                      name="skills"
                      control={control}
                      render={({ field }) => (
                        <Autocomplete
                          multiple
                          id="tags-standard"
                          options={topSkills}
                          isOptionEqualToValue={(option, value) =>
                            option.title === value.title
                          }
                          getOptionLabel={(option) => option.title}
                          value={field.value}
                          onChange={(_, value) => {
                            field.onChange(value);
                          }}
                          filterOptions={(options, { inputValue }) =>
                            options.filter((option) =>
                              option.title
                                .toLowerCase()
                                .includes(inputValue.toLowerCase())
                            )
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="standard"
                              className="placeholder:text-white"
                            />
                          )}
                        />
                      )}
                    />
                  </Stack>
                </div>
                <div className="flex justify-end py-4">
                  <button
                    type="submit"
                    className="text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-color-five"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MentorProfileEdit;
