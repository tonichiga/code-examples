import { classes } from "@/07.shared/lib";
import { ReactNode } from "react";

interface IContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: IContainerProps) => {
  return (
    <div
      className={classes(
        "w-full px-5 laptop:max-w-[80rem] laptop:mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
