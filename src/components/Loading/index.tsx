import React from "react";
import Image from "next/image";

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
      <Image
        src="/assets/loading.gif"
        alt="Loading..."
        width={200}
        height={120}
        className="mx-auto mb-4"
      />
    </div>
  );
};

export default Loading;
