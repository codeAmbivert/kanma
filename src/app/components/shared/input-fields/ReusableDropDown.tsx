import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import React, { useState, useRef, useEffect } from "react";

interface DropdownProps {
  label?: string;
  options?: { label: string; value: any }[];
  placeHolder?: string;
  value?: { label: string; value: any };
  css?: string;
  textColor?: string;
  onChange?: (option: { label: string; value: any }) => void;
}

const ReusableDropDown = ({
  label,
  options = [],
  css,
  placeHolder,
  textColor,
  value,
  onChange,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<{
    label: string;
    value: any;
  } | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: { label: string; value: any }) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange && onChange(option);
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
    <div ref={popupRef} className="w-full">
      {label && <p className=" mb-1">{label}</p>}
      <div
        className={`flex justify-center relative w-full mt-1 cursor-pointer`}
      >
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`py-6 px-4 bg-white rounded border hover:border-black w-full flex justify-between items-center font-medium text-sm  ${
            textColor && textColor
          } ${css}`}
        >
          {value
            ? value.label
            : selectedOption
            ? selectedOption.label
            : placeHolder
            ? placeHolder
            : "Select an option"}

          <ArrowDropDownIcon className="text-xs text-black" />
        </div>
        {isOpen && (
          <div>
            {options.length > 0 ? (
              <ul className="absolute bg-white rounded text-black border border-black top-full left-0 mt-1 z-20 w-full font-medium">
                {options.map((option, index) => (
                  <li
                    key={option.label}
                    onClick={() => handleOptionClick(option)}
                    className={`p-2 pl-6 hover:bg-gray-50 ${
                      index !== 0 ? "border-t" : ""
                    }`}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="absolute bg-white rounded border border-black top-full mt-[0.15rem] left-0 z-20 w-full font-medium">
                <div className="p-2 pl-6 text-sm text-black">No Options</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReusableDropDown;
