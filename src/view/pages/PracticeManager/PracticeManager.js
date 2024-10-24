import React, { useEffect, useMemo, useState } from "react";
import { Image, Button } from "react-bootstrap";
import { Input } from "antd";
import { SVGIcons } from "../../../components/Data/SVGIcons";
import PlusIcon from "../../../assets/images/icons/PlusIcon.svg";
import EditIcon from "../../../assets/images/icons/editicon.svg";
import DeleteIcon from "../../../assets/images/icons/deleteicon.svg";
import ShiftPlanningImg from "../../../assets/images/cover/shift-planning.png";
import TimeClock from "../../../assets/images/cover/time-clock.png";
import Leave from "../../../assets/images/cover/leave.png";
import Training from "../../../assets/images/cover/training.png";
import Staff from "../../../assets/images/cover/staff.png";
import Payroll from "../../../assets/images/cover/payroll.png";
import Reports from "../../../assets/images/cover/reports.png";
import GroupAccounts from "../../../assets/images/cover/group-accounts.png";
import ProfileImg from "../../../assets/images/icons/avatar6.jpg";
import CallIcon from "../../../assets/images/icons/callicon.svg";
import CancelIcon from "../../../assets/images/icons/closeicon.svg";
import Avatar1 from "../../../assets/images/icons/avatar6.jpg";
import EmptyShifts from "../../../assets/images/icons/empty-shifts.png";
import VideoIcon from "../../../assets/images/icons/videoicon.svg";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Tabs } from "antd";
import useMessage from "antd/es/message/useMessage";
import { ChatBotProvider, useChatBotContext, Chatbot } from "react-chatbot-kit";
import config from "../../../components/CustomChatbot/config";
import ActionProvider from "../../../components/CustomChatbot/ActionProvider";
import MessageParser from "../../../components/CustomChatbot/MessageParser";
import { Calendar as BigCalender, momentLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import moment from "moment";
import "react-chatbot-kit/build/main.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomChatbot from "../../../components/CustomChatbot/CustomChatbot";
import Emoji from "../../../assets/images/icons/emoji.svg";
import CustomMessage from "../../../components/CustomChatbot/CustomMessage";
import UploadDocument from "../../../assets/images/icons/upload_document.svg";
import Send from "../../../assets/images/icons/send_icon.svg";
import botAvatar from "../../../assets/images/icons/chatbot_avatar.png";
import "./PracticeManager.css";

export const PracticeManager = () => {
  const [tab, setTab] = useState(1);
  const localizer = momentLocalizer(moment);
  const [content, setContent] = useState(true);
  const [message, setMessage] = useState("");
  const [view, setView] = useState("week");
  // const [date, setDate] = useState(new Date());
  const [date, setDate] = useState(moment());
  const [viewData, setViewData] = useState({});
  const [showComponent, setshowComponent] = useState({});

  // console.log(date);
  const handleChange = (event) => {
    setMessage(event.target.value);
    console.log("value is:", event.target.value);
  };

  const handleTabClick = (id) => {
    setTab(id);
    // setshowComponent(!showComponent);
    test(id);
    console.log({ id: id });
  };

  const test = (id) => {
    const newshowComponent = {};

    Object.keys(showComponent).forEach((id) => {
      newshowComponent[id] = false;
    });
    newshowComponent[id] = !showComponent[id];
    setshowComponent(newshowComponent);
  };

  const onChange = (newDate) => {
    console.log(newDate);
    setDate(newDate);
  };

  const CustomPrevButton = ({ onClick }) => (
    <button onClick={onClick} className="btn-arrow-wrap">
      {SVGIcons.CalendarLeftArrow}
    </button>
  );

  const CustomNextButton = ({ onClick }) => (
    <button onClick={onClick} className="btn-arrow-wrap">
      {SVGIcons.CalendarRightArrow}
    </button>
  );

  const profiletabsData = [
    {
      id: 1,
      profileImage: ProfileImg,
      profileTitle: "Marry",
      profileDesc: "Would you like a cup off tea?",
      profileTime: "11:15 PM",
    },
    {
      id: 2,
      profileImage: ProfileImg,
      profileTitle: "Dr. Jerry",
      profileDesc: "Would you like a cup off tea?",
      profileTime: "9:09 PM",
    },
    {
      id: 3,
      profileImage: ProfileImg,
      profileTitle: "Dr. Jane",
      profileDesc: "Would you like a cup off tea?",
      profileTime: "12:15 PM",
    },
    {
      id: 4,
      profileImage: ProfileImg,
      profileTitle: "Nurse Anne",
      profileDesc: "Would you like a cup off tea?",
      profileTime: "7:02 PM",
    },
    {
      id: 5,
      profileImage: ProfileImg,
      profileTitle: "Dr. Robert",
      profileDesc: "Would you like a cup off tea?",
      profileTime: "6:17 PM",
    },
    {
      id: 6,
      profileImage: ProfileImg,
      profileTitle: "Marry",
      profileDesc: "Would you like a cup off tea?",
      profileTime: "6:17 PM",
    },
  ];

  const events = [
    {
      id: 1,
      title: "Empty Shifts",
      start: new Date(2024, 2, 3, 9, 0),
      end: new Date(2024, 2, 3, 11, 0),
      avatar: EmptyShifts,
      className: "empty-shifts ",
    },
    {
      id: 2,
      title: "Dr. John Doe",
      start: new Date(2024, 2, 3, 9, 0),
      end: new Date(2024, 2, 3, 11, 0),
      avatar: Avatar1,
      className: "timeslot-blue doctor1 ",
    },
    {
      id: 3,
      title: "Dr. Jerry Wick",
      start: new Date(2024, 2, 3, 11, 0),
      end: new Date(2024, 2, 3, 1, 0),
      avatar: Avatar1,
      className: "timeslot-yellow doctor2 ",
    },
    {
      id: 4,
      title: "Dr. Jane",
      start: new Date(2024, 2, 3, 13, 0),
      end: new Date(2024, 2, 3, 15, 0),
      avatar: Avatar1,
      className: "timeslot-pink doctor3 ",
    },
    {
      id: 5,
      title: "Lorem ipsum",
      start: new Date(2024, 2, 3, 9, 0),
      end: new Date(2024, 2, 3, 11, 0),
      avatar: Avatar1,
      className: "timeslot-blue event-wrap schedule-wrap ",
    },
    {
      id: 6,
      title: "Lorem ipsum",
      start: new Date(2024, 2, 6, 11, 0),
      end: new Date(2024, 2, 6, 16, 0),
      avatar: Avatar1,
      className: "timeslot-yellow event-wrap schedule-wrap ",
    },
    {
      id: 7,
      title: "Lorem ipsum",
      start: new Date(2024, 2, 6, 11, 0),
      end: new Date(2024, 2, 6, 16, 0),
      avatar: Avatar1,
      className: "timeslot-pink event-wrap schedule-wrap ",
    },
  ];

  const CustomWeekHeader = ({ date }) => {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const weekLabel = `${days[date.getDay()]}`;
    return <span className="weekname-wrap">{weekLabel}</span>;
  };

  const eventPropGetter = (event, start, end, isSelected) => {
    // Add custom classes based on event data
    return {
      className: event.className,
    };
  };

  const handleViewChange = (e) => {
    setView(e.target.value);
  };

  const CustomEvent = ({ event }) => {
    return (
      <div className="event-list d-flex align-items-center">
        <div className="eventImage">
          <img src={event.avatar} alt="" />
        </div>
        <div className="event-info">
          <span className="event-title fw-500 text-stratos text-break text-ellipsis">
            {event.title}
          </span>
          <span className="event-timestamp">
            {moment(event.start).format("HH:mm")}-
            {moment(event.end).format("HH:mm")}
          </span>
        </div>
      </div>
    );
  };

  const components = {
    week: {
      header: CustomWeekHeader,
    },
    event: CustomEvent,
  };

  const ChatbotWrap = ({ className }) => {
    return (
      <>
        <div className={className}>
          {Object.keys(viewData)?.length ? (
            <>
              <div className="chatboat-header-wrap d-flex align-items-center justify-content-between position-relative">
                <button
                  onClick={() => setshowComponent(false)}
                  className="go-back-btn"
                >
                  {SVGIcons.LeftArrow}
                </button>
                <div className="chatboat-profile-wrap d-flex align-items-center">
                  <div className="profile-img-wrap flex-shrink-0">
                    <Image src={viewData.profileImage} />
                  </div>
                  <div className="profile-content-wrap">
                    <h6 className="h6 fw-500 text-stratos mb-0 text-break text-ellipsis">
                      {viewData.profileTitle}
                    </h6>
                    <span className="mb-0 small-text fw-500 text-caribbean-green">
                      online
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center chatboat-icons-wrap">
                  <Link to="">
                    <Image src={VideoIcon} alt="video" />
                  </Link>
                  <Link to="">
                    <Image src={CallIcon} alt="call" />
                  </Link>
                  <Link to="" className="cancel-link">
                    <Image src={CancelIcon} alt="cancel" />
                  </Link>
                </div>
              </div>
              <div className="chatbot-container">
                <div className="chatbot-body">
                  <div className="incoming-msg-wrap space-bottom d-flex justify-content-start">
                    <div className="avatar-img-wrap">
                      <Image src={botAvatar} alt="bot-avatar" />
                    </div>
                    <div className="incoming-msg-body">
                      <p className="text-body">
                        Lorem Ipsum is industry dummy text
                      </p>
                      <span className="time-wrap d-flex justify-content-start">
                        11:10 PM
                      </span>
                    </div>
                  </div>
                  <div className="outgoing-msg-wrap space-bottom d-flex justify-content-end">
                    <div className="outgoing-msg-body">
                      <p className="text-body">
                        Lord-flex justify-content-endem Ipsum is industry dummy
                        text
                      </p>
                      <span className="time-wrap d-flex justify-content-end">
                        11:10 PM
                      </span>
                    </div>
                  </div>
                  <div className="incoming-msg-wrap space-bottom d-flex justify-content-start">
                    <div className="avatar-img-wrap">
                      <Image src={botAvatar} alt="bot-avatar" />
                    </div>
                    <div className="incoming-msg-body">
                      <p className="text-body">
                        Lorem Ipsum is industry dummy text
                      </p>
                      <span className="time-wrap d-flex justify-content-start">
                        11:10 PM
                      </span>
                    </div>
                  </div>
                  <div className="outgoing-msg-wrap space-bottom d-flex justify-content-end">
                    <div className="outgoing-msg-body">
                      <p className="text-body">
                        Lord-flex justify-content-endem Ipsum is industry dummy
                        text
                      </p>
                      <span className="time-wrap d-flex justify-content-end">
                        11:10 PM
                      </span>
                    </div>
                  </div>
                  <p className="label-wrap d-flex justify-content-center">
                    Today
                  </p>
                  <div className="incoming-msg-wrap space-bottom d-flex justify-content-start">
                    <div className="avatar-img-wrap">
                      <Image src={botAvatar} alt="bot-avatar" />
                    </div>
                    <div className="incoming-msg-body">
                      <p className="text-body">
                        Lorem Ipsum is industry dummy text
                      </p>
                      <span className="time-wrap d-flex justify-content-start">
                        11:10 PM
                      </span>
                    </div>
                  </div>
                </div>
                <div className="msg-sent-input-wrap d-flex align-items-center mt-auto">
                  <Link to="">
                    <Image src={Emoji} />
                  </Link>
                  <Input placeholder="Write Massage" />
                  <Link to="">
                    <Image src={UploadDocument} />
                  </Link>
                  <Link to="" className="send-img">
                    <Image src={Send} />
                  </Link>
                </div>
                {/* <Chatbot    
                        config={config}
                        messageParser={MessageParser}
                        actionProvider={ActionProvider}
                        headerText="chatbot"
                        placeholderText="Write Massage"
                      /> */}
              </div>
            </>
          ) : (
            "No Data"
          )}
        </div>
      </>
    );
  };

  const items = [
    {
      key: "1",
      label: "Primary",
      children: (
        <>
          <div className="messages-links-wrap">
            {profiletabsData.map((data, index) => {
              return (
                <>
                  <Link
                    key={index}
                    to=""
                    className="d-flex messages-profile-wrap"
                    onClick={() => {
                      setViewData(data);
                      handleTabClick(data.id);
                    }}
                  >
                    <div className="profile-img-wrap flex-shrink-0">
                      <Image src={data.profileImage} />
                    </div>
                    <div className="profile-content-wrap d-flex justify-content-between w-100">
                      <div className="profile-title-wrap me-2">
                        <span className="p mb-1 text-stratos fw-500 text-ellipsis text-break">
                          {data.profileTitle}
                        </span>
                        <p className="mb-0 text-manatee fw-500 text-ellipsis text-break">
                          {data.profileDesc}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="time-wrap fw-400 mb-0">
                          {data.profileTime}
                        </span>
                      </div>
                    </div>
                  </Link>
                  {showComponent[data.id] ? (
                    <ChatbotWrap className="chatbotbody-container-wrap" />
                  ) : null}
                </>
              );
            })}
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: "Groups",
      children: (
        <>
          <div className="messages-links-wrap">
            {profiletabsData.map((data, index) => {
              return (
                <>
                  <Link
                    key={index}
                    to=""
                    className="d-flex messages-profile-wrap"
                    onClick={() => {
                      setViewData(data);
                      handleTabClick(data.id);
                    }}
                  >
                    <div className="profile-img-wrap flex-shrink-0">
                      <Image src={data.profileImage} />
                    </div>
                    <div className="profile-content-wrap d-flex justify-content-between w-100">
                      <div className="profile-title-wrap me-2">
                        <span className="p mb-1 text-stratos fw-500 text-ellipsis text-break">
                          {data.profileTitle}
                        </span>
                        <p className="mb-0 text-manatee fw-500 text-ellipsis text-break">
                          {data.profileDesc}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="time-wrap fw-400 mb-0">
                          {data.profileTime}
                        </span>
                      </div>
                    </div>
                  </Link>
                  {showComponent[data.id] ? (
                    <ChatbotWrap className="chatbotbody-container-wrap" />
                  ) : null}
                </>
              );
            })}
          </div>
        </>
      ),
    },
    {
      key: "3",
      label: "Archive",
      children: (
        <>
          <div className="messages-links-wrap">
            {profiletabsData.map((data, index) => {
              return (
                <>
                  <Link
                    key={index}
                    to=""
                    className="d-flex messages-profile-wrap"
                    onClick={() => {
                      setViewData(data);
                      handleTabClick(data.id);
                    }}
                  >
                    <div className="profile-img-wrap flex-shrink-0">
                      <Image src={data.profileImage} />
                    </div>
                    <div className="profile-content-wrap d-flex justify-content-between w-100">
                      <div className="profile-title-wrap me-2">
                        <span className="p mb-1 text-stratos fw-500 text-ellipsis text-break">
                          {data.profileTitle}
                        </span>
                        <p className="mb-0 text-manatee fw-500 text-ellipsis text-break">
                          {data.profileDesc}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="time-wrap fw-400 mb-0">
                          {data.profileTime}
                        </span>
                      </div>
                    </div>
                  </Link>
                  {showComponent[data.id] ? (
                    <ChatbotWrap className="chatbotbody-container-wrap" />
                  ) : null}
                </>
              );
            })}
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="dashboard-bg patient-detail">
        <div className="practice-grid-box">
          <Link
            to=""
            className="practice-grid-item d-flex justify-content-between align-items-center first-item"
          >
            <span className="p text-stratos fw-600 mb-0 text-break text-ellipsis me-2">
              Shift Planning
            </span>
            <Image src={ShiftPlanningImg} />
          </Link>
          <Link
            to=""
            className="practice-grid-item d-flex justify-content-between align-items-center second-item"
          >
            <span className="p text-stratos fw-600 mb-0 text-break text-ellipsis me-2">
              Time Clock
            </span>
            <Image src={TimeClock} />
          </Link>
          <Link
            to=""
            className="practice-grid-item d-flex justify-content-between align-items-center third-item"
          >
            <span className="p text-stratos fw-600 mb-0 text-break text-ellipsis me-2">
              Leave
            </span>
            <Image src={Leave} />
          </Link>
          <Link
            to=""
            className="practice-grid-item d-flex justify-content-between align-items-center fourth-item"
          >
            <span className="p text-stratos fw-600 mb-0 text-break text-ellipsis me-2">
              Training
            </span>
            <Image src={Training} />
          </Link>
          <Link
            to=""
            className="practice-grid-item d-flex justify-content-between align-items-center fifth-item"
          >
            <span className="p text-stratos fw-600 mb-0 text-break text-ellipsis me-2">
              Staff
            </span>
            <Image src={Staff} />
          </Link>
          <Link
            to=""
            className="practice-grid-item d-flex justify-content-between align-items-center first-item"
          >
            <span className="p text-stratos fw-600 mb-0 text-break text-ellipsis me-2">
              Payroll
            </span>
            <Image src={Payroll} />
          </Link>
          <Link
            to=""
            className="practice-grid-item d-flex justify-content-between align-items-center second-item"
          >
            <span className="p text-stratos fw-600 mb-0 text-break text-ellipsis me-2">
              Reports
            </span>
            <Image src={Reports} />
          </Link>
          <Link
            to=""
            className="practice-grid-item d-flex justify-content-between align-items-center third-item"
          >
            <span className="p text-stratos fw-600 mb-0 text-break text-ellipsis me-2">
              Group Accounts
            </span>
            <Image src={GroupAccounts} />
          </Link>
        </div>
        <div className="practice-main-wrapper">
          <div className="practice-manager-gridbox-wrap">
            <div className="practice-manager-task-wrapper">
              <div className="patient-detail-card bg single-calendar-wrap">
                <Calendar
                  onChange={onChange}
                  value={date}
                  next2Label={false}
                  prev2Label={false}
                  prevLabel={<CustomPrevButton />}
                  nextLabel={<CustomNextButton />}
                />
              </div>
              <div className="patient-detail-card bg patients-tasks-wrap">
                <div className="d-flex align-items-center justify-content-between documents-title-wrap">
                  <h4 className="h4 fw-600 text-stratos mb-0 text-ellipsis text-break">
                    My Tasks
                  </h4>
                  <Button className="transaparent-btn d-flex align-items-center justify-content-end">
                    <span className="d-inline-block me-3">Add new</span>
                    <Image src={PlusIcon} />
                  </Button>
                </div>
                <div className="documents-link-wrap">
                  <Link className="d-flex align-items-center justify-content-between">
                    <span className=" me-3 text-ellipsis text-break">
                      Send email to accountant
                    </span>
                    <span className="flex-shrink-0">
                      <Image src={EditIcon} className="me-3" />
                      <Image src={DeleteIcon} />
                    </span>
                  </Link>
                  <Link className="d-flex align-items-center justify-content-between">
                    <span className=" me-3 text-ellipsis text-break">
                      Order clinic supplies
                    </span>
                    <span className="flex-shrink-0">
                      <Image src={EditIcon} className="me-3" />
                      <Image src={DeleteIcon} />
                    </span>
                  </Link>
                  <Link className="d-flex align-items-center justify-content-between">
                    <span className=" me-3 text-ellipsis text-break">
                      Send out reminders
                    </span>
                    <span className="flex-shrink-0">
                      <Image src={EditIcon} className="me-3" />
                      <Image src={DeleteIcon} />
                    </span>
                  </Link>
                  <Link className="d-flex align-items-center justify-content-between">
                    <span className=" me-3 text-ellipsis text-break">
                      Send email to accountant
                    </span>
                    <span className="flex-shrink-0">
                      <Image src={EditIcon} className="me-3" />
                      <Image src={DeleteIcon} />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="calander-wrap bg position-relative">
              <div className="calendar-toolbar">
                <select
                  value={view}
                  onChange={handleViewChange}
                  className="formcontrol"
                >
                  <option value="month">Month</option>
                  <option value="week">Week</option>
                  <option value="day">Day</option>
                </select>
              </div>
              <div className="bigcalendar-wrap">
                <BigCalender
                  className="bigcalendar"
                  localizer={localizer}
                  view={view}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  components={components}
                  eventPropGetter={eventPropGetter}
                  defaultDate={date}
                  step={15}
                  // timeslots={2}
                />
              </div>
            </div>
          </div>
          <div className="practice-manager-bottom-wrap d-flex">
            <div className="patient-detail-card bg opportunities-wrap">
              <div className="d-flex align-items-center justify-content-between documents-title-wrap">
                <h4 className="h4 fw-600 text-stratos mb-0 text-ellipsis text-break">
                  Opportunities
                </h4>
                <Button className="transaparent-btn d-flex align-items-center justify-content-end">
                  <span className="d-inline-block me-3">Add new</span>
                  <Image src={PlusIcon} />
                </Button>
              </div>
              <div className="documents-link-wrap">
                <Link className="d-flex ">
                  <span className=" me-3 text-ellipsis text-break">
                    Mary Kenny - due flu vaccine
                  </span>
                </Link>
                <Link className="d-flex ">
                  <span className=" me-3 text-ellipsis text-break">
                    Keith Johnston - ECG due
                  </span>
                </Link>
                <Link className="d-flex ">
                  <span className=" me-3 text-ellipsis text-break">
                    John Ryan - Schedule cryo
                  </span>
                </Link>
              </div>
            </div>
            <div className="patient-detail-card bg opportunities-wrap">
              <div className="d-flex align-items-center justify-content-between documents-title-wrap">
                <h4 className="h4 fw-600 text-stratos mb-0 text-ellipsis text-break">
                  Outstanding Payments
                </h4>
                <Button className="transaparent-btn d-flex align-items-center justify-content-end">
                  <span className="d-inline-block me-3">Add new</span>
                  <Image src={PlusIcon} />
                </Button>
              </div>
              <div className="documents-link-wrap">
                <Link className="d-flex ">
                  <span className=" me-3 text-ellipsis text-break">
                    Send email to accountant
                  </span>
                </Link>
                <Link className="d-flex ">
                  <span className=" me-3 text-ellipsis text-break">
                    Order clinic supplies
                  </span>
                </Link>
                <Link className="d-flex ">
                  <span className=" me-3 text-ellipsis text-break">
                    Send out reminders
                  </span>
                </Link>
                <Link className="d-flex ">
                  <span className=" me-3 text-ellipsis text-break">
                    Send email to accountant
                  </span>
                </Link>
              </div>
            </div>
            <div className="opportunities-wrap instant-message-wrap d-flex">
              <div className="message-wrap">
                <div className="d-flex align-items-center justify-content-between documents-title-wrap">
                  <h4 className="h4 fw-600 text-stratos mb-0 text-ellipsis text-break">
                    Instant Message
                  </h4>
                  <p className="position-relative p mb-0 text-stratos fw-500">
                    Active
                  </p>
                </div>
                <div className="message-tabs-wrap">
                  <Tabs defaultActiveKey="1" items={items} />
                </div>
              </div>
              <ChatbotWrap className="chatboat-wrap" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
