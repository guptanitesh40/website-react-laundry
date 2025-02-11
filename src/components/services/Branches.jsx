import { useEffect, useRef, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import useFetchBranches from "../../hooks/branch/useFetchBranches";

const Branches = () => {
  const { branches } = useFetchBranches();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("Select Branch");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleBranchChange = (branch_name) => {
    setSelectedBranch(branch_name);
    toggleDropdown();
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
  }, []);

  return (
    <div
      className="border border-[#b9bccf4d] rounded-xl py-16 px-12 laptop-l:py-12 laptop-l:px-10 laptop-md:rounded-lg laptop-md:px-8 laptop-md:py-10 laptop-s:rounded-md laptop-s:py-8 laptop-s:px-6 tab-l:py-12 tab-l:px-8 tab-l:!p-0"
      ref={dropdownRef}
    >
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="box-border capitalize w-full px-4 py-6 inline-flex items-center justify-around gap-10 rounded-lg text-[1.6rem] text-primary bg-gray-100 focus:outline-none font-medium text-center laptop-l:py-5 laptop-l:px-8 laptop-l:justify-between laptop-l:text-[1.4rem] laptop-l:rounded-md laptop-md:py-4 laptop-md:px-6 laptop-md:text-xl"
          type="button"
        >
          <FaLocationDot className="h-10 w-10 fill-primary laptop-l:h-8 laptop-l:w-8 laptop-md:h-8 laptop-md:w-8 laptop-s:h-6 laptop-s:w-6 tab-s:h-4 tab-s:w-4" />
          {selectedBranch}
          <IoIosArrowDown
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 bg-white rounded-lg shadow-lg w-full mt-2 laptop-md:bg-cyan-200">
            <ul className="py-2 text-[1.6rem] text-[var(--black)] laptop-l:text-[1.4rem] laptop-md:py-1 laptop-md:text-xl">
              {branches && branches.length > 0 ? (
                branches.map((branch) => {
                  const { branch_id, branch_name } = branch;
                  return (
                    <li
                      key={branch_id}
                      className="block px-8 py-[1.2rem] capitalize hover:bg-gray-100"
                      onClick={() => handleBranchChange(branch_name)}
                    >
                      {branch_name}
                    </li>
                  );
                })
              ) : (
                <li className="block px-8 py-[1.2rem] hover:bg-gray-100">
                  No Branch Found !
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Branches;
