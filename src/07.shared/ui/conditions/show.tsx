import { motion } from "framer-motion";
import { Children } from "react";

interface IShowProps {
  children: React.ReactNode;
  className?: string;
}

const Show = ({ children, className }: IShowProps) => {
  let whenComponent = null;
  let elseComponents = null;

  Children.forEach(children, (child: any) => {
    if (child.props.isTrue === undefined) {
      elseComponents = child;
    } else if (!whenComponent && child.props.isTrue) {
      whenComponent = child;
    }
  });
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0.3,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        opacity: {
          duration: 500,
          opacity: 1,
        },
      }}
      key={(!!whenComponent).toString()}
    >
      {whenComponent || elseComponents}
    </motion.div>
  );
};

Show.When = ({ isTrue, children }) => isTrue && children;
Show.Else = ({ children }) => children;

export default Show;
