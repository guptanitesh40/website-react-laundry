import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="section-space">
      <div className="secondary-container">
        <div className="flex items-start justify-start relative tab-s:items-stretch tab:flex-col tab:gap-12 mb-l:gap-8 star-psudo">
          <div className="basis-[50%] tab:flex tab:justify-between tab:items-center">
            <h2 className="banner-title mb-20 laptop-l:mb-16 laptop-md:mb-12 laptop-s:mb-8 tab-s:mb-12 tab:mb-0 tab:flex-wrap">
              Laundry
              <span className="hidden tab:inline-block px-2"></span>
              <br className="tab:hidden" />
              Service
            </h2>
            <Link
              to="/contact"
              className="primary-button"
              aria-label="contact us"
              title="contact us"
            >
              Contact Us
            </Link>
          </div>
          <div className="basis-[45%] space-y-16 laptop-md:space-y-12 laptop-m:space-y-10 laptop-m:basis-[50%] laptop-s:space-y-8 tab-m:space-y-6">
            <p className="para2">
              We offer a wide range of professional laundry and cleaning
              services tailored to meet the needs of individuals and businesses
              alike. From delicate garments to heavy household items, our expert
              care ensures your items are cleaned and handled with the utmost
              precision.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
