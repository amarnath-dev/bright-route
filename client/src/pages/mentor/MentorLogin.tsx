import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../validations/loginSchema";
import { useAppDispatch } from "../../app/hooks";
import { MentorLogin } from "../../services/authServices";
import { authActions } from "../../redux/auth/authSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SigninCredential } from "../../datatypes/Datatypes";

const MentorLoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninCredential>({
    resolver: zodResolver(loginSchema),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitData = async (data: SigninCredential) => {
    try {
      const response = await dispatch(MentorLogin(data));
      if (response) {
        const payloadData = response.payload;
        dispatch(authActions.setUser(payloadData));
        if (payloadData.role === "mentor") {
          navigate("/mentor/home");
        } else {
          toast.error(payloadData.message);
        }
      }
    } catch (error) {
      if (typeof error == "string") {
        console.log(error);
      }
    }
  };

  return (
    <>
      <ToastContainer className="w-40 md:w-80" />
      <div className="grid grid-cols-12 w-screen h-screen">
        <div className="hidden md:col-span-4 md:flex justify-center items-center">
          <img
            src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo="
            alt="signin_img"
            className="ml-28"
          />
        </div>

        <div className="col-span-full flex justify-center mt-20 md:mt-28 md:col-span-8">
          <form onSubmit={handleSubmit(submitData)}>
            <div className="flex">
              <h1 className="text-md px-4 py-1 md:py-0 md:px-0 md:text-2xl font-bold mb-5">
                Log in as mentor
              </h1>
              <Link
                to={"/signin"}
                className="text-md px-5 py-1 md:px-0 md:py-0 md:text-xl h-8 font-bold text-color-five md:ml-12 underline"
              >
                I am a mentee
              </Link>
            </div>
            <label className="flex justify-center">
              <input
                className="placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-lg"
                placeholder="Email"
                type="email"
                {...register("email")}
              />
            </label>
            <div className="flex flex-col">
              {errors.email && (
                <small className="text-red-600 text-sm italic">
                  *{errors.email.message}
                </small>
              )}
            </div>
            <label className="flex justify-center flex-row">
              <input
                className="placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md mt-4 py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-lg"
                placeholder="Password"
                type="text"
                {...register("password")}
              />
            </label>
            <div className="flex flex-col">
              {errors.password && (
                <small className="text-red-600 text-sm italic">
                  *{errors.password.message}
                </small>
              )}
            </div>
            <br />
            <div className="flex justify-center">
              <button
                type="submit"
                className="border-1 border-slate-300 mt-2 bg-color-five text-white rounded-md font-bold py-2 w-72 md:w-96 sm:text-lg"
              >
                Signin
              </button>
            </div>
            <div className="flex justify-center">
              <h1 className="mt-3">
                Don’t have an account?
                <Link to={"/signup"} className="ml-2 text-color-five font-bold">
                  Signup
                </Link>
              </h1>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MentorLoginForm;
