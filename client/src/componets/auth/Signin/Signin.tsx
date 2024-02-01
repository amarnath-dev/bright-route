import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../../validations/loginSchema";
import { useAppDispatch } from "../../../app/hooks";
import { signin } from "../../../services/authServices";
import { authActions } from "../../../redux/auth/authSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "../GoogleAuth/GoogleAuth";

interface Credentials {
  email: string;
  password: string;
}

const SigninForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>({
    resolver: zodResolver(loginSchema),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitData = async (data: Credentials) => {
    try {
      const response = await dispatch(signin(data));
      if (response) {
        const payloadData = response.payload;
        dispatch(authActions.setUser(payloadData));
        if (payloadData.role === "mentee") {
          navigate("/");
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
      <div className="grid grid-cols-12 w-screen h-screen">
        <div className="hidden md:col-span-4 md:flex justify-center items-center">
          <img
            src="https://st.depositphotos.com/18722762/51522/v/450/depositphotos_515228796-stock-illustration-online-registration-sign-login-account.jpg"
            alt="signin_img"
            className="ml-28"
          />
        </div>

        <div className="col-span-full flex justify-center mt-28 md:col-span-8">
          <form action="" onSubmit={handleSubmit(submitData)}>
            <h1 className="text-xl md:text-2xl font-bold mb-5">Log in</h1>
            <label>
              <input
                className="placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-lg"
                placeholder="Email"
                type="email"
                {...register("email")}
              />
              {errors.email && (
                <small className="text-red-600 text-sm italic">
                  *{errors.email.message}
                </small>
              )}
            </label>
            <label>
              <input
                className="placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md mt-4 py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-lg"
                placeholder="Password"
                type="text"
                {...register("password")}
              />
              {errors.password && (
                <small className="text-red-600 text-sm italic">
                  *{errors.password.message}
                </small>
              )}
            </label>
            <br />
            <button
              type="submit"
              className="border-1 border-slate-300 mt-4 bg-color-five text-white rounded-md font-bold py-2 w-72 md:w-96 sm:text-lg"
            >
              Signin
            </button>
            <div className="mt-5 flex justify-center items-center">
              <GoogleAuth />
            </div>

            <div>
              <h1 className="mt-4">
                Don’t have an account?
                <Link to={"/signup"} className="ml-2 text-color-five font-bold">
                  Signup
                </Link>{" "}
              </h1>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SigninForm;