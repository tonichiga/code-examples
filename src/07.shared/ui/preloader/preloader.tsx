import { PulseLoader } from "react-spinners";
import { classes } from "@/07.shared/lib";

interface PreloaderProps {
  loading: boolean;
  className?: string;
  children: React.ReactNode;
}

const Preloader = ({ children, loading, className }: PreloaderProps) => {
  return (
    <div
      className={classes(
        "w-full h-full relative flex items-center justify-center",
        className
      )}
    >
      <div
        className={classes(
          !loading && "invisible",
          "flex-1 w-full h-full absolute flex items-center justify-center"
        )}
      >
        <PulseLoader color="white" speedMultiplier={0.5} />
      </div>

      <div className={classes(loading && "invisible")}>{children}</div>
    </div>
  );
};

export default Preloader;
