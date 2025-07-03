import './addAddressModel.css'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import useAddAddress from '../../hooks/address/useAddAddress'
import useEditAddress from '../../hooks/address/useEditAddress'
import { useDispatch } from 'react-redux'
import { editAddress as editAddressAction } from '../../redux/slices/addressSlice'
import { addAddress as addAddressAction } from '../../redux/slices/addressSlice'
import * as Yup from 'yup'
import { IoClose } from 'react-icons/io5'
import { FaCaretDown } from 'react-icons/fa'

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import toast from 'react-hot-toast'
import { MdLocationPin } from 'react-icons/md'
import GoogleMap from './GoogleMap'

const addressShcema = Yup.object().shape({
  full_name: Yup.string().trim().max(50, 'Full name cannot exceed 50 characters').required('Full name is required'),
  phone_number: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
  address_type: Yup.string().required('Address type is require'),
  building_number: Yup.string().trim().required('House no and society is required'),
  area: Yup.string().trim().required('Please select address'),
  city: Yup.string().trim().required('City is required'),
  state: Yup.string().trim().required('State is required'),
  country: Yup.string().trim().required('Country is required'),
  pincode: Yup.string()
    .transform((value) => (value === '' ? undefined : value))
    .notRequired()
    .test('pincode-format', 'Pincode must be exactly 6 digits', (value) => !value || /^\d{6}$/.test(value)),
})

