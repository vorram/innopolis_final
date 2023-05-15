import { createSlice } from '@reduxjs/toolkit'
import calculateSum from './calculateSum'

const initialState = {
  items: [],
  sum: 0,
  itemQty: 0,
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push({ item: action.payload, qty: 1 })
      state.sum = calculateSum(state.items)
      state.itemQty++
    },
    incrementItem: (state, action) => {
      const itemIndex = state.items.findIndex(currentItem => currentItem.item.id === action.payload)
      state.items[itemIndex].qty++
      state.sum = calculateSum(state.items)
      state.itemQty++
    },
    removeItem: (state, action) => {
      const itemIndex = state.items.findIndex(currentItem => currentItem.item.id === action.payload)
      const currentItemQty = state.items[itemIndex].qty
      state.items = state.items.filter(currentItem => currentItem.item.id !== action.payload)
      state.sum = calculateSum(state.items)
      if (state.items.length === 0) {
        state.itemQty = 0
      } else {
        state.itemQty = state.itemQty - currentItemQty
      }
    },
    decrementItem: (state, action) => {
      const itemIndex = state.items.findIndex(currentItem => currentItem.item.id === action.payload)
      if (state.items[itemIndex].qty > 1) {
        state.items[itemIndex].qty--
        state.sum = calculateSum(state.items)
        state.itemQty--
      }
    },
    clearBasket: (state) => {
      state.items = []
      state.sum = 0
      state.itemQty = 0
    },
    setBasket: (state, action) => {
      const users = JSON.parse(localStorage.getItem("users"))
      const currentUser = users.find(user => user.login === action.payload)
      state.items = currentUser.basket
      state.sum = calculateSum(state.items)
      state.itemQty = state.items.reduce((accumulator, currentValue) => accumulator + currentValue.qty, 0)
    }
  }
})

export const { addItem, incrementItem, removeItem, decrementItem, clearBasket, setBasket } = basketSlice.actions

export default basketSlice.reducer