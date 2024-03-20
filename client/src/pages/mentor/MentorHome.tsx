import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../componets/navbar/Navbar";
import { motion } from "framer-motion";
import AnimatedText from "../../componets/AnimatedText/AnimatedText";
import { AnimatedMotionTwo } from "../../componets/AnimatedText/AnimatedMotionTwo";

const MentorHome: React.FC = () => {
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [replay, setReplay] = useState(true);

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
        <div className="w-full md:w-full h-16 bg-background-two text-white flex items-center justify-around"></div>
        <div className="w-full h-80 bg-background-two flex justify-start">
          <div className="ml-3 md:ml-10">
            <motion.div
              className="App"
              initial="hidden"
              animate={replay ? "visible" : "hidden"}
              variants={container}
            >
              <div className="container font-semibold text-color-five">
                {placeholderText.map((item, index) => {
                  return <AnimatedText {...item} key={index} />;
                })}
              </div>
              <div className="text-3xl py-3 text-gray-400">
                {placeholderTextTwo.map((item, index) => {
                  return <AnimatedMotionTwo {...item} key={index} />;
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
      </div>
    </>
  );
};

export default MentorHome;

//chagisgsdag
///sdhfgljksdhgjsda
//sdfhsdkafh

//sdfhs;pdfha
