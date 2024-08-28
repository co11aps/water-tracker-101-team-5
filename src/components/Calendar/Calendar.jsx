import { useState, useEffect, useRef } from 'react';
import './Calendar.css';

const months = [
    { monthName: 'January', monthDays: 31 },
    { monthName: 'February', monthDays: 28 }, // Високосный год не учитывается для простоты
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
    const [month, setMonth] = useState(3);
    const [year, setYear] = useState(2023);
    const [hoveredDay, setHoveredDay] = useState(null);
    const [days, setDays] = useState([]);
    const modalRef = useRef(null);


   const generateRandomPercentage = () => {
        return `${Math.floor(Math.random() * 101)}%`;
    };


    useEffect(() => {
        const currentMonth = months[month];
        const initialDays = Array.from({ length: currentMonth.monthDays }, (_, index) => ({
            date: index + 1,
            percentage: generateRandomPercentage(),
        }));

        for (let i = 0; i < 30; i+=3) {
            initialDays[i].percentage = '100%';
            }
       

        setDays(initialDays);
}, [month]);
    
    const handlePrevMonth = () => {
        if (month == 0) { 
            setMonth(months.length - 1);
             setYear(year - 1);
        } 
        if (month > 0) {
            setMonth(month - 1);
        }
    };

    const handleNextMonth = () => {
        if (month < months.length - 1) setMonth(month + 1);
        if (month == months.length - 1) {
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
 const adjustModalPosition = () => {
        if (modalRef.current) {
            const modalRect = modalRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;

            if (modalRect.top < 0) {
                modalRef.current.style.bottom = 'auto';
                modalRef.current.style.top = '100%';
            } else {
                modalRef.current.style.top = 'auto';
                modalRef.current.style.bottom = '100%';
            }

            if (modalRect.left < 0) {
                modalRef.current.style.left = '0';
                modalRef.current.style.transform = 'translateX(0)';
            } else if (modalRect.right > viewportWidth) {
                modalRef.current.style.left = 'auto';
                modalRef.current.style.right = '0';
                modalRef.current.style.transform = 'translateX(0)';
            } else {
                modalRef.current.style.left = '50%';
                modalRef.current.style.transform = 'translateX(-50%)';
            }
        }
    };
    const getRandomServings = () => {
        return Math.floor(Math.random() * 10) + 1;
    };

    return (
         <div className="calendar-container">
            <div className="header">
                <h1>Month</h1>
                <div className="navigation">
                    <span className="prev" onClick={handlePrevMonth}>&lt;</span>
                    <span className="month-year">{months[month].monthName}, {year}</span>
                    <span className="next" onClick={handleNextMonth}>&gt;</span>
                </div>
            </div>
            <ul className="calendar">
                {days.map((day) => (
                    <li
                        className="day"
                        key={day.date}
                        onMouseEnter={() => handleMouseEnter(day)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className={`date ${parseInt(day.percentage) < 100 ? 'unfilled' : ''}`}>{day.date}</div>
                        <div className="percentage">{day.percentage}</div>
                        {hoveredDay && hoveredDay.date === day.date && (
                            <div className="modal" ref={modalRef}>
                                <div className="modal-date">{day.date}, {month}</div>
                                <div className="modal-text">Daily norma: <span className='modal-text-blue'>1.5 L</span></div>
                                <div className="modal-text">Fulfillment of the daily norm: <span className='modal-text-blue'>{day.percentage}</span></div>
                                <div className="modal-text">How many servings of water: <span className='modal-text-blue'>{getRandomServings()}</span></div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Calendar;
