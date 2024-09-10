import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMonthlyWater } from "../../redux/water/operations";
import {
  selectMonthlyWater,
  selectIsLoading,
  selectError,
} from "../../redux/water/selectors";
import { selectDailyNorma } from "../../redux/auth/selectors";
import css from "./MonthStatsTable.module.css";
import Loader from "../Loader/Loader";

const months = [
  { monthName: "January", monthDays: 31 },
  { monthName: "February", monthDays: 28 },
  { monthName: "March", monthDays: 31 },
  { monthName: "April", monthDays: 30 },
  { monthName: "May", monthDays: 31 },
  { monthName: "June", monthDays: 30 },
  { monthName: "July", monthDays: 31 },
  { monthName: "August", monthDays: 31 },
  { monthName: "September", monthDays: 30 },
  { monthName: "October", monthDays: 31 },
  { monthName: "November", monthDays: 30 },
  { monthName: "December", monthDays: 31 },
];

const MonthStatsTable = () => {
  const dispatch = useDispatch();
  const monthlyWater = useSelector(selectMonthlyWater);
  const dailyNorma = useSelector(selectDailyNorma);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const modalRef = useRef(null);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    dispatch(getMonthlyWater({ year, month: month + 1 }));
  }, [dispatch, year, month, dailyNorma]);

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(months.length - 1);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (year === currentYear && month === currentMonth) {
      return;
    }

    if (month < months.length - 1) {
      setMonth(month + 1);
    } else {
      setMonth(0);
      setYear(year + 1);
    }
  };

  // const handleMouseEnter = (day) => {
  //     setSelectedDay(day);
  // };

  // const handleMouseLeave = () => {
  //     setSelectedDay(null);
  // };

  const handleDayClick = (dayData) => {
    setSelectedDay(dayData);
  };

  const getDayData = (day) => {
    if (!Array.isArray(monthlyWater)) {
      return null;
    }

    return monthlyWater.find((data) => {
      const dayNumber = parseInt(data.date.split(",")[0], 10);
      return dayNumber === day;
    });
  };

  const daysInMonth = months[month].monthDays;

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className={css.error}>Error: {error}</div>;
  }

  return (
    <div className={css.calendarContainer}>
      <div className={css.header}>
        <h1>Month</h1>
        <div className={css.navigation}>
          <span className={css.prev} onClick={handlePrevMonth}>
            &lt;
          </span>
          <span>
            {months[month].monthName}, {year}
          </span>
          {/* Приховуємо кнопку "вперед", якщо це поточний місяць і рік */}
          {!(year === currentYear && month === currentMonth) && (
            <span className={css.next} onClick={handleNextMonth}>
              &gt;
            </span>
          )}
        </div>
      </div>
      <ul className={css.calendar}>
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const dayData = getDayData(day);
          const fullfilment = dayData ? Math.min(dayData.fullfilment, 100) : 0;

          return (
            <li
              className={css.day}
              key={day}
              // onMouseEnter={() => handleMouseEnter(dayData)}
              // onMouseLeave={handleMouseLeave}
              onClick={() => handleDayClick(dayData)}
            >
              <div
                className={`${css.date} ${
                  fullfilment < 100 ? css.unfilled : ""
                }`}
              >
                {day}
              </div>
              <div className={css.percentage}>
                {dayData ? `${fullfilment}%` : "0%"}
              </div>
              {selectedDay && selectedDay.date === dayData?.date && (
                <div className={css.modal} ref={modalRef}>
                  <div className={css.modalDate}>
                    {day}, {months[month].monthName}
                  </div>
                  <div className={css.modalText}>
                    Daily norma:{" "}
                    <span className={css.modalTextBlue}>
                      {(dayData.dailyNorma / 1000).toFixed(1)} L
                    </span>
                  </div>
                  <div className={css.modalText}>
                    Fulfillment of the daily norm:{" "}
                    <span className={css.modalTextBlue}>{fullfilment}%</span>
                  </div>
                  <div className={css.modalText}>
                    Total amount:{" "}
                    <span className={css.modalTextBlue}>
                      {(dayData.totalAmount / 1000).toFixed(1)} L
                    </span>
                  </div>
                  <div className={css.modalText}>
                    Servings:{" "}
                    <span className={css.modalTextBlue}>
                      {dayData.servings}
                    </span>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MonthStatsTable;
