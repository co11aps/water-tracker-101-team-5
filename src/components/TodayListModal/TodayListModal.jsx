// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { closeModal } from "../../redux/reduxToday/modalSlice";
// import {
//   addWaterEntry,
//   editWaterEntry,
// } from "../../redux/reduxToday/todaySlice";
// import css from "./TodayListModal.module.css";

// export default function TodayListModal() {
//   const dispatch = useDispatch();
//   const selectedEntryId = useSelector((state) => state.modal.selectedEntryId);
//   const isOpen = useSelector((state) => state.modal.isOpen);
//   const entry = useSelector((state) =>
//     state.today.items.find((item) => item.id === selectedEntryId)
//   );

//   const [volume, setVolume] = useState(entry ? entry.volume : 50);
//   const [time, setTime] = useState(entry ? entry.time : "07:00");

//   useEffect(() => {
//     if (entry) {
//       setVolume(entry.volume);
//       setTime(entry.time);
//     }
//   }, [entry]);

//   const handleSave = () => {
//     if (selectedEntryId) {
//       dispatch(editWaterEntry({ id: selectedEntryId, volume, time }));
//     } else {
//       dispatch(addWaterEntry({ volume, time }));
//     }
//     dispatch(closeModal());
//   };
//   if (!isOpen) return null;
//   return (
//     <div className={css.modalOverlay}>
//       <div className={css.modal}>
//         <button
//           className={css.closeButton}
//           onClick={() => dispatch(closeModal())}
//         >
//           ✖️
//         </button>
//         <h3 className={css.title}>
//           {selectedEntryId ? "Edit Water" : "Add Water"}
//         </h3>

//         {/* <div className={css.inputGroup}>
//           <label>Enter Volume:</label>
//           <input
//             type="number"
//             value={volume}
//             onChange={(e) => setVolume(Number(e.target.value))}
//             className={css.numberInput}
//           />
//         </div> */}

//         <div className={css.inputGroup}>
//           <label>Choose a value:</label>
//           <div className={css.volumeControl}>
//             <button
//               onClick={() => setVolume((prev) => prev + 50)}
//               className={css.volumeButton}
//             >
//               -
//             </button>
//             {/* <button onClick={handleDecrease} className={css.volumeButton}>
//               -
//             </button> */}
//             <span className={css.volumeDisplay}>{volume}ml</span>
//             <button
//               onClick={() => setVolume((prev) => Math.max(prev - 50, 0))}
//               className={css.volumeButton}
//             >
//               +
//             </button>
//             {/* <button onClick={handleIncrease} className={css.volumeButton}>
//               +
//             </button> */}
//           </div>
//         </div>

//         <div className={css.inputGroup}>
//           <label>Recording time:</label>
//           <input
//             type="time"
//             value={time}
//             onChange={(e) => setTime(e.target.value)}
//             className={css.timeInput}
//           />
//         </div>

//         <div className={css.inputGroup}>
//           <label>Enter the value of the water used:</label>
//           <input
//             type="number"
//             value={volume}
//             onChange={(e) => setVolume(Number(e.target.value))}
//             className={css.numberInput}
//           />
//         </div>

//         <button onClick={handleSave} className={css.saveButton}>
//           Save
//         </button>
//       </div>
//     </div>
//   );
// }
