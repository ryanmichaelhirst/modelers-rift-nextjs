import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../index'
import { Item } from '../../types'

type Items = Record<string, Item>

interface ItemState {
  items: Items
  selectedItems: Items
}

const initialState: ItemState = {
  items: {},
  selectedItems: {},
}

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Items>) => {
      state.items = action.payload
    },
    setSelectedItems: (state, action: PayloadAction<Items>) => {
      state.selectedItems = action.payload
    },
  },
})

export const { setItems, setSelectedItems } = itemSlice.actions

export const fetchItems = (): AppThunk => async (dispatch, getState) => {
  const { data } = await fetch(
    `http://ddragon.leagueoflegends.com/cdn/11.16.1/data/en_US/item.json`,
  ).then<{ data: Items }>((res) => res.json())
  const itemsAsRecord = Object.values(data).reduce((acc, value) => {
    acc[value.name] = value

    return acc
  }, {})

  dispatch(setItems(itemsAsRecord))
}

export const selectItems = (state: RootState) => state.item.items

export const selectSelectedItems = (state: RootState) => state.item.selectedItems

export default itemSlice.reducer
