import React from "react";
import { Badge } from "./ui/badge";

const LatestJobsCards = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-md shadow-xl p-6 cursor-pointer">
      <div>
        <h1 className="font-bold text-xl">Company Name</h1>
        <p className="text-sm text-gray-500">Pakistan</p>
      </div>
      <div className="font-bold text-2xl my-3">Job Title</div>
      <p className="text-base text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipisicing Lorem ipsum dolor sit
        amet consectetur adipisicing.
      </p>
      <div className="flex items-center gap-3 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          12 positions
        </Badge>
        <Badge className="text-[#f83002] font-bold" variant="ghost">
          Part Time
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          24 LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobsCards;
