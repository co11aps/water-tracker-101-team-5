import { useState, useEffect } from "react";
import "./Calendar.css";

const Calendar = () => {
  const [month, setMonth] = useState("April");
  const [year, setYear] = useState(2023);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [days, setDays] = useState([]);

  const generateRandomPercentage = () => {
    return `${Math.floor(Math.random() * 101)}%`;
  };

  useEffect(() => {
    const initialDays = Array.from({ length: 30 }, (_, index) => ({
      date: index + 1,
      percentage: generateRandomPercentage(),
    }));

    for (let i = 0; i < 30; i += 3) {
      initialDays[i].percentage = "100%";
    }

    setDays(initialDays);
  }, []);

  const handlePrevMonth = () => {
    // Логика для переключения на предыдущий месяц
  };

  const handleNextMonth = () => {
    // Логика для переключения на следующий месяц
  };

  const handleMouseEnter = (day) => {
    setHoveredDay(day);
  };

  const handleMouseLeave = () => {
    setHoveredDay(null);
  };

  const getRandomServings = () => {
    return Math.floor(Math.random() * 10) + 1;
  };

  return (
    <div className="calendar-container">
      <div className="header">
        <h1>Month</h1>
        <div className="navigation">
          <span className="prev" onClick={handlePrevMonth}>
            &lt;
          </span>
          <span className="month-year">
            {month}, {year}
          </span>
          <span className="next" onClick={handleNextMonth}>
            &gt;
          </span>
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
            <div
              className={`date ${
                parseInt(day.percentage) < 100 ? "unfilled" : ""
              }`}
            >
              {day.date}
            </div>
            <div className="percentage">{day.percentage}</div>
            {hoveredDay && hoveredDay.date === day.date && (
              <div className="modal">
                <div className="modal-date">
                  {day.date}, {month}
                </div>
                <div className="modal-text">
                  Daily norma: <span className="modal-text-blue">1.5 L</span>
                </div>
                <div className="modal-text">
                  Fulfillment of the daily norm:{" "}
                  <span className="modal-text-blue">{day.percentage}</span>
                </div>
                <div className="modal-text">
                  How many servings of water:{" "}
                  <span className="modal-text-blue">{getRandomServings()}</span>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
