import { twMerge } from "tailwind-merge";

const classes = (...args: any[]) => {
  // return args.join(" ");
  return twMerge(...args);
};

export default classes;
