"use client"

import { create } from "zustand"
import type { CartItem, Restaurant, Order } from "./data"

interface AppState {
  cart: CartItem[]
  selectedRestaurant: Restaurant | null
  currentOrder: Order | null
  isAuthenticated: boolean
  user: { name: string; email: string; phone: string } | null
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  setSelectedRestaurant: (restaurant: Restaurant | null) => void
  setCurrentOrder: (order: Order | null) => void
  login: (user: { name: string; email: string; phone: string }) => void
  logout: () => void
  getCartTotal: () => number
  getCartCount: () => number
}

export const useAppStore = create<AppState>((set, get) => ({
  cart: [],
  selectedRestaurant: null,
  currentOrder: null,
  isAuthenticated: false,
  user: null,

  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((i) => i.id === item.id)
      if (existingItem) {
        return {
          cart: state.cart.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)),
        }
      }
      return { cart: [...state.cart, { ...item, quantity: 1 }] }
    }),

  removeFromCart: (itemId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== itemId),
    })),

  updateQuantity: (itemId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return { cart: state.cart.filter((item) => item.id !== itemId) }
      }
      return {
        cart: state.cart.map((item) => (item.id === itemId ? { ...item, quantity } : item)),
      }
    }),

  clearCart: () => set({ cart: [] }),

  setSelectedRestaurant: (restaurant) => set({ selectedRestaurant: restaurant }),

  setCurrentOrder: (order) => set({ currentOrder: order }),

  login: (user) => set({ isAuthenticated: true, user }),

  logout: () => set({ isAuthenticated: false, user: null }),

  getCartTotal: () => {
    const state = get()
    return state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
  },

  getCartCount: () => {
    const state = get()
    return state.cart.reduce((count, item) => count + item.quantity, 0)
  },
}))
