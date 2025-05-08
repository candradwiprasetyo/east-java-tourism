import PageDivider from "@/components/Divider";
import "./style.css";

export default function Sea() {
  return (
    <>
      <div className="overflow-hidden w-full h-[460px] relative bg-gradient-to-b from-blue-100 to-blue-300 flex text-white items-center justify-center">
        <PageDivider background="transparent" customClass="absolute top-0" />
        <div className="text-center">
          <div className="font-satisfy text-5xl font-bold mb-4 text-title-primary">
            Whispers of Nature
          </div>
          <div className="text-xl">
            Let the sounds of waves, wind, and silence guide you to inner peace.
          </div>
        </div>

        <PageDivider
          direction="up"
          background="transparent"
          customClass="absolute bottom-0"
        />

        <div className="absolute w-full h-40 bottom-20">
          <div className="bubbleContainer">
            <span className="bubbleY1">
              <span className="bubbleX1"></span>
            </span>
            <span className="bubbleY2">
              <span className="bubbleX2"></span>
            </span>
            <span className="bubbleY3">
              <span className="bubbleX3"></span>
            </span>
            <span className="bubbleY4">
              <span className="bubbleX4"></span>
            </span>
            <span className="bubbleY5">
              <span className="bubbleX5"></span>
            </span>
            <span className="bubbleY6">
              <span className="bubbleX6"></span>
            </span>
            <span className="bubbleY7">
              <span className="bubbleX7"></span>
            </span>
            <span className="bubbleY8">
              <span className="bubbleX8"></span>
            </span>
            <span className="bubbleY9">
              <span className="bubbleX9"></span>
            </span>
            <span className="bubbleY10">
              <span className="bubbleX10"></span>
            </span>
          </div>
        </div>

        <div className="absolute w-96 h-40 bottom-20 -right-20">
          <div className="bubbleContainer">
            <span className="bubbleY1">
              <span className="bubbleX1"></span>
            </span>
            <span className="bubbleY2">
              <span className="bubbleX2"></span>
            </span>
            <span className="bubbleY3">
              <span className="bubbleX3"></span>
            </span>
            <span className="bubbleY4">
              <span className="bubbleX4"></span>
            </span>
            <span className="bubbleY5">
              <span className="bubbleX5"></span>
            </span>
            <span className="bubbleY6">
              <span className="bubbleX6"></span>
            </span>
            <span className="bubbleY7">
              <span className="bubbleX7"></span>
            </span>
            <span className="bubbleY8">
              <span className="bubbleX8"></span>
            </span>
            <span className="bubbleY9">
              <span className="bubbleX9"></span>
            </span>
            <span className="bubbleY10">
              <span className="bubbleX10"></span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
