const Download = () => {
  return (
    <section className="space-xl">
      <div className="secondary-container">
        <div className="download">
          <div className="basis-1/2 text-center relative mb-l:basis-full">
            <span className="mobile-img-container">
              <img src="/mobile.png" alt="Mobile" className="mobile" />
            </span>
          </div>
          <div className="basis-1/2 tab-s:pr-6 tab:pr-0 tab:order-1 mb-l:basis-full mb-l:p-4">
            <div className="w-[73%] laptop-l:w-[80%] laptop-m:w-[90%] space-y-10 laptop-md:space-y-8 tab-l:w-[95%] tab-s:w-full tab-s:space-y-4 tab:text-center tab:pb-8 tab-l:space-y-6">
              <h2>Download Our laundry App</h2>
              <p className="tab:inline-block tab:max-w-[32rem] tab:text-center">
                Lorem ipsum dolor sit amet consectetur adipiscing elit in
                consequat sollicitudin adipiscing facilisi sit et hendrerit
                diam.
              </p>
              <div className="flex items-center flex-wrap gap-12 laptop-md:gap-10 laptop:gap-8 tab-l:gap-6 tab-s:flex-wrap tab:justify-center">
                <a
                  href="https://play.google.com/store/apps/details?id=com.dts.freefiremax"
                  target="__blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/branding-logos/GooglePlay.svg"
                    alt="Get it on Google Play"
                    className="h-28 w-auto object-contain laptop-l:h-24 laptop-md:h-20 laptop:h-[4.5rem] laptop-s:h-16"
                  />
                </a>

                <a
                  href="https://apps.apple.com/us/app/whatsapp-messenger/id310633997"
                  target="__blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/branding-logos/AppStore.svg"
                    alt="Download on the App Store"
                    className="h-28 w-auto object-contain laptop-l:h-24 laptop-md:h-20 laptop:h-[4.5rem] laptop-s:h-16"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Download;
