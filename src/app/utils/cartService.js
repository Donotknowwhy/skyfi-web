"use client";

import eventBus from "./eventBus";

// Store cart data in localStorage for persistence
const getCartFromStorage = () => {
  if (typeof window === 'undefined') return { items: [], totalPrice: "0" };

  try {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      return JSON.parse(cartData);
    }
  } catch (error) {
    console.error('Error getting cart from localStorage:', error);
  }

  return { items: [], totalPrice: "0" };
};

const saveCartToStorage = (cartData) => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem('cart', JSON.stringify(cartData));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

// Calculate total price from cart items
const calculateTotal = (items) => {
  const total = items.reduce((sum, item) => {
    const itemPrice = parseInt(item.price.replace(/\./g, '')) * (item.quantity || 1);
    return sum + itemPrice;
  }, 0);

  return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const getTotalQuantity=(cartItems) => {
    return cartItems?.reduce((total, item) => total + (item.quantity ?? 0), 0);
}

// Cart service methods
const cartService = {
  // Get current cart state
  getCart() {
    return getCartFromStorage();
  },

  // Add item to cart
  addItem(item) {
    const cart = getCartFromStorage();

    // Check if item already exists
    const existingItemIndex = cart.items.findIndex(i =>
      i.type === item.type && i.title === item.title
    );

    if (existingItemIndex !== -1) {
      // Update quantity if item exists
      cart.items[existingItemIndex].quantity = (cart.items[existingItemIndex].quantity || 1) + (item.quantity || 1);
    } else {
      // Add new item with quantity
      cart.items.push({
        ...item,
        quantity: item.quantity || 1,
        id: Date.now() // Add unique ID
      });
    }

    // Update total price
    cart.totalPrice = calculateTotal(cart.items);

    // Save to storage
    saveCartToStorage(cart);

    // Publish event to update UI
    eventBus.publish('cartUpdated', cart);

    return cart;
  },

  // Update item quantity
  updateItemQuantity(itemId, quantity) {
    if (quantity < 1) return;

    const cart = getCartFromStorage();

    // Find item and update quantity
    const itemIndex = cart.items.findIndex(i => i.id === itemId);
    if (itemIndex !== -1) {
      cart.items[itemIndex].quantity = quantity;

      // Update total price
      cart.totalPrice = calculateTotal(cart.items);

      // Save to storage
      saveCartToStorage(cart);

      // Publish event to update UI
      eventBus.publish('cartUpdated', cart);
    }

    return cart;
  },

  // Remove item from cart
  removeItem(itemId) {
    const cart = getCartFromStorage();

    // Filter out the item
    cart.items = cart.items.filter(i => i.id !== itemId);

    // Update total price
    cart.totalPrice = calculateTotal(cart.items);

    // Save to storage
    saveCartToStorage(cart);

    // Publish event to update UI
    eventBus.publish('cartUpdated', cart);

    return cart;
  },

  // Clear the entire cart
  clearCart() {
    const emptyCart = { items: [], totalPrice: "0" };

    // Save to storage
    saveCartToStorage(emptyCart);

    // Publish event to update UI
    eventBus.publish('cartUpdated', emptyCart);

    return emptyCart;
  }
};

export default cartService;
