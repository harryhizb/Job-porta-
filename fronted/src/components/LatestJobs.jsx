import React from "react";
import LatestJobsCards from "./LatestJobsCards";

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];
const LatestJobs = () => {
  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <h1 className="text-4xl font-bold text-center">
        <span className="text-[#6A38c2]">Latest & Top </span>Jobs Openings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 my-10 p-4">
        {randomJobs.slice(0, 6).map((item, index) => (
          <LatestJobsCards key={index} />
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
