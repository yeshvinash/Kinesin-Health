import React, { useState } from "react";
import "./CustomDatepicker.css"
import { DatePicker } from "antd";

const CustomDatepicker = (props) => {
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
        {props.name}
        </label>
        <DatePicker
          id="datepicker"
          placeholder=""
          value={selectedDate}
          onChange={handleDateChange}
          onFocus={onFocusChange}
          onBlur={onBlurChange}
          format={props.format}
        />
      </div>
    </>
  );
};

export default CustomDatepicker;
