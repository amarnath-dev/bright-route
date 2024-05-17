import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { submitFormTwo, FormTwo } from "../../../redux/slices/mentorApplySlice";
import { MultiFormTwo } from "../../../validations/profileFormValidation";

interface SkillOption {
  title: string;
}

const topSkills = [
  { title: "Node js" },
  { title: "React" },
  { title: "HTML" },
  { title: "Typescript" },
  { title: "Mongodb" },
  { title: "Python" },
  { title: "Java" },
  { title: "Javascript" },
];

function ProfileDetails() {
  const [skillsOptions, setSkillsOptions] = useState<SkillOption[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormTwo>({
    resolver: zodResolver(MultiFormTwo),
  });

  const handleSkillsChange = (
    _event: React.SyntheticEvent,
    value: SkillOption[]
  ) => {
    setSkillsOptions(value);
    setValue(
      "skills",
      value.map((skill) => skill.title)
    );
  };

  const onSubmit = (data: FormTwo) => {
    const result = dispatch(submitFormTwo(data));
    if (result.payload) {
      navigate("/mentor/apply/3");
    }
  };

  return (
    <div className="w-full h-screen bg-background-one">
      <div className="w-full flex justify-center items-center">
        <div className="flex justify-start items-center md:w-3/5 text-white">
          <form className="md:w-full">
            <span className="ml-16 md:ml-2">Choose your Job Category</span>
            <div className="flex justify-center mt-1 md:w-full md:justify-start">
              <label>
                <select
                  className="placeholder:text-slate-400 block bg-gray-800 mt-2 border border-background-two rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-sm"
                  {...register("job_category")}
                >
                  <option value="">-------</option>
                  <option value="Software Development">
                    Software Development
                  </option>
                  <option value="Engineering & Data">Engineering & Data</option>
                  <option value="UI & UX Design">UI & UX Design</option>
                  <option value="Business & Management">
                    Business & Management
                  </option>
                  <option value="Product & Marketing">
                    Product & Marketing
                  </option>
                </select>
              </label>
              {errors.job_category && (
                <small className="text-red-500 text-sm italic">
                  *{errors.job_category.message}
                </small>
              )}
            </div>

            <div className="w-screen flex flex-col justify-start items-center mt-4 md:w-full md:flex-col">
              <div className="md:w-full">
                <h1>Select your Skills</h1>
                <Stack spacing={3} sx={{ width: 280 }} className="py-2">
                  <Autocomplete
                    multiple
                    id="tags-standard"
                    options={topSkills}
                    getOptionLabel={(option) => option.title}
                    value={skillsOptions}
                    onChange={handleSkillsChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        placeholder="Add Skills..."
                        className="bg-gray-300 placeholder:text-gray-400"
                      />
                    )}
                  />
                </Stack>
                {errors.skills && (
                  <small className="text-red-500 text-sm italic">
                    *{errors.skills.message}
                  </small>
                )}
              </div>
              <span className="w-72 mt-4 text-sm md:w-full sm:text-md">
                Describe your expertise to connect with mentees who have similar
                interests. Mentees will use this to find you.
              </span>
            </div>

            <div className="w-screen flex flex-col justify-start items-center mt-1 md:w-full md:flex-col">
              <label className="md:w-full">
                <textarea
                  className="placeholder:text-gray-400 block bg-gray-800 border border-gray-400 rounded-md py-2 pl-2 pt-2 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 h-20 text-sm md:w-full sm:text-md"
                  placeholder="Bio description..."
                  {...register("bio")}
                ></textarea>
                {errors.bio && (
                  <small className="text-red-500 text-sm italic">
                    *{errors.bio.message}
                  </small>
                )}
              </label>
              <span className="w-72 mt-2 text-sm md:w-full sm:text-md">
                Tell us (and your mentees) a little bit about yourself. Talk
                about yourself in the first person, as if you'd directly talk to
                a mentee. This will be public.
              </span>
            </div>

            <div className="w-screen flex flex-col justify-start items-center md:w-full md:flex-row">
              <label>
                <input
                  className="placeholder:text-slate-400 block bg-gray-800 mt-5 border border-gray-800 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-sm"
                  placeholder="LinkedIn URL"
                  type="text"
                  {...register("linked_in")}
                />
                {errors.linked_in && (
                  <small className="text-red-500 text-sm italic">
                    *{errors.linked_in.message}
                  </small>
                )}
              </label>
              <label>
                <input
                  className="md:ml-2 placeholder:text-slate-400 block bg-gray-800 border-gray-800 mt-5 border rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-sm"
                  placeholder="Twitter Handle"
                  type="text"
                  {...register("twitter")}
                />
                {errors.twitter && (
                  <small className="text-red-500 text-sm italic">
                    *{errors.twitter.message}
                  </small>
                )}
              </label>
            </div>
            <div className="w-full flex justify-between mt-5">
              <button
                type="button"
                className="border border-color-two bg-color-five text-white px-1 py-1 rounded-md my-5 w-20 md:w-20 md:my-0 md:mr-0"
                onClick={() => navigate("/mentor/apply/1")}
              >
                Back
              </button>
              <button
                type="button"
                className="border border-color-two bg-color-one text-white px-1 py-1 rounded-md my-5 w-20 md:w-20 md:my-0 md:mr-0"
                onClick={handleSubmit(onSubmit)}
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
