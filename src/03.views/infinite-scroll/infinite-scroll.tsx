"use client";

import UI from "./ui/ui";

const InfiniteScroll = () => {
  return (
    <div className="h-full flex flex-col gap-4">
      <h1 className="text-3xl text-gray-800 font-semibold text-center">
        Infinite scroll with pagination based on Intersection Observer API
      </h1>

      <UI />
    </div>
  );
};

export default InfiniteScroll;
