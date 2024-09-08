import { BaseModal } from "../BaseModal/BaseModal";
import css from "./ConfirmationModal.module.css";

export default function ConfirmationModal({ isShow, onClose, onConfirm }) {
  if (!isShow) return null;

  return (
    <BaseModal onClose={onClose} isShow={isShow} title="Delete entry">
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <p className={css.message}>
          Are you sure you want to delete the entry?
        </p>
        <div className={css.btnGroup}>
          <button className={css.confirmButton} onClick={onConfirm}>
            Delete
          </button>
          <button className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
