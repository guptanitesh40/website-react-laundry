import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import useFetchBranches from "../../hooks/branch/useFetchBranches";

const Branches = ({ setSelectedBranchId, noSelection, setNoSelection }) => {
  const { branches } = useFetchBranches();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("Select Branch");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleBranchChange = (branch_name, branch_id) => {
    setSelectedBranch(branch_name);
    setSelectedBranchId(branch_id);
    toggleDropdown();
    setNoSelection(false);
  };

  useEffect(() => {
    const handleFocusChange = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleFocusChange);

    return () => {
      document.removeEventListener("mousedown", handleFocusChange);
    };
  }, [selectedBranch]);

  return (
    <div className="flex flex-col gap-8 laptop-md:gap-7 tab-s:gap-6">
      <label className="cart-sub-title">Select Branch</label>
      <div
        className={`self-start border ${noSelection ? "border-red-400" : "border-gray-400"} rounded-lg w-[45rem] laptop-md:w-[38rem] laptop:w-[32.5rem] tab-m:w-[35rem] tab-m:rounded-md mb-l:w-full mb-l:max-w-full`}
        ref={dropdownRef}
      >
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="box-border capitalize w-full px-10 py-7 inline-flex items-center justify-between gap-10 rounded-lg text-[1.8rem] text-[var(--black)] focus:outline-none font-medium text-center laptop-l:py-6 laptop-l:px-9 laptop-l:text-[1.7rem] laptop-md:py-4 laptop-md:px-6 laptop-md:text-[1.6rem] laptop:text-[1.5rem] tab-m:rounded-md mb-l:px-5"
            type="button"
          >
            <FaLocationDot className="h-10 w-10 fill-primary laptop-l:h-9 laptop-l:w-9 laptop-md:h-8 laptop-md:w-8" />
            {selectedBranch}
            <IoIosArrowDown
              className={`transition-transform h-8 w-8 fill-primary laptop-l:h-7 laptop-l:w-7 mb-l:h-6 mb-l:w-6 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <div className="absolute z-10 bg-white rounded-lg shadow-lg w-full mt-2 border laptop-l:mt-1 overflow-hidden">
              <ul className="py-2 text-[1.7rem] text-[var(--black)] laptop-l:py-0 laptop-l:text-[1.5rem] laptop-md:text-[1.4rem]">
                {branches && branches.length > 0 ? (
                  branches.map((branch) => {
                    const { branch_id, branch_name } = branch;
                    return (
                      <li
                        key={branch_id}
                        className="block px-8 py-[1.25rem] capitalize hover:bg-gray-100 laptop-l:py-[1.1rem] laptop-l:px-7"
                        onClick={() =>
                          handleBranchChange(branch_name, branch_id)
                        }
                      >
                        {branch_name}
                      </li>
                    );
                  })
                ) : (
                  <li className="block px-8 py-[1.25rem] font-medium hover:bg-gray-100">
                    No Branch Found !
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Branches.propTypes = {
  setSelectedBranchId: PropTypes.func.isRequired,
};

export default Branches;
