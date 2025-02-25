import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import useFetchBranches from "../../hooks/branch/useFetchBranches";

const Branches = ({ setSelectedBranchId }) => {
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
    <div className="flex flex-col gap-8 laptop-md:gap-7">
      <label className="cart-sub-title">Select Branch</label>
      <div
        className="self-start border border-gray-400 rounded-lg w-[45rem]"
        ref={dropdownRef}
      >
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="box-border capitalize w-full px-10 py-7 inline-flex items-center justify-between gap-10 rounded-lg text-[1.8rem] text-[var(--black)] focus:outline-none font-medium text-center"
            type="button"
          >
            <FaLocationDot className="h-10 w-10 fill-primary" />
            {selectedBranch}
            <IoIosArrowDown
              className={`transition-transform h-8 w-8 fill-primary ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <div className="absolute z-10 bg-white rounded-lg shadow-lg w-full mt-2 border">
              <ul className="py-2 text-[1.7rem] text-[var(--black)]">
                {branches && branches.length > 0 ? (
                  branches.map((branch) => {
                    const { branch_id, branch_name } = branch;
                    return (
                      <li
                        key={branch_id}
                        className="block px-8 py-[1.25rem] capitalize hover:bg-gray-100"
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
