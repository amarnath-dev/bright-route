import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const ChangePassword = () => {
  const axiosPrivate = useAxiosPrivate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formData, _setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    otpNumber: "",
  });

  const [otpSend, setOtpSend] = useState(false);
  const [otpNumber, setOtpNumber] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);
  const [currentError, setCurrentError] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElements = e.target as HTMLFormElement;
    formData.oldPassword = (formElements[0] as HTMLInputElement).value;
    const isBtn = (formElements[1] as HTMLFormElement).value;
    //Checking because in this position resendOTP btn is coming
    //So the input value will at index 2 instead of index 1.
    if (!isBtn) {
      formData.newPassword = (formElements[2] as HTMLFormElement).value;
      formData.confirmPassword = (formElements[3] as HTMLFormElement).value;
      formData.newPassword = formData.newPassword.replace(/\s/g, "");
      formData.confirmPassword = formData.confirmPassword.replace(/\s/g, "");
      if (formData.newPassword !== formData.confirmPassword) {
        setError(true);
        return;
      }
      if (otpNumber !== "") {
        const newOtp = otpNumber.replace(/\s/g, "");
        if (newOtp.length === 4) {
          formData.otpNumber = newOtp;
          formData.oldPassword = "";
        } else {
          toast.error("Invalid OTP Number");
          return;
        }
      }
    } else {
      //btn is not not there.Value in index 1.
      formData.newPassword = (formElements[1] as HTMLFormElement).value;
      formData.confirmPassword = (formElements[2] as HTMLFormElement).value;
      formData.newPassword = formData.newPassword.replace(/\s/g, "");
      formData.confirmPassword = formData.confirmPassword.replace(/\s/g, "");
      if (formData.newPassword !== formData.confirmPassword) {
        setError(true);
        return;
      }
      if (otpNumber !== "") {
        const newOtp = otpNumber.replace(/\s/g, "");
        if (newOtp.length === 4) {
          formData.otpNumber = newOtp;
          formData.oldPassword = "";
        } else {
          toast.error("Invalid OTP Number");
          return;
        }
      }
    }

    if (formData.oldPassword === formData.newPassword) {
      Swal.fire({
        title: "Choose a different password",
        text: "New password must be different from old password",
      });
      return;
    }
    const passwordValidation = new RegExp(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    );
    if (!passwordValidation.test(formData.confirmPassword)) {
      toast.error("Password must meet the validation criterias");
      return;
    }
    try {
      const response = await axiosPrivate.post("/change-password", formData, {
        withCredentials: true,
      });
      if (response.data.status === "success") {
        toast.success(response.data.message);
        setTimeout(() => {
          if (response.data.role === "mentee") {
            navigate("/managment");
          }
          if (response.data.role === "mentor") {
            navigate("/mentor/profile");
          }
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      const errorRes = (error as { response?: { status: number } }).response;
      if (errorRes?.status === 401) {
        setCurrentError(true);
      } else {
        toast.error("Please Try Again");
      }
    }
  };

  const forgotPassword = async () => {
    try {
      const response = await axiosPrivate.post(
        "/profile/changePassword/sendOTP",
        { withCredentials: true }
      );
      if (response.data.status === "success") {
        setOtpSend(true);
        setMinutes(1);
        setSeconds(30);
        toast(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      const errRes = (error as { response?: { status: number } }).response;
      if (errRes?.status === 404) {
        toast.error("Email not found");
      } else {
        toast.error("Somehing went Wrong");
      }
    }
  };

  const removeError = () => {
    setError(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes]);

  return (
    <>
      <ToastContainer className="w-40 md:w-80" />
      <div className="w-full h-screen bg-background-two">
        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative rounded-lg shadow-lg border">
              <div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-white">
                  Change Password
                </h3>
              </div>
              <div className="p-4 md:p-5">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {otpSend === false ? (
                    <div>
                      <label className="block mb-2 text-sm font-medium text-white">
                        Enter the current password
                      </label>
                      <input
                        type="text"
                        className="border text-sm rounded-lg block w-full p-2.5 bg-gray-800 border-gray-900 text-white"
                        required
                        onChange={() => {
                          setCurrentError(false);
                        }}
                      />
                      <div className="flex justify-between mt-2">
                        <a
                          className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                          onClick={forgotPassword}
                        >
                          Forgot Password?
                        </a>
                        {currentError === true ? (
                          <>
                            <h1 className="text-red-500">
                              Incorrect current password
                            </h1>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      <hr className="mt-4" />
                    </div>
                  ) : (
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-400">
                        Enter the OTP Send to Email
                      </label>
                      <input
                        type="text"
                        className="border text-sm rounded-lg block w-full p-2.5 bg-gray-800 text-white"
                        required
                        value={otpNumber}
                        onChange={(e) => setOtpNumber(e.target.value)}
                      />
                      <div className="countdown-text">
                        {seconds > 0 || minutes > 0 ? (
                          <p className="text-gray-300">
                            Time Remaining:{" "}
                            <span style={{ fontWeight: 600 }}>
                              {minutes < 10 ? `0${minutes}` : minutes}:
                              {seconds < 10 ? `0${seconds}` : seconds}
                            </span>
                          </p>
                        ) : (
                          <p className="text-gray-400">Didn't receive code?</p>
                        )}
                        <button
                          className="text-gray-400"
                          disabled={seconds > 0 || minutes > 0}
                          style={{
                            color:
                              seconds > 0 || minutes > 0
                                ? "#rgb(156 163 175)"
                                : "#rgb(156 163 175)",
                          }}
                          onClick={forgotPassword}
                        >
                          Resend OTP
                        </button>
                      </div>
                      <hr className="mt-4" />
                    </div>
                  )}
                  <div>
                    {error === true ? (
                      <h1 className="text-red-600 text-sm">
                        Password is not matching
                      </h1>
                    ) : (
                      ""
                    )}
                    <label className="block mb-2 text-sm font-medium text-white">
                      New Password
                    </label>
                    <input
                      type="text"
                      className="bg-gray-800 border border-gray-900 text-white rounded-lg block w-full p-2.5"
                      required
                      onChange={removeError}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white">
                      Confirm New Password
                    </label>
                    <input
                      type="text"
                      className="border-gray-900 border bg-gray-800 text-white text-sm rounded-lg block w-full p-2.5"
                      required
                      onChange={removeError}
                    />
                    <div className="py-2">
                      <span className="text-white">Password must have :</span>
                      <div className="">
                        <li className="text-white text-md">
                          Atleast 8 characters long
                        </li>
                        <li className="text-white text-md">
                          One uppercase and Lowercase letter
                        </li>
                        <li className="text-white text-md">
                          One Number and Special Character
                        </li>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-color-five focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Change
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
