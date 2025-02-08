import PropTypes from "prop-types";

const AddInstruction = ({ instruction, setInstruction }) => {
  return (
    <div className="flex flex-col gap-8 laptop-md:gap-7">
      <label htmlFor="addInstruction" className="cart-sub-title cursor-pointer">
        Add Instruction
      </label>
      <textarea
        name="add-instruction"
        id="addInstruction"
        value={instruction}
        onChange={(e) => setInstruction(e.target.value)}
        className="border border-[#B9BCCF4D] rounded-xl focus:outline-none focus:border-indigo-500 px-4 py-6 font-[var(--black)] text-[1.8rem] laptop-l:text-[1.6rem] laptop-l:px-3 laptop-l:py-5 laptop-l:rounded-lg laptop-md:text-[1.5rem] laptop-md:py-4 laptop-md:px-2 laptop:text-[1.4rem] mb-l:p-4"
        placeholder="Write Message here ..."
      ></textarea>
    </div>
  );
};

AddInstruction.propTypes = {
  instruction: PropTypes.string,
  setInstruction: PropTypes.func.isRequired,
};

export default AddInstruction;
