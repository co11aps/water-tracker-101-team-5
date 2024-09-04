// import { createSlice } from "@reduxjs/toolkit";

// const modalSlice = createSlice({
//   name: "modal",
//   initialState: {
//     isOpen: false, // Стан відкриття модального вікна
//     selectedEntryId: null, // ID запису, який редагується
//   },
//   reducers: {
//     openModal: (state, action) => {
//       state.isOpen = true;
//       state.selectedEntryId = action.payload || null; // Якщо передано ID, встановлюємо його
//     },
//     closeModal: (state) => {
//       state.isOpen = false;
//       state.selectedEntryId = null;
//     },
//   },
// });

// export const { openModal, closeModal } = modalSlice.actions;

// export default modalSlice.reducer;

// // import { createSlice } from "@reduxjs/toolkit";

// // const modalSlice = createSlice({
// //   name: "modal",
// //   initialState: {
// //     isOpen: false,
// //     selectedEntryId: null,
// //     waterEntries: [],
// //   },
// //   reducers: {
// //     openModal: (state, action) => {
// //       state.isOpen = true;
// //       state.selectedEntryId = action.payload || null;
// //     },
// //     closeModal: (state) => {
// //       state.isOpen = false;
// //       state.selectedEntryId = null;
// //     },
// //     saveWaterEntry: (state, action) => {
// //       const { id, volume, time } = action.payload;
// //       if (id) {
// //         const index = state.waterEntries.findIndex((entry) => entry.id === id);
// //         if (index !== -1) {
// //           state.waterEntries[index] = { id, volume, time };
// //         }
// //       } else {
// //         state.waterEntries.push({
// //           id: Date.now(),
// //           volume,
// //           time,
// //         });
// //       }

// //       //  для збереження запису через Redux
// //     },
// //   },
// // });

// // export const { openModal, closeModal, saveWaterEntry } = modalSlice.actions;

// // export default modalSlice.reducer;
