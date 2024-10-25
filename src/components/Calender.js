import React, { useEffect, useState } from "react";
import moment from "moment";
import '../assets/css/calender.css'
import { removeDate, setDate } from "../redux/service/DateTimeSlice";
import { useDispatch } from "react-redux";

const HorizontalCalendar = ({
  selectedDate,
  setSelectedDate
}) => {
  const [month, setMonth] = useState(moment().month());
  const [year, setYear] = useState(moment().year());
  const [activeIndex, setActiveIndex] = useState(0);

  const dispatch = useDispatch();

  const handleDateClick = (date) => {
    setSelectedDate(date);
    dispatch(removeDate())
    dispatch(setDate(date.format("ddd MMM Do")))
  };

  const handleMonthChange = (event) => {
    const currentDate = moment().startOf("day");
    if (parseInt(event.target.value) == currentDate.month() && parseInt(year) == currentDate.year()) {
      setSelectedDate(new Date().getTime());
      moveSliderAutomatically(moment(new Date()).format("D"));
    } else {
      let d = new Date();
      d.setFullYear(year);
      d.setMonth(parseInt(event.target.value));
      d.setDate(1);

      setSelectedDate(d.getTime());
      moveSliderAutomatically(1);
    }
    setMonth(parseInt(event.target.value));
  };

  const handleYearChange = (event) => {
    const currentDate = moment().startOf("day");
    if (parseInt(month) == currentDate.month() && parseInt(event.target.value) == currentDate.year()) {
      setSelectedDate(new Date().getTime());
      moveSliderAutomatically(moment(new Date()).format("D"));
    }
    else {

      let d = new Date();
      d.setFullYear(event.target.value);
      d.setMonth(month);
      d.setDate(1);

      setSelectedDate(d.getTime());
      moveSliderAutomatically(1);
    }

    setYear(parseInt(event.target.value));
  };

  const previousMonth = () => {
    setMonth(month - 1);
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    }
  };

  const nextMonth = () => {
    setMonth(month + 1);
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    }
  };

  const dates = [];
  for (let i = 1; i <= moment(`${year}-${month + 1}`, "YYYY-MM").daysInMonth(); i++) {
    dates.push(i);
  }

  const handleCarouselSlide = (event) => {
    setActiveIndex(parseInt(event.target.value));
  };

  const getCarouselItems = () => {
    const items = [];
    const firstDate = moment(`${year}-${month + 1}-01`, "YYYY-MM-DD");
    const currentDate = moment().startOf("day")
    for (let i = 0; i < dates.length; i++) {
      const date = firstDate.clone().add(i, "days");
      const isSelected = selectedDate && date.isSame(selectedDate, "day");
      const isToday = date.isSame(currentDate, "day");

      var mo;
      if (!selectedDate || selectedDate.length == 0)
        setSelectedDate(new Date().getTime());
      var mo = moment(new Date(selectedDate)).format("D");
      var d = new Date();
      items.push(
        <div key={i} className={date.format("D") == mo ? 'carousel-item selected' : 'carousel-item'} onClick={() => handleDateClick(date)}
          style={{ backgroundColor: date.diff(d, 'days') < 0 && date.format("D") != mo ? '#F2F2FA' : '' }}
        >
          {date.format("ddd")}
          <br />
          {date.format("D")}
        </div>
      );
    }
    return items;
  };
  // Dynamically calculate the width based on the number of dates
  const slideWidth = (100 / Math.ceil(dates.length / 7)).toFixed(2);

  useEffect(() => {
    let d = moment(new Date()).format("D");
    moveSliderAutomatically(d);
  }, []);

  const moveSliderAutomatically = (d) => {
    if (d) {
      if (d > 26) {
        setActiveIndex(activeIndex + 4)
      } else if (d > 20) {
        setActiveIndex(activeIndex + 3)
      } else if (d > 13) {
        setActiveIndex(activeIndex + 2)
      } else if (d > 7) {
        setActiveIndex(activeIndex + 1)
      } else {
        setActiveIndex(0);
      }
    }
  }
  return (
    <div>
      <div className="manthyearsect">
        <h3>Select Date and Time</h3>
        <button onClick={previousMonth}>{`<`}</button>
        <select value={month} onChange={handleMonthChange}>
          {moment.months().map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>
        <select value={year} onChange={handleYearChange}>
          {[...Array(15)].map((_, index) => (
            <option key={index} value={year - 5 + index}>
              {year - 5 + index}
            </option>
          ))}
        </select>
        <button onClick={nextMonth}>{`>`}</button>
      </div>
      <div className="carousel-container">
        <button
          className="carousel-button carousel-prev"
          disabled={activeIndex === 0}
          onClick={() => setActiveIndex(activeIndex - 1)}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="carousel">
          <div className="carousel-items" style={{ transform: `translateX(-${activeIndex * slideWidth}%)` }}>
            {getCarouselItems()}
          </div>
        </div>
        <button
          className="carousel-button carousel-next"
          disabled={activeIndex === Math.ceil(dates.length / 7) - 1}
          onClick={() => setActiveIndex(activeIndex + 1)}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default HorizontalCalendar;

