"use client";

import { motion } from "framer-motion";

const AnimatedHead = ({ children, className = "" }) => {
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
          duration: 0.2,
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedHead;
