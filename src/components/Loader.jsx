import { Html } from "@react-three/drei";
import { ThreeDot } from "react-loading-indicators";

const Loader = () => {
  return (
    <Html>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <ThreeDot
          variant="bob"
          color="#ffe7b9"
          size="medium"
          text=""
          textColor=""
        />
      </div>
    </Html>
  );
};

export default Loader;
