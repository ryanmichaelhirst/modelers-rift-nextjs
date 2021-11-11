import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Item } from '../../types'
import { AppThunk, RootState } from '../index'

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
    addSelectedItem: (state, action: PayloadAction<string[]>) => {
      const addedItems = action.payload.reduce<Items>((acc, cur) => {
        if (state.items[cur]) acc[cur] = state.items[cur]

        return acc
      }, {})

      state.selectedItems = { ...state.selectedItems, ...addedItems }
    },
    removeSelectedItem: (state, action: PayloadAction<string[]>) => {
      const newItems = action.payload.reduce<Items>((acc, cur) => {
        if (state.items[cur]) acc[cur] = state.items[cur]

        return acc
      }, {})

      state.selectedItems = { ...newItems }
    },
    setSelectedItems: (state, action: PayloadAction<Items>) => {
      state.selectedItems = action.payload
    },
  },
})

export const { setItems, setSelectedItems, addSelectedItem, removeSelectedItem } = itemSlice.actions

export const fetchItems = (): AppThunk => async (dispatch, getState) => {
  const state = getState()
  const { selectedPatch } = state.champion
  const { data } = await fetch(
    `http://ddragon.leagueoflegends.com/cdn/${selectedPatch}/data/en_US/item.json`,
  ).then<{ data: Items }>((res) => res.json())
  const itemsAsRecord = Object.values(data).reduce<any>((acc, value) => {
    acc[value.name] = value

    return acc
  }, {})

  const selected: any = {}
  for (const key in itemsAsRecord) {
    if (Object.keys(selected).length === 6) break
    else selected[key] = itemsAsRecord[key]
  }

  dispatch(setSelectedItems(selected))
  dispatch(setItems(itemsAsRecord))
}

export const selectItems = (state: RootState) => state.item.items

export const selectSelectedItems = (state: RootState) => state.item.selectedItems

export default itemSlice.reducer
