import { FormEvent, useState } from "react";
import { useMultistepForm } from "../../../app/useMultistepForm";
import { AboutYou } from "./AboutYou";
import { ExperianceDetails } from "./ExperianceDetails";
import { ProfileDetails } from "./ProfileDetails";
import { FormData } from "../../.../../../datatypes/Datatypes";
import { INITIAL_DATA } from "../../.../../../datatypes/Datatypes";
import { useAppDispatch } from "../../../app/hooks";
import { MultiFromApply } from "../../../services/authServices";
import { useNavigate } from "react-router-dom";

function ContainerForm() {
  const [mentorData, setMentorData] = useState(INITIAL_DATA);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLaststep) return next();
    try {
      const response = await dispatch(MultiFromApply(mentorData));
      if (response.payload.status === "success") {
        navigate("/mentor/apply-success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center">
            <h1 className="font-bold text-lg">
              {currentStepIndex + 1} / {steps.length}
            </h1>
          </div>
          <div>{step}</div>
          <div className="flex justify-center items-center md:absolute md:bottom-8 md:right-60 mb-18">
            {!isFirststep && (
              <button
                type="button"
                className="border-2 border-color-two bg-color-five text-white px-1 py-1 rounded-md my-5 w-20 md:w-20 md:my-0 md:mr-0"
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
}

export default ContainerForm;
