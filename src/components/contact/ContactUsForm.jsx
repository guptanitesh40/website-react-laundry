import { useState } from 'react'
import toast from 'react-hot-toast'
import { FiClock, FiPhoneCall } from 'react-icons/fi'
import { MdOutlineEmail } from 'react-icons/md'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  full_name: Yup.string().min(3, 'Full Name must be at least 3 characters').required('Full Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  mobile_number: Yup.string()
    .matches(/^\d{10}$/, 'Mobile Number must be exactly 10 digits')
    .required('Mobile Number is required'),
  message: Yup.string().max(500, "Message can't be more than 500 characters").required('Message is required'),
})

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    mobile_number: '',
    message: '',
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const baseURL = import.meta.env.VITE_BASE_URL
    try {
      await validationSchema.validate(formData, { abortEarly: false })
      setErrors({})
      try {
        const response = await fetch(`${baseURL}/contact-us`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
        const data = await response.json()
        if (response.ok) {
          toast.success(data.message || 'Message sent successfully!', {
            className: 'toast-success',
          })
          setFormData({
            full_name: '',
            email: '',
            mobile_number: '',
            message: '',
          })
        } else {
          toast.error('Failed to send message. Please try again.', {
            className: 'toast-error',
          })
        }
      } catch {
        toast.error('Check your connection and try again.', {
          className: 'toast-error',
        })
      }
    } catch (validationErrors) {
      const formErrors = validationErrors.inner.reduce((acc, error) => {
        acc[error.path] = error.message
        return acc
      }, {})
      setErrors(formErrors)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section-padding">
      <div className="content-container">
        <div className="flex justify-between gap-12 tab-s:gap-8 tab:flex-col tab:gap-12 mb-l:gap-10">
          <div className="basis-[35%] laptop-l:basis-[40%] tab-l:basis-[40%] tab-s:basis-[46%]">
            <h1 className="banner-heading">
              Contact
              <br className="tab:hidden" />
              <span className="hidden tab:inline-block tab:px-2"></span>
              Us
            </h1>

            <div
              className="mt-20 flex flex-col gap-8 text-[1.8rem] text-[var(--grey)] font-medium 
    laptop-l:mt-24 laptop-l:text-[1.6rem] 
    laptop-md:gap-6 laptop-md:mt-16 laptop-md:text-[1.5rem] 
    laptop:text-[1.4rem] laptop-s:mt-12 
    tab-l:mt-20 tab-m:mt-14 tab-s:mt-12 tab-s:gap-4 tab-s:text-[1.2rem] tab:mt-8">
              <div className="flex items-start gap-4 laptop-s:gap-3">
                <FiPhoneCall className="h-[2.4rem] w-[2.4rem] stroke-[var(--black)] laptop-l:h-[2.2rem] laptop-l:w-[2.2rem] laptop-md:h-[2rem] laptop-md:w-[2rem] laptop:h-[1.8rem] laptop:w-[1.8rem] tab-s:h-[1.6rem] tab-s:w-[1.6rem]" />

                <div className="flex flex-col">
                  <span className="font-semibold text-[var(--black)]">Laundry Inquiry :</span>
                  <a href="tel:+919825600838" className="underline">
                    +91 98256 00838
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 laptop-s:gap-3 ">
                <FiPhoneCall className="h-[2.4rem] w-[2.4rem] stroke-[var(--black)] laptop-l:h-[2.2rem] laptop-l:w-[2.2rem] laptop-md:h-[2rem] laptop-md:w-[2rem] laptop:h-[1.8rem] laptop:w-[1.8rem] tab-s:h-[1.6rem] tab-s:w-[1.6rem]" />

                <div className="flex flex-col">
                  <span className="font-semibold text-[var(--black)]">NX Laundry Management :</span>
                  <a href="tel:+919773026100" className="underline">
                    +91 97730 26100
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 laptop-s:gap-3">
                <MdOutlineEmail
                  className="h-[2.4rem] w-[2.4rem] fill-[var(--black)] 
        laptop-l:h-[2.2rem] laptop-l:w-[2.2rem] 
        laptop-md:h-[2rem] laptop-md:w-[2rem] 
        laptop:h-[1.8rem] laptop:w-[1.8rem] 
        tab-s:h-[1.6rem] tab-s:w-[1.6rem]"
                />
                <a href="mailto:sikkacleaners@gmail.com">sikkacleaners@gmail.com</a>
              </div>

              <div className="flex items-start gap-4 laptop-s:gap-3">
                <FiClock
                  className="h-[2.4rem] w-[2.4rem] stroke-[var(--black)] my-2 
        laptop-l:h-[2.2rem] laptop-l:w-[2.2rem] laptop-l:my-1 
        laptop-md:h-[2rem] laptop-md:w-[2rem] 
        laptop:h-[1.8rem] laptop:w-[1.8rem] 
        tab-s:self-start tab-s:my-[2px] tab-s:h-[1.6rem] tab-s:w-[1.6rem]"
                />
                <p className="flex flex-col">
                  Monday to Saturday (10.00 AM to 8.30 PM)
                  <br className="tab:hidden mb-l:block" />
                  <span className="hidden tab:inline-block tab:px-2 mb-l:hidden"></span>
                  Sunday (10.00 AM to 12.30 PM)
                </p>
              </div>
            </div>
          </div>

          <div className="basis-[56.2%] laptop-l:basis-[52.5%] tab-s:flex-grow">
            <div className="contact-form-container">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-y-24 gap-x-16 laptop-l:gap-y-20 laptop-l:gap-x-12 laptop-md:gap-y-14 laptop-md:gap-x-8 laptop-s:gap-y-12 laptop-s:gap-x-6 tab-l:grid-cols-1">
                  <div className="col-span-2 tab-l:col-span-1">
                    <input
                      type="text"
                      name="full_name"
                      aria-label="Full Name"
                      value={formData.full_name}
                      placeholder="Full Name"
                      onChange={handleInputChange}
                    />
                    {errors?.full_name && <span className="error-text">{errors?.full_name}</span>}
                  </div>

                  <div>
                    <input type="email" name="email" aria-label="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
                    {errors?.email && <span className="error-text">{errors?.email}</span>}
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="mobile_number"
                      aria-label="Mobile Number"
                      placeholder="Mobile Number"
                      value={formData.mobile_number}
                      onChange={handleInputChange}
                    />
                    {errors?.mobile_number && <span className="error-text">{errors?.mobile_number}</span>}
                  </div>

                  <div className="col-span-2 tab-l:col-span-1">
                    <textarea
                      rows={6}
                      name="message"
                      aria-label="Write Message"
                      placeholder="Write Message"
                      value={formData.message}
                      onChange={handleInputChange}></textarea>
                    {errors?.message && <span className="error-text">{errors?.message}</span>}
                  </div>

                  <button
                    type="submit"
                    aria-label="send message"
                    title="send message"
                    className={`send-btn justify-self-start ${loading ? 'send-btn-disabled' : ''}`}
                    disabled={loading}>
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUsForm
