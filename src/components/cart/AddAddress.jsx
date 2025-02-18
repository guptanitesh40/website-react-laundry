import PropTypes from "prop-types";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddAddressModel from "./AddAddressModel";
import { useDispatch, useSelector } from "react-redux";
import useDeleteAddress from "../../hooks/address/useDeleteAddress";
import { deleteAddress as deleteAddressAction } from "../../redux/slices/addressSlice";
import useFetchAddress from "../../hooks/address/useFetchAddress";
import AddressShimmer from "./AddressShimmer";

const AddAddress = ({ setSelectAddId }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const { loading: loadingFetchAddress } = useFetchAddress();
  const { deleteAddress, loading: loadingDelAdd } = useDeleteAddress();
  const addresses = useSelector((state) => state.address.address);

  function handleAddAddressClick() {
    setIsEditMode(false);
    setIsOpen(true);
    setEditAddress(null);
  }

  function onEditClick(address) {
    setEditAddress(address);
    setIsEditMode(true);
    setIsOpen(true);
  }

  async function onDelClick(address_id) {
    const result = await deleteAddress(address_id);
    if (result) {
      dispatch(deleteAddressAction(address_id));
    }
  }

  return (
    <>
      <div className="flex flex-col gap-12 laptop-md:gap-10">
        <div className="flex items-center justify-between flex-wrap mb-l:gap-4 mb:justify-center">
          <h4 className="cart-sub-title">Select Address</h4>
          <button
            className="address-btn flex items-center gap-4 laptop-l:gap-3 laptop-md:gap-2"
            onClick={handleAddAddressClick}
          >
            <FaPlus className="inline-block h-[1.6rem] w-[1.6rem] fill-[var(--secondary)] laptop-l:h-5 laptop-l:w-5 laptop-md:h-4 laptop-md:w-4 tab-m:h-5 tab-m:w-5" />
            <span>Add New Address</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 justify-center laptop-md:gap-8 laptop:gap-6 tab-l:grid-cols-1 tab-l:gap-8 tab-m:grid-cols-2 tab-s:grid-cols-1">
          {loadingFetchAddress ? (
            <>
              <AddressShimmer />
              <AddressShimmer />
            </>
          ) : addresses && addresses.length > 0 ? (
            addresses.map((address) => {
              const {
                address_id,
                full_name,
                building_number,
                phone_number,
                landmark,
                area,
                city,
                state,
                pincode,
                address_type,
              } = address;

              const typeMapping = {
                1: "Home",
                2: "Office",
                3: "Other",
              };

              return (
                <label
                  key={address_id}
                  className={`flex items-center gap-8 p-8 border rounded-xl cursor-pointer relative laptop-l:p-7 laptop-md:rounded-lg laptop-md:p-6 laptop-md:gap-6 laptop:p-5 tab-l:p-6`}
                >
                  <input
                    type="radio"
                    name="address"
                    className="styled-radio"
                    onChange={() => {
                      setSelectAddId(address_id);
                    }}
                  />
                  <div className="flex flex-col gap-3 items-start laptop-md:gap-2 tab-l:grow">
                    <span className="bg-[#f0f0f0] px-2 py-2.5 rounded-md uppercase text-[1.2rem] text-[#878787] font-semibold laptop-l:text-[1rem] laptop-md:p-2">
                      {typeMapping[address_type]}
                    </span>
                    <div className="flex gap-4 text-[1.6rem] text-[var(--black)] font-semibold laptop-l:text-[1.4rem] laptop:text-[1.3rem] tab-m:text-[1.4rem]">
                      <h4>{full_name}</h4>
                      <h4>{phone_number}</h4>
                    </div>
                    <span className="text-[1.6rem] leading-[1.75] text-[var(--black)] font-normal laptop-l:text-[1.4rem] laptop:text-[1.3rem]">
                      {`${building_number}, ${area}, ${landmark}, ${city}, ${state} - `}
                      <h4 className="inline-block text-[1.4rem] text-[var(--black)] font-semibold laptop:text-[1.2rem]">
                        {pincode}
                      </h4>
                    </span>
                  </div>
                  <div className="del-edit-menu">
                    <span className="three-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                    <ul className="shortcut">
                      <li onClick={() => onEditClick(address)}>Edit</li>
                      <li onClick={() => onDelClick(address_id)}>
                        {loadingDelAdd ? "Deleting.." : "Delete"}
                      </li>
                    </ul>
                  </div>
                </label>
              );
            })
          ) : (
            <span className="self-center text-3xl text-[var(--black)] font-medium">
              No address Found !
            </span>
          )}
        </div>
      </div>
      {isOpen && (
        <AddAddressModel
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          address={editAddress}
          isEditMode={isEditMode}
        />
      )}
    </>
  );
};

AddAddress.propTypes = {
  setSelectAddId: PropTypes.func.isRequired,
};

export default AddAddress;
