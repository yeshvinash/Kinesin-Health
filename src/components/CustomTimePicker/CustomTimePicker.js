import { TimePicker } from "antd";
import React, { useState } from "react";
import moment from "moment";
import "./CustomTimePicker.css";

export const CustomTimePicker = () => {
  const [timeRange, setTimeRange] = useState([
    // Set default values for start and end time
    moment("09:00", "HH:mm"),
    moment("18:00", "HH:mm"),
  ]);

  const handleTimeChange = (value) => {
    setTimeRange(value);
  };
  return (
    <>
      <div className="custom-timepicker-wrap"> 
        <TimePicker.RangePicker
          value={timeRange}
          onChange={handleTimeChange}
          format="HH:mm"
        />
      </div>
    </>
  );
};
