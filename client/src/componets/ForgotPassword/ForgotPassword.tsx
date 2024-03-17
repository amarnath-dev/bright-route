import { useState } from "react";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface FormData {
  password: string;
  re_entered_pass: string;
}

const ForgotPassword = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  const [otpVerified, setOtpVerified] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    password: "",
    re_entered_pass: "",
  });
  const [passwordError, setPasswordError] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const emailId = e.target[0]?.value;
      setUserEmail(emailId);
      const response = await axiosPrivate.post(
        "/password/checkEmail",
        { emailId },
        { withCredentials: true }
      );
      if (response.data.status === "failed") {
        setIsError(true);
        return;
      }
      setEmailExists(true);
    //   toast.success(response.data.message); //This was the error
    } catch (error) {
      console.log(error);
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const OTPNum = e.target[0]?.value;
      const response = await axiosPrivate.post(
        "/password/OTPVerify",
        { userEmail, OTPNum },
        { withCredentials: true }
      );
      if (response.data?.status === "success") {
        setOtpVerified(true);
      } else {
        setOtpError(true);
      }
    } catch (error) {
      console.log(error);
      toast.error("Resend OTP and Try Again");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setOtpError(false);
    setPasswordError(false);
  };

  const handlePasswordSubmit = async () => {
    if (
      formData.password &&
      formData.password !== formData.re_entered_pass &&
      formData.re_entered_pass
    ) {
      setPasswordError(true);
      return;
    }
    try {
      const response = await axiosPrivate.post(
        "/password/new-password",
        { userEmail, formData },
        { withCredentials: true }
      );
      if (response.data.status === "success") {
        // toast.success(response.data?.message);
        navigate("/signin");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const errorChange = () => {
    setOtpError(false);
    setPasswordError(false);
    setIsError(false);
  };
  const resendOTP = async () => {
    try {
      const response = await axiosPrivate.post(
        "/password/checkEmail",
        { emailId: userEmail },
        { withCredentials: true }
      );
      if (response.data.status === "success") {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-background-two">
        {otpVerified === false ? (
          <>
            <div className="border border-gray-400 px-4 py-4 rounded-md">
              <form
                onSubmit={emailExists ? handleOTPSubmit : handleEmailSubmit}
              >
                {emailExists ? (
                  <>
                    <div className="flex flex-col">
                      <h1 className="text-md px-4 py-1 md:py-0 md:px-0 mb-2 text-gray-300">
                        Enter the OTP send to your Email:
                      </h1>
                      {otpError ? (
                        <>
                          <h1 className="text-red-600 py-2">
                            Invalid OTP Please Try Again
                          </h1>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    <label className="flex justify-center">
                      <input
                        className="placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-lg"
                        type="text"
                        required
                        onChange={errorChange}
                      />
                    </label>
                    <div>
                      <span
                        className="text-blue-500 underline cursor-pointer mt-1"
                        onClick={resendOTP}
                      >
                        Re send OTP
                      </span>
                    </div>
                    <br />
                  </>
                ) : (
                  <div>
                    <div className="flex flex-col">
                      <h1 className="text-md px-4 py-1 md:py-0 md:px-0 mb-2 text-gray-300">
                        Please provide your email address:
                      </h1>
                      {isError ? (
                        <>
                          <h1 className="text-red-600 py-2">Email not found</h1>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    <label className="flex justify-center">
                      <input
                        className="placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-lg"
                        placeholder="Email"
                        type="email"
                        onChange={errorChange}
                        required
                      />
                    </label>
                    <br />
                  </div>
                )}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="border-1 border-slate-300 bg-color-five text-white rounded-md font-bold py-2 w-72 md:w-96 sm:text-lg"
                  >
                    {emailExists ? "Verify" : "Get OTP"}
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <>
            <div className="border border-gray-400 px-4 py-4 rounded-md">
              <div className="flex flex-col">
                <h1 className="text-md px-4 py-1 md:py-0 md:px-0 mb-2 text-gray-300">
                  Enter New Password
                </h1>
              </div>
              <div>
                <label className="flex justify-center flex-col">
                  {passwordError ? (
                    <>
                      <h1 className="text-red-500">Password not matching</h1>
                    </>
                  ) : (
                    ""
                  )}
                  <input
                    className="placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-1 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-lg"
                    type="text"
                    name="password"
                    value={formData?.password}
                    onChange={handleChange}
                    required
                  />
                </label>
                <h1 className="text-gray-300 py-1">Re-enter the Password</h1>
                <label className="flex justify-center flex-col">
                  <input
                    className="placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-1 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-lg"
                    type="text"
                    name="re_entered_pass"
                    value={formData?.re_entered_pass}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="flex justify-center mt-3">
                <button
                  type="submit"
                  className="border-1 border-slate-300 bg-color-five text-white rounded-md font-bold py-2 w-72 md:w-96 sm:text-lg mt-2"
                  onClick={handlePasswordSubmit}
                >
                  Change
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
