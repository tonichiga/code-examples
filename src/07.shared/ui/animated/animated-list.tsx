"use client";

import { motion } from "framer-motion";

const AnimatedList = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        opacity: {
          delay: delay,
          duration: 200,
          opacity: 1,
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedList;
