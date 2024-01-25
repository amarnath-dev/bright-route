// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { signinSchema } from "../../../validations/signinSchema";

const SigninForm: React.FC = () => {

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<Credential>({
//     resolver: zodResolver(signinSchema),
//   });

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
        <div className="col-span-full flex justify-center mt-36 md:col-span-8">
          <form action="">
            <label>
              <input
                className="placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-lg"
                placeholder="Email"
                type="text"
              />
            </label>
            <label>
              <input
                className="placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md mt-4 py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-lg"
                placeholder="Password"
                type="text"
              />
            </label>
            <button
              type="submit"
              className="border-2 border-slate-300 mt-8 bg-emerald-400 rounded-md font-bold py-2 w-72 md:w-96 sm:text-lg"
            >
              Signin
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SigninForm;
