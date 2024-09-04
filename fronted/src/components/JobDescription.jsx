import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Navbar from "./shared/Navbar";

const JobDescription = () => {
  const isApplied = true;
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl">Fronted developer</h1>
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

          <Button
            disabled={isApplied}
            className={`rounded-lg ${
              isApplied
                ? "bg-gray-800 cursor-not-allowed"
                : "bg-[#7209b7] hover:bg-[#4c288c]"
            }`}
          >
            {isApplied ? "Already Applied " : " Apply Now"}
          </Button>
        </div>
        <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
          Job Description
        </h1>
        <div className="my-4">
          <h1 className="font-bold my-1">
            Role:{" "}
            <span className="pl-4 font-normal text-gray-800">
              Fronted Developer
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Location:{" "}
            <span className="pl-4 font-normal text-gray-800">Pakistan</span>
          </h1>
          <h1 className="font-bold my-1">
            Description:{" "}
            <span className="pl-4 font-normal text-gray-800">
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Experence:{" "}
            <span className="pl-4 font-normal text-gray-800">2 years</span>
          </h1>
          <h1 className="font-bold my-1">
            Salary:{" "}
            <span className="pl-4 font-normal text-gray-800">12 LPA</span>
          </h1>
          <h1 className="font-bold my-1">
            Total Application:{" "}
            <span className="pl-4 font-normal text-gray-800">4</span>
          </h1>
          <h1 className="font-bold my-1">
            Posted Date:{" "}
            <span className="pl-4 font-normal text-gray-800">01-08-2024</span>
          </h1>
        </div>
      </div>
    </>
  );
};

export default JobDescription;
