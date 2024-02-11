import { useState } from "react";
import API from "../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const ChangePassword = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    otpNumber: "",
  });
  const [otpSend, setOtpSend] = useState(false);
  const [otpNumber, setOtpNumber] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    formData.oldPassword = e.target[0].value;
    formData.newPassword = e.target[1].value;
    formData.confirmPassword = e.target[2].value;

    if (e.target[1].value !== e.target[2].value) {
      setError(true);
      return;
    }
    if (otpNumber !== "") {
      formData.otpNumber = otpNumber;
      formData.oldPassword = "";
    }
    try {
      const response = await API.post("/change-password", formData, {
        withCredentials: true,
      });
      const result = response.data;
      if (result.status === "success") {
        toast(result.message);
        setTimeout(() => {
          navigate("/managment");
        }, 1000);
      } else {
        toast.error("Incorrect Password");
      }
    } catch (error) {
      const errorRes = error.response;
      if (errorRes.status === 401) {
        toast.error("Incorrect Password");
      } else {
        toast.error("Please Try Again");
      }
    }
  };

  const forgotPassword = async () => {
    try {
      const response = await API.post(
        "/managment/password/sentotp",
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setOtpSend(true);
        toast(response?.data?.message);
      }
    } catch (error) {
      const errRes = error?.response;
      if (errRes?.status === 404) {
        toast.error(errRes?.data?.message);
      } else {
        toast.error("Somehing went wrong");
      }
    }
  };

  const removeError = () => {
    setError(false);
  };

  return (
    <>
      <ToastContainer />
      <div
        id="authentication-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="mt-12 overflow-y-auto overflow-x-hidden flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative rounded-lg shadow-lg border-2">
            <div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold">Change Password</h3>
            </div>
            <div className="p-4 md:p-5">
              <form className="space-y-4" onSubmit={handleSubmit}>
                {otpSend === false ? (
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Enter the current password
                    </label>
                    <input
                      type="text"
                      className="border text-sm rounded-lg block w-full p-2.5"
                      required
                    />
                    <div className="flex justify-between mt-2">
                      <a
                        className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                        onClick={forgotPassword}
                      >
                        Forgot Password?
                      </a>
                    </div>
                    <hr className="mt-4" />
                  </div>
                ) : (
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Enter the OTP Send to Email
                    </label>
                    <input
                      type="text"
                      className="border text-sm rounded-lg block w-full p-2.5"
                      required
                      value={otpNumber}
                      onChange={(e) => setOtpNumber(e.target.value)}
                    />
                    <div className="flex justify-between mt-2">
                      <a
                        className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                        onClick={forgotPassword}
                      >
                        Resend OTP
                      </a>
                    </div>
                    <hr className="mt-4" />
                  </div>
                )}

                <div>
                  {error == true ? (
                    <h1 className="text-red-600 text-sm">
                      Password is not matching
                    </h1>
                  ) : (
                    ""
                  )}
                  <label className="block mb-2 text-sm font-medium">
                    New Password
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                    required
                    onChange={removeError}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Confirm New Password
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                    required
                    onChange={removeError}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-color-one focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Change
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
