import { motion } from "framer-motion";

const Motion = ({ children, styles, duration }) => {
  return (
    <motion.div
      className={styles}
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: duration ? duration : 1,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default Motion;
