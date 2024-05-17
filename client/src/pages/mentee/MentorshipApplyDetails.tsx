import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { Form, submitForm } from "../../redux/slices/applySlice";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

export const MentorshipApplyDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { planId } = useParams();
  const { form, planAmount } = useAppSelector((state) => state.applySlice);

  const [formData, setFormData] = useState<Form>({
    mentor_plan_id: "",
    mentor_id: "",
    mentor_plan_amount: "",
    mentorship_goal: "",
    time_to_reach: "",
    message_to_mentor: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosPrivate.get(`mentor/checkPlan/${planId}`, {
          withCredentials: true,
        });
        if (response.data.status === "failed") {
          Swal.fire({
            title: "Plan Not Found",
            text: "This plan does not exists",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              navigate(`/mentor-profile/${response.data?.mentorId}`);
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [
    axiosPrivate,
    form,
    form?.mentor_id,
    form?.mentor_plan_id,
    navigate,
    planId,
  ]);

  const handleChange: React.ChangeEventHandler<
    HTMLSelectElement | HTMLTextAreaElement
  > = (e) => {
    const target = e.target as HTMLSelectElement | HTMLTextAreaElement;
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = () => {
    if (
      !formData.mentorship_goal ||
      !formData.time_to_reach ||
      !formData.message_to_mentor
    ) {
      toast.error("Please select All fields");
      return;
    }
    const result = dispatch(submitForm(formData));
    setFormData({
      mentor_plan_id: form?.mentor_plan_id as string,
      mentor_id: form?.mentor_id as string,
      mentor_plan_amount: planAmount?.plan_amount as string,
      mentorship_goal: "",
      time_to_reach: "",
      message_to_mentor: "",
    });
    if (result.payload) {
      navigate("/mentor-profile/apply/checkout");
    }
  };

  return (
    <>
      <div className="w-full h-screen bg-background-two text-white">
        <div className="w-full h-screen flex justify-center items-center px-2 py-5">
          <div className="w-full h-full md:w-3/4 rounded-lg md:px-4">
            <div className="mt-10 md:mt-4">
              <label
                htmlFor="large"
                className="block mb-2 text-base font-medium"
              >
                What best describes the goal of your mentorship?
              </label>
              <select
                id="large"
                name="mentorship_goal"
                onChange={handleChange}
                value={formData.mentorship_goal}
                className="block w-full px-4 py-3 text-base bg-background-two text-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            <div className="mt-10 md:mt-4">
              <label
                htmlFor="large"
                className="block mb-2 text-base font-medium"
              >
                When would you like to reach that goal?
              </label>
              <select
                id="large"
                name="time_to_reach"
                value={formData.time_to_reach}
                onChange={handleChange}
                className="block w-full px-4 py-3 text-base bg-background-two text-white border border-gray-300 rounded-lg focus:ring-gray-800 focus:border-gray-800 dark:placeholder-gray-400 dark:focus:ring-gray-800 dark:focus:border-blue-500"
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
            <div className="mt-10 md:mt-5">
              <label
                htmlFor="message"
                className="block mb-2 text-lg font-medium"
              >
                Write a message to Mentor
              </label>
              <textarea
                id="message"
                rows={5}
                value={formData.message_to_mentor}
                name="message_to_mentor"
                onChange={handleChange}
                className="placeholder:text-gray-300 block p-2.5 w-full text-sm bg-gray-800 text-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-50 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your message here..."
              ></textarea>
              <div className="mt-2 flex-wrap">
                <option value="" className="font-bold">
                  What to include in your message ?
                </option>
                <option value="">1.You can indroduce yourself</option>
                <option value="">2. You can state your goal</option>
                <option value="">3.You can express your needs</option>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <button
                className="border bg-color-five text-white px-2 py-2 rounded-md"
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

export default MentorshipApplyDetails;
