import TableRow from "./TableRow";
import { useSelector } from "react-redux";

const Main = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <div className="border border-[#b9bccf4d] rounded-xl overflow-hidden max-h-[63.1rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent hover:scrollbar-thumb-gray-900 laptop-l:rounded-lg laptop-md:rounded-lg laptop-l:max-h-[54.5rem] laptop:max-h-[44.75rem] laptop-s:max-h-[44.5rem] tab-l:max-h-[41.5rem] tab-m:max-h-[47.5rem] tab-s:overflow-auto tab-s:max-h-[45.25rem] tab:max-h-[42rem]">
      <table className="cart-table">
        <thead className="bg-[#f7f8fd] sticky top-0 shadow-[0_2.5px_5px_rgba(0,0,0,0.01)] overflow-hidden z-10">
          <tr>
            <th style={{ textAlign: "left" }}>Items</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody className="z-50">
          {cartItems.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No item found
              </td>
            </tr>
          ) : (
            cartItems.map((item) => {
              return <TableRow item={item} key={item.cart_id} />;
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Main;
