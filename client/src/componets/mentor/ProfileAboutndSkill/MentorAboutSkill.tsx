export const MentorAboutSkill = ({ mentor }) => {
  return (
    <div className="md:h-full py-5 md:px-8 md:py-8 rounded-md">
      <div className="px-2 md:px-0">
        <label htmlFor="message" className="block mb-2 text-sm font-medium">
          ABOUT ME
        </label>
        <textarea
          id="bio"
          rows={12}
          disabled
          defaultValue={mentor?.bio}
          className="block p-2.5 w-full text-lg rounded-lg focus:border-gray text-black bg-white"
        ></textarea>
      </div>

      <div className="mt-5 rounded-md px-2 py-2 border-2">
        <h1 className="block mb-2 text-lg font-medium">Skills</h1>
        <div className="mt-3 h-full flex-wrap">
          {mentor?.skills.map((skill, index) => {
            return (
              <span
                key={index}
                className="rounded-full bg-blue-200 px-6 py-1 ml-2"
              >
                {skill}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
