import { useState } from "react";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

interface PlanDetails {
  planAmount: string;
  planType: string;
  planDescription: string;
  videoCallSession: string;
  videoCallCount: string;
  chatSessions: string;
  handsOnSupport: string;
}

const CreatePlan = () => {
  const [planDetails, setPlanDetails] = useState<PlanDetails>({
    planAmount: "",
    planType: "",
    planDescription: "",
    videoCallSession: "",
    videoCallCount: "",
    chatSessions: "",
    handsOnSupport: "",
  });
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!planDetails.planAmount) {
      toast.error("Please select a plan amount");
      return;
    }
    if (!planDetails.videoCallCount) {
      toast.error("Plese select video call count");
      return;
    }
    try {
      const response = await axiosPrivate.post(
        "/mentor/plans/create",
        planDetails,
        {
          withCredentials: true,
        }
      );
      if (response.data.status === "success") {
        toast(response.data.message);
        navigate("/mentor/plans");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setPlanDetails({
      ...planDetails,
      [e.target.name]: e.target?.value,
    });
  };
  return (
    <>
      <ToastContainer className="w-40 md:w-80 " />
      <div className="w-full h-screen fill-rule">
        <div
          id="crud-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative rounded-lg shadow-xl">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-bold text-gray-900">
                  Create New Monthly Plan
                </h3>
              </div>

              <form className="p-4 md:p-5" onSubmit={handleFormSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Enter the Amount
                    </label>
                    <input
                      type="number"
                      name="planAmount"
                      id="price"
                      required
                      value={planDetails.planAmount}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-700 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Ex Rs.3999"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Plan Type
                    </label>
                    <select
                      value={planDetails.planType}
                      name="planType"
                      onChange={handleChange}
                      id="category"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option>---Select Type---</option>
                      <option value="Lite Plan">Lite Plan</option>
                      <option value="Standard Plan">Standard Plan</option>
                    </select>
                  </div>
                  <div className="w-96">
                    <h1 className="text-sm">
                      The plan amount should be fair and not too high.
                    </h1>
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Plan Description
                    </label>
                    <textarea
                      id="description"
                      value={planDetails.planDescription}
                      name="planDescription"
                      onChange={handleChange}
                      rows={4}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write plan description here"
                    ></textarea>
                  </div>

                  <div className="w-96">
                    <h1 className="font-bold">Please Select the services</h1>
                    <div className="flex items-center mt-3">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        name="videoCallSession"
                        value="Video Call Sessions"
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-checkbox"
                        className="ms-2 text-sm font-medium text-gray-900"
                      >
                        Video Call Sessions
                      </label>
                      <div>
                        <label htmlFor="video_call_count" className="ml-10">
                          Count :
                        </label>
                        <input
                          type="number"
                          name="videoCallCount"
                          value={planDetails.videoCallCount}
                          onChange={handleChange}
                          className="w-10 ml-2 px-1 rounded"
                          max={5}
                          min={0}
                        />
                      </div>
                    </div>

                    <div className="flex items-center mt-3">
                      <input
                        id="checked-checkbox"
                        type="checkbox"
                        value="Unlimited Q&A via chat"
                        name="chatSessions"
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="checked-checkbox"
                        className="ms-2 text-sm font-medium text-gray-900"
                      ></label>
                      Unlimited Q&A via chat
                    </div>
                    <div className="flex items-center mt-3">
                      <input
                        id="checked-checkbox"
                        type="checkbox"
                        name="handsOnSupport"
                        value="Hands-on support"
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="checked-checkbox"
                        className="ms-2 text-sm font-medium text-gray-900"
                      ></label>
                      Hands-on support
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-color-one hover:bg-teal-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-color-one mt-5"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Add Plan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePlan;
