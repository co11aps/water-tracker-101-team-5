// import { useSelector, useDispatch } from "react-redux";
// import { closeModal, openModal } from "../../redux/reduxToday/modalSlice";
// import {
//   addWaterEntry,
//   removeWaterEntry,
// } from "../../redux/reduxToday/todaySlice";
// import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
// import TodayListModal from "../TodayListModal/TodayListModal";
// import css from "./TodayWaterList.module.css";
// import Icon from "../Icon/Icon";

// export default function TodayWaterList() {
//   const dispatch = useDispatch();
//   const waterList = useSelector((state) => state.today.items);
//   const isModalOpen = useSelector((state) => state.modal.isOpen);

//   const handleAddWater = (entry) => {
//     dispatch(addWaterEntry(entry));
//     dispatch(closeModal());
//   };

//   const handleDelete = (id) => {
//     dispatch(removeWaterEntry(id));
//   };

//   return (
//     <div className={css.container}>
//       <h2 className={css.title}>Today</h2>
//       {waterList.length > 0 ? (
//         <ul className={css.waterList}>
//           {waterList.map((entry) => (
//             <li key={entry.id} className={css.waterListItem}>
//               <Icon
//                 id={"icon-glass"}
//                 width={24}
//                 height={24}
//                 // aria-hidden="false"
//                 className={css.icon}
//               />

//               <span>{entry.volume} ml</span>
//               <span>{entry.time}</span>
//               <button
//                 className={css.editButton}
//                 onClick={() => dispatch(openModal(entry.id))}
//               >
//                 <Icon
//                   id={"icon-pensil"}
//                   width={24}
//                   height={24}
//                   // aria-hidden="false"
//                   className={css.icon}
//                 />
//                 ✏️
//               </button>
//               <button
//                 className={css.deleteButton}
//                 onClick={() => handleDelete(entry.id)}
//               >
//                 🗑️
//               </button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No notes yet!</p>
//       )}
//       <AddWaterBtn onClick={() => dispatch(openModal())} />
//       {isModalOpen && (
//         <TodayListModal
//           onClose={() => dispatch(closeModal())}
//           onSave={handleAddWater}
//         />
//       )}
//     </div>
//   );
// }
