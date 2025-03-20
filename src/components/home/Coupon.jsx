import { useSelector } from "react-redux";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useState } from "react";

const Coupon = () => {
  const [isCopyDisabled, setIsCopyDisabled] = useState(false);
  let { home_promotion_banner_website, home_banner_image } = useSelector(
    (state) => state.setting.settings
  );

  if (!home_promotion_banner_website || !home_banner_image) {
    return null;
  }

  const { offer_validity, price, title, promotion_code } = JSON.parse(
    home_promotion_banner_website
  );

  const onCopyCodeClick = async () => {
    if (isCopyDisabled) return;

    setIsCopyDisabled(true);
    setTimeout(() => setIsCopyDisabled(false), 5000);

    try {
      await navigator.clipboard.writeText(promotion_code);
      toast.success(`Coupon code copied successfully`, {
        className: "toast-success",
      });
    } catch {
      toast.error("Failed to copy code. Please try again.", {
        className: "toast-error",
      });
    }
  };

  return (
    <section className="space-xl">
      <div className="secondary-container">
        <div className="p-16 bg-[url('/cupon-bg.png')] bg-cover bg-center laptop-m:p-14 laptop-s:p-12 tab-l:p-10 tab-m:p-10 tab-s:p-8 tab:p-6 mb-l:p-4 mb:p-6">
          <article className="border-4 border-white flex items-center laptop-s:border-[3px] tab-m:border-2 tab:border mb:flex-col mb:items-stretch mb:gap-0">
            <div className="basis-1/2 text-center">
              <img
                src={home_banner_image}
                alt="Surprised girl representing an exciting coupon offer"
                loading="lazy"
                className="inline-block w-full max-w-[75%] h-auto tab:max-w-[85%] tab:min-w-[19rem] mb-l:max-w-[90%] mb-l:min-w-[13rem] mb:hidden"
              />
            </div>
            <div className="basis-1/2 text-white p-20  flex flex-col items-start gap-10 laptop-l:p-16 laptop-m:p-12 laptop-l:gap-8 laptop:gap-6 laptop-s:p-8 tab-l:p-4 tab-l:gap-4 tab-s:p-2 tab:gap-3 mb-l:gap-2 mb:items-center mb:gap-4">
              <p className="uppercase text-[2.4rem] laptop-l:text-[2rem] laptop-m:text-[1.8rem] laptop-s:text-[1.6rem] tab-s:text-[1.4rem] tab:text-[1.2rem] tab:leading-[1.2] mb-l:text-[1rem]">
                {title}
              </p>
              <p className="text-[3.4rem] laptop-l:text-[2.8rem] font-bold laptop-m:text-[2.4rem] laptop-s:text-[2rem] tab-s:text-[1.8rem] tab:text-[1.6rem] tab:leading-[1] mb-l:text-[1.4rem]">
                @ RS. {price}/- ONLY
              </p>
              {promotion_code && (
                <>
                  <div className="inline-block border overflow-hidden border-white rounded-md font-semibold text-[2rem] laptop-l:text-[1.8rem] laptop-m:text-[1.6rem] laptop-s:text-[1.4rem] tab-s:text-[1.2rem] tab:text-[1rem] tab:border-[0.5px] tab:rounded mb-l:text-[0.8rem]">
                    <button
                      className="cursor-default p-8 laptop-l:p-6 laptop-m:p-5 laptop-s:p-4 inline-block uppercase tab-s:px-3 tab:px-2 tab:py-3"
                      title={promotion_code}
                      aria-label="Click to avail the steal deal"
                    >
                      {promotion_code}
                    </button>
                    <button
                      className={`bg-white p-8 laptop-l:p-6 laptop-m:p-5 laptop-s:p-4 inline-block text-[#0092C8] uppercase tab-s:px-3 tab:px-2 tab:py-3 ${
                        isCopyDisabled ? "cursor-default" : "cursor-pointer"
                      }`}
                      title="copy code"
                      aria-label="copy the code"
                      onClick={onCopyCodeClick}
                    >
                      COPY CODE
                    </button>
                  </div>
                  <span className="laptop-m:text-[1.4rem] laptop-s:text-[1.2rem] tab-s:text-[1rem] tab:text-[0.8rem] mb-l:text-[0.6rem]">
                    Valid till: {dayjs(offer_validity).format("DD MMM YYYY")}
                  </span>
                </>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Coupon;
