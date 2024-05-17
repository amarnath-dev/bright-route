export const MenteeProfileCard = () => {
  return (
    <>
      <div>
        <div className="flex justify-center items-center mt-2 px-4">
          <div className="flex-1 text-sm ring-1 ring-[#fff7625c] bg-gray-800 px-2 py-2 md:px-4 md:py-4 rounded-md">
            <span className="flex flex-row">
              <h1 className="font-bold text-color-five">Tips</h1>
              <img
                src="https://www.google.com/images/hpp/gemini-48x48px.png"
                alt=""
                className="ml-1 h-6 w-6"
              />
            </span>
            <ul className="text-white">
              <li className="text-md md:mt-2">
                Adding your photo and social media profiles helps mentors feel
                confident that you’re a real person (e.g. not a bot).
              </li>
              <li className="text-md md:mt-2">
                Your profile is only visible to mentors that you send
                applications to. It is not indexed on search engines like
                Google.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
