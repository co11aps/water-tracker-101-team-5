import css from "./UserMenu.module.css"
import { logout } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import { useDispatch, useSelector } from 'react-redux';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div className={css.container}>
      <p>Welcome {user.name}</p>
      <button
        type="button"
        onClick={() => dispatch(logout())}
      >
        LogOut
      </button>
    </div>
  )
}

export default UserMenu