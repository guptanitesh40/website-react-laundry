import TableRow from "./TableRow";
import { useSelector } from "react-redux";

const Main = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <div className="border border-[#b9bccf4d] rounded-2xl overflow-hidden laptop-l:rounded-xl laptop-md:rounded-lg tab-l:rounded-md">
      <table className="cart-table">
        <thead className="bg-[#f7f8fd]">
          <tr>
            <th style={{ textAlign: "left" }}>Items</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
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
