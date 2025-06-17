import React from "react";

const Loader = ({ viewMode }) => {
  return (
    <div
      className={`grid gap-8 ${
        viewMode === "grid"
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1"
      } w-full`}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse flex flex-col space-y-4 p-4 border rounded-xl shadow w-full"
        >
          <div className="bg-gray-300 h-48 rounded-md w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-2/4"></div>
          <div className="h-6 bg-gray-400 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );
};

export default Loader;

