import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAddress as deleteAddressAction } from '../../redux/slices/addressSlice'
import useFetchAddress from '../../hooks/address/useFetchAddress'
import useDeleteAddress from '../../hooks/address/useDeleteAddress'
import AddAddressModel from '../cart/AddAddressModel'
import Loading from './Loading'
import useSetDefaultAddress from '../../hooks/address/useSetDefaultAddress'

const SavedAddress = () => {
  const dispatch = useDispatch()
  const [isEditMode, setIsEditMode] = useState(false)
  const [isModelOpen, setIsModelOpen] = useState(false)
  const [editAddress, setEditAddress] = useState(null)
  const [loadingStates, setLoadingStates] = useState({})
  const addresses = useSelector((state) => state.address.address)
  const { loading: loadingFetchAddress, fetchAddress } = useFetchAddress()
  const { loading: loadingDelAdd, deleteAddress } = useDeleteAddress()
  const { setDefaultAddress } = useSetDefaultAddress()

  const [defaultAddr, setDefaultAddr] = useState()

  useEffect(() => {
    if (!defaultAddr) return

    const setAddress = async () => {
      const success = await setDefaultAddress(defaultAddr)
      if (success) {
        await fetchAddress()
      }
    }
    setAddress()
  }, [defaultAddr])

  const addressMapping = {
    1: 'Home',
    2: 'Office',
    3: 'Other',
  }

  const handleAddClick = () => {
    setIsEditMode(false)
    setIsModelOpen(true)
    setEditAddress(null)
  }

  const handleEdit = (address) => {
    setEditAddress(address)
    setIsEditMode(true)
    setIsModelOpen(true)
  }

  const handleDelete = async (address_id) => {
    setLoadingStates((prev) => ({ ...prev, [address_id]: true }))

    const result = await deleteAddress(address_id)
    if (result) {
      dispatch(deleteAddressAction(address_id))
    }
    setLoadingStates((prev) => ({ ...prev, [address_id]: false }))
  }

  if (loadingFetchAddress) {
    return <Loading />
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
              const { address_id, address_type, building_number, area, landmark, city, pincode, full_name, phone_number } = address
              const isDeleting = loadingStates[address_id] || false
              const addressParts = [building_number, area, landmark, city, pincode && pincode !== 0 ? pincode : null]

              const address_str = addressParts.filter(Boolean).join(', ')

              return (
                <div
                  key={address_id}
                  className="border border-[#b9bccf4d] rounded-2xl laptop:rounded-xl laptop-s:rounded-lg relative overflow-hidden">
                  {address.is_default && (
                    <>
                      <span className="absolute top-0 right-0 bg-[#008080BF] text-[#FAF3E0] px-4 py-1.5 font-medium rounded-bl-xl border border-[#0080804d] text-[1.2rem] mb-l:text-[0.9rem] mb:text-[0.7rem]">
                        Default
                      </span>
                    </>
                  )}
                  <div className="absolute top-2 left-2">
                    <input
                      type="radio"
                      name="defaultAddress"
                      className="w-7 h-7 accent-[#008080] cursor-pointer custom-radio"
                      checked={address.is_default}
                      onChange={() => setDefaultAddr(address_id)}
                    />
                  </div>

                  <div className="flex mt-8 flex-col items-start gap-4 px-6 py-8 border-b border-[#b9bccf4d] laptop:p-6 laptop:gap-3 laptop-s:p-5 mb-l:p-4">
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
                    <p className="text-[1.5rem] leading-10 laptop:text-[1.4rem] laptop:leading-[1.75] laptop-s:text-[1.2rem] tab-m:w-full">
                      {address_str.length > 50 ? address_str.slice(0, 50) + ' ...' : address_str +"."}
                    </p>
                  </div>
                  <div className="flex items-stretch justify-center">
                    <div className="basis-1/2 border-r border-[#b9bccf4d]">
                      <button
                        className="text-2xl text-[var(--primary)] font-medium py-5 w-full laptop:text-[1.4rem] laptop-s:text-[1.2rem] laptop-s:py-4 mb:py-3"
                        onClick={() => handleEdit(address)}>
                        Edit
                      </button>
                    </div>
                    <div className="basis-1/2">
                      <button
                        className="text-2xl text-[var(--primary)] font-medium h-full w-full text-center laptop:text-[1.4rem] laptop-s:text-[1.2rem] laptop-s:py-4 mb:py-3"
                        disabled={loadingDelAdd}
                        onClick={() => handleDelete(address_id)}>
                        {isDeleting ? 'Removing...' : 'Remove'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
      {isModelOpen && <AddAddressModel setIsOpen={setIsModelOpen} isOpen={isModelOpen} address={editAddress} isEditMode={isEditMode} />}
    </>
  )
}

export default SavedAddress
