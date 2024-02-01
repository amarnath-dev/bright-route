const ApplySuccess = () => {
  return (
    <>
      <figure className="rounded-xl p-8 mt-12 md:mt-20 h-96 ml-5 mr-5 border-2 bg-color-two">
        <div className="md:pt-6 space-y-4">
          <blockquote>
            <p className="text-lg font-bold text-center text-color-five md:text-2xl">
              Thank you for applying as a Mentor!
            </p>
            <p className="text-sm font-bold text-center mt-4 md:text-2xl">
              We will review your're application and get back to you as soon as
              possible.
              <br />
              Generally, you should hear from us within 1-2 working days.
            </p>
          </blockquote>
          <div className="text-center">
            <h1 className="text-color-five font-bold md:text-xl md:mt-10">
              You will receive an email to the registered email with next steps.
            </h1>
          </div>
          <div className="flex justify-center">
            <button className="border-2 py-1 px-3 bg-color-one text-white md:py-2 md:px-5 rounded-md md:mt-10">
              Back to Home
            </button>
          </div>
        </div>
      </figure>
    </>
  );
};

export default ApplySuccess;
