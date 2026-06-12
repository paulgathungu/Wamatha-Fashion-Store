import React, { useEffect, createContext, useContext, useReducer } from 'react';
import { Product } from '../data/products';
// Types
export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'customer' | 'admin';
}
export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  shippingAddress: string;
  paymentMethod: string;
}
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'promo' | 'stock' | 'info';
  read: boolean;
  date: string;
}
interface StoreState {
  cart: CartItem[];
  wishlist: Product[];
  user: User | null;
  isAuthenticated: boolean;
  darkMode: boolean;
  currency: 'KES' | 'USD' | 'EUR' | 'GBP';
  notifications: Notification[];
  orders: Order[];
  searchQuery: string;
  currentPage: string;
}
type StoreAction =
{
  type: 'ADD_TO_CART';
  payload: CartItem;
} |
{
  type: 'REMOVE_FROM_CART';
  payload: string;
} |
{
  type: 'UPDATE_CART_QUANTITY';
  payload: {
    productId: string;
    size: string;
    color: string;
    quantity: number;
  };
} |
{
  type: 'CLEAR_CART';
} |
{
  type: 'TOGGLE_WISHLIST';
  payload: Product;
} |
{
  type: 'MOVE_TO_CART';
  payload: {
    product: Product;
    size: string;
    color: string;
  };
} |
{
  type: 'LOGIN';
  payload: User;
} |
{
  type: 'LOGOUT';
} |
{
  type: 'TOGGLE_DARK_MODE';
} |
{
  type: 'SET_CURRENCY';
  payload: 'KES' | 'USD' | 'EUR' | 'GBP';
} |
{
  type: 'ADD_NOTIFICATION';
  payload: Notification;
} |
{
  type: 'MARK_NOTIFICATION_READ';
  payload: string;
} |
{
  type: 'MARK_ALL_NOTIFICATIONS_READ';
} |
{
  type: 'ADD_ORDER';
  payload: Order;
} |
{
  type: 'UPDATE_ORDER_STATUS';
  payload: {
    orderId: string;
    status: Order['status'];
  };
} |
{
  type: 'SET_SEARCH_QUERY';
  payload: string;
} |
{
  type: 'SET_CURRENT_PAGE';
  payload: string;
};
const currencyRates: Record<string, number> = {
  KES: 1,
  USD: 0.0077,
  EUR: 0.0071,
  GBP: 0.0061
};
const currencySymbols: Record<string, string> = {
  KES: 'KES',
  USD: '$',
  EUR: '€',
  GBP: '£'
};
const initialNotifications: Notification[] = [
{
  id: 'n1',
  title: 'Flash Sale!',
  message: 'Up to 50% off on selected items. Ends in 24 hours!',
  type: 'promo',
  read: false,
  date: '2024-03-15'
},
{
  id: 'n2',
  title: 'New Arrivals',
  message: 'Check out our latest Spring collection.',
  type: 'info',
  read: false,
  date: '2024-03-14'
},
{
  id: 'n3',
  title: 'Back in Stock',
  message: 'Premium Leather Jacket is back in all sizes!',
  type: 'stock',
  read: true,
  date: '2024-03-13'
}];

