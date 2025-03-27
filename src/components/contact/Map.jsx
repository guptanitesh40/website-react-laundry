import { useState } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const points = [
  {
    lat: 23.095483542678874,
    lng: 72.4947794841833,
  },
  {
    lat: 23.057527246370075,
    lng: 72.53463592067385,
  },
  {
    lat: 23.054375676135088,
    lng: 72.54428865138641,
  },
  {
    lat: 23.0918625,
    lng: 72.4943784,
  }
];

const Map = () => {
  const [activeBranch, setActiveBranch] = useState(0);
  const [zoom, setZoom] = useState(13);

  const handleBranchClick = (branch_id) => {
    setActiveBranch(branch_id);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GMAP_API_KEY,
  });

  return (
    <section className="section-padding">
      <div className="content-container">
        <div className="flex items-center justify-between gap-20 laptop-l:gap-28 laptop-m:gap-24 laptop:gap-20 tab-l:gap-16 tab-s:flex-wrap tab-s:justify-center tab:gap-12 mb-l:gap-8 mb:gap-6">
          <div className="map-wrapper">
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={points[activeBranch]}
                zoom={zoom}
                options={{
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
                  zoomControl: false,
                  disableDefaultUI: true,
                  clickableIcons: false,
                }}
              >
                {points.map((point, index) => (
                  <MarkerF key={index} position={point} />
                ))}
              </GoogleMap>
            )}
          </div>

          <div className="basis-[31%] laptop-l:basis-[37.5%] laptop:basis-[40%] laptop-s:basis-[32.5%] tab-l:basis-[30%] tab-s:basis-[54rem]">
            <div className="flex flex-col gap-12 laptop-l:gap-20 laptop-s:gap-16 tab-s:gap-14 tab:gap-12 mb-l:gap-8 mb:gap-6">
              <div className="flex flex-col gap-12 laptop-l:gap-8 laptop-m:gap-6 laptop-s:gap-4 mb:gap-3">
                <div className="flex items-center justify-start gap-8 laptop-l:gap-6 laptop-m:gap-4 laptop-s:gap-3">
                  <SlLocationPin className="h-12 w-12 fill-[var(--secondary)] laptop-l:h-10 laptop-l:w-10 laptop-m:h-8 laptop-m:w-8 laptop-s:h-[1.75rem] laptop-s:w-[1.75rem]" />
                  <h4
                    className="text-[2.6rem] leading-[1] font-bold cursor-pointer laptop-l:text-4xl laptop-m:text-3xl laptop-s:text-2xl"
                    role="button"
                    onClick={() => {
                      handleBranchClick(1);
                      setZoom(18);
                    }}
                  >
                    Memnagar Branch
                  </h4>
                </div>
                <p className="text-[1.8rem] leading-[1.68] font-medium laptop-l:text-[1.6rem] laptop-m:text-[1.4rem] laptop-s:text-[1.2rem]">
                  57, Kamal Society, Opp.Jain Derasar, B/S Tarun Nagar-3,
                  Nr.Subhash Chowk, Memnagar, Ahmedabad - 380052, Gujarat, India
                </p>
                <div className="flex items-center gap-4 text-[1.8rem] font-medium laptop-l:text-[1.6rem] laptop-m:text-[1.4rem] laptop-m:gap-3 laptop:flex-wrap laptop-s:text-[1.2rem]">
                  <FiPhoneCall className="h-[2.4rem] w-[2.4rem] stroke-[var(--black)] laptop-l:h-[2.2rem] laptop-l:w-[2.2rem] laptop-m:h-[1.75rem] laptop-m:w-[1.75rem] laptop-s:h-6 laptop-s:w-6" />
                  <a
                    href="tel:9712926934"
                    aria-label="Call 9712926934"
                    className="underline"
                  >
                    +91-9712926934
                  </a>
                  <span>|</span>
                  <a
                    href="tel:07927414934"
                    aria-label="Call 079-27414934"
                    className="underline"
                  >
                    079-27414934
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-12 laptop-l:gap-8 laptop-m:gap-6 laptop-s:gap-4 mb:gap-3">
                <div className="flex items-center gap-8 laptop-l:gap-6 laptop-m:gap-4 laptop-s:gap-3">
                  <SlLocationPin className="h-12 w-12 fill-[var(--secondary)] laptop-l:h-10 laptop-l:w-10 laptop-m:h-8 laptop-m:w-8 laptop-s:h-[1.75rem] laptop-s:w-[1.75rem]" />
                  <h4
                    className="text-[2.6rem] leading-[1] font-bold cursor-pointer laptop-l:text-4xl laptop-m:text-3xl laptop-s:text-2xl"
                    role="button"
                    onClick={() => {
                      handleBranchClick(2);
                      setZoom(18);
                    }}
                  >
                    Naranpura Branch
                  </h4>
                </div>
                <p className="text-[1.8rem] leading-[1.68] font-medium laptop-l:text-[1.6rem] laptop-m:text-[1.4rem] laptop-s:text-[1.2rem]">
                  Shop No: B/12, Arjun Elegance, Opp. Bhaghirath Soc. & S.P.
                  Ladies Hostel, Divyapath School, Memnagar Road, Naranpura,
                  Ahmedabad - 380051, Gujarat, India.
                </p>
                <div className="flex items-center gap-4 text-[1.8rem] font-medium laptop-l:text-[1.6rem] laptop-m:text-[1.4rem] laptop-m:gap-3 laptop-s:text-[1.2rem]">
                  <FiPhoneCall className="h-[2.4rem] w-[2.4rem] stroke-[var(--black)] laptop-l:h-[2.2rem] laptop-l:w-[2.2rem] laptop-m:h-[1.75rem] laptop-m:w-[1.75rem] laptop-s:h-6 laptop-s:w-6" />
                  <a
                    href="tel:9409420403"
                    aria-label="Call 9409420403"
                    className="underline"
                  >
                    +91-9409420403
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-12 laptop-l:gap-8 laptop-m:gap-6 laptop-s:gap-4 mb:gap-3">
                <div className="flex items-center gap-8 laptop-l:gap-6 laptop-m:gap-4 laptop-s:gap-3">
                  <SlLocationPin className="h-12 w-12 fill-[var(--secondary)] laptop-l:h-10 laptop-l:w-10 laptop-m:h-8 laptop-m:w-8 laptop-s:h-[1.75rem] laptop-s:w-[1.75rem]" />
                  <h4
                    className="text-[2.6rem] leading-[1] font-bold cursor-pointer laptop-l:text-4xl laptop-m:text-3xl laptop-s:text-2xl"
                    role="button"
                    onClick={() => {
                      handleBranchClick(3);
                      setZoom(18);
                    }}
                  >
                    Science City Branch
                  </h4>
                </div>
                <p className="text-[1.8rem] leading-[1.68] font-medium laptop-l:text-[1.6rem] laptop-m:text-[1.4rem] laptop-s:text-[1.2rem]">
                Shop no. 4, Tatvam pride Besides, Adani Gas CNG Station, 
                circle, Sardar Patel Ring Rd, opposite Club Babylon, 
                in front of Ganesh Elegance, Ahmedabad - 380060, Gujarat, India.
                </p>
                <div className="flex items-center gap-4 text-[1.8rem] font-medium laptop-l:text-[1.6rem] laptop-m:text-[1.4rem] laptop-m:gap-3 laptop-s:text-[1.2rem]">
                  <FiPhoneCall className="h-[2.4rem] w-[2.4rem] stroke-[var(--black)] laptop-l:h-[2.2rem] laptop-l:w-[2.2rem] laptop-m:h-[1.75rem] laptop-m:w-[1.75rem] laptop-s:h-6 laptop-s:w-6" />
                  <a
                    href="tel:9409420403"
                    aria-label="Call 9409420403"
                    className="underline"
                  >
                    +91-9512600839
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-12 laptop-l:gap-8 laptop-m:gap-6 laptop-s:gap-4 mb:gap-3">
                <div className="flex items-center gap-8 laptop-l:gap-6 laptop-m:gap-4 laptop-s:gap-3">
                  <SlLocationPin className="h-12 w-12 fill-[var(--secondary)] laptop-l:h-10 laptop-l:w-10 laptop-m:h-8 laptop-m:w-8 laptop-s:h-[1.75rem] laptop-s:w-[1.75rem] " />
                  <h4
                    className="text-[2.6rem] leading-[1] font-bold cursor-pointer laptop-l:text-4xl laptop-m:text-3xl laptop-s:text-2xl"
                    role="button"
                    onClick={() => {
                      handleBranchClick(0);
                      setZoom(18);
                    }}
                  >
                    Workshop
                  </h4>
                </div>
                <p className="text-[1.8rem] leading-[1.68] font-medium laptop-l:text-[1.6rem] laptop-m:text-[1.4rem] laptop-s:text-[1.2rem]">
                  Shop No: 5B, ajanta sheds, in shrijee estate, B/H,
                  bharataluminum, near. IRIS Automation, nr, santej - vadsar
                  road canal, santej, Ghandhinagar - 382721, Gujarat, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;
