import { BaseModal } from "../BaseModal/BaseModal.jsx";
import PropTypes from 'prop-types';
import css from './DailyNormaModal.module.css'; 

const DailyNormaModal = ({ onClose, isShow }) => {
  return (
    <BaseModal onClose={onClose} isShow={isShow} title="My daily norma">
      <div className={css.BoxModal}>
        <div>
          <div className={css.Formula}>
            <p className={css.Paragraph}>
              For woman: <span>V=(M*0,03) + (T*0,4)</span>
            </p>
            <p className={css.Paragraph}>
              For man: <span>V=(M*0,04) + (T*0,6)</span>
            </p>
          </div>
          <div className={css.Comment}>
            <p>
              <span>*</span>V is the volume of the water norm in liters per day, M is your body weight, T is the time of active sports, or another type of activity commensurate in terms of loads (in the absence of these, you must set 0)
            </p>
          </div>
        </div>
        <div>
          <div className={css.Form}>
            <div className={css.FormRadio}>
              <p className={css.TitleModal}>Calculate your rate:</p>
              <label>
                <input
                  className={css.InputRadio}
                  type="radio"
                  name="gender"
                  value="female"
                />
                <span>For woman</span>
              </label>
              <label>
                <input
                  className={css.InputRadio}
                  type="radio"
                  name="gender"
                  value="male"
                />
                <span>For man</span>
              </label>
            </div>
            <div>
              <p className={css.Paragraph}>Your weight in kilograms:</p>
              <input
                className={css.Input}
                type="number"
                min="0"
                max="250"
                placeholder="0"
              />
            </div>
            <div>
              <p className={css.Paragraph}>
                The time of active participation in sports or other activities with a high physical. load in hours:
              </p>
              <input
                className={css.Input}
                type="number"
                min="0"
                placeholder="0"
              />
            </div>
            <div className={css.FormResult}>
              The required amount of water in liters per day:
              <strong> 0.0 L</strong>
            </div>
            <div>
              <p className={css.TitleModal}>
                Write down how much water you will drink:
              </p>
              <input
                className={css.Input}
                type="number"
                placeholder="0"
              />
            </div>
            <button className={css.ButtonSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

DailyNormaModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isShow: PropTypes.bool.isRequired,
};

export default DailyNormaModal;


