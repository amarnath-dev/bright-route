import { motion, Variants } from "framer-motion";
import React from "react";

// Define the type for children prop in Wrapper component
interface WrapperProps {
  children: React.ReactNode;
}

// Define the type for tagMap object
interface TagMap {
  [key: string]: keyof JSX.IntrinsicElements;
}

// Define the props interface for AnimatedMotionTwo component
interface AnimatedMotionTwoProps {
  text: string;
  type: keyof TagMap;
  key: string | undefined;
}

// Define the variants type for animation
type AnimationVariants = Variants;

// Define the Wrapper component with its props type
const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <span className="word-wrapper">{children}</span>;
};

// Define the tagMap object with its type
const tagMap: TagMap = {
  paragraph: "p",
  heading1: "h1",
  heading2: "h2",
};

// Define the AnimatedMotionTwo component with its props type
export const AnimatedMotionTwo: React.FC<AnimatedMotionTwoProps> = (props) => {
  console.log("Hello Two", props);

  // Define the animation variants
  const item: AnimationVariants = {
    hidden: {
      y: "200%",
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
    },
    visible: {
      y: 0,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
    },
  };

  // Split the text into words
  const splitWords: string[] = props.text.split(" ");

  // Create an array to hold words
  const words: string[][] = [];

  // Split each word into characters and add non-breaking space at the end
  for (const [, item] of splitWords.entries()) {
    words.push(item.split(""));
  }

  words.forEach((word) => {
    return word.push("\u00A0");
  });

  // Get the tag corresponding to the given type
  const Tag = tagMap[props.type];

  return (
    <Tag>
      {words.map((_word, index: number) => {
        return (
          <Wrapper key={index}>
            {words[index].flat().map((element, index: number) => {
              return (
                <span
                  style={{
                    overflow: "hidden",
                    display: "inline-block",
                    fontSize: "45px",
                    height: "65px",
                  }}
                  key={index}
                >
                  <motion.span
                    style={{ display: "inline-block" }}
                    variants={item}
                  >
                    {element}
                  </motion.span>
                </span>
              );
            })}
          </Wrapper>
        );
      })}
    </Tag>
  );
};
