import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { MentorServices } from "../../interfaces/mentor.interface";

const CreatePlan = () => {
  const [planDetails, setPlanDetails] = useState<MentorServices>({
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
      <div className="w-full h-screen fill-rule bg-background-two">
        <div
          id="crud-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative rounded-lg shadow-xl">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-md bg-gray-800">
                <h3 className="text-lg font-bold text-white">
                  Create New Monthly Plan
                </h3>
              </div>

              <form
                className="p-4 md:p-5 bg-gray-800 text-white"
                onSubmit={handleFormSubmit}
              >
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium"
                    >
                      Enter the Amount
                    </label>
                    <input
                      type="number"
                      name="planAmount"
                      id="price"
                      required
                      value={planDetails?.planAmount}
                      onChange={handleChange}
                      className="bg-gray-800 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                      placeholder="Ex Rs.3999"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium"
                    >
                      Plan Type
                    </label>
                    <select
                      value={planDetails?.planType}
                      name="planType"
                      onChange={handleChange}
                      id="category"
                      className="bg-gray-800 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                    >
                      <option>Select Type</option>
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
                      className="block mb-2 text-sm font-medium"
                    >
                      Plan Description
                    </label>
                    <textarea
                      id="description"
                      value={planDetails?.planDescription}
                      name="planDescription"
                      onChange={handleChange}
                      rows={4}
                      className="block p-2.5 w-full text-sm bg-gray-800 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write plan description here..."
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
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600"
                      />
                      <label
                        htmlFor="default-checkbox"
                        className="ms-2 text-sm font-medium text-white"
                      >
                        Video Call Sessions(Weekly)
                      </label>
                      <div>
                        <label htmlFor="video_call_count" className="ml-10">
                          Count :
                        </label>
                        <input
                          type="number"
                          name="videoCallCount"
                          value={planDetails?.videoCallCount}
                          onChange={handleChange}
                          className="w-10 ml-2 px-1 rounded bg-gray-800"
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
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
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
                <div className="w-full">
                  <button
                    type="submit"
                    className="text-white w-full bg-color-five hover:bg-teal-700 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    Add Plan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePlan;
