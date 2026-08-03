"use client";
import {
  trackAddToCart,
  trackRemoveFromCart,
} from "@/app/utils/trackingHelper";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import CartService from "../services/cartSevice";
import { getLocal, saveLocal } from "../utils/saveLocal";
import { showActivateSimModal } from "../components/modals/vikki/modalActivateSim";
import { showOverNumber } from "../components/modals/vikki/modalOverNumber";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userVikki, setUserVikki] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartId, setCartId] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [phoneDktts, setPhoneDktts] = useState([]); // Store available phone numbers

  const [sims, setSims] = useState([]);

  const [simHome, setSimHome] = useState(null);

  const [cartItems, setCartItems] = useState([]);
  const isUpdating = useRef(false);

  const pusQuantity = async (id, quantity = 1) => {
    if (isUpdating.current) return;
    if (cartId) {
      const res = await CartService.changeQuantity({
        customer_id: cartId,
        item_id: id,
        increment_by: quantity,
      });
      if (res) {
        setCartItems(res.items);
      }
    }
  };
  const updateQuantity = async (id, quantity) => {
    if (cartId) {
      isUpdating.current = true;
      const res = await CartService.updateQuantity({
        customer_id: cartId,
        item_id: id,
        increment_by: quantity,
      });
      isUpdating.current = false;
      if (res) {
        setCartItems(res.items);
      }
    }
  };
  const minusQuantity = async (id) => {
    if (isUpdating.current) return;
    if (cartId) {
      const res = await CartService.changeQuantity({
        customer_id: cartId,
        item_id: id,
        increment_by: -1,
      });
      if (res) {
        setCartItems(res.items);
      }
    }
  };

  const removeItem = async (id) => {
    if (cartId) {
      trackRemoveFromCart({
        product_id: id,
        product_name: ``,
        product_price: "",
        product_quantity: "",
        cart_total: 0,
      });
      const res = await CartService.removeItem({
        customer_id: cartId,
        item_id: id,
      });
      if (res) {
        setCartItems(res.items);
      }
    }
  };

  const getCartItems = async () => {
    if (cartId) {
      const res = await CartService.getCart(cartId);
      if (res && res.items) {
        setCartItems(res.items);
      } else {
        setCartItems([]);
      }
    }
  };

  const addToCart = async (item) => {
    if (cartId) {
      let itemInCart = cartItems.find((i) => i.product_id === item.product_id);
      if (itemInCart && itemInCart.quantity + item.quantity > 50) {
        return "MAX_QUANTITY";
      }
      trackAddToCart(
        { ...item, customer_id: cartId },
        {
          funnel_name: "esim_purchase",
          funnel_step: 2,
          funnel_step_name: "Add to Cart",
          event_params: {
            button_location: "product_detail_page",
            added_from: "add_to_cart_button",
            country_id: "",
            country_name: "",
            validity_days: "",
            data_amount: "",
            data_unit: "",
            sim_type: "",
          },
        },
      );
      const res = await CartService.addToCart({ ...item, customer_id: cartId });
      if (res) {
        setCartItems(res.items);
        sessionStorage.setItem("openCartPath", window.location.pathname);
        setIsCartOpen(true);
      }
      return null;
    }
  };

  const setToken = async (token, cartId) => {
    saveLocal("token", token);
    let _cartId = getLocal("cartId") || randomCartId();
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    if (cartId) {
      setCartId(cartId);
      saveLocal("cartId", cartId);
    } else {
      setCartId(_cartId);
      saveLocal("cartId", _cartId);
    }
  };

  useEffect(() => {
    if (cartId) {
      getCartItems();
    }
  }, [cartId]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCartId = getLocal("cartId");
      let cartId = randomCartId();
      if (!storedCartId || storedCartId === "null") {
        setCartId(cartId);
        saveLocal("cartId", cartId);
      } else {
        setCartId(storedCartId);
      }
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = getLocal("token");
      if (storedToken) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSessionId = getLocal("sessionId");
      if (storedSessionId && storedSessionId !== "null") {
        setSessionId(storedSessionId);
      }
    }
  }, []);

  // Convert phone format from 84xxx to 0xxx
  const convertPhoneFormat = (phone) => {
    if (!phone) return phone;
    if (phone.startsWith("84")) {
      return "0" + phone.substring(2);
    }
    return phone;
  };

  // Switch to a different phone number from phoneDktts
  const switchPhone = (newPhone) => {
    const convertedPhone = convertPhoneFormat(newPhone);
    setCartId(convertedPhone);
    saveLocal("cartId", convertedPhone);
    // Don't update user.phone - keep original phone from login response
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setCartId(null);
    setSims([]);
    setCartItems([]);
    setPhoneDktts([]);
    saveLocal("token", null);
    let cartId = randomCartId();
    saveLocal("cartId", cartId);
  };
  const logoutVikki = () => {
    setUser(null);
    setIsLoggedIn(false);
    setPhoneDktts([]);
    saveLocal("token", null);
    saveLocal("sessionId", null);
    setSessionId(null);
    const _cartId = getLocal("cartId");
    // if cartId is phone number then reandom cartId
    if (_cartId && _validatePhoneNumber(_cartId)) {
      let cartId = randomCartId();
      saveLocal("cartId", cartId);
      setCartId(cartId);
    }
  };
  const _validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const setSessionIdState = (id) => {
    setSessionId(id);
    saveLocal("sessionId", id);
  };
  const checkLogin = (callback) => {
    if (!isLoggedIn) {
      showActivateSimModal();
      return;
    }
    if (!cartId.startsWith("070")) {
      showActivateSimModal();
      return;
    }
    callback();
  };

  const checkOverNumber = (callback) => {
    let listPhoneTrue = phoneDktts.filter(
      (phone) => phone.startsWith("070") || phone.startsWith("8470"),
    );
    if (listPhoneTrue.length >= 3) {
      showOverNumber(listPhoneTrue.length);
      return;
    }
    callback();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        cartId,
        cartItems,
        sims,
        isCartOpen,
        simHome,
        userVikki,
        sessionId,
        phoneDktts,
        setSimHome,
        setCartId,
        setSims,
        setIsCartOpen,
        addToCart,
        minusQuantity,
        pusQuantity,
        removeItem,
        setToken,
        logout,
        updateQuantity,
        setUser,
        logoutVikki,
        setUserVikki,
        setSessionIdState,
        checkLogin,
        getCartItems,
        setPhoneDktts,
        switchPhone,
        convertPhoneFormat,
        randomCartId,
        checkOverNumber,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const randomCartId = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const useUser = () => {
  return useContext(UserContext);
};

export const useUserActions = () => {
  const {
    setCartId,
    setSims,
    setIsCartOpen,
    addToCart,
    minusQuantity,
    pusQuantity,
    removeItem,
    setToken,
    logout,
    setSimHome,
    updateQuantity,
    setUser,
    logoutVikki,
    setUserVikki,
    setSessionIdState,
    checkLogin,
    getCartItems,
    setPhoneDktts,
    switchPhone,
    convertPhoneFormat,
    randomCartId,
    checkOverNumber,
  } = useContext(UserContext);
  return {
    setCartId,
    setSims,
    setIsCartOpen,
    addToCart,
    minusQuantity,
    pusQuantity,
    removeItem,
    setToken,
    logout,
    setSimHome,
    updateQuantity,
    setUser,
    logoutVikki,
    setUserVikki,
    setSessionIdState,
    checkLogin,
    getCartItems,
    setPhoneDktts,
    switchPhone,
    convertPhoneFormat,
    randomCartId,
    checkOverNumber,
  };
};
export const useUserState = () => {
  const {
    user,
    isLoggedIn,
    cartId,
    sims,
    isCartOpen,
    cartItems,
    simHome,
    userVikki,
    sessionId,
    phoneDktts,
  } = useContext(UserContext);
  return {
    user,
    isLoggedIn,
    cartId,
    sims,
    isCartOpen,
    cartItems,
    simHome,
    userVikki,
    sessionId,
    phoneDktts,
  };
};
