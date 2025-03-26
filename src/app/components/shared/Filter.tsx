"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "./buttons/Button";
import { FilterIcon } from "../../../../public/icons/iconsExport";

interface FilterProps {
  setValue?: (val: any) => void;
  filterOptions?: {
    label: string;
    value: string;
  }[];
}

const Filter = ({ setValue, filterOptions }: FilterProps) => {
  const [filterPopup, setFilterPopup] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  // const filter = [
  //   { label: "All", value: "" },
  //   { label: "New", value: "New" },
  //   { label: "Processing", value: "Processing" },
  //   { label: "Confirmed", value: "Confirmed" },
  //   { label: "Cancelled", value: "Cancelled" },
  //   { label: "LinkedIn", value: "linkedin" },
  //   { label: "Meta", value: "meta" },
  // ];

  const handleClickOutside = (event: MouseEvent) => {
    if (
      filterRef.current &&
      !filterRef.current.contains(event.target as Node)
    ) {
      setFilterPopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={filterRef} className="relative">
      <Button
        onClick={() => setFilterPopup(true)}
        className="text-cwPrimaryGreen md:w-[104px]"
        variant="outline"
      >
        <p className="hidden md:block">Filter</p>
        <FilterIcon className="text-lg" />
      </Button>
      {filterPopup && (
        <div className="absolute top-full right-0 mt-1 w-40 rounded-md overflow-hidden border bg-white  z-10">
          {filterOptions &&
            filterOptions?.map((item: any, i: number) => (
              <div
                key={i}
                className={`py-3 px-4 text-swFliterTextGray cursor-pointer hover:bg-gray-100 font-medium ${
                  i > 0 && "border-t"
                }`}
                onClick={() => {
                  setValue && setValue(item?.value);
                  setFilterPopup(false);
                }}
              >
                {item?.label}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
