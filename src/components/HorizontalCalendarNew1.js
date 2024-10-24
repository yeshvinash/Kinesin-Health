import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Image, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { SVGIcons } from "../components/Data/SVGIcons.js";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { createAxiosInstance } from "../api/axiosConfig.js";
import { Navigation } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { logoutFromHelper } from "../api/Helper.js";
import { logout } from "../redux/auth/AuthSlice.js";
import { removeuser } from "../redux/user/userSlice.js";
import toast, { Toaster } from "react-hot-toast";
import "swiper/css";
import { GET_APPOINTMENTS } from "../api/Service.js";
import moment from "moment";
import Calendar from "react-calendar";

const HorizontalCalendarNew1 = ({
  selectedDate,
  selectedMonth,
  selectedYear,

  setSelectedDate,
  setSelectedMonth,
  setSelectedYear,

  // onAppointmentData
}) => {
  // console.log(selectedDate);
  // console.log(selectedDate);
  const [appointmentData, setAppointmentData] = useState([]);
  const [showReactCalendar, setShowReactCalendar] = useState(false);

  const swiperRef = useRef(null);
  let tenantVal = useSelector((state) => state.auth.user?.tenant);
  if (!tenantVal) tenantVal = localStorage.getItem("kinesin-tenant");
  // const [selectedDate, setSelectedDate] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [selectedMonth, setSelectedMonth] = useState(moment().month() + 1);
  // const [selectedYear, setSelectedYear] = useState(moment().year());
  // const [selectedDate, setSelectedDate] = useState(moment().date());
  const [data, setData] = useState([]);

  const yearData = [
    {
      id: 1,
      Year: "2019",
    },
    {
      id: 2,
      Year: "2020",
    },
    {
      id: 3,
      Year: "2021",
    },
    {
      id: 4,
      Year: "2022",
    },
    {
      id: 5,
      Year: "2023",
    },
    {
      id: 6,
      Year: "2024",
    },
    {
      id: 7,
      Year: "2025",
    },
    {
      id: 8,
      Year: "2026",
    },
    {
      id: 9,
      Year: "2027",
    },
    {
      id: 10,
      Year: "2028",
    },
  ];

  const monthData = [
    {
      id: 1,
      Num: 1,
      month: "January",
    },
    {
      id: 2,
      Num: 2,
      month: "February",
    },
    {
      id: 3,
      Num: 3,
      month: "March",
    },
    {
      id: 4,
      Num: 4,
      month: "April",
    },
    {
      id: 5,
      Num: 5,
      month: "May",
    },
    {
      id: 6,
      Num: 6,
      month: "June",
    },
    {
      id: 7,
      Num: 7,
      month: "July",
    },
    {
      id: 8,
      Num: 8,
      month: "August",
    },
    {
      id: 9,
      Num: 9,
      month: "September",
    },
    {
      id: 10,
      Num: 10,
      month: "October",
    },
    {
      id: 11,
      Num: 11,
      month: "November",
    },
    {
      id: 12,
      Num: 12,
      month: "December",
    },
  ];
  const toggleCalendarView = () => {
    // console.log("inside toggle");
    const body = document.querySelector("html");
    setShowReactCalendar(!showReactCalendar);
    body.classList.toggle("show-toggle-menu");
  };
  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };
  const handleDateChange = (date) => {
    // console.log(date);
    const dateObject = moment(date);

    const day = dateObject.date(); // Get the day of the month (1-31)
    const month = dateObject.month() + 1; // Get the month (0-11) and add 1 to match the format (1-12)
    const year = dateObject.year(); // Get the year

    // console.log("Day:", day); // Output: Day: 14
    // console.log("Month:", month); // Output: Month: 3
    // console.log("Year:", year); // Output: Year: 2024
    // setSelectedView("day");
    setSelectedDate(parseInt(day));
    setSelectedMonth(parseInt(month));
    setSelectedYear(parseInt(year));
    // getbystaffmemberidApi(selectedView, staffId, date);
    // onAppointmentData();
  };
  const handleYearChange = (event) => {
    // console.log(event.target.value);
    setSelectedYear(parseInt(event.target.value));
  };
  // console.log(selectedYear);
  const handleAppointmentData = (item) => {
    if (item.text) {
      console.log('ddd : ' + item.text + ' , ' + selectedDate + ' , ' + selectedMonth + ' , ' + selectedYear + ' , ' + selectedDate);

      var d = new Date();
      console.log('xxxxxxxxxxxxxxxxxxxxxxx : ' + selectedMonth + ' , ' + d.getMonth());
      d.setDate(selectedMonth == d.getMonth() && selectedYear == d.getFullYear() ? d.getDate() : 1);
      d.setMonth(selectedMonth);
      d.setFullYear(selectedYear);
      d.setMonth(d.getMonth() + 1)

      setSelectedMonth(d.getMonth());
      setSelectedDate(d.getDate());


      // const currentDate = new Date().getDate();

      // // Find the index of the current date in the data array
      // const currentIndex = data.findIndex((item) => item.Num === currentDate);
      // setIsActive(currentIndex);
      // setSelectedDate(currentDate);

      return;
    }
    console.log(item.Num);
    setSelectedDate(item.Num);
  };

  useEffect(() => {
    // setSelectedDate(new Date())
    const swiperInstance = swiperRef.current?.swiper;
    if (swiperInstance) {
      swiperInstance.slideTo(selectedDate - 1);
    }
  }, [selectedDate, showReactCalendar]);
  useEffect(() => {
    const daysInMonth = moment(
      `${selectedYear}-${selectedMonth}`,
      "YYYY-MM"
    ).daysInMonth();
    const daysArray = [];

    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push({
        id: i,
        Week: moment(
          `${selectedYear}-${selectedMonth}-${i}`,
          "YYYY-MM-D"
        ).format("ddd"),
        Num: i,
      });
    }
    daysArray.push({
      id: 100,
      Num: 1,
      text: <>{SVGIcons.SliderRightArrow}</>
    });
    setData(daysArray);
  }, [selectedMonth, selectedYear]);
  useEffect(() => {
    // Get the current year
    //  const currentYear = new Date().getFullYear();
    // Find the index of the current year in your options array
    //  const yearIndex = currentYear - 2019; // Assuming your options start from 2019
    // Set the default state value based on the current year
    //  setSelectedYear(String(yearIndex + 1));
    // Get the current month (1-indexed, January is 1, December is 12)
    //  const currentMonth = new Date().getMonth() + 1;
    // Set the default state value based on the current month
    //setSelectedMonth(String(currentMonth));
    // Get the current date value (for example, today's date)
    // const currentDate = new Date().getDate();
    // // Find the index of the current date in the data array
    // const currentIndex = data.findIndex((item) => item.Num === currentDate);
    // setSelectedDate(currentDate);
    // setIsActive(currentIndex);
  }, []);
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const selectedYearVal = yearData.find(
      (data) => data.id == selectedYear
    )?.Year;

    const currentMonth = new Date().getMonth() + 1;
    const selectedMonthVal = monthData.find(
      (data) => data.id == selectedMonth
    )?.Num;

    if (
      (selectedYearVal && currentYear !== parseInt(selectedYearVal)) ||
      (selectedMonthVal && currentMonth !== parseInt(selectedMonthVal))
    ) {
      setIsActive(0);
      setSelectedDate(data[0].Num);
    } else {
      // Get the current date value (for example, today's date)
      const currentDate = new Date().getDate();

      // Find the index of the current date in the data array
      const currentIndex = data.findIndex((item) => item.Num === currentDate);
      setIsActive(currentIndex);
      setSelectedDate(currentDate);
    }
  }, [selectedMonth, selectedYear]);
  useEffect(() => {
    // console.log(onAppointmentData)
    // onAppointmentData();
    // getAppointmentData();
    const swiperInstance = swiperRef.current?.swiper;

    if (swiperInstance) {
      swiperInstance.slideTo(selectedDate - 1);
    }
  }, [selectedDate, selectedMonth, selectedYear]);

  const getAppointmentData = async () => {
    try {
      const axiosInstance = createAxiosInstance();
      const selectedYearVal = yearData.find(
        (data) => data.id == selectedYear
      )?.Year;
      const selectedMonthVal = monthData.find(
        (data) => data.id == selectedMonth
      )?.Num;

      // Ensure leading zeros for month and date
      const formattedMonth = String(selectedMonth).padStart(2, "0");
      const formattedDate = String(selectedDate).padStart(2, "0");

      const startDate = `${selectedYear}-${formattedMonth}-${formattedDate}`;
      // const endDate = moment(startDate).endOf('month').format('YYYY-MM-DD');
      const endDate = startDate;

      const response = await axiosInstance.get(
        `${tenantVal}${GET_APPOINTMENTS}?startDate=${startDate}&endDate=${endDate}`
      );
      // console.log(response.data)
      // if (typeof onAppointmentData === "function") {
      //     // console.log(response.data)
      //     onAppointmentData(response.data); // Pass the appointment data to the parent component
      // }
      setAppointmentData(response.data);
      // Handle response data as needed
    } catch (error) {
      errorHandling(error);
    }
  };

  const errorHandling = (error) => {
    toast.error(error.message);
    if (error && error.response && error.response.status) {
      if (error.response.status == 403) {
        logoutFromHelper();
        dispatch(logout());
        dispatch(removeuser());
        navigate("/logout");
      }
    }
  };

  const [isActive, setIsActive] = useState(false);

  return (
    <div className="single-calendar-wrap">
      {/* <Button onClick={toggleCalendarView}>
                {showReactCalendar ? "Week" : "Month"}
            </Button> */}
      {showReactCalendar ? (
        <>
          <div className="hamburger_menu" onClick={toggleCalendarView}>
            <div className="toggle_line"></div>
            <div className="toggle_line"></div>
            <div className="toggle_line"></div>
          </div>
          {/* <Button
            onClick={toggleCalendarView}
            className="custom_btn calendar_btn"
          >
            {showReactCalendar ? "Week" : "Month"}
          </Button> */}
          <Calendar
            onChange={handleDateChange}
            value={
              selectedDate && selectedMonth && selectedYear
                ? new Date(selectedYear, selectedMonth - 1, selectedDate)
                : new Date()
            }
          />
        </>
      ) : (
        <>
          <Form className="practice-details-form-step">
            <div className="d-flex align-items-center  btn-wrap">
              <div className="hamburger_menu" onClick={toggleCalendarView}>
                <div className="toggle_line"></div>
                <div className="toggle_line"></div>
                <div className="toggle_line"></div>
              </div>
              {/* <Button onClick={toggleCalendarView} className="custom_btn">
                {showReactCalendar ? "Week" : "Month"}
              </Button> */}
              {/* vv : {selectedDate} - {selectedMonth} -  {selectedYear} */}
              <div className="calendar-header-wrap d-flex align-items-center w-100 justify-content-between">
                <div className="d-flex choose-date-time-select-wrap">
                  <Form.Select
                    aria-label="select"
                    className="choose-date-time-select"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                  >
                    {moment.months().map((month, index) => (
                      <option key={index} value={index + 1}>
                        {month}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Select
                    aria-label="select"
                    className="choose-date-time-select"
                    value={selectedYear}
                    onChange={handleYearChange}
                  >
                    {[
                      ...Array.from(
                        { length: 10 },
                        (v, i) => moment().year() - i
                      ).reverse(), // Previous years
                      moment().year(), // Current year
                      ...Array.from(
                        { length: 10 },
                        (v, i) => moment().year() + i + 1
                      ), // Upcoming years
                    ]
                      .filter(
                        (year, index, self) => self.indexOf(year) === index
                      ) // Filter out duplicates
                      .map((year, index) => (
                        <option key={index} value={year}>
                          {year}
                        </option>
                      ))}
                  </Form.Select>
                </div>
                <div className="flex-shrink-0">
                  <button className="swiper-button-prev swiper-btn">
                    {SVGIcons.SliderLeftArrow}
                  </button>
                  <button className="swiper-button-next swiper-btn">
                    {SVGIcons.SliderRightArrow}
                  </button>
                </div>
              </div>
            </div>
            <div className="calander-slider">
              <Swiper
                ref={swiperRef}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                clickable={true}
                spaceBetween={10}
                slidesPerView={7}
                breakpoints={{
                  320: { slidesPerView: 3 },
                  375: { slidesPerView: 3.5 },
                  414: { slidesPerView: 4.5},
                  576: { slidesPerView: 6 },  
                  768: { slidesPerView: 7 },
                  992: { slidesPerView: 5 },
                  1200: { slidesPerView: 6 },
                  1800: { slidesPerView: 7 },
                }}
              >
                {data.map((item, index) => {
                  // console.log(item.Num);
                  // console.log(selectedDate); // Log the item object
                  // console.log(typeof (selectedDate)); // Log the item object
                  // console.log(typeof (item.Num));
                  // console.log(selectedDate === item.Num);
                  return (
                    <SwiperSlide
                      key={item.id}
                      className={selectedDate === item.Num && !item.text ? "active" : ""}
                      // className={`date-time-card-slider ${selectedDate > item.Num ? 'bg-color' : ''} ${selectedDate === item.Num ? 'active' : ''}`}
                      onClick={() => handleAppointmentData(item)}
                    >
                      <div
                        className="d-flex flex-column align-items-center justify-content-center date-time-card-slider"
                        // style={
                        //   selectedDate > item.Num
                        //     ? { backgroundColor: "rgb(242, 242, 250)" }
                        //     : {}
                        // }
                        style={{
                          ...(selectedDate > item.Num
                            ? { backgroundColor: "rgb(242, 242, 250)" }
                            : {}),
                          cursor: "pointer",
                        }}
                      >
                        <span className="d-inline-block week fw-500">
                          {item.Week}
                        </span>
                        <span className="d-inline-block number h3 small mb-0">
                          {/* {item.Num} */}
                          {item.text ? item.text : item.Num}
                        </span>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </Form>
        </>
      )}
    </div>
  );
};

export default HorizontalCalendarNew1;

{
  /*
 <Form className="practice-details-form-step">
<div className="d-flex justify-content-between">
    {/* vv : {selectedDate} - {selectedMonth} -  {selectedYear} 
    <div className="d-flex choose-date-time-select-wrap">
        <Form.Select
            aria-label="select"
            className="choose-date-time-select"
            value={selectedMonth}
            onChange={handleMonthChange}
        >
            {moment.months().map((month, index) => (
                <option key={index} value={index + 1}>{month}</option>
            ))}
        </Form.Select>
        <Form.Select
            aria-label="select"
            className="choose-date-time-select"
            value={selectedYear}
            onChange={handleYearChange}
        >
            {[
                ...Array.from({ length: 10 }, (v, i) => moment().year() - i).reverse(), // Previous years
                moment().year(), // Current year
                ...Array.from({ length: 10 }, (v, i) => moment().year() + i + 1) // Upcoming years
            ].map((year, index) => (
                <option key={index} value={year}>{year}</option>
            ))}
        </Form.Select>

    </div>
    <div className="flex-shrink-0">
        <button className="swiper-button-prev swiper-btn">
            {SVGIcons.SliderLeftArrow}
        </button>
        <button className="swiper-button-next swiper-btn">
            {SVGIcons.SliderRightArrow}
        </button>
    </div>
</div>
<div className="calander-slider">
    <Swiper
        ref={swiperRef}
        navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }}
        clickable={true}
        spaceBetween={10}
        slidesPerView={7}
        breakpoints={{
            320: { slidesPerView: 3.5 },
            414: { slidesPerView: 4 },
            576: { slidesPerView: 5.5 },
            768: { slidesPerView: 7 },
            992: { slidesPerView: 5 },
            1600: { slidesPerView: 7 },
        }}
    >
        {data.map((item, index) => (
            <SwiperSlide
                key={item.id}
                className={selectedDate === item.Num ? "active" : ""}
                onClick={() => handleAppointmentData(index)}
            >
                <div className="d-flex flex-column align-items-center justify-content-center date-time-card-slider">
                    <span className="d-inline-block week fw-500">{item.Week}</span>
                    <span className="d-inline-block number h3 small mb-0">{item.Num}</span>
                </div>
            </SwiperSlide>
        ))}
    </Swiper>
</div>
</Form> */
}
