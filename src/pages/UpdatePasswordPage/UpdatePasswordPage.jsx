import UpdatePasswordForm from '../../components/UpdatePasswordForm/UpdatePasswordForm';
import css from './UpdatePasswordPage.module.css';

export default function UpdatePasswordPage() {
  return (
      <div className={css.container}>
          <div className={css.containerBox}>
        <div>
          <UpdatePasswordForm />
        </div>
        <div className={css.bottleBg}></div>
      </div>
      
    </div>
  );
}