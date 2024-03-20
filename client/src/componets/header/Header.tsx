import { useNavigate } from "react-router-dom";
import AnimatedText from "../AnimatedText/AnimatedText";
import { motion } from "framer-motion";
import { useState } from "react";
import AnimatedTextTwo from "../AnimatedTextTwo/AnimatedTextTwo";

const Header = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [replay, setReplay] = useState(true);
  const placeholderText = [
    { type: "heading1", text: `Welcome to Bright Route.` },
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
          <div className="font-bold text-2xl text-gray-400 mt-40">
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
          <div className="mt-3">
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
      </div>
    </>
  );
};

export default Header;
