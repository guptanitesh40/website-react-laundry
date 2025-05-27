import { Link } from "react-router-dom";

const Services = () => {
  return (
    <section className="space-xl">
      <div className="secondary-container">
        <div className="flex justify-between items-start mb-16 laptop-m:mb-14 laptop:mb-12 laptop-s:mb-10 tab-l:mb-9 tab-s:mb-8 mb-l:flex-wrap mb-l:gap-6">
          <div className="tab:self-stretch">
            <p className="section-title">Our Services List</p>
            <h2>Services We’re Offering</h2>
          </div>
          <Link
            to="/order-now"
            className="btn"
            role="button"
            title="Explore More"
          >
            Explore More
          </Link>
        </div>

        <div className="flex justify-between tab-s:flex-col tab-m:gap-10">
          <div className="shadow basis-[31%] rounded-3xl py-24 px-20 bg-[#F7F8FD] laptop-l:py-20 laptop-l:px-16 laptop-m:py-16 laptop-m:px-12 laptop:py-14 laptop:px-10 laptop:rounded-2xl laptop-s:py-12 laptop-s:px-8 tab-l:px-6 tab-l:py-10 tab-l:rounded-xl tab-s:p-8 mb:p-6">
            <div className="flex flex-col items-center gap-16 laptop-l:gap-14 laptop-md:gap-12 laptop-m:gap-10 laptop:gap-10 tab-l:gap-8 tab-s:gap-6">
              <div className="h-40 laptop-l:h-32 laptop-m:h-28 laptop:h-24 laptop-s:h-20 tab-s:h-24 tab:h-20 mb-l:h-16">
                <img
                  src="/services-laundry.png"
                  alt="Professional laundry service"
                  className="inline-block laptop-m:max-h-full laptop:h-28 laptop:w-auto tab-m:h-20"
                />
              </div>
              <div className="flex flex-col items-center gap-6 laptop-m:gap-4 laptop-s:gap-3 tab-m:gap-2">
                <h3>Laundry</h3>
                <p className="content text-center">
                  We are professional cleaners in delivering you the highest
                  quality of services in laundry
                </p>
              </div>
            </div>
          </div>
          <div className="shadow basis-[31%] rounded-3xl py-24 px-20 bg-[#F7F8FD] laptop-l:py-20 laptop-l:px-16 laptop-m:py-16 laptop-m:px-12 laptop:py-14 laptop:px-10 laptop:rounded-2xl laptop-s:py-12 laptop-s:px-8 tab-l:px-6 tab-l:py-10 tab-l:rounded-xl tab-s:p-8">
            <div className="flex flex-col items-center gap-16 laptop-l:gap-14 laptop-md:gap-12 laptop-m:gap-10 laptop:gap-10 tab-l:gap-8 tab-s:gap-6">
              <div className="h-40 laptop-l:h-32 laptop-m:h-28 laptop:h-24 laptop-s:h-20 tab-s:h-24 tab:h-20 mb-l:h-16">
                <img
                  src="/services-dry.png"
                  alt="Professional dry cleaning service"
                  className="inline-block laptop-m:max-h-full tab-m:h-20"
                />
              </div>
              <div className="flex flex-col items-center gap-6 laptop-m:gap-4 laptop-s:gap-3 tab-m:gap-2">
                <h3>Dry Cleaning</h3>
                <p className="content text-center">
                  We are professional cleaners in delivering the highest quality
                  dry cleaning services.
                </p>
              </div>
            </div>
          </div>
          <div className="shadow basis-[31%] rounded-3xl py-24 px-20 bg-[#F7F8FD] laptop-l:py-20 laptop-l:px-16 laptop-m:py-16 laptop-m:px-12 laptop:py-14 laptop:px-10 laptop:rounded-2xl laptop-s:py-12 laptop-s:px-8 tab-l:px-6 tab-l:py-10 tab-l:rounded-xl tab-s:p-8">
            <div className="flex flex-col items-center gap-16 laptop-l:gap-14 laptop-md:gap-12 laptop-m:gap-10 laptop:gap-10 tab-l:gap-8 tab-s:gap-6">
              <div className="h-40 laptop-l:h-32 laptop-m:h-28 laptop:h-24 laptop-l:w-32 laptop-s:h-20 laptop-s:w-28 tab-s:h-24 tab:h-20 mb-l:h-16 mb-l:w-24">
                <img
                  src="/services-estree.png"
                  alt="Steam ironing service"
                  className="inline-block laptop-m:max-h-full tab-m:h-20"
                />
              </div>
              <div className="flex flex-col items-center gap-6 laptop-m:gap-4 laptop-s:gap-3 tab-m:gap-2">
                <h3>Steam Iron</h3>
                <p className="content text-center">
                  We do no more burnt or stained clothes. We deliver clean and
                  presses clothes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