const sampleOrders: Order[] = [
{
  id: 'ORD-001',
  items: [],
  total: 21998,
  status: 'delivered',
  date: '2024-03-01',
  shippingAddress: '123 Fashion St, Nairobi',
  paymentMethod: 'M-Pesa'
},
{
  id: 'ORD-002',
  items: [],
  total: 8999,
  status: 'shipped',
  date: '2024-03-10',
  shippingAddress: '456 Style Ave, Nairobi',
  paymentMethod: 'Card'
},
{
  id: 'ORD-003',
  items: [],
  total: 15999,
  status: 'processing',
  date: '2024-03-14',
  shippingAddress: '789 Trend Blvd, Nairobi',
  paymentMethod: 'PayPal'
}];

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}
const initialState: StoreState = {
  cart: loadFromStorage('cart', []),
  wishlist: loadFromStorage('wishlist', []),
  user: loadFromStorage('user', null),
  isAuthenticated: loadFromStorage('user', null) !== null,
  darkMode: loadFromStorage('darkMode', false),
  currency: loadFromStorage('currency', 'KES'),
  notifications: initialNotifications,
  orders: sampleOrders,
  searchQuery: '',
  currentPage: 'home'
};
function storeReducer(state: StoreState, action: StoreAction): StoreState {
  switch (action.type) {
    case 'ADD_TO_CART':{
        const existing = state.cart.find(
          (item) =>
          item.product.id === action.payload.product.id &&
          item.selectedSize === action.payload.selectedSize &&
          item.selectedColor === action.payload.selectedColor
        );
        if (existing) {
          return {
            ...state,
            cart: state.cart.map((item) =>
            item.product.id === existing.product.id &&
            item.selectedSize === existing.selectedSize &&
            item.selectedColor === existing.selectedColor ?
            {
              ...item,
              quantity: item.quantity + action.payload.quantity
            } :
            item
            )
          };
        }
        return {
          ...state,
          cart: [...state.cart, action.payload]
        };
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(
          (item) =>
          `${item.product.id}-${item.selectedSize}-${item.selectedColor}` !==
          action.payload
        )
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((item) =>
        item.product.id === action.payload.productId &&
        item.selectedSize === action.payload.size &&
        item.selectedColor === action.payload.color ?
        {
          ...item,
          quantity: Math.max(1, action.payload.quantity)
        } :
        item
        )
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      };
    case 'TOGGLE_WISHLIST':{
        const exists = state.wishlist.find((p) => p.id === action.payload.id);
        return {
          ...state,
          wishlist: exists ?
          state.wishlist.filter((p) => p.id !== action.payload.id) :
          [...state.wishlist, action.payload]
        };
      }
    case 'MOVE_TO_CART':{
        const cartItem: CartItem = {
          product: action.payload.product,
          quantity: 1,
          selectedSize: action.payload.size,
          selectedColor: action.payload.color
        };
        return {
          ...state,
          wishlist: state.wishlist.filter(
            (p) => p.id !== action.payload.product.id
          ),
          cart: [...state.cart, cartItem]
        };
      }
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false
      };
    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        darkMode: !state.darkMode
      };
    case 'SET_CURRENCY':
      return {
        ...state,
        currency: action.payload
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications]
      };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map((n) =>
        n.id === action.payload ?
        {
          ...n,
          read: true
        } :
        n
        )
      };
    case 'MARK_ALL_NOTIFICATIONS_READ':
      return {
        ...state,
        notifications: state.notifications.map((n) => ({
          ...n,
          read: true
        }))
      };
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [action.payload, ...state.orders]
      };
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map((o) =>
        o.id === action.payload.orderId ?
        {
          ...o,
          status: action.payload.status
        } :
        o
        )
      };
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload
      };
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload
      };
    default:
      return state;
  }
}
interface StoreContextType {
  state: StoreState;
  dispatch: React.Dispatch<StoreAction>;
  formatPrice: (price: number) => string;
  cartTotal: number;
  cartCount: number;
  unreadNotifications: number;
}
const StoreContext = createContext<StoreContextType | undefined>(undefined);
export function StoreProvider({ children }: {children: ReactNode;}) {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
  }, [state.wishlist]);
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);
  useEffect(() => {
    localStorage.setItem('currency', JSON.stringify(state.currency));
  }, [state.currency]);
  const formatPrice = (price: number): string => {
    const converted = price * currencyRates[state.currency];
    const symbol = currencySymbols[state.currency];
    if (state.currency === 'KES') {
      return `${symbol} ${converted.toLocaleString()}`;
    }
    return `${symbol}${converted.toFixed(2)}`;
  };
  const cartTotal = state.cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const unreadNotifications = state.notifications.filter((n) => !n.read).length;
  return (
    <StoreContext.Provider
      value={{
        state,
        dispatch,
        formatPrice,
        cartTotal,
        cartCount,
        unreadNotifications
      }}>
      
      {children}
    </StoreContext.Provider>);

}
export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}