import Button from "../Button/button";
import { totalPrice } from "../../units/total-price";
import "./cart.css";

const Cart = ({ cartItems, onCheckout }) => {
  return (
    <div className="cart__container">
      <p>
        Umumiy narx:{" "}
        {totalPrice(cartItems).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </p>

      <Button
        title={`${cartItems.length === 0 ? "Buyurtma" : "To'lov"}`}
        disabled={cartItems.length === 0 ? true : false}
        type={"checkout"}
        onClick={onCheckout}
      />
    </div>
  );
};

export default Cart;
