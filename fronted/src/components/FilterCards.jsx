import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import React from "react";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Pakistan",
      "India",
      "Afghanistan",
      "United Kingdom",
      "United States",
    ],
  },
  {
    filterType: "Industry",
    array: ["Frontend Dev", "Backend Dev", "FullStack Dev"],
  },
  {
    filterType: "Salary",
    array: ["0-40K", "42K-1Lac", "1Lac-5Lac"],
  },
];

const FilterCards = () => {
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg ">Filter Jobs</h1>
      <hr className="mt-3" />
      {filterData.map((data, index) => (
        <div key={index} className="mb-4">
          <h2 className="font-semibold text-lg mb-2">{data.filterType}</h2>
          <RadioGroup>
            {data.array.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 mt-2 ">
                <RadioGroupItem
                  value={item}
                  id={`${data.filterType}-${item}`}
                />
                <Label htmlFor={`${data.filterType}-${item}`}>{item}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCards;
