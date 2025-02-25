import Filter from "./Filter";
import SelectClothes from "./SelectClothes";
import Cart from "./Cart";

const ServiceContainer = () => {
  return (
    <section className="pt-16 pb-48 laptop-l:pt-12 laptop-l:pb-40 laptop-md:pb-32 laptop:pb-24 laptop-s:pt-10 laptop-s:pb-20 tab-s:pb-16 tab:py-8">
      <div className="services-con-container">
        <div className="flex items-start justify-between gap-12 laptop-l:gap-14 laptop:gap-10 laptop-s:gap-8 tab-l:gap-16 tab-s:gap-10 tab-s:flex-wrap tab:flex-col tab:items-start mb-l:gap-8">
          <div className="basis-[27.78%] laptop-l:basis-1/4 flex flex-col gap-12 laptop-l:gap-10 laptop-md:gap-8 laptop:basis-[26%] tab-l:basis-[35%] tab-s:min-w-[25rem] tab-s:gap-10 tab:w-[37.5rem] mb-l:w-full mb-l:gap-8">
            <Filter />
            <div className="hidden tab-l:block tab:row-span-2 tab:items-center">
              <Cart />
            </div>
          </div>
          <div className="basis-[45.8%] laptop-md:grow tab-l:order-first tab:min-w-full tab:max-w-full">
            <SelectClothes />
          </div>
          <div className="basis-[21.45%] laptop-l:basis-[22.5%] laptop:basis-[23.5%] tab-l:hidden">
            <Cart />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceContainer;
