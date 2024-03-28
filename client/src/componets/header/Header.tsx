import { useNavigate } from "react-router-dom";
import AnimatedText from "../AnimatedText/AnimatedText";
import { motion } from "framer-motion";
import { useState } from "react";
import AnimatedTextTwo from "../AnimatedTextTwo/AnimatedTextTwo";
import Lady from "../../assets/header_lady.png";

const Header = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [replay, _setReplay] = useState(true);
  const placeholderText = [
    { type: "heading1", text: `Welcome to Bright Route` },
  ];
  const container = {
    visible: {
      transition: {
        staggerChildren: 0.025,
      },
    },
  };

  return (
    <>
      <div className="w-full h-screen bg-background-two">
        <div className="flex justify-center items-center flex-col">
          <div className="font-bold text-2xl text-white mt-28 md:mt-40 px-2">
            <motion.div
              className="App"
              initial="hidden"
              animate={replay ? "visible" : "hidden"}
              variants={container}
            >
              <div className="container">
                {placeholderText.map((item, index) => {
                  return <AnimatedText {...item} key={index} />;
                })}
              </div>
            </motion.div>
          </div>
        </div>
        <div className="text-white text-center">
          <AnimatedTextTwo />
          <div className="py-5 md:py-0">
            <button
              className="text-md text-white hover:bg-background-two bg-gray-800 py-2 px-3 mt-5 rounded-md font-medium"
              onClick={() => {
                navigate("/mentor/browse");
              }}
            >
              Browse Mentors
            </button>
          </div>
        </div>
        <div className="relative mt-10 md:mt-0">
          <img src={Lady} alt="lady_img" className="absolute md:w-1/2" />
        </div>
      </div>
    </>
  );
};

export default Header;
