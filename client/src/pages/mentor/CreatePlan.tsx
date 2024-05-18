import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { MentorServices } from "../../interfaces/mentor.interface";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlanSchema } from "../../validations/mentorPlanValidation";
import Swal from "sweetalert2";

const CreatePlan = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MentorServices>({
    resolver: zodResolver(PlanSchema),
  });

  const handleFormSubmit = async (data: MentorServices) => {
    if (data.planType === "Select Type") {
      toast.error("Please select a plan type");
      return;
    }
    console.log("Form", data);
    try {
      const response = await axiosPrivate.post("/mentor/plans/create", data, {
        withCredentials: true,
      });
      if (response.data.status === "success") {
        toast.success(response.data.message);
        navigate("/mentor/plans");
      } else if (response.data.status === "exists") {
        Swal.fire({
          title: "Plan limit exceeded",
          text: "Each mentor can only have two plans",
        });
        return;
      }
    } catch (error) {
      toast.error("Please try again.");
      console.error(error);
    }
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
              <form
                className="p-4 md:p-5 bg-gray-800 text-white rounded-md"
                onSubmit={handleSubmit(handleFormSubmit)}
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
                      id="price"
                      className="bg-gray-800 border border-gray-300 text-md rounded-lg block w-full p-2.5"
                      placeholder="Eg: 3999"
                      {...register("planAmount")}
                    />
                    {errors.planAmount && (
                      <small className="text-red-500 text-sm italic">
                        *{errors.planAmount.message}
                      </small>
                    )}
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium"
                    >
                      Plan Type
                    </label>
                    <select
                      id="category"
                      className="bg-gray-800 border border-gray-300 text-md rounded-lg block w-full p-2.5"
                      {...register("planType")}
                    >
                      <option>Select Type</option>
                      <option value="Lite Plan">Lite Plan</option>
                      <option value="Standard Plan">Standard Plan</option>
                    </select>
                    {errors.planType && (
                      <small className="text-red-500 text-sm italic">
                        *{errors.planType.message}
                      </small>
                    )}
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
                      rows={4}
                      className="block p-2.5 w-full text-sm bg-gray-800 rounded-lg border border-gray-300"
                      placeholder="Write plan description here..."
                      {...register("planDescription")}
                    ></textarea>
                    {errors.planDescription && (
                      <small className="text-red-500 text-sm italic">
                        *{errors.planDescription.message}
                      </small>
                    )}
                  </div>

                  <div className="w-96">
                    <h1 className="font-bold">Please Select the services</h1>
                    <div className="flex items-center mt-3">
                      <input
                        id="videoCallSession"
                        type="checkbox"
                        value="Video Call Sessions"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        {...register("videoCallSession")}
                      />
                      <label
                        htmlFor="videoCallSession"
                        className="ms-2 text-sm font-medium text-white"
                      >
                        Video Call Sessions (Weekly)
                      </label>
                      <div>
                        <label htmlFor="video_call_count" className="ml-2">
                          <strong> Count :</strong>
                        </label>
                        <input
                          type="number"
                          className="w-10 ml-2 px-1 rounded bg-gray-800"
                          max={5}
                          min={0}
                          {...register("videoCallCount")}
                        />
                      </div>
                    </div>
                    {errors.videoCallCount && (
                      <small className="text-red-500 text-sm italic">
                        *{errors.videoCallCount.message}
                      </small>
                    )}
                    {errors.videoCallSession && (
                      <small className="text-red-500 text-sm italic">
                        *{errors.videoCallSession.message}
                      </small>
                    )}
                    <div className="flex items-center mt-3">
                      <input
                        id="chatSessions"
                        type="checkbox"
                        value="Unlimited Q&A via chat"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                        {...register("chatSessions")}
                      />
                      <label
                        htmlFor="chatSessions"
                        className="ms-2 text-sm font-medium text-white"
                      >
                        Q&A via chat
                      </label>
                    </div>
                    {errors.chatSessions && (
                      <small className="text-red-500 text-sm italic">
                        *{errors.chatSessions.message}
                      </small>
                    )}

                    <div className="flex items-center mt-3">
                      <input
                        id="handsOnSupport"
                        type="checkbox"
                        value="Hands-on support"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        {...register("handsOnSupport")}
                      />
                      <label
                        htmlFor="handsOnSupport"
                        className="ms-2 text-sm font-medium text-white"
                      >
                        Hands-on support
                      </label>
                    </div>
                    {errors.handsOnSupport && (
                      <small className="text-red-500 text-sm italic">
                        *{errors.handsOnSupport.message}
                      </small>
                    )}
                  </div>
                </div>

                <div className="w-full">
                  <button
                    type="submit"
                    className="text-white w-full bg-color-one hover:bg-teal-700 font-medium rounded-lg text-sm px-5 py-2.5"
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
