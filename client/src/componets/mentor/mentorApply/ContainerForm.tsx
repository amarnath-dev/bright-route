import { FormEvent, useState } from "react";
import { useMultistepForm } from "../../../app/useMultistepForm";
import { AboutYou } from "./AboutYou";
import { ExperianceDetails } from "./ExperianceDetails";
import { ProfileDetails } from "./ProfileDetails";

type FormData = {
  profile_img: File | null;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  job_title: string;
  company: string;
  state: string;

  job_category: string;
  skills: string[];
  bio_dec: string;
  linkedIn_url: string;
  twitter_url: string;
  website_url: string;

  why_mentor: string;
  achievement: string;
};

const INITIAL_DATA: FormData = {
  profile_img: null,
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  job_title: "",
  company: "",
  state: "",

  job_category: "",
  skills: [],
  bio_dec: "",
  linkedIn_url: "",
  twitter_url: "",
  website_url: "",

  why_mentor: "",
  achievement: "",
};

const ContainerForm: React.FC = () => {
  const [mentorData, setMentorData] = useState(INITIAL_DATA);

  const updateFields = (fields: Partial<FormData>) => {
    setMentorData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const { steps, step, currentStepIndex, isFirststep, back, next, isLaststep } =
    useMultistepForm([
      <AboutYou {...mentorData} updateFields={updateFields} />,
      <ProfileDetails {...mentorData} updateFields={updateFields} />,
      <ExperianceDetails {...mentorData} updateFields={updateFields} />,
    ]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Submittted");
    next();
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center mt-1">
            <h1 className="font-bold text-lg">
              {currentStepIndex + 1} / {steps.length}
            </h1>
          </div>
          {/* this is a component  */}
          {step}

          <div className="flex justify-center items-center md:absolute md:bottom-0 md:right-60 mb-10">
            {!isFirststep && (
              <button
                type="button"
                className="border-2 border-color-two bg-color-four px-1 py-1 rounded-md my-5 w-20 mr-5 md:w-20 md:my-0 md:mr-0"
                onClick={back}
              >
                Back
              </button>
            )}

            <button
              type="submit"
              className="border-2 border-color-two bg-color-one text-white px-1 py-1 rounded-md my-5 w-20 md:w-20 md:my-0 md:mr-0"
            >
              {isLaststep ? "Finish" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default ContainerForm;
