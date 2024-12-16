import PropTypes from "prop-types";
import { CgCloseR } from "react-icons/cg";
import useAddressOperation from "../../hooks/address/useAddressOperation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAddAddress from "../../hooks/address/useAddAddress";
import { addAddress as addAddressAction } from "../../redux/slices/addressSlice";
import { useDispatch } from "react-redux";

const AddAddressModel = ({ setIsOpen, isOpen, address, flag }) => {
  const dispatch = useDispatch();

  const { addAddress, loading: loadingAddAddress } = useAddAddress();

  const { editAddress } = useAddressOperation();
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    address_type: "1",
    building_number: "",
    area: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!flag) {
      await editAddress(formData, address.address_id);
      setIsOpen(false);
    } else {
      const result = await addAddress(formData);
      if (result) {
        dispatch(addAddressAction(result));
        setIsOpen(false);
      } else {
        toast.error("Failed to add address");
      }
    }
  };

  const onCloseBtnClick = () => {
    setIsOpen(false);
    setFormData({
      address_type: "1",
      full_name: "",
      phone_number: "",
      building_number: "",
      area: "",
      landmark: "",
      pincode: "",
      city: "",
      state: "",
      country: "",
    });
  };

  useEffect(() => {
    if (address) {
      setFormData({
        full_name: address.full_name,
        phone_number: address.phone_number,
        address_type: address.address_type,
        building_number: address.building_number,
        area: address.area,
        landmark: address.landmark,
        pincode: address.pincode,
        city: address.city,
        state: address.state,
        country: address.country,
      });
    }
  }, [address]);

  return (
    <section
      className={`fixed inset-0 bg-[#F7F8FD] flex justify-center items-center z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="w-[60rem] bg-white shadow-2xl px-12 py-12 pb-16 rounded-xl">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-[2.4rem] leading-[2.4rem]">add new address</h2>
          <CgCloseR
            className="inline-block h-8 w-8 text-black cursor-pointer"
            onClick={onCloseBtnClick}
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 w-full gap-x-10 gap-y-12"
        >
          <div className="flex flex-col gap-3">
            <label
              htmlFor="full_name"
              className="self-start text-[1.2rem] text-[var(--black)]"
            >
              Fullname
            </label>
            <input
              name="full_name"
              id="full_name"
              type="text"
              onChange={handleChange}
              value={formData.full_name}
              className="inline-block w-full p-3 ring-1 text-[1.2rem] rounded-lg text-[var(--black)"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label
              htmlFor="phone_number"
              className="self-start text-[1.2rem] text-[var(--black)]"
            >
              Phone number
            </label>
            <input
              name="phone_number"
              id="phone_number"
              type="text"
              onChange={handleChange}
              value={formData.phone_number}
              className="inline-block w-full p-3 ring-1 text-[1.2rem] rounded-lg text-[var(--black)"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label
              htmlFor="address_type"
              className="self-start text-[1.2rem] text-[var(--black)]"
            >
              Address type
            </label>
            <select
              name="address_type"
              id="address_type"
              className="inline-block w-full p-3 ring-1 text-[1.2rem] rounded-lg text-[var(--black)"
              onChange={handleChange}
              defaultValue={1}
            >
              <option value={1}>Home</option>
              <option value={2}>Office</option>
              <option value={3}>Other</option>
            </select>
          </div>

          <div className="flex flex-col gap-3">
            <label
              htmlFor="building_number"
              className="self-start text-[1.2rem] text-[var(--black)]"
            >
              Building number
            </label>
            <input
              name="building_number"
              id="building_number"
              type="text"
              onChange={handleChange}
              value={formData.building_number}
              className="inline-block w-full p-3 ring-1 text-[1.2rem] rounded-lg text-[var(--black)"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label
              htmlFor="area"
              className="self-start text-[1.2rem] text-[var(--black)]"
            >
              area
            </label>
            <input
              name="area"
              id="area"
              type="text"
              onChange={handleChange}
              value={formData.area}
              className="inline-block w-full p-3 ring-1 text-[1.2rem] rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label
              htmlFor="landmark"
              className="self-start text-[1.2rem] text-[var(--black)]"
            >
              landmark
            </label>
            <input
              name="landmark"
              id="landmark"
              type="text"
              onChange={handleChange}
              value={formData.landmark}
              className="inline-block w-full p-3 ring-1 text-[1.2rem] rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label
              htmlFor="pincode"
              className="self-start text-[1.2rem] text-[var(--black)]"
            >
              pincode
            </label>
            <input
              name="pincode"
              id="pincode"
              type="text"
              onChange={handleChange}
              value={formData.pincode}
              className="inline-block w-full p-3 ring-1 text-[1.2rem] rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label
              htmlFor="city"
              className="self-start text-[1.2rem] text-[var(--black)]"
            >
              city
            </label>
            <input
              name="city"
              id="city"
              type="text"
              onChange={handleChange}
              value={formData.city}
              className="inline-block w-full p-3 ring-1 text-[1.2rem] rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label
              htmlFor="state"
              className="self-start text-[1.2rem] text-[var(--black)]"
            >
              state
            </label>
            <input
              name="state"
              id="state"
              type="text"
              onChange={handleChange}
              value={formData.state}
              className="inline-block w-full p-3 ring-1 text-[1.2rem] rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label
              htmlFor="country"
              className="self-start text-[1.2rem] text-[var(--black)]"
            >
              country
            </label>
            <input
              name="country"
              id="country"
              type="text"
              onChange={handleChange}
              value={formData.country}
              className="inline-block w-full p-3 ring-1 text-[1.2rem] rounded-lg"
            />
          </div>

          <div className="flex justify-start items-end row-start-6">
            <button
              type="submit"
              className="text-white bg-blue-700 text-[1.4rem] font-medium px-6 py-4 rounded-md"
              disabled={loadingAddAddress}
            >
              {flag
                ? loadingAddAddress
                  ? "Adding Address..."
                  : "Add Address"
                : "Edit Address"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

AddAddressModel.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  address: PropTypes.shape({
    address_id: PropTypes.number,
    full_name: PropTypes.string,
    phone_number: PropTypes.string,
    address_type: PropTypes.number,
    building_number: PropTypes.string,
    area: PropTypes.string,
    landmark: PropTypes.string,
    pincode: PropTypes.number,
    city: PropTypes.string,
    state: PropTypes.string,
    country: PropTypes.string,
  }),
  flag: PropTypes.bool.isRequired,
};

export default AddAddressModel;
