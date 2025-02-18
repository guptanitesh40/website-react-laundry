import Shimmer from "./Shimmer";
import { useSelector } from "react-redux";
import useFetchPrices from "../../hooks/prices/useFetchPrices";

const PriceList = () => {
  const { prices, loading: loadingGerPrices } = useFetchPrices();
  const price_pdf_url = useSelector(
    (state) => state?.setting?.settings?.price_pdf_url
  );

  return loadingGerPrices ? (
    <Shimmer />
  ) : (
    <>
      <section className="section-space">
        <div className="container-b">
          <div className="price-list-container text-white px-28 py-32 laptop-l:px-24 laptop-l:py-28 laptop-md:px-20 laptop-md:py-24 laptop:px-[4.5rem] laptop:py-[5.5rem] laptop-s:px-14 laptop-s:py-16 tab-s:p-12 tab:p-10 mb-l:p-8">
            <div className="flex justify-between items-center pb-28 laptop-l:pb-[5.5rem] laptop-md:pb-20 laptop:pb-16 laptop-s:pb-14 tab-s:pb-10 tab-s:flex-wrap tab-s:gap-8 tab:gap-6 mb-l:justify-center">
              <h2 className="tracking-[2px] text-inherit laptop-l:tracking-[1.5px] laptop-md:tracking-[1px] mb-l:text-center">
                Best Quality at{" "}
                <span className="text-[var(--secondary)]">
                  REASONABLE PRICING
                </span>
              </h2>
              <div>
                <a
                  href={price_pdf_url}
                  aria-label="Check price list pdf"
                  target="__blank"
                  rel="noopener noreferrer"
                  className="price-list-btn"
                >
                  Check Price List
                </a>
              </div>
            </div>
            <div className="prices-card grid grid-cols-4 gap-24 laptop-l:gap-20 laptop-md:gap-16 tab-m:gap-12">
              {prices.map((item) => {
                const {
                  price_content_id,
                  category_name,
                  price,
                  service_names,
                } = item;

                return (
                  <div
                    key={price_content_id}
                    className={`border border-white/20 rounded-3xl px-20 py-24 flex flex-col items-start gap-16 hover:border-white transition-all duration-200 laptop-l:px-14 laptop-l:py-16 laptop-l:gap-12 laptop-l:rounded-2xl laptop-md:py-16 laptop-md:px-12 laptop-md:gap-10 laptop-md:border-[0.8px] laptop:px-10 laptop:py-12 laptop:gap-8 laptop:rounded-xl laptop-s:px-8 laptop-s:py-10 tab-l:gap-6 tab-s:py-8 tab-s:px-6 tab-s:gap-8 tab:p-10 mb-l:p-8 mb:rounded-lg`}
                  >
                    <span className="tag">{category_name}</span>
                    <div className="flex items-end tracking-widest">
                      <h3 className="text-inherit text-[4.6rem] leading-[5rem] font-bold laptop-l:text-[3.2rem] laptop-l:leading-[4.2rem] laptop-md:text-[2.8rem] laptop-md:leading-[3.4rem] laptop:text-[2.8rem] laptop:leading-[3rem] laptop-s:text-[2.4rem] laptop-s:leading-[2.8rem] tab-s:leading-[2.4rem] tab:text-[2rem]">
                        &#8377;{price}
                      </h3>
                      <span className="text-[2.2rem] font-medium laptop-l:text-[1.6rem] laptop-l:tracking-normal laptop-md:text-[1.5rem] laptop:text-[1.4rem] laptop-s:text-[1.2rem] tab-s:text-base">
                        /Onwards
                      </span>
                    </div>
                    <ul className="card-service-list w-full flex flex-col gap-8 laptop-s:gap-6">
                      {service_names.map((service_name) => {
                        return <li key={service_name}>{service_name}</li>;
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PriceList;