const AddAddressModel = ({ setIsOpen, isOpen, address, isEditMode }) => {
  const dispatch = useDispatch()
  const { addAddress, loading: loadingAddAddress } = useAddAddress()
  const { editAddress, loading: loadingEditAddress } = useEditAddress()
  const [errors, setErrors] = useState({})
  const [isLatLng, setIsLatLng] = useState(false)

  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    address_type: '1',
    building_number: '',
    area: '',
    lat: '',
    long: '',
    landmark: '',
    pincode: '',
    city: '',
    state: 'Gujarat',
    country: '',
  })

  const [suggesionIsOpen, setSuggesionIsOpen] = useState(false)

  const [isMapOpen, setIsMapOpen] = useState(false)

  const handleAddressChange = (newAddress) => {
    setFormData({ ...formData, area: newAddress })
    setSuggesionIsOpen(true)
  }

  const handleAddressSelect = async (selectedAddress) => {
    setFormData({ ...formData, area: selectedAddress })
    try {
      const result = await geocodeByAddress(selectedAddress)
      const latLng = await getLatLng(result[0])

      if (latLng) {
        setFormData((prev) => ({
          ...prev,
          lat: latLng?.lat,
          long: latLng?.lng,
        }))
      }
    } catch {
      toast.error('Failed to fetch address detail', {
        className: 'toast-error',
      })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.lat || !formData.long) {
      setIsLatLng(true)
    } else {
      setIsLatLng(false)
    }

    const cleanedData = Object.fromEntries(
      Object.entries(formData).filter(
        ([key, value]) => value !== '' && value !== undefined && value !== null && value !== '0' && value !== 'undefined',
      ),
    )

    try {
      await addressShcema.validate(cleanedData, { abortEarly: false })
    } catch (err) {
      if (err.inner) {
        const newErrors = {}
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message
        })
        setErrors(newErrors)
      }
      return
    }
    setErrors({})

    if (isEditMode) {
      const { address_id } = address
      const result = await editAddress(formData, address_id)
      if (result) {
        dispatch(editAddressAction({ formData, address_id }))
        setIsOpen(false)
        return
      }
      return
    }

    const result = await addAddress(cleanedData)
    if (result) {
      dispatch(addAddressAction(result))
      setIsOpen(false)
    }
  }

  const onCloseBtnClick = () => {
    setIsOpen(false)
    setFormData({
      address_type: '1',
      full_name: '',
      phone_number: '',
      building_number: '',
      area: '',
      landmark: '',
      pincode: '',
      city: '',
      state: '',
      country: '',
    })
  }

  const handleGooglePinClick = (e) => {
    e.preventDefault()
    setIsMapOpen(true)
  }

  useEffect(() => {
    if (address) {
      setFormData({
        full_name: address?.full_name,
        phone_number: address?.phone_number,
        address_type: address?.address_type,
        building_number: address?.building_number,
        area: address?.area,
        lat: address?.lat,
        long: address?.long,
        landmark: address?.landmark,
        pincode: address?.pincode === 0 ? "" : address?.pincode,
        city: address?.city,
        state: address?.state,
        country: address?.country,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => (document.body.style.overflow = 'auto')
  }, [formData])

  return (
    <section
      className={`fixed inset-0 p-8 bg-black bg-opacity-75 grid place-items-center min-h-screen w-full overflow-auto z-50 mb-l:p-6 ${
        isOpen ? 'block' : 'hidden'
      }`}>
      <div className="w-full max-w-[60rem] bg-white shadow-2xl p-12 pb-16 rounded-[0.75rem] tab-l:rounded-xl mb-l:rounded-lg mb-l:p-10 mb:p-8">
        <div className="mb-10 flex justify-between items-center flex-wrap tab-l:mb-8">
          <h2 className="text-[2.4rem] leading-[1] text-[var(--black)] tab-l:text-[2rem]">{isEditMode ? 'Edit Address' : 'Add New Address'}</h2>
          <button
            type="button"
            title="close"
            className="border border-gray-300 rounded-md inline-flex items-center justify-center text-gray-400 focus:outline-none focus:border-indigo-500 shadow-2xl h-10 w-10"
            onClick={onCloseBtnClick}>
            <IoClose className="h-8 w-8 tab-s:h-6 tab-s:w-6" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-[repeat(auto-fill,_minmax(25rem,_1fr))] w-full gap-x-10 gap-y-12 tab-s:gap-10 mb-l:grid-cols-1 mb:gap-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="full_name" className="aam-label">
              Fullname
            </label>
            <div>
              <input name="full_name" id="full_name" type="text" onChange={handleChange} value={formData.full_name} className="aam-input" />
              {errors.full_name && <p className="aam-error-label">{errors.full_name}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone_number" className="aam-label">
              Phone number
            </label>
            <div>
              <input name="phone_number" id="phone_number" type="text" onChange={handleChange} value={formData.phone_number} className="aam-input" />
              {errors.phone_number && <p className="aam-error-label">{errors.phone_number}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="address_type" className="aam-label">
              Address type
            </label>
            <div className="relative">
              <select
                name="address_type"
                id="address_type"
                className="aam-input appearance-none"
                onChange={handleChange}
                value={Number(formData.address_type)}>
                <option value={1}>home</option>
                <option value={2}>Office</option>
                <option value={3}>Other</option>
              </select>
              <FaCaretDown className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
              {errors.address_type && <p className="aam-error-label">{errors.address_type}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="area" className="aam-label">
              Search Address
            </label>

            <div className="relative">
              <div className="relative">
                <PlacesAutocomplete value={formData.area} onChange={handleAddressChange} onSelect={handleAddressSelect}>
                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <>
                      <input
                        {...getInputProps({
                          className: 'aam-input',
                          id: 'area',
                          type: 'text',
                          onFocus: () => setSuggesionIsOpen(true),
                          onBlur: () => setSuggesionIsOpen(false),
                        })}
                      />
                      {suggesionIsOpen && suggestions.length > 0 && (
                        <div className="absolute z-10 bg-white rounded-lg shadow-lg w-full mt-1 border border-gray-200 laptop-l:mt-1 max-h-[150px] overflow-y-auto">
                          <ul className="text-[1.4rem] font-normal text-[var(--black)]">
                            {loading && <li className="block px-4 py-[0.8rem] hover:bg-gray-100">Loading...</li>}
                            {!loading &&
                              suggestions.map((suggestion, index) => {
                                const { ...props } = getSuggestionItemProps(suggestion)
                                return (
                                  <li key={index} {...props} className="block px-4 py-[0.8rem] hover:bg-gray-100">
                                    {suggestion?.description}
                                  </li>
                                )
                              })}
                          </ul>
                        </div>
                      )}
                    </>
                  )}
                </PlacesAutocomplete>
                <button
                  className="h-full bg-primary text-white px-4 py-1 rounded-br-lg rounded-tr-lg  absolute top-1/2 right-0 -translate-y-1/2"
                  onClick={handleGooglePinClick}>
                  <MdLocationPin className="h-8 w-8" />
                </button>
              </div>
              {(errors.area && <p className="aam-error-label">{errors.area}</p>) ||
                (isLatLng && <p className="aam-error-label">please select valid address from dropdown</p>)}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="building_number" className="aam-label">
              House number and society
            </label>
            <div>
              <input
                name="building_number"
                id="building_number"
                type="text"
                onChange={handleChange}
                value={formData.building_number}
                className="aam-input"
              />
              {errors.building_number && <p className="aam-error-label">{errors.building_number}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="landmark" className="aam-label">
              Landmark
            </label>
            <div>
              <input name="landmark" id="landmark" type="text" onChange={handleChange} value={formData.landmark} className="aam-input" />
              {errors.landmark && <p className="aam-error-label">{errors.landmark}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="city" className="aam-label">
              City
            </label>
            <div>
              <input name="city" id="city" type="text" onChange={handleChange} value={formData.city} className="aam-input" />
              {errors.city && <p className="aam-error-label">{errors.city}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="pincode" className="aam-label">
              Pincode
            </label>
            <div>
              <input name="pincode" id="pincode" type="text" onChange={handleChange} value={formData.pincode} className="aam-input" />
              {errors.pincode && <p className="aam-error-label">{errors.pincode}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="state" className="aam-label">
              State
            </label>
            <div>
              <input name="state" id="state" type="text" onChange={handleChange} value={formData.state} className="aam-input" />
              {errors.state && <p className="aam-error-label">{errors.state}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="country" className="aam-label">
              Country
            </label>
            <input name="country" id="country" type="text" onChange={handleChange} value={formData.country} className="aam-input" />
            {errors.country && <p className="aam-error-label">{errors.country}</p>}
          </div>

          <div className="flex justify-start items-end">
            <button
              type="submit"
              className="text-white bg-primary text-[1.4rem] font-medium px-6 py-4 rounded-md flex gap-4 items-center"
              disabled={loadingAddAddress || loadingEditAddress}>
              {isEditMode ? (
                loadingEditAddress ? (
                  <>
                    <span className="inline-block h-10 w-10 rounded-full border-4 border-t-white border-white/30 animate-spin"></span>
                    <span>Processing...</span>
                  </>
                ) : (
                  'Edit Address'
                )
              ) : loadingAddAddress ? (
                <>
                  <span className="inline-block h-10 w-10 rounded-full border-4 border-t-white border-white/30 animate-spin"></span>
                  <span>Processing...</span>
                </>
              ) : (
                'Add Address'
              )}
            </button>
          </div>
        </form>
      </div>
      {isMapOpen && (
        <GoogleMap
          setIsMapOpen={setIsMapOpen}
          setFormData={setFormData}
          initialCenter={{
            lat: Number(formData?.lat) || 23.03153299642489,
            lng: Number(formData?.long) || 72.57217419501315,
          }}
          vir={formData}
        />
      )}
    </section>
  )
}

AddAddressModel.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  address: PropTypes.shape({
    address_id: PropTypes.number,
    full_name: PropTypes.string,
    phone_number: PropTypes.string,
    address_type: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    building_number: PropTypes.string,
    area: PropTypes.string,
    lat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    long: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    landmark: PropTypes.string,
    pincode: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    city: PropTypes.string,
    state: PropTypes.string,
    country: PropTypes.string,
  }),
  isEditMode: PropTypes.bool.isRequired,
}

export default AddAddressModel
