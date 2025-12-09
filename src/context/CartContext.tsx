'use client'

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import type { Cart, CartItem } from '@/lib/shopify/types'
import {
  createCart,
  getCart,
  addToCart as addToCartAPI,
  updateCartLine as updateCartLineAPI,
  removeFromCart as removeFromCartAPI,
} from '@/lib/shopify/queries/cart'
import { isShopifyConfigured } from '@/lib/shopify/client'

interface CartState {
  cart: Cart | null
  isOpen: boolean
  isLoading: boolean
}

type CartAction =
  | { type: 'SET_CART'; payload: Cart | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'TOGGLE_CART' }

const initialState: CartState = {
  cart: null,
  isOpen: false,
  isLoading: false,
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, cart: action.payload }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'OPEN_CART':
      return { ...state, isOpen: true }
    case 'CLOSE_CART':
      return { ...state, isOpen: false }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
    default:
      return state
  }
}

interface CartContextValue extends CartState {
  addItem: (variantId: string, quantity?: number) => Promise<void>
  updateItem: (lineId: string, quantity: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const CART_ID_KEY = 'salaamcola-cart-id'

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize cart on mount
  useEffect(() => {
    async function initializeCart() {
      if (!isShopifyConfigured()) {
        // For demo mode, create a mock cart
        dispatch({
          type: 'SET_CART',
          payload: {
            id: 'mock-cart',
            checkoutUrl: '#',
            totalQuantity: 0,
            subtotal: 0,
            total: 0,
            currencyCode: 'MYR',
            items: [],
          },
        })
        setIsInitialized(true)
        return
      }

      try {
        const storedCartId = localStorage.getItem(CART_ID_KEY)

        if (storedCartId) {
          const existingCart = await getCart(storedCartId)
          if (existingCart) {
            dispatch({ type: 'SET_CART', payload: existingCart })
            setIsInitialized(true)
            return
          }
        }

        // Create new cart
        const newCart = await createCart()
        localStorage.setItem(CART_ID_KEY, newCart.id)
        dispatch({ type: 'SET_CART', payload: newCart })
      } catch (error) {
        console.error('Failed to initialize cart:', error)
      } finally {
        setIsInitialized(true)
      }
    }

    initializeCart()
  }, [])

  const addItem = useCallback(
    async (variantId: string, quantity: number = 1) => {
      if (!state.cart) return

      dispatch({ type: 'SET_LOADING', payload: true })

      try {
        if (!isShopifyConfigured()) {
          // Mock add item for demo
          dispatch({ type: 'OPEN_CART' })
          return
        }

        const updatedCart = await addToCartAPI(state.cart.id, variantId, quantity)
        dispatch({ type: 'SET_CART', payload: updatedCart })
        dispatch({ type: 'OPEN_CART' })
      } catch (error) {
        console.error('Failed to add item:', error)
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    },
    [state.cart]
  )

  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      if (!state.cart) return

      dispatch({ type: 'SET_LOADING', payload: true })

      try {
        if (!isShopifyConfigured()) {
          return
        }

        const updatedCart = await updateCartLineAPI(state.cart.id, lineId, quantity)
        dispatch({ type: 'SET_CART', payload: updatedCart })
      } catch (error) {
        console.error('Failed to update item:', error)
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    },
    [state.cart]
  )

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!state.cart) return

      dispatch({ type: 'SET_LOADING', payload: true })

      try {
        if (!isShopifyConfigured()) {
          return
        }

        const updatedCart = await removeFromCartAPI(state.cart.id, [lineId])
        dispatch({ type: 'SET_CART', payload: updatedCart })
      } catch (error) {
        console.error('Failed to remove item:', error)
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    },
    [state.cart]
  )

  const openCart = useCallback(() => {
    dispatch({ type: 'OPEN_CART' })
  }, [])

  const closeCart = useCallback(() => {
    dispatch({ type: 'CLOSE_CART' })
  }, [])

  const toggleCart = useCallback(() => {
    dispatch({ type: 'TOGGLE_CART' })
  }, [])

  if (!isInitialized) {
    return null
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        updateItem,
        removeItem,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
