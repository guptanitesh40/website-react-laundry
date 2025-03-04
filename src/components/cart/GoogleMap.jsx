import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import PropTypes from "prop-types";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const libraries = ["places"];

const MapComponent = ({ setIsMapOpen, setFormData, initialCenter }) => {
  console.log(initialCenter);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GMAP_API_KEY,
    libraries,
  });

  const [center, setCenter] = useState(initialCenter);
  const [mapInstance, setMapInstance] = useState(null);
  const [address, setAddress] = useState("Fetching location...");

  const getAddressFromCoordinates = async (lat, lng) => {
    if (!window.google) {
      toast.error("Google Maps API is not loaded yet.");
      return;
    }

    try {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results.length > 0) {
          setAddress(results[0].formatted_address);
        } else {
          setAddress("Location not found");
        }
      });
    } catch (error) {
      setAddress("Unable to fetch location");
      toast.error(error);
    }
  };

  const handleCenterChanged = (map) => {
    if (map) {
      setMapInstance(map);
      const newCenter = map.getCenter();
      const lat = newCenter.lat();
      const lng = newCenter.lng();
      setCenter({ lat, lng });
      getAddressFromCoordinates(lat, lng);
    }
  };

  const handleLocationChange = useCallback(() => {
    if (!mapInstance) return;

    const newCenter = mapInstance.getCenter();
    const lat = newCenter.lat();
    const lng = newCenter.lng();

    if (lat !== center.lat || lng !== center.lng) {
      setCenter({ lat, lng });
      getAddressFromCoordinates(lat, lng);
    }
  }, [mapInstance, center]);

  const handleSave = () => {
    setFormData((prev) => ({
      ...prev,
      lat: center?.lat,
      long: center?.lng,
      area: address,
    }));
    setIsMapOpen((prev) => !prev);
  };

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 min-h-screen w-full">
        <div className="bg-white inline-flex gap-4 items-center justify-center px-8 py-4 rounded-md">
          <span className="h-12 w-12 rounded-full border-4 border-black/40 border-t-transparent animate-spin"></span>
          <span className="text-[1.6rem] leading-[1.5] font-medium">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 p-8 bg-black bg-opacity-50 grid place-items-center min-h-screen w-full overflow-auto z-50 mb-l:p-4">
      <div className="bg-white rounded-lg h-full w-full overflow-hidden relative">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={18}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            zoomControl: false,
            disableDefaultUI: true,
            clickableIcons: false,
          }}
          onLoad={(map) => handleCenterChanged(map)}
          onIdle={handleLocationChange}
        />

        <button
          type="button"
          title="close"
          className="absolute top-4 right-4 border border-blue-500 rounded-md inline-flex items-center justify-center text-white focus:outline-none shadow-2xl h-10 w-10 bg-black cursor-pointer"
          onClick={() => setIsMapOpen((prev) => !prev)}
        >
          <IoClose className="h-8 w-8 tab-s:h-6 tab-s:w-6" />
        </button>

        <span className="inline-block absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
          {/* <MdLocationPin className="h-16 w-16 fill-red-600" /> */}
          <span className="inline-block h-8 w-8 rounded-full border-4 border-indigo-600"></span>
        </span>

        <div className="absolute bottom-4 right-0 left-0 h-auto">
          <div className="max-w-md bg-white mx-auto rounded-lg flex flex-col gap-4 p-2 border border-gray-400 text-[1.6rem]">
            <p className="px-1 leading-[2rem] text-[var(--black)]">{address}</p>
            <button
              className="self-center bg-primary text-white py-1 px-4 rounded-lg"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

MapComponent.propTypes = {
  setIsMapOpen: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
  initialCenter: PropTypes.object.isRequired,
};

export default MapComponent;
