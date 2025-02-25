import { FormControl, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../../redux/slices/productSlice";
import { MdSearch } from "react-icons/md";

const Filter = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state?.product?.products);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleClearAll = () => {
    setFilteredItems([]);
    dispatch(updateProducts(products));
  };

  const hanldeClick = (item) => {
    setSelectedProduct(item.product.name);
    const paramArray = [...filteredItems];
    if (!paramArray.some((existingItem) => existingItem === item)) {
      paramArray.push(item);
      setFilteredItems(paramArray);
      dispatch(updateProducts(paramArray));
    }
  };

  const handleRemove = (itemToRemove) => {
    setSelectedProduct("");
    const paramArray = filteredItems.filter((item) => item !== itemToRemove);
    setFilteredItems(paramArray);
    dispatch(updateProducts(paramArray));

    if (paramArray.length === 0) {
      dispatch(updateProducts(products));
    }
  };

  useEffect(() => {
    const processedArray = products.filter((item) =>
      item.product.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    setFilteredProducts(processedArray);
    handleClearAll();
    setSelectedProduct("");
  }, [products, searchQuery, products]);

  return (
    <div className="filter flex flex-col gap-12 laptop-l:gap-10 laptop-md:gap-8">
      <div className="flex justify-between items-center flex-wrap">
        <h5 className="text-filters">Filters</h5>
        <button className="text-clear" onClick={handleClearAll}>
          Clear all
        </button>
      </div>

      <div className="flex flex-col justify-center items-stretch gap-8 laptop-l:gap-6 laptop-m:gap-4">
        <p className="dd-title">Select cloth types</p>
        <FormControl fullWidth>
          <Select
            value={selectedProduct}
            sx={{
              fontSize: "16px",
              position: "relative",
              "@media (max-width: 100em)": { fontSize: "15px" },
              "@media (max-width: 90em)": { fontSize: "12.5px" },

              ".MuiSelect-select": {
                padding: "16px",
                "@media (max-width: 100em)": {
                  padding: "14px",
                },
                "@media (max-width: 90em)": {
                  padding: "12px",
                },
                "@media (max-width: 71.25em)": {
                  padding: "10px",
                },
              },
            }}
            onClick={(e) => e.stopPropagation()}
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: 300,
                  "@media (max-width: 90em)": {
                    maxHeight: 205,
                    fontSize: "12px",
                  },
                },
              },
            }}
          >
            <div
              className="hidden px-8 py-5 items-center justify-center gap-4 text-2xl laptop-l:px-7 laptop-l:py-4"
              onClick={(e) => e.stopPropagation()}
            >
              <MdSearch className="h-10 w-10 fill-gray-400 mx-2 laptop-l:h-8 laptop-l:w-8 laptop-l:mx-1" />
              <input
                type="text"
                placeholder="Search product..."
                className="grow focus:outline-none focus:ring-0"
              />
            </div>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <MenuItem
                  sx={{
                    fontSize: "16px",
                    padding: "15px 20px",
                    textTransform: "capitalize",
                    "@media (max-width: 100em)": {
                      fontSize: "14px",
                      padding: "12.5px 17.5px",
                    },
                    "@media (max-width: 90em)": {
                      fontSize: "12.5px",
                      padding: "10px 17.5px",
                    },
                    "@media (max-width: 38.4375em)": {
                      fontSize: "12px",
                      padding: "8px 16px",
                    },
                  }}
                  key={item.product.name}
                  value={item.product.name}
                  onClick={() => hanldeClick(item)}
                >
                  {item.product.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem
                sx={{
                  fontSize: "16px",
                  padding: "12px 20px",
                  "@media (max-width: 80em)": {
                    fontSize: "14px",
                    padding: "10px 18px",
                  },
                  "@media (max-width: 38.4375em)": {
                    fontSize: "12px",
                    padding: "8px 16px",
                  },
                }}
                disabled
              >
                No product found!
              </MenuItem>
            )}
          </Select>
        </FormControl>
        {filteredItems.length > 0 && (
          <div className="flex items-center justify-start flex-wrap gap-6 laptop-s:gap-4">
            {filteredItems.length > 0 &&
              filteredItems.map((item) => {
                const { name } = item.product;
                return (
                  <span className="selected-clothes" key={name}>
                    <span>{name}</span>
                    <RxCross2
                      onClick={() => handleRemove(item)}
                      className="h-8 w-8 cursor-pointer laptop-l:h-7 laptop-l:w-7 laptop-md:h-6 laptop-md:w-6"
                    />
                  </span>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
