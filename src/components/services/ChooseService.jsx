import { useEffect } from "react";
import Loading from "../loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedServiceId } from "../../redux/slices/serviceSlice";
import useFetchServices from "../../hooks/services/useFetchServices";
import useFetchCategories from "../../hooks/services/useFetchCategories";
import {
  setCategories,
  setSelectedCategoryId,
} from "../../redux/slices/categorySlice";

const ChooseService = () => {
  const { services, loading } = useFetchServices();
  const { fetchCategories } = useFetchCategories();
  const dispatch = useDispatch();
  const selectedServiceId = useSelector(
    (state) => state.service.selectedServiceId
  );

  const handleServiceClick = async (id) => {
    dispatch(setSelectedServiceId(id));
  };

  useEffect(() => {
    if (!loading && services.length > 0) {
      if (!selectedServiceId) {
        dispatch(setSelectedServiceId(services[0].service_id));
      }
    }
  }, [loading, services, selectedServiceId, dispatch]);

  useEffect(() => {
    if (selectedServiceId) {
      const getCategories = async () => {
        const result = await fetchCategories(selectedServiceId);
        if (result) {
          if (result.length > 0) {
            dispatch(setSelectedCategoryId(result[0].category_category_id));
            dispatch(setCategories(result));
          } else {
            dispatch(setSelectedCategoryId(0));
            dispatch(setCategories([]));
          }
        }
      };
      getCategories();
    }
  }, [dispatch, fetchCategories, selectedServiceId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="section-services">
      <div className="services-con-container">
        <h1>Choose your Service</h1>

        {/* <div className="flex justify-center items-center"> */}
        <div className="sticky top-0 flex justify-center items-center z-50">

          <div className="box-border max-w-[135rem] overflow-x-auto bg-white rounded-[8px] shadow-lg flex justify-start gap-16 py-12 px-12 scrollbar-thin laptop-l:gap-12 laptop-l:p-10 laptop-md:py-8 laptop-md:px-8 laptop-md:gap-10 laptop-md:rounded-[6px] laptop-s:px-7 laptop-s:py-7 laptop-s:rounded-lg laptop-s:gap-8 tab-m:px-6 tab-m:py-6 tab-s:gap-6 laptop-l:max-w-[110rem] laptop-md:max-w-[90rem] laptop-s:max-w-[85rem] tab-l:max-w-[75rem] tab-s:max-w-[65rem]">
            {services.map((service) => {
              const { name, image, service_id } = service;
              return (
                <div
                  key={name}
                  className={`service-container flex flex-col gap-8 items-center laptop-l:gap-6 laptop-md:gap-5 laptop-s:gap-4 tab:gap-3 ${
                    selectedServiceId === service_id ? "active-service" : ""
                  }`}
                  onClick={() => handleServiceClick(service_id)}
                >
                  <div className="h-24 w-24 text-center rounded-lg overflow-hidden laptop-l:h-20 laptop-l:w-20 laptop-md:h-16 laptop-md:w-16 laptop-s:h-14 laptop-s:w-14 laptop-s:rounded-md tab-m:h-16 tab-m:w-16 tab:h-14 tab:w-14">
                    <img
                      src={image}
                      alt="Service image"
                      className="inline-block max-h-full w-auto"
                    />
                  </div>
                  <h4 className="service-name">{name}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseService;
