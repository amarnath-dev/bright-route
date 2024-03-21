import { motion, Variants } from "framer-motion";
import React from "react";

// Define props interface for Wrapper component
interface WrapperProps {
  children: React.ReactNode;
}

// Define tagMap type
type TagMap = {
  [key: string]: keyof JSX.IntrinsicElements;
};

// Define props interface for AnimatedText component
interface AnimatedTextProps {
  text: string;
  type: keyof TagMap;
}

const Wrapper: React.FC<WrapperProps> = (props) => {
  return <span className="word-wrapper">{props.children}</span>;
};

const tagMap: TagMap = {
  paragraph: "p",
  heading1: "h1",
  heading2: "h2",
};

const AnimatedText: React.FC<AnimatedTextProps> = (props) => {
  const item: Variants = {
    hidden: {
      y: "200%",
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
    },
    visible: {
      y: 0,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
    },
  };

  const splitWords: string[] = props.text.split(" ");

  const words: string[][] = [];

  for (const [, item] of splitWords.entries()) {
    words.push(item.split(""));
  }

  words.forEach((word) => {
    return word.push("\u00A0");
  });

  const Tag = tagMap[props.type];

  return (
    <Tag>
      {words.map((word, index) => {
        return (
          <Wrapper key={index}>
            {words[index].flat().map((element, index) => {
              return (
                <span
                  style={{
                    overflow: "hidden",
                    display: "inline-block",
                    fontSize: "55px",
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

export default AnimatedText;
