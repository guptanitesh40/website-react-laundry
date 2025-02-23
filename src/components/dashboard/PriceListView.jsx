/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useGetPriceList from "../../hooks/dashboard/useGetPriceList";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
  FaSearch,
} from "react-icons/fa";
import { IoCaretDown, IoCaretUp } from "react-icons/io5";
import Loading from "./Loading";

const PriceListView = () => {
  const { getPriceList } = useGetPriceList();
  const [priceList, setPriceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeBtn, setActiveBtn] = useState(1);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortBy, setSortBy] = useState("");
  const [filteredPriceList, setFilteredPriceList] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [rpp, setRpp] = useState(10);

  const handleSort = (column_name) => {
    setSortBy(column_name);
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newSortDirection);

    const sortedPriceList = priceList.sort((a, b) => {
      const aValue = a[column_name];
      const bValue = b[column_name];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return newSortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return newSortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
    });

    setFilteredPriceList(sortedPriceList);
  };

  const handleRppChange = (e) => {
    let newRpp = e.target.value;
    setRpp(newRpp);

    setCurrentPage(1);
    setRows(Math.ceil(totalRows / newRpp));
  };

  const handleSearch = (e) => {
    setCurrentPage(1);
    e.preventDefault();

    let search = e.target.value;
    const filtered = priceList.filter((item) => {
      return (
        item.category_name.toLowerCase().includes(search.toLowerCase()) ||
        item.product_name.toLowerCase().includes(search.toLowerCase()) ||
        item.service_name.toLowerCase().includes(search.toLowerCase()) ||
        item.price_price.toString().toLowerCase().includes(search.toLowerCase())
      );
    });

    setFilteredPriceList(filtered);
    setRows(Math.ceil(filtered.length / rpp));
    setTotalRows(filtered.length);
  };

  useEffect(() => {
    const getPrices = async () => {
      const result = await getPriceList();
      if (result) {
        setTotalRows(result.length);
        setRows(Math.ceil(result.length / 10));
        setPriceList(result);
        setFilteredPriceList(result);
        setLoading(false);
      }
    };
    getPrices();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="price-list-table-container">
      <div className="px-8 py-6 laptop-s:px-6 laptop-s:py-4 tab-m:p-4">
        <form
          className="flex items-center justify-between relative tab:flex-wrap tab:gap-3 mb-l:flex-col"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex items-center justify-center gap-4 tab-m:gap-3">
            <label htmlFor="rpp" className="rpp-label">
              Rows per page
            </label>
            <select
              className="rpp-dropdown"
              name="rpp"
              id="rpp"
              onChange={handleRppChange}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
            </select>
          </div>
          <span className="search-input-container relative">
            <input
              type="text"
              placeholder="Search for items"
              className="searc-input focus:border-indigo-300 focus:outline-none"
              onChange={handleSearch}
            />
            <span className="search-icon">
              <FaSearch className="inline-block h-8 w-8 fill-[#d1d5db] laptop-s:h-6 laptop-s:w-6 tab-m:h-5 tab-m:w-5" />
            </span>
          </span>
        </form>
      </div>

      <div className="allow-x-scroll">
        <table className="price-list-table">
          <thead>
            <tr className="bg-[#F7F8FD]">
              <th className="min-w-[12.5rem] tab-l:min-w-40 tab-s:min-w-32 mb-l:min-w-24">
                index
              </th>
              <th
                className="min-w-[20rem] tab-l:min-w-[17.5rem] tab-s:min-w-[15rem] mb-l:min-w-[12.5rem]"
                onClick={() => handleSort("category_name")}
              >
                <div className="flex items-center justify-center gap-2 cursor-pointer tab-m:gap-1">
                  <span>category</span>
                  <span className="flex flex-col">
                    <IoCaretUp
                      className={`updown-icon ${
                        sortDirection === "asc" && sortBy === "category_name"
                          ? "!fill-[#676788]"
                          : ""
                      }`}
                    />
                    <IoCaretDown
                      className={`updown-icon ${
                        sortDirection === "desc" && sortBy === "category_name"
                          ? "!fill-[#676788]"
                          : ""
                      }`}
                    />
                  </span>
                </div>
              </th>
              <th
                className="min-w-[22.5rem] tab-l:min-w-[20rem] tab-s:min-w-[17.5rem] mb-l:min-w-[15rem]"
                onClick={() => handleSort("product_name")}
              >
                <div className="flex items-center justify-center gap-2 cursor-pointer tab-m:gap-1">
                  <span>product</span>
                  <span className="flex flex-col">
                    <IoCaretUp
                      className={`updown-icon ${
                        sortDirection === "asc" && sortBy === "product_name"
                          ? "!fill-[#676788]"
                          : ""
                      }`}
                    />
                    <IoCaretDown
                      className={`updown-icon ${
                        sortDirection === "desc" && sortBy === "product_name"
                          ? "!fill-[#676788]"
                          : ""
                      }`}
                    />
                  </span>
                </div>
              </th>
              <th
                className="min-w-[22.5rem] tab-l:min-w-[20rem] tab-s:min-w-[17.5rem] mb-l:min-w-[15rem]"
                onClick={() => handleSort("service_name")}
              >
                <div className="flex items-center justify-center gap-2 cursor-pointer tab-m:gap-1">
                  <span>service</span>
                  <span className="flex flex-col">
                    <IoCaretUp
                      className={`updown-icon ${
                        sortDirection === "asc" && sortBy === "service_name"
                          ? "!fill-[#676788]"
                          : ""
                      }`}
                    />
                    <IoCaretDown
                      className={`updown-icon ${
                        sortDirection === "desc" && sortBy === "service_name"
                          ? "!fill-[#676788]"
                          : ""
                      }`}
                    />
                  </span>
                </div>
              </th>
              <th
                className="min-w-[20rem] tab-l:min-w-[17.5rem] tab-s:min-w-[15rem] mb-l:min-w-[12.5rem]"
                onClick={() => handleSort("price_price")}
              >
                <div className="flex items-center justify-center gap-2 cursor-pointer tab-m:gap-1">
                  <span>price</span>
                  <span className="flex flex-col">
                    <IoCaretUp
                      className={`updown-icon ${
                        sortDirection === "asc" && sortBy === "price_price"
                          ? "!fill-[#676788]"
                          : ""
                      }`}
                    />
                    <IoCaretDown
                      className={`updown-icon ${
                        sortDirection === "desc" && sortBy === "price_price"
                          ? "!fill-[#676788]"
                          : ""
                      }`}
                    />
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPriceList
              .slice((currentPage - 1) * rpp, currentPage * rpp)
              .map((item, index) => {
                const {
                  category_name,
                  price_price,
                  product_name,
                  service_name,
                } = item;
                return (
                  <tr
                    key={index}
                    className="transition duration-200 hover:bg-[rgba(226,225,231,0.39)]"
                  >
                    <td>{(currentPage - 1) * rpp + (index + 1)}</td>
                    <td>{category_name}</td>
                    <td>{product_name}</td>
                    <td>{service_name}</td>
                    <td>&#8377; {price_price}</td>
                  </tr>
                );
              })}
            {totalRows === 0 && (
              <tr>
                <td colSpan={5}>No Item Found !</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalRows != 0 && (
        <div className="flex items-center justify-between px-8 laptop-s:px-6 tab-l:px-4 tab-s:flex-wrap tab-s:p-4 tab-s:gap-4 tab:gap-3 mb-l:flex-col">
          <p className="current-page-num font-medium">
            Showing {(currentPage - 1) * rpp + 1} to{" "}
            {currentPage === rows ? totalRows : currentPage * rpp} entries
          </p>

          <div className="flex items-center justify-center gap-4 laptop-s:gap-3 mb-l:flex-wrap">
            <button
              className={`pagination-btn`}
              onClick={() => {
                if (currentPage !== 1) {
                  setCurrentPage(1);
                  setActiveBtn(1);
                }
              }}
            >
              <FaAngleDoubleLeft
                className={`${
                  currentPage == 1 ? "page-icon-light" : "page-icon"
                }`}
              />
            </button>
            <button
              className={`pagination-btn`}
              onClick={() => {
                if (currentPage !== 1) {
                  setCurrentPage(currentPage - 1);
                  setActiveBtn(currentPage - 1);
                }
              }}
            >
              <FaAngleLeft
                className={`${
                  currentPage == 1 ? "page-icon-light" : "page-icon"
                }`}
              />
            </button>
            {rows > 1 && (
              <button
                className={`pagination-btn ${activeBtn === 1 && "active-page"}`}
                onClick={() => {
                  if (currentPage !== 1) {
                    setCurrentPage(1);
                    setActiveBtn(1);
                  }
                }}
              >
                <span className="page-num">1</span>
              </button>
            )}
            {rows > 2 && (
              <button
                className={`pagination-btn ${activeBtn === 2 && "active-page"}`}
                onClick={() => {
                  if (currentPage !== 2) {
                    setCurrentPage(2);
                    setActiveBtn(2);
                  }
                }}
              >
                <span className="page-num">2</span>
              </button>
            )}
            {rows > 3 && (
              <button
                className={`pagination-btn ${activeBtn === 3 && "active-page"}`}
                onClick={() => {
                  if (currentPage !== 3) {
                    setCurrentPage(3);
                    setActiveBtn(3);
                  }
                }}
              >
                <span className="page-num">3</span>
              </button>
            )}
            {rows > 2 && (
              <button className="pagination-btn border-transparent">
                <span className="page-num">...</span>
              </button>
            )}
            <button
              className={`pagination-btn ${
                activeBtn === rows && "active-page"
              }`}
              onClick={() => {
                if (currentPage !== rows) {
                  setCurrentPage(rows);
                  setActiveBtn(rows);
                }
              }}
            >
              <span className="page-num">{rows}</span>
            </button>
            <button
              className={`pagination-btn`}
              onClick={() => {
                if (currentPage !== rows) {
                  setCurrentPage(currentPage + 1);
                  setActiveBtn(currentPage + 1);
                }
              }}
            >
              <FaAngleRight
                className={`${
                  currentPage == rows ? "page-icon-light" : "page-icon"
                }`}
              />
            </button>
            <button
              className={`pagination-btn`}
              onClick={() => {
                if (currentPage !== rows) {
                  setCurrentPage(rows);
                  setActiveBtn(rows);
                }
              }}
            >
              <FaAngleDoubleRight
                className={`${
                  currentPage == rows ? "page-icon-light" : "page-icon"
                }`}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceListView;
