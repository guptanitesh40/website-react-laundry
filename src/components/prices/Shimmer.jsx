const Shimmer = () => {
  return (
    <section className="section-space bg-black/50">
      <div className="container">
        <div className="border border-gray-200 px-28 py-32 rounded-[2.5rem] laptop-l:rounded-[2rem] laptop-l:px-24 laptop-l:py-28 laptop-md:px-20 laptop-md:py-24 laptop:px-[4.5rem] laptop:py-[5.5rem] laptop-s:px-14 laptop-s:py-16 tab-s:p-12 tab:p-10 mb-l:p-8">
          <div className="flex justify-between flex-wrap pb-28 laptop-l:pb-20">
            <div className="basis-1/2 bg-gray-200 rounded-md h-24 animate-pulse laptop-l:h-[4.5rem]"></div>
            <div className="h-24 w-80 bg-gray-200 rounded-full animate-pulse laptop-l:h-[4.5rem] laptop-l:w-60"></div>
          </div>
          <div className="grid grid-cols-4 gap-24 laptop-l:gap-20 laptop-md:gap-16 tab-m:gap-12">
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-3xl px-20 py-24 flex flex-col items-start gap-16 laptop-l:px-14 laptop-l:py-16 laptop-l:gap-12 laptop-l:rounded-2xl laptop-md:py-16 laptop-md:px-12 laptop-md:gap-10 laptop-md:border-[0.8px] laptop:px-10 laptop:py-12 laptop:gap-8 laptop:rounded-xl laptop-s:px-8 laptop-s:py-10 tab-l:gap-6 tab-s:py-8 tab-s:px-6 tab-s:gap-8 tab:p-10 mb-l:p-8 mb:rounded-lg"
              >
                <span className="inline-block w-48 h-24 rounded-full bg-gray-200 animate-pulse laptop-l:h-[4.5rem] laptop-l:w-40"></span>
                <div className="self-stretch h-20 bg-gray-200 rounded-md animate-pulse laptop-l:h-16"></div>
                <ul className="self-stretch flex flex-col gap-10">
                  <li className="flex justify-between gap-4 laptop-l:gap-6">
                    <span className="inline-block h-10 w-10 bg-gray-200 rounded-md"></span>
                    <div className="grow bg-gray-200 rounded-md animate-pulse"></div>
                  </li>
                  <li className="flex justify-between gap-4 laptop-l:gap-6">
                    <span className="inline-block h-10 w-10 bg-gray-200 rounded-md"></span>
                    <div className="grow bg-gray-200 rounded-md animate-pulse"></div>
                  </li>
                  <li className="flex justify-between gap-4 laptop-l:gap-6">
                    <span className="inline-block h-10 w-10 bg-gray-200 rounded-md"></span>
                    <div className="grow bg-gray-200 rounded-md animate-pulse"></div>
                  </li>
                  <li className="flex justify-between gap-4 laptop-l:gap-6">
                    <span className="inline-block h-10 w-10 bg-gray-200 rounded-md"></span>
                    <div className="grow bg-gray-200 rounded-md animate-pulse"></div>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shimmer;
