const NavBar: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-12 w-screen items-center">
        <div className="col-span-4 bg-color-one h-14 flex items-center">
          {/* <h1 className="ml-12 font-mono text-2xl text-white">Bright Route</h1> */}
        </div>
        <div className="col-span-8 bg-color-one h-14">
          <div className="flex justify-evenly items-center text-white">
            <span>Link1</span>
            <span>Link1</span>
            <span>Link1</span>
            <img
              src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1412"
              alt="profile_img"
              className="h-10 w-10 rounded-full mt-2 border-2 border-white"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
