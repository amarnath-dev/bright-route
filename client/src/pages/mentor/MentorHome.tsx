import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../componets/Navbar";
import { motion } from "framer-motion";
import AnimatedText from "../../componets/AnimatedTextOne/AnimatedText";
import { AnimatedMotionTwo } from "../../componets/AnimatedTextOne/AnimatedMotionTwo";
import Person from "../../assets/images/home-person.png"
import { Link } from "react-router-dom";

const MentorHome: React.FC = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [replay, _setReplay] = useState(true);

  const placeholderText = [{ type: "heading1", text: `Welcome,` }];
  const container = {
    visible: {
      transition: {
        staggerChildren: 0.025,
      },
    },
  };
  const placeholderTextTwo = [
    { type: "heading2", text: `Share your knowledge` },
  ];

  return (
    <>
      <div className="w-full h-screen bg-background-two">
        <NavBar />
        <div className="w-full md:w-full h-10 bg-background-two text-white flex items-center justify-around"></div>
        <div className="w-full h-80 bg-background-two flex justify-start flex-row relative">
          <div className="ml-3 px-4">
            <motion.div
              className="App"
              initial="hidden"
              animate={replay ? "visible" : "hidden"}
              variants={container}
            >
              <div className="container font-semibold text-color-five text-wrap">
                {placeholderText.map((item, index) => {
                  return <AnimatedText {...item} key={index} />;
                })}
              </div>
              <div className="text-3xl py-3 text-white">
                {placeholderTextTwo.map((item, index) => {
                  return (
                    <AnimatedMotionTwo
                      {...item}
                      key={index as unknown as string}
                    />
                  );
                })}
              </div>
            </motion.div>
            <div className="mt-4">
              <button
                type="button"
                className="text-white bg-gradient-to-r bg-color-five w-40 md:w-52 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={() => {
                  navigate("/mentor/profile");
                }}
              >
                Profile
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex bg-background-two">
          <div className="flex-1 relative">
            <img src={Person} alt="person_img" className="absolute" />
          </div>
          <div className="flex-1">
            <div className="w-full flex justify-center flex-col py-12">
              <h1 className="text-4xl font-bold text-white">
                Share your expertise
              </h1>
              <h1 className="text-4xl font-bold text-white">
                make a difference
              </h1>
            </div>
            <p className="font-medium text-xl text-white">
              Mentoring is a two-way street. Let us take care of the boring
              parts so you can concentrate on personal and professional growth
              for both you and your mentees.
            </p>
            <div className="py-10">
              <Link
                to={"/mentor/plans"}
                className="bg-color-five px-10 py-2 rounded-md text-white font-semibold"
              >
                Create Plan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorHome;
