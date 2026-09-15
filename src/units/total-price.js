export const totalPrice = (cart) => {
  return cart.reduce((a, c) => a + c.price * c.quantity, 0);
};
