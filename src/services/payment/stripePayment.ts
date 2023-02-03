import { loadStripe } from "@stripe/stripe-js";
import { APP_URL, CHECKOUT_FAILURE_PAGE_PATH, CHECKOUT_SUCCESS_PAGE_PATH } from "config/constants";
import { CartItem } from "context/cart/cartContext";

export const payForAllItemsInCart = async (cartItems: CartItem[]) => {
  try {
    const {
      REACT_APP_STRIPE_PUBLISHABLE_KEY = "",
      REACT_APP_STRIPE_PRICE_IDS = "",
    } = process.env;

    const stripePriceIds = REACT_APP_STRIPE_PRICE_IDS.split(", ");
    const stripe = await loadStripe(REACT_APP_STRIPE_PUBLISHABLE_KEY);
    if (!stripe) throw new Error('Cannot load stripe payment');

    const lineItems = cartItems.map((cartItem, index) => {
      return {
        price: cartItem.id === index + 1 ? stripePriceIds[index] : "",
        quantity: cartItem.quantity,
      };
    });

    await stripe.redirectToCheckout({
      lineItems,
      mode: "payment",
      successUrl: `${APP_URL}${CHECKOUT_SUCCESS_PAGE_PATH}`,
      cancelUrl: `${APP_URL}${CHECKOUT_FAILURE_PAGE_PATH}`,
    });
  } catch (err) {
    console.error(err);
  }
}