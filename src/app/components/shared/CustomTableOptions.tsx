import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import React, { useState, useRef, useEffect } from "react";

interface DropdownProps {
  options: string[];
  value: string;
  onChange: (option: string) => void;
}

const CustomTableOptions = ({ options, value, onChange }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    value ? options.find((option) => option === value) : options[0]
  );
  const popupRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block w-20">
      <div
        className="p-2 border rounded cursor-pointer bg-white flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {(value && value) || selectedOption}{" "}
        <ArrowDropDownIcon className="text-xs" />
        {isOpen && <div className="absolute top-0 left-0 h-full w-full z-20" />}
      </div>
      {isOpen && (
        <div
          ref={popupRef}
          className="absolute right-0 mb-1 bottom-full w-full mt-1 bg-white border rounded shadow-lg overflow-hidden"
        >
          {options.map((option: string, index: number) => (
            <div
              key={index}
              className={`p-2 cursor-pointer hover:bg-cwPrimaryGreen hover:text-white ${
                option === selectedOption && "bg-cwPrimaryGreen text-white "
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomTableOptions;
