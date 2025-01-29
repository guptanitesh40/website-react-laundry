import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress as deleteAddressAction } from "../../redux/slices/addressSlice";
import useFetchAddress from "../../hooks/address/useFetchAddress";
import useDeleteAddress from "../../hooks/address/useDeleteAddress";
import AddAddressModel from "../cart/AddAddressModel";
import AddressShimmer from "./AddressShimmer";

const SavedAddress = () => {
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const [loadingStates, setLoadingStates] = useState({});
  const addresses = useSelector((state) => state.address.address);
  const { loading: loadingFetchAddress } = useFetchAddress();
  const { loading: loadingDelAdd, deleteAddress } = useDeleteAddress();

  const addressMapping = {
    1: "Home",
    2: "Office",
    3: "Other",
  };

  const handleAddClick = () => {
    setIsModelOpen(true);
    setEditAddress(null);
  };

  const handleEdit = (address) => {
    setEditAddress(address);
    setIsEditMode(true);
    setIsModelOpen(true);
  };

  const handleDelete = async (address_id) => {
    setLoadingStates((prev) => ({ ...prev, [address_id]: true }));

    const result = await deleteAddress(address_id);
    if (result) {
      dispatch(deleteAddressAction(address_id));
    }
    setLoadingStates((prev) => ({ ...prev, [address_id]: false }));
  };

  if (loadingFetchAddress) {
    return <AddressShimmer />;
  }

  return (
    <>
      <div className="p-14 border border-[#b9bccf4d] bg-white rounded-2xl laptop:rounded-xl laptop:p-10 laptop-s:rounded-lg tab-m:p-9 tab:p-8 mb-l:p-6">
        <div className="addresses-container">
          <div className="col-span-full justify-self-end">
            <button className="add-btn" onClick={handleAddClick}>
              <FaPlus className="inline-block h-[1.6rem] w-[1.6rem] fill-[var(--secondary)] laptop:h-[1.4rem] laptop:w-[1.4rem] laptop-s:h-[1.2rem] laptop-s:w-[1.2rem]" />
              <span>Add New Address</span>
            </button>
          </div>
          {addresses &&
            addresses.map((address) => {
              const {
                address_id,
                address_type,
                building_number,
                area,
                landmark,
                city,
                pincode,
                full_name,
                phone_number,
              } = address;
              const isDeleting = loadingStates[address_id] || false;
              return (
                <div
                  key={address_id}
                  className="border border-[#b9bccf4d] rounded-2xl laptop:rounded-xl laptop-s:rounded-lg"
                >
                  <div className="flex flex-col items-start gap-4 px-6 py-8 border-b border-[#b9bccf4d] laptop:p-6 laptop:gap-3 laptop-s:p-5 mb-l:p-4">
                    <span className="bg-[#f0f0f0] p-3 rounded-lg uppercase text-xl text-[#878787] font-semibold laptop:p-2 laptop:text-lg laptop:rounded-md laptop-s:text-base">
                      {addressMapping[address_type]}
                    </span>
                    <div className="flex items-center justify-start gap-6 laptop:gap-4">
                      <h4 className="text-[1.5rem] text-[var(--black)] font-semibold laptop:text-[1.4rem] laptop:leading-[1.5] laptop-s:text-[1.2rem]">
                        {full_name}
                      </h4>
                      <h4 className="text-[1.5rem] text-[var(--black)] font-semibold laptop:text-[1.3rem] laptop:leading-[1.5] laptop-s:text-[1.2rem]">
                        {phone_number}
                      </h4>
                    </div>
                    <p className="text-[1.5rem] leading-10 w-[80%] laptop:text-[1.4rem] laptop:w-[90%] laptop:leading-[1.75] laptop-s:text-[1.2rem] tab-m:w-full">{`${building_number}, ${area}, ${landmark}, ${city}, ${pincode} `}</p>
                  </div>
                  <div className="flex items-stretch justify-center">
                    <div className="basis-1/2 border-r border-[#b9bccf4d]">
                      <button
                        className="text-2xl text-[var(--primary)] font-medium py-5 w-full laptop:text-[1.4rem] laptop-s:text-[1.2rem] laptop-s:py-4 mb:py-3"
                        onClick={() => handleEdit(address)}
                      >
                        Edit
                      </button>
                    </div>
                    <div className="basis-1/2">
                      <button
                        className="text-2xl text-[var(--primary)] font-medium h-full w-full text-center laptop:text-[1.4rem] laptop-s:text-[1.2rem] laptop-s:py-4 mb:py-3"
                        disabled={loadingDelAdd}
                        onClick={() => handleDelete(address_id)}
                      >
                        {isDeleting ? "Removing..." : "Remove"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {isModelOpen && (
        <AddAddressModel
          setIsOpen={setIsModelOpen}
          isOpen={isModelOpen}
          address={editAddress}
          isEditMode={isEditMode}
        />
      )}
    </>
  );
};

export default SavedAddress;
