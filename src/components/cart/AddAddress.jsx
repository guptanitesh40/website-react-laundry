import PropTypes from "prop-types";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddAddressModel from "./AddAddressModel";
import { useDispatch, useSelector } from "react-redux";
import useDeleteAddress from "../../hooks/address/useDeleteAddress";
import { deleteAddress as deleteAddressAction } from "../../redux/slices/addressSlice";
import useFetchAddress from "../../hooks/address/useFetchAddress";

const AddAddress = ({ setSelectAddId }) => {
  const { loading: loadingFetchAddress } = useFetchAddress();
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const { deleteAddress, loading: loadingDelAdd } = useDeleteAddress();
  const addresses = useSelector((state) => state.address.address);

  function handleAddAddressClick() {
    setIsOpen(true);
    setEditAddress(null);
  }

  function onEditClick(address) {
    setEditAddress(address);
    setFlag(false);
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
      <div className="flex flex-col gap-12">
        <div className="flex items-center justify-between">
          <h4 className="cart-sub-title">Select Address</h4>
          <button
            className="address-btn flex items-center gap-4"
            onClick={handleAddAddressClick}
          >
            <FaPlus className="inline-block h-[1.6rem] w-[1.6rem] fill-[var(--red)]" />
            <span>Add New Address</span>
          </button>
        </div>

        <div className="flex flex-col gap-8">
          {addresses && addresses.length != 0
            ? addresses.map((address) => {
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
                  <div
                    key={address_id}
                    className="flex items-center gap-6 p-8 border border-[#e0e0e0] rounded-xl"
                  >
                    <div>
                      <input
                        type="radio"
                        name="address"
                        className="appearance-none h-8 w-8 border-2 border-black rounded-full checked:bg-black checked:border-transparent checked:ring-2 checked:ring-black checked:ring-offset-2"
                        onChange={() => {
                          setSelectAddId(address_id);
                        }}
                      />
                    </div>
                    <div className="grow flex flex-col gap-3 items-start rounded-sm relative">
                      <span className="bg-[#f0f0f0] px-2 py-2.5 rounded-md uppercase text-[1.1rem] text-[#878787] font-semibold">
                        {typeMapping[address_type]}
                      </span>
                      <div className="flex gap-4">
                        <h4 className="text-[1.4rem] text-[var(--black)] font-semibold">
                          {full_name}
                        </h4>
                        <h4 className="text-[1.4rem] text-[var(--black)] font-semibold">
                          {phone_number}
                        </h4>
                      </div>
                      <span className="text-[1.4rem] text-[var(--black)] font-normal">
                        {`${building_number}, ${area}, ${landmark}, ${city}, ${state} - `}
                        <h4 className="inline-block text-[1.4rem] text-[var(--black)] font-semibold">
                          {pincode}
                        </h4>
                      </span>

                      <div className="del-edit-menu relative">
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
                    </div>
                  </div>
                );
              })
            : "No address Found!"}
        </div>
      </div>
      {isOpen && (
        <AddAddressModel
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          address={editAddress}
          flag={flag}
        />
      )}
    </>
  );
};

AddAddress.propTypes = {
  setSelectAddId: PropTypes.func.isRequired,
};

export default AddAddress;
