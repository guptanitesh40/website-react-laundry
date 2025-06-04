const ServiceList = () => {

  return (
    <section className="section-space">
      <div className="full-width relative pb-[30rem] laptop-l:pb-[27rem] laptop-m:pb-[25rem] laptop-s:pb-[20rem] tab-m:pb-[22rem] tab-s:pb-0 tab:pb-0 tab:px-10 tab:space-y-0 mb-l:px-8 mb:px-6">
        <img
          src="/clothes-collection.png"
          alt="Clothes Collection Image"
          className="tab:rounded-t-lg"
        />
        <div className="sm-services px-20 py-24 laptop-l:px-24 laptop-l:py-28 laptop-m:px-16 laptop-m:py-20 laptop-s:px-12 laptop-s:py-16 tab-l:px-10 tab-l:py-14 tab-s:px-8 tab-s:py-12 tab:py-8 mb:p-6">
          <div className="floated-container">
            <h2 className="pb-16 laptop-l:pb-16 laptop-m:pb-12 laptop-s:pb-10 tab-m:pb-8 tab-s:pb-8 mb-l:pb-6">
              Corporate & Special Item Services
            </h2>
            <h3 className="mb-16">
              We also provide customized laundry and care services for
              businesses, events, and bulk orders:
            </h3>
            <div className="flex justify-between items-start gap-8 tab:flex-col tab:items-stretch">
              <div>
                <ul className="sr-list">
                  <li>
                    Dry cleaning and steam press for heavy traditional and
                    designer wear
                  </li>
                  <li>Suit, safari suits, sherwanis, and safas</li>
                  <li>Saree roll-press and steam-press</li>
                  <li>Curtain washing, dry cleaning, and pressing</li>
                  <li>Blanket and quilt cleaning</li>
                </ul>
              </div>
              <div>
                <ul className="sr-list">
                  <li>Travel bag and beading services</li>
                  <li>Toys and children’s clothing cleaning</li>
                  <li>
                    Full household item care (pillows, cushions, linens, etc.)
                  </li>
                  <li>Purse, shoes, and leather item cleaning</li>
                  <li>Regular corporate laundry and fold/press services</li>
                </ul>
              </div>
            </div>
            <div className="mt-10 pt-12 px-30 text-center space-y-6 laptop-m:mt-16 laptop:mt-6 laptop-s:mt-6 tab-s:mt-1">
              <h3 className="font-semibold px-6">
                Experience the difference in quality and care.
              </h3>
              <p className="max-w-3xl mx-auto laptop:text-[1.2rem] text-gray-700 px-6">
                Whether it’s a single garment or a large corporate order, we’re
                here to make laundry day effortless for you.
              </p>
            </div>
            <div className="text-center mt-20 laptop-m:mt-10 tab-m:mt-8 tab:mt-6">
              {" "}
              <a
                href="/terms-condition"
                target="__blank"
                className="corporate-tc-link"
              >
                Term & conditions for corporate laundry service
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
  
};

export default ServiceList;
