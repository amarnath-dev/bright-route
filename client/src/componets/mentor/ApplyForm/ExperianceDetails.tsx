import HeaderCard2 from "./HeaderCardTwo";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  submitFormThree,
  FormThree,
} from "../../../redux/slices/mentorApplySlice";
import { ExperienceFormSchema } from "../../../validations/experienceFromValidation";

function ExperianceDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormThree>({
    resolver: zodResolver(ExperienceFormSchema),
  });

  const onSubmit = (data: FormThree) => {
    const result = dispatch(submitFormThree(data));
    if (result.payload) {
      navigate("/mentor/apply/success");
    }
  };

  return (
    <>
      <div className="w-full h-screen bg-background-one">
        <HeaderCard2 />
        <div className="w-screen flex justify-center items-center text-gray-400">
          <div className="flex justify-start items-center md:w-3/5">
            <form className="w-full flex flex-col justify-start items-center">
              <div className="w-72 md:w-full">
                <span className="font-bold text-white">
                  Why do you want to become a mentor? (Not publicly Visible)
                </span>
              </div>

              <div className="w-screen flex flex-col justify-start items-center mt-1 md:w-full md:flex-col">
                <label className="md:w-full">
                  <textarea
                    id="why_mentor"
                    className="bg-gray-800 border border-slate-300 rounded-md pl-2 pt-2 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 h-32 text-md text-white md:w-full sm:text-md"
                    {...register("why_mentor")}
                  ></textarea>
                  {errors.why_mentor && (
                    <small className="text-red-500 text-sm italic">
                      *{errors.why_mentor.message}
                    </small>
                  )}
                </label>
              </div>

              <div className="w-72 mt-1 md:w-full">
                <span className="font-bold text-white">
                  What, in your opinion, has been your greatest achievement so
                  far? (Not publicly Visible)
                </span>
              </div>

              <div className="w-screen flex flex-col justify-start items-center mt-1 md:w-full md:flex-col">
                <label className="md:w-full">
                  <textarea
                    id="achievement"
                    className="bg-gray-800 border border-slate-300 rounded-md pl-2 pt-2 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 h-32 text-md text-white md:w-full sm:text-md"
                    {...register("achievement")}
                  ></textarea>
                  {errors.achievement && (
                    <small className="text-red-500 text-sm italic">
                      *{errors.achievement.message}
                    </small>
                  )}
                </label>
              </div>
              <div className="w-full flex justify-between mt-5">
                <button
                  type="button"
                  className="border border-color-two bg-color-five text-white px-1 py-1 rounded-md my-5 w-20 md:w-20 md:my-0 md:mr-0"
                  onClick={() => navigate("/mentor/apply/2")}
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
    </>
  );
}

export default ExperianceDetails;
