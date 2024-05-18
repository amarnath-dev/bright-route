import { useState } from "react";
import HeaderCard from "./HeaderCardOne";
import { useDispatch } from "react-redux";
import { submitFormOne, FormOne } from "../../../redux/slices/mentorApplySlice";
import { useNavigate } from "react-router-dom";
import { MultiFormOne } from "../../../validations/aboutFormValidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

function AboutYou() {
  const [fileUrl, setFileUrl] = useState<File | undefined>();
  const [image, setImage] = useState<string | undefined>();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // setFileUrl(URL.createObjectURL(selectedFile));
      setImage(URL.createObjectURL(selectedFile));
      setFileUrl(selectedFile);
    } else {
      setFileUrl(undefined);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormOne>({
    resolver: zodResolver(MultiFormOne),
  });

  const submitData = (data: FormOne) => {
    if (fileUrl) {
      data.profile_image = fileUrl;
      const result = dispatch(submitFormOne(data));
      if (result.payload) {
        console.log(result.payload);
        navigate("/mentor/apply/2");
      }
    } else {
      toast.error("Please select a profile Image");
      return;
    }
  };

  return (
    <div className="w-full h-screen bg-background-one">
      <HeaderCard />
      <div className="w-screen flex justify-center items-center md:mt-6">
        <div className="flex justify-start items-center md:w-3/5">
          <form className="md:w-full">
            <span className="font-bold ml-16 md:ml-2 text-white">
              Choose a Profile Image
            </span>
            <div className="flex justify-center mt-3 md:w-full md:justify-start">
              <span className="h-20 w-20 rounded-full overflow-hidden bg-gray-800">
                <img src={image} alt="" />
              </span>
              <label>
                <input
                  type="file"
                  accept="image/*"
                  className="placeholder:text-slate-400 ml-3 block bg-gray-800 mt-5 border border-gray-900 rounded-md py-2 pl-5 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-32 sm:text-sm"
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="w-screen flex flex-col justify-start items-center md:w-full md:flex-row text-white">
              <label>
                <input
                  className="placeholder:text-gray-400 block bg-gray-800 mt-2 border border-gray-900 rounded-md py-2 pl-9 pr-3 focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-sm"
                  placeholder="First name"
                  type="text"
                  {...register("first_name")}
                />
                {errors.first_name && (
                  <small className="text-red-500 text-sm italic">
                    *{errors.first_name.message}
                  </small>
                )}
              </label>
              <label>
                <input
                  className="md:ml-2 placeholder:text-gray-400 block bg-gray-800 mt-2 border border-gray-900 rounded-md py-2 pl-9 pr-3 focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-sm"
                  placeholder="Last name"
                  type="text"
                  {...register("last_name")}
                />
                {errors.last_name && (
                  <small className="text-red-500 text-sm italic">
                    *{errors.last_name.message}
                  </small>
                )}
              </label>
            </div>

            <div className="w-screen flex flex-col justify-start items-center md:w-full md:flex-row">
              <label>
                <input
                  className="placeholder:text-slate-400 text-white block bg-gray-800 mt-2 border border-gray-900 rounded-md py-2 pl-9 pr-3 focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-sm"
                  placeholder="Email"
                  type="text"
                  {...register("email")}
                />
                {errors.email && (
                  <small className="text-red-500 text-sm italic">
                    *{errors.email.message}
                  </small>
                )}
              </label>
              <label>
                <input
                  className="md:ml-2 placeholder:text-slate-400 block bg-gray-800 mt-2 border border-gray-900 text-white rounded-md py-2 pl-9 pr-3 focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-sm"
                  placeholder="Choose a Password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <small className="text-red-500 text-sm italic">
                    *{errors.password.message}
                  </small>
                )}
              </label>
            </div>
            <div className="w-screen flex flex-col justify-start items-center md:w-full md:flex-row">
              <label>
                <input
                  className="placeholder:text-slate-400 block bg-gray-800 mt-2 border border-gray-900 text-white rounded-md py-2 pl-9 pr-3 focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-sm"
                  placeholder="Job title"
                  type="text"
                  {...register("job_title")}
                />
                {errors.job_title && (
                  <small className="text-red-500 text-sm italic">
                    *{errors.job_title.message}
                  </small>
                )}
              </label>
              <label>
                <input
                  className="md:ml-2 placeholder:text-slate-400 block bg-gray-800 mt-2 border border-gray-900 text-white rounded-md py-2 pl-9 pr-3 focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-sm"
                  placeholder="Company"
                  type="text"
                  {...register("company")}
                />
                {errors.company && (
                  <small className="text-red-500 text-sm italic">
                    *{errors.company.message}
                  </small>
                )}
              </label>
            </div>
            <div className="w-full text-white">
              <p>
                <strong>Password</strong> should have{" "}
                <strong>one uppercase</strong> and letter and{" "}
                <strong>one special character </strong>
                and
                <strong> one number</strong>
              </p>
            </div>
            <div className="w-full flex justify-center mt-5">
              <button
                type="button"
                className="bg-color-one text-white px-1 py-1 rounded-md my-5 w-20 md:w-20 md:my-0 md:mr-0"
                onClick={handleSubmit(submitData)}
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AboutYou;
