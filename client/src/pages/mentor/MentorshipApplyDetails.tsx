import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPrivate from "../../app/useAxiosPrivate";

export const MentorshipApplyDetails = () => {
  const [formData, setFormData] = useState({
    mentorshipGoal: "",
    timeInfo: "",
    message: "",
  });

  const axiosPrivate = useAxiosPrivate();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.mentorshipGoal || !formData.timeInfo || !formData.message) {
      toast.error("Please select all fields");
      return;
    }
    const response = await axiosPrivate.post(
      "/mentorship/apply",
      {},
      { withCredentials: true }
    );
    console.log("This is the response after applying", response);
  };
  return (
    <>
      <ToastContainer className="w-40 md:w-80" />
      <div className="w-full h-screen">
        <div className="h-screen flex justify-center items-center px-2 py-5">
          <div className="w-3/4 h-full rounded-lg px-4">
            <div className="mt-4">
              <label
                htmlFor="large"
                className="block mb-2 text-base font-medium text-gray-900"
              >
                What best describes the goal of your mentorship?
              </label>
              <select
                id="large"
                name="mentorshipGoal"
                onChange={handleChange}
                value={formData.mentorshipGoal}
                className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>Choose an option</option>
                <option value="Do not wish to disclose.">
                  Do not wish to disclose.
                </option>
                <option value="I'm a student and looking for help with my studies.">
                  I'm a student and looking for help with my studies.
                </option>
                <option value="I just graduated and need help with my career start.">
                  I just graduated and need help with my career start.
                </option>
                <option value="I want to change careers or get a new job.">
                  I want to change careers or get a new job.
                </option>
                <option value="I want to enhance or extend my skillset.">
                  I want to enhance or extend my skillset.
                </option>
                <option value="I need mentorship for a personal project.">
                  I need mentorship for a personal project.
                </option>
                <option value="I need mentorship for my business / product.">
                  I need mentorship for my business / product.
                </option>
              </select>
            </div>
            <div className="mt-4">
              <label
                htmlFor="large"
                className="block mb-2 text-base font-medium text-gray-900"
              >
                When would you like to reach that goal?
              </label>
              <select
                id="large"
                name="timeInfo"
                value={formData.timeInfo}
                onChange={handleChange}
                className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>Choose an option</option>
                <option value="I don't have a timeline in mind.">
                  I don't have a timeline in mind.
                </option>
                <option value="I'm looking to reach this goal in a few weeks.">
                  I'm looking to reach this goal in a few weeks.
                </option>
                <option value="I'm looking to reach this goal in a month or so.">
                  I'm looking to reach this goal in a month or so.
                </option>
                <option value="I'm looking at a timeline of around three months.">
                  I'm looking at a timeline of around three months.
                </option>
                <option value="I'm looking to reach this goal in around half a year.">
                  I'm looking to reach this goal in around half a year.
                </option>
                <option value="I need mentorship for a personal project.">
                  I'd like to reach this goal in a year or more.
                </option>
              </select>
            </div>
            <div className="mt-5">
              <label
                htmlFor="message"
                className="block mb-2 text-lg font-medium text-gray-900"
              >
                Write a message to Mentor
              </label>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                name="message"
                onChange={handleChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-50 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your message here..."
              ></textarea>
              <div className="mt-2 flex-wrap">
                <option value="" className="font-bold">
                  What to include in your message ?
                </option>
                <option value="">
                  1. Introduce yourself: Describe your background and
                  professional journey
                </option>
                <option value="">
                  2. State your goal: Share your aspirations and the steps
                  you’ve taken so far
                </option>
                <option value="">
                  3. Express your needs: Tell about the challenges in pursuing
                  your goal.
                </option>
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <button
                className="border-2 bg-color-one text-white px-2 py-2 rounded-md"
                onClick={handleSubmit}
              >
                Procced to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
