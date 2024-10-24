import React, { useState } from "react";
import "./CustomDatepicker.css"
import { DatePicker } from "antd";

const CustomDatepicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [focused, setFocused] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const onFocusChange = () => {
    setFocused(true);
  };

  const onBlurChange = () => {
    if (!selectedDate) {
      setFocused(false);
    }
  };

  return (
    <>
      {" "}
      <div
        className={`custom-date-picker ${
          focused || selectedDate ? "focused" : ""
        }`}
      >
        <label htmlFor="datepicker" className="floating-label">
          Date of Birth
        </label>
        <DatePicker
          id="datepicker"
          placeholder=""
          value={selectedDate}
          onChange={handleDateChange}
          onFocus={onFocusChange}
          onBlur={onBlurChange}
          format="DD/MM/YYYY"
        />
      </div>
    </>
  );
};

export default CustomDatepicker;
