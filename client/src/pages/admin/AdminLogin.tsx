import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../validations/loginSchema";
import { useAppDispatch } from "../../app/hooks";
import { adminLogin } from "../../services/authServices";
import { useNavigate } from "react-router-dom";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Credentials {
  email: string;
  password: string;
}

const AdminLogin: React.FC = () => {
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
      const response = await dispatch(adminLogin(data));
      console.log("response", response.payload);
      if (response.payload) {
        const payload = response.payload;
        if (payload.status == "success") {
          toast(payload.message);
          navigate("/admin/dashboard");
          // navigate("/admin/mentor-application");
        }
        if (payload.status === 400) {
          toast.error(payload.message);
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
      <div className="w-screen h-screen flex justify-center">
        <div className="mt-40 md:mt-36">
          <form
            onSubmit={handleSubmit(submitData)}
            className="border-2 px-4 py-4 rounded-md shadow-lg"
          >
            <h1 className="px-2 py-2 font-bold">Express Administration</h1>
            <label>
              <input
                className="placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 mt-2 md:w-96 sm:text-lg"
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
                className="placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 mt-4 md:w-96 sm:text-lg"
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
            <div className="flex justify-center mt-8 border px-2 py-2 rounded text-white bg-color-one">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
