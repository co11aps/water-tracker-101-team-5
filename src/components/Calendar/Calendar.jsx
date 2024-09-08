import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMonthlyWater } from '../../redux/water/operations';
import { selectMonthlyWater, selectIsLoading, selectError } from '../../redux/water/selectors';
import css from './Calendar.module.css';
import Loader from '../Loader/Loader';

const months = [
    { monthName: 'January', monthDays: 31 },
    { monthName: 'February', monthDays: 28 },
    { monthName: 'March', monthDays: 31 },
    { monthName: 'April', monthDays: 30 },
    { monthName: 'May', monthDays: 31 },
    { monthName: 'June', monthDays: 30 },
    { monthName: 'July', monthDays: 31 },
    { monthName: 'August', monthDays: 31 },
    { monthName: 'September', monthDays: 30 },
    { monthName: 'October', monthDays: 31 },
    { monthName: 'November', monthDays: 30 },
    { monthName: 'December', monthDays: 31 },
];

const Calendar = () => {
    const dispatch = useDispatch();
    const monthlyWater = useSelector(selectMonthlyWater); 
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [hoveredDay, setHoveredDay] = useState(null);
    const modalRef = useRef(null);

    useEffect(() => {
        dispatch(getMonthlyWater({ year, month: month + 1 })); 
    }, [dispatch, year, month]);

    const handlePrevMonth = () => {
        if (month === 0) {
            setMonth(months.length - 1);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    };

    const handleNextMonth = () => {
        if (month < months.length - 1) {
            setMonth(month + 1);
        } else {
            setMonth(0);
            setYear(year + 1);
        }
    };

    const handleMouseEnter = (day) => {
        setHoveredDay(day);
        adjustModalPosition();
    };

    const handleMouseLeave = () => {
        setHoveredDay(null);
    };

    // const adjustModalPosition = () => {
    //     if (modalRef.current) {
    //         const modalRect = modalRef.current.getBoundingClientRect();
    //         const viewportWidth = window.innerWidth;

    //         if (modalRect.top < 0) {
    //             modalRef.current.style.bottom = 'auto';
    //             modalRef.current.style.top = '100%';
    //         } else {
    //             modalRef.current.style.top = 'auto';
    //             modalRef.current.style.bottom = '100%';
    //         }

    //         if (modalRect.left < 0) {
    //             modalRef.current.style.left = '0';
    //             modalRef.current.style.transform = 'translateX(0)';
    //         } else if (modalRect.right > viewportWidth) {
    //             modalRef.current.style.left = 'auto';
    //             modalRef.current.style.right = '0';
    //             modalRef.current.style.transform = 'translateX(0)';
    //         } else {
    //             modalRef.current.style.left = '50%';
    //             modalRef.current.style.transform = 'translateX(-50%)';
    //         }
    //     }
    // };

    const getDayData = (day) => {
  if (!Array.isArray(monthlyWater)) {
    return null;
  }

        return monthlyWater.find((data) => {
        const dayNumber = parseInt(data.date.split(',')[0], 10); 
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
                    <span className={css.prev} onClick={handlePrevMonth}>&lt;</span>
                    <span>{months[month].monthName}, {year}</span>
                    <span className={css.next} onClick={handleNextMonth}>&gt;</span>
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
                            onMouseEnter={() => handleMouseEnter(dayData)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className={`${css.date} ${fullfilment < 100 ? css.unfilled : ''}`}>{day}</div>
                            <div className={css.percentage}>{dayData ? `${fullfilment}%` : '0%'}</div>
                            {hoveredDay && hoveredDay.date === dayData?.date && (
                                <div className={css.modal} ref={modalRef}>
                                    <div className={css.modalDate}>{day}, {months[month].monthName}</div>
                                    <div className={css.modalText}>Daily norma: <span className={css.modalTextBlue}>{(dayData.dailyNorma / 1000).toFixed(1)} L</span></div>
                                    <div className={css.modalText}>Fulfillment of the daily norm: <span className={css.modalTextBlue}>{fullfilment}%</span></div>
                                    <div className={css.modalText}>Total amount: <span className={css.modalTextBlue}>{(dayData.totalAmount / 1000).toFixed(1)} L</span></div>
                                    <div className={css.modalText}>Servings: <span className={css.modalTextBlue}>{dayData.servings}</span></div>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Calendar;