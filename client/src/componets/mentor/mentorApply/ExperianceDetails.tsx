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
      <div className="w-screen mt-3 flex justify-center items-center text-gray-400">
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
                  className="bg-gray-800 border border-slate-300 rounded-md pl-2 pt-2 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 h-32 text-sm md:w-full sm:text-md"
                  value={why_mentor}
                  onChange={(e) => updateFields({ why_mentor: e.target.value })}
                ></textarea>
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
                  className="bg-gray-800 border border-slate-300 rounded-md pl-2 pt-2 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 h-32 text-sm md:w-full sm:text-md"
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
