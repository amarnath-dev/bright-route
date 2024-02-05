import { MentorProfileData } from "../../../datatypes/Datatypes";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

type ProfileFormProps = MentorProfileData & {
  updateFields: (fields: Partial<MentorProfileData>) => void;
};

export function ProfileDetails({
  job_category,
  skills,
  bio_dec,
  linkedIn_url,
  twitter_url,
  website_url,
  updateFields,
}: ProfileFormProps) {
  const skillsOptions = skills.map((skill) => ({ title: skill }));

  const handleSkillsChange = (
    event: React.SyntheticEvent,
    newSkills: { title: string }[] 
  ) => {
    updateFields({ skills: newSkills.map((skill) => skill.title) }); 
  };

  return (
    <>
      <div className="w-screen mt-5 flex justify-center items-center">
        <div className="flex justify-start items-center md:w-3/5">
          <form className="md:w-full">
            <span className="font-bold ml-16 md:ml-2">
              Choose your job Category*
            </span>

            <div className="flex justify-center mt-1 md:w-full md:justify-start">
              <label>
                <select
                  name=""
                  id=""
                  className="placeholder:text-slate-400 block bg-white mt-2 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-sm"
                  value={job_category}
                  onChange={(e) =>
                    updateFields({ job_category: e.target.value })
                  }
                >
                  <option value="null">-------</option>
                  <option value="Software Development">
                    Software Development
                  </option>
                  <option value="Engineering & Data">Engineering & Data</option>
                  <option value="UI & UX Design">UI & UX Design</option>
                  <option value="Bussiness & Managment">
                    Bussiness & Managment
                  </option>
                  <option value="Product & Marketing">
                    Product & Marketing
                  </option>
                </select>
              </label>
            </div>

            <div className="w-screen flex flex-col justify-start items-center mt-4 md:w-full md:flex-col">
              <label className="md:w-full">
                <Stack spacing={3} sx={{ width: 750 }}>
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
                        label="Skills"
                        placeholder="Add skills..."
                      />
                    )}
                  />
                </Stack>
              </label>
              <span className="w-72 mt-4 text-sm md:w-full sm:text-md">
                Describe your expertise to connect with mentees who have similar
                interests.Mentees will use this to find you.
              </span>
            </div>

            <div className="w-screen flex flex-col justify-start items-center mt-2 md:w-full md:flex-col">
              <label className="md:w-full">
                <textarea
                  name=""
                  id=""
                  className="placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-2 pt-2 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 h-20 text-sm md:w-full sm:text-md"
                  placeholder="Bio description..."
                  value={bio_dec}
                  onChange={(e) => updateFields({ bio_dec: e.target.value })}
                ></textarea>
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
                  className="placeholder:text-slate-400 block bg-white mt-5 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-sm"
                  placeholder="LinkedIn URL *"
                  type="text"
                  value={linkedIn_url}
                  onChange={(e) =>
                    updateFields({ linkedIn_url: e.target.value })
                  }
                />
              </label>
              <label>
                <input
                  className="md:ml-2 placeholder:text-slate-400 block bg-white mt-5 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-sm"
                  placeholder="Twitter Handle (optional)"
                  type="text"
                  value={twitter_url}
                  onChange={(e) =>
                    updateFields({ twitter_url: e.target.value })
                  }
                />
              </label>
            </div>

            <div className="w-screen flex flex-col justify-start items-center mt-2 md:w-full">
              <label className="md:w-full">
                <input
                  className="placeholder:text-slate-400 block bg-white mt-3 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-sm"
                  placeholder="Personal Website (optional)"
                  type="text"
                  value={website_url}
                  onChange={(e) =>
                    updateFields({ website_url: e.target.value })
                  }
                />
              </label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

const topSkills = [
  { title: "Node js" },
  { title: "React" },
  { title: "HTML" },
  { title: "Typescript" },
  { title: "Mongodb" },
  { title: "Python" },
  { title: "Java" },
  {
    title: "Javascript",
  },
];
