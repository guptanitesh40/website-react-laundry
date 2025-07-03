import { CreditCard } from '@mui/icons-material'
import { CalendarCheck, MapPin } from 'lucide-react'

const Download = () => {
  return (
    <section className="space-xl">
      <div className="secondary-container">
        <div className="download p-10 tab-m:flex tab-m:flex-col tab-m:items-center tab-m:justify-center ">
          <div className="basis-1/2 text-center relative mb-l:basis-full">
            <span className="mobile-img-container">
              <img src="/mobile.png" alt="Mobile" className="mobile" />
            </span>
          </div>
          <div className="basis-1/2 tab-s:pr-6 tab:pr-0 tab:order-1 mb-l:basis-full mb-l:p-4">
            <div className=" mx-auto w-[90%] laptop-l:w-[80%] laptop-m:w-[90%] space-y-10 laptop-md:space-y-8 tab-l:w-[95%] tab-m:w-[70%] tab-s:w-[70%] mobile:w-full tab-s:space-y-6 tab:text-center tab:pb-8 tab-l:space-y-6">
              <h2 className="text-4xl font-extrabold text-gray-900 leading-tight tab-m:mt-10 tab-m:justify-self-center">Download Our Laundry App</h2>

              <p className="text-lg text-gray-700 leading-relaxed tab:text-start">
                Experience convenience at your fingertips! With the <strong className="font-semibold text-gray-800">Sikka Cleaners</strong> app, you
                can schedule pickups, track your orders in real-time, and make secure payments — all from your phone.
              </p>

              <p className="text-base text-gray-600 leading-relaxed tab:text-start">Enjoy seamless laundry services anytime, anywhere.</p>

              <ul className="space-y-6 text-gray-800 flex flex-col items-start !mt-10 tab-m:mx-auto mb-s:items-center">
                <li className="flex gap-4 items-center mb-s:flex-col">
                  <div className="flex items-center justify-center h-11 w-11 rounded-full bg-blue-100">
                    <CalendarCheck className="h-7 w-7 text-blue-600" />
                  </div>
                  <span className="text-md font-medium leading-snug mb-x:text-2xl">Schedule Pickups in Seconds</span>
                </li>

                <li className="flex gap-4 items-center mb-s:flex-col">
                  <div className="flex items-center justify-center h-11 w-11 rounded-full bg-green-100">
                    <MapPin className="h-7 w-7 text-green-600" />
                  </div>
                  <span className="text-md font-medium leading-snug mb-x:text-2xl">Track Your Order Live</span>
                </li>

                <li className="flex gap-4 items-center mb-s:flex-col">
                  <div className="flex items-center justify-center h-11 w-11 rounded-full bg-purple-100">
                    <CreditCard className="h-7 w-7 text-purple-600" />
                  </div>
                  <span className="text-md font-medium leading-snug mb-x:text-2xl">Pay Securely with One Tap</span>
                </li>
              </ul>

              <p className="text-base text-gray-600 leading-relaxed !mt-8 tab:text-start">Get started today — download the app and simplify your laundry routine!</p>

              <div className="flex items-center flex-wrap gap-10 laptop-md:gap-8 laptop:gap-6 tab-l:gap-6 tab-m:justify-self-center tab-y:justify-center tab-s:flex-wrap tab:justify-center pt-2">
                <a href="https://play.google.com/store/apps/details?id=com.sikkacleaners.customer&pli=1" target="_blank" rel="noopener noreferrer">
                  <img
                    src="/branding-logos/GooglePlay.svg"
                    alt="Get it on Google Play"
                    className="h-24 w-auto object-contain hover:scale-105 transition-transform duration-200"
                  />
                </a>

                {/* <a href="https://apps.apple.com/us/app/whatsapp-messenger/id310633997" target="_blank" rel="noopener noreferrer">
                  <img
                    src="/branding-logos/AppStore.svg"
                    alt="Download on the App Store"
                    className="h-24 w-auto object-contain hover:scale-105 transition-transform duration-200"
                  />
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Download
