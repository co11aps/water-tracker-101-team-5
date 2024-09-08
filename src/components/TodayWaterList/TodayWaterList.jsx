import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteWater } from "../../redux/water/operations";
import { selectDailyWater } from "../../redux/water/selectors";
import css from "./TodayWaterList.module.css";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import TodayListModal from "../TodayListModal/TodayListModal";
import Icon from "../Icon/Icon";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal"; // Додаємо модальне вікно для підтвердження

export default function TodayWaterList() {
  const dispatch = useDispatch();
  const { waterIntakes } = useSelector(selectDailyWater);

  const [editItem, setEditItem] = useState(null); // Стан для редагування
  const [deleteItem, setDeleteItem] = useState(null); // Стан для видалення

  // const handleDelete = (id) => {
  //   dispatch(deleteWater(id)); // Видаляємо запис по id
  // };

  const handleDelete = (id) => {
    setDeleteItem(id); // Відкриваємо модальне вікно для підтвердження видалення
  };

  const confirmDelete = () => {
    dispatch(deleteWater(deleteItem)); // Видаляємо запис після підтвердження
    setDeleteItem(null); // Закриваємо модальне вікно
  };

  const handleEdit = (item) => {
    setEditItem(item); // Відкриваємо модальне вікно для редагування
  };

  const closeModal = () => {
    setEditItem(null); // Закриваємо модальне вікно
    setDeleteItem(null); // Закриваємо модальне вікно підтвердження
  };

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Today</h2>
      <div className={css.waterList}>

        {waterIntakes.length === 0 ? (
        <p className={css.blank}>No notes yet!</p>
      ) : (
        <ul>
          {waterIntakes.map((item) => (
            <li key={item._id} className={css.listItem}>
              <div className={css.info}>
              <Icon
                id="glass"
                width={26}
                height={26}
                aria-hidden="true"
                className={css.iconGlass}
              />

              <span className={css.todayVolume}>{item.amount} ml</span>
                <span className={css.todayTime}>{item.time}</span>
              
              </div>

              <button
                className={css.editButton}
                onClick={() => handleEdit(item)}
              >
                <Icon
                  id="pensil"
                  width={16}
                  height={16}
                  aria-hidden="false"
                  className={css.iconEditButton}
                />
              </button>
              {/* <button className={css.editBtn} onClick={() => handleEdit(item)}>
                ✏️
              </button> */}
              <button
                className={css.deleteButton}
                onClick={() => handleDelete(item._id)}
              >
                <Icon
                  id="trash"
                  width={16}
                  height={16}
                  aria-hidden="false"
                  className={css.iconDeliteButton}
                />
              </button>
              {/* <button onClick={() => handleDelete(item._id)}>🗑️</button> */}
            </li>
            
          ))}
        </ul>
        )}
        </div>
      <AddWaterBtn />
      {editItem && (
        <TodayListModal
          isShow={!!editItem}
          onClose={closeModal}
          item={editItem} // Передаємо запис для редагування
        />
      )}
      {deleteItem && (
        <ConfirmationModal
          isShow={!!deleteItem}
          onClose={closeModal}
          onConfirm={confirmDelete} // Підтвердження видалення
        />
      )}
    </div>
  );
}

// <Icon
//   id={"icon-glass"}
//   width={26}
//   height={26}
//   aria-hidden="false"
//   className={css.icon}
// />;
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
