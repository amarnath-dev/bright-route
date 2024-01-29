import HeaderCard2 from "./HeaderCard2";
import { MentorExperianceData } from "../../../datatypes/Datatypes";

type ExperianceFormProps = MentorExperianceData & {
  updateFields: (fields: Partial<MentorExperianceData>) => void;
};

export function ExperianceDetails({
  why_mentor,
  achievement,
  updateFields,
}: ExperianceFormProps) {
  return (
    <>
      <HeaderCard2 />
      <div className="w-screen mt-5 flex justify-center items-center">
        <div className="flex justify-start items-center md:w-3/5">
          <form className="w-full flex flex-col justify-start items-center">
            <div className="w-72 md:w-full">
              <span className="font-bold">
                Why do you want to become a mentor? (Not publicly visible)*
              </span>
            </div>

            <div className="w-screen flex flex-col justify-start items-center mt-2 md:w-full md:flex-col">
              <label className="md:w-full">
                <textarea
                  name=""
                  id=""
                  className="bg-white border border-slate-300 rounded-md pl-2 pt-2 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 h-32 text-sm md:w-full sm:text-md"
                  value={why_mentor}
                  onChange={(e) => updateFields({ why_mentor: e.target.value })}
                ></textarea>
              </label>
            </div>

            <div className="w-72 mt-3 md:w-full">
              <span className="font-bold">
                What, in your opinion, has been your greatest achievement so
                far? (Not publicly visible)*
              </span>
            </div>

            <div className="w-screen flex flex-col justify-start items-center mt-2 md:w-full md:flex-col">
              <label className="md:w-full">
                <textarea
                  name=""
                  id=""
                  className="bg-white border border-slate-300 rounded-md pl-2 pt-2 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 h-32 text-sm md:w-full sm:text-md"
                  value={achievement}
                  onChange={(e) =>
                    updateFields({ achievement: e.target.value })
                  }
                ></textarea>
              </label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ExperianceDetails;
