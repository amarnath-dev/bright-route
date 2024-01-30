import HeaderCard from "./HeaderCard";
import { MentorAboutData } from "../../../datatypes/Datatypes";

type AboutFormProps = MentorAboutData & {
  updateFields: (
    fields: Partial<MentorAboutData & { profile_img: File | string | null }>
  ) => void;
};

export function AboutYou({
  // profile_img, //this line is causing the error
  first_name,
  last_name,
  email,
  password,
  job_title,
  company,
  state,
  updateFields,
}: AboutFormProps) {
  return (
    <>
      <HeaderCard />
      <div className="w-screen mt-5 flex justify-center items-center">
        <div className="flex justify-start items-center md:w-3/5">
          <form className="md:w-full" encType="multipart/form-data">
            <span className="font-bold ml-16 md:ml-2">
              Choose a profile image
            </span>
            <div className="flex justify-center md:w-full md:justify-start">
              <label>
                <input
                  type="file"
                  className="placeholder:text-slate-400 block bg-white mt-2 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-sm"
                  // value={profile_img}
                  onChange={(e) => {
                    // const selectedFile = e.target.files && e.target.files[0];
                    updateFields({ profile_img: e.target.files?.[0] || null });
                  }}
                />
              </label>
            </div>

            <div className="w-screen flex flex-col justify-start items-center md:w-full md:flex-row">
              <label>
                <input
                  className="placeholder:text-slate-400 block bg-white mt-2 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-sm"
                  placeholder="First name*"
                  type="text"
                  value={first_name}
                  onChange={(e) => updateFields({ first_name: e.target.value })}
                />
              </label>
              <label>
                <input
                  className="md:ml-2 placeholder:text-slate-400 block bg-white mt-2 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-sm"
                  placeholder="Last name*"
                  type="text"
                  value={last_name}
                  onChange={(e) => updateFields({ last_name: e.target.value })}
                />
              </label>
            </div>

            <div className="w-screen flex flex-col justify-start items-center md:w-full md:flex-row">
              <label>
                <input
                  className="placeholder:text-slate-400 block bg-white mt-2 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-sm"
                  placeholder="Email*"
                  type="text"
                  value={email}
                  onChange={(e) => updateFields({ email: e.target.value })}
                />
              </label>
              <label>
                <input
                  className="md:ml-2 placeholder:text-slate-400 block bg-white mt-2 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-sm"
                  placeholder="Choose a Password*"
                  type="text"
                  value={password}
                  onChange={(e) => updateFields({ password: e.target.value })}
                />
              </label>
            </div>
            <div className="w-screen flex flex-col justify-start items-center md:w-full md:flex-row">
              <label>
                <input
                  className="placeholder:text-slate-400 block bg-white mt-2 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-sm"
                  placeholder="Job title*"
                  type="text"
                  value={job_title}
                  onChange={(e) => updateFields({ job_title: e.target.value })}
                />
              </label>
              <label>
                <input
                  className="md:ml-2 placeholder:text-slate-400 block bg-white mt-2 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-sm"
                  placeholder="Company*"
                  type="text"
                  value={company}
                  onChange={(e) => updateFields({ company: e.target.value })}
                />
              </label>
            </div>
            <div className="w-screen flex flex-col justify-start items-center md:w-full md:flex-row">
              <label>
                <input
                  className="placeholder:text-slate-400 block bg-white mt-2 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-sm"
                  placeholder="State*"
                  type="text"
                  value={state}
                  onChange={(e) => updateFields({ state: e.target.value })}
                />
              </label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
