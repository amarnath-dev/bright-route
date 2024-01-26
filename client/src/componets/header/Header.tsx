const Header: React.FC = () => {
  return (
    <>
      <div className="w-screen h-96 bg-slate-300 shadow-2xl">
        <div className="h-96 flex justify-center items-center flex-col">
          <h1 className="font-bold text-4xl ml-5">Welcome, Amarnath!</h1>
          <h3 className="mt-5 font-bold text-xl ml-5">
            Start connecting with mentors and get ready to take your career to
            the next level!
          </h3>
          <div>
            <button className="border-2 mt-5 py-2 px-3 rounded-lg bg-color-one text-white font-medium">
              Browse Mentors
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
