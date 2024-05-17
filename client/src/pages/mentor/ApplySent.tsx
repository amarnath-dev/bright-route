import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppSelector";
import { MultiFromApply } from "../../services/authServices";
import { toast } from "react-toastify";

const ApplySent = () => {
  const { formOne, formTwo, formThree } = useAppSelector(
    (state) => state.mentorApply
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if all forms are completed
    if (formOne && formTwo && formThree) {
      console.log("Form One", formOne);
      console.log("Form Two", formTwo);
      console.log("Form Three", formThree);

      // Construct mentor data object
      const mentorData = {
        profile_img: formOne?.profile_image,
        first_name: formOne?.first_name,
        last_name: formOne?.last_name,
        email: formOne?.email,
        password: formOne?.email,
        job_title: formOne?.job_title,
        company: formOne?.company,
        job_category: formTwo?.job_category,
        skills: formTwo?.skills,
        bio_dec: formTwo?.bio,
        linkedIn_url: formTwo?.linked_in,
        twitter_url: formTwo?.twitter,
        why_mentor: formThree?.why_mentor,
        achievement: formThree?.achievement,
      };

      // Submit data to backend
      (async () => {
        try {
          const response = await dispatch(MultiFromApply(mentorData));
          if (response.meta.requestStatus === "fulfilled") {
            navigate("/signin");
          } else {
            toast.error("Something went wrong!");
          }
        } catch (error) {
          console.log(error);
          toast.error("An error occurred during submission.");
        }
      })();
    }
  }, [formOne, formTwo, formThree, dispatch, navigate]);

  return (
    <>
      <div className="w-full h-screen bg-background-one flex">
        <div className="w-full flex justify-center items-center">
          <figure className="rounded-xl p-8 h-96 ml-5 mr-5 border-2 bg-color-two">
            <div className="md:pt-6 space-y-4">
              <blockquote>
                <p className="text-lg font-bold text-center text-color-five md:text-3xl">
                  Thank you for applying as a Mentor!
                </p>
                <p className="text-sm font-bold text-center mt-4 md:text-2xl">
                  We will review your're application and get back to you as soon
                  as possible.
                  <br />
                  Generally, you should hear from us within 1-2 working days.
                </p>
              </blockquote>
              <div className="flex justify-center">
                <Link
                  to={"/mentor/login"}
                  className="border-2 py-1 px-3 bg-color-one text-white md:py-2 md:px-5 rounded-md md:mt-10"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </>
  );
};

export default ApplySent;
