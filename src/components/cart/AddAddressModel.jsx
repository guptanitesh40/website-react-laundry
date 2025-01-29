import PropTypes from "prop-types";
import { CgCloseR } from "react-icons/cg";
import { useEffect, useState } from "react";
import useAddAddress from "../../hooks/address/useAddAddress";
import useEditAddress from "../../hooks/address/useEditAddress";
import { useDispatch } from "react-redux";
import { editAddress as editAddressAction } from "../../redux/slices/addressSlice";
import { addAddress as addAddressAction } from "../../redux/slices/addressSlice";
import * as Yup from "yup";

const addressShcema = Yup.object().shape({
  full_name: Yup.string()
    .trim()
    .min(6, "Full name must be at least 2 characters")
    .max(50, "Full name cannot exceed 50 characters")
    .required("Full name is required"),
  phone_number: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  address_type: Yup.string().required("Address type is require"),
  building_number: Yup.string().trim().required("Building number is required"),
  area: Yup.string().trim().required("Area is required"),
  landmark: Yup.string().trim().required("Landmark is required"),
  city: Yup.string().trim().required("City is required"),
  state: Yup.string().trim().required("State is required"),
  country: Yup.string().trim().required("Country is required"),
  pincode: Yup.string()
    .matches(/^\d{6}$/, "Pincode must be exactly 6 digits")
    .required("Pincode is required"),
});

const AddAddressModel = ({ setIsOpen, isOpen, address, isEditMode }) => {
  const dispatch = useDispatch();
  const { addAddress, loading: loadingAddAddress } = useAddAddress();
  const { editAddress, loading: loadingEditAddress } = useEditAddress();
  const [errors, setErrors] = useState({});
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

    try {
      await addressShcema.validate(formData, { abortEarly: false });
    } catch (err) {
      if (err.inner) {
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      }
      return;
    }

    if (isEditMode) {
      const { address_id } = address;
      const result = await editAddress(formData, address_id);
      if (result) {
        dispatch(editAddressAction({ formData, address_id }));
        setIsOpen(false);
        return;
      }
    }

    const result = await addAddress(formData);
    if (result) {
      dispatch(addAddressAction(result));
      setIsOpen(false);
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
      className={`fixed inset-0 overflow-y-auto px-8 py-10 bg-black bg-opacity-75 flex justify-center items-center z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="w-[60rem] bg-white shadow-2xl px-12 py-12 pb-16 rounded-xl">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-[2.4rem] leading-[2.4rem]">
            {isEditMode ? "Edit Address" : "Add New Address"}
          </h2>
          <CgCloseR
            className="inline-block h-8 w-8 text-black cursor-pointer"
            onClick={onCloseBtnClick}
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-[repeat(auto-fill,_minmax(20rem,_1fr))] w-full gap-x-10 gap-y-12"
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
            {errors.full_name && (
              <p className="text-lg text-[var(--secondary)] leading-[1]">
                {errors.full_name}
              </p>
            )}
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
            {errors.phone_number && (
              <p className="text-lg text-[var(--secondary)] leading-[1]">
                {errors.phone_number}
              </p>
            )}
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
            {errors.address_type && (
              <p className="text-lg text-[var(--secondary)] leading-[1]">
                {errors.address_type}
              </p>
            )}
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
            {errors.building_number && (
              <p className="text-lg text-[var(--secondary)] leading-[1]">
                {errors.building_number}
              </p>
            )}
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
            {errors.area && (
              <p className="text-lg text-[var(--secondary)] leading-[1]">
                {errors.area}
              </p>
            )}
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
            {errors.landmark && (
              <p className="text-lg text-[var(--secondary)] leading-[1]">
                {errors.landmark}
              </p>
            )}
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
            {errors.pincode && (
              <p className="text-lg text-[var(--secondary)] leading-[1]">
                {errors.pincode}
              </p>
            )}
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
            {errors.city && (
              <p className="text-lg text-[var(--secondary)] leading-[1]">
                {errors.city}
              </p>
            )}
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
            {errors.state && (
              <p className="text-lg text-[var(--secondary)] leading-[1]">
                {errors.state}
              </p>
            )}
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
            {errors.country && (
              <p className="text-lg text-[var(--secondary)] leading-[1]">
                {errors.country}
              </p>
            )}
          </div>

          <div className="flex justify-start items-end row-start-6">
            <button
              type="submit"
              className="text-white bg-blue-700 text-[1.4rem] font-medium px-6 py-4 rounded-md flex gap-4 items-center"
              disabled={loadingAddAddress || loadingEditAddress}
            >
              {isEditMode ? (
                loadingEditAddress ? (
                  <>
                    <span className="inline-block h-10 w-10 rounded-full border-4 border-t-white border-white/30 animate-spin"></span>
                    <span>Processing...</span>
                  </>
                ) : (
                  "Edit Address"
                )
              ) : loadingAddAddress ? (
                <>
                  <span className="inline-block h-10 w-10 rounded-full border-4 border-t-white border-white/30 animate-spin"></span>
                  <span>Processing...</span>
                </>
              ) : (
                "Add Address"
              )}
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
  isEditMode: PropTypes.bool.isRequired,
};

export default AddAddressModel;
