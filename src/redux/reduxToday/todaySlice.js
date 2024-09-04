import { createSlice } from "@reduxjs/toolkit";

const todaySlice = createSlice({
  name: "today",
  initialState: {
    items: [],
  },
  reducers: {
    addWaterEntry: (state, action) => {
      // Додаємо новий запис
      state.items.push({ id: Date.now(), ...action.payload });
    },
    editWaterEntry: (state, action) => {
      // Знаходимо та оновлюємо запис за id
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    removeWaterEntry: (state, action) => {
      // Видаляємо запис за id
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
  //   reducers: {
  //     addWaterEntry: (state, action) => {
  //       state.items.push(action.payload);
  //     },
  //     editWaterEntry: (state, action) => {
  //       const { id, volume, time } = action.payload;
  //       const entry = state.items.find((item) => item.id === id);
  //       if (entry) {
  //         entry.volume = volume;
  //         entry.time = time;
  //       }
  //     },
  //     removeWaterEntry: (state, action) => {
  //       state.items = state.items.filter((item) => item.id !== action.payload);
  //     },
  //   },
});

export const { addWaterEntry, editWaterEntry, removeWaterEntry } =
  todaySlice.actions;

export default todaySlice.reducer;
