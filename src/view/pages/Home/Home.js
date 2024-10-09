import React, { useState } from "react";
import { SVGIcons } from "../../../components/Data/SVGIcons";
import { Link } from "react-router-dom";
import BookAppointmentImg from "../../../assets/images/cover/book-an-appointment.png";
import HealthPrescrptions from "../../../assets/images/cover/new-repeat-prescription.png";
import HealthRecords from "../../../assets/images/cover/health-records.png";
import UpcomingAppointments from "../../../assets/images/cover/upcoming-appontments.png";
import LabResults from "../../../assets/images/cover/lab-results.png";
import MyHealthRecords from "../../../assets/images/cover/my-health-records.png";
import NewMessages from "../../../assets/images/cover/new-messages.png";
import MyRepeatPrescription from "../../../assets/images/cover/repeat-prescription.png";
import MyHealthIndicator from "../../../assets/images/cover/my-health-records.png";
import CurveImg from "../../../assets/images/cover/curve.png";
import AvatarImg from "../../../assets/images/cover/avatar.png";
import PdfThumbnail from "../../../assets/images/cover/pdf-thumbnail.jpg";
import SearchPateint from "../../../assets/images/icons/search-pateint.svg";
import patient from "../../../assets/images/icons/patient.svg";
import addpatient from "../../../assets/images/icons/add-patient.svg";
import edit from "../../../assets/images/icons/edit.svg";
import deletes from "../../../assets/images/icons/delete-b.svg";
import add_blacks from "../../../assets/images/icons/add_blacks.svg";
import printer from "../../../assets/images/icons/printer.svg";
import down from "../../../assets/images/icons/right-arrow.svg";
import icons from "../../../assets/images/icons/icons.svg";
import icon_white from "../../../assets/images/icons/icon-white.svg";
import { Image } from "react-bootstrap";
import {
  Tabs,
  Divider,
  Button,
  Radio,
  Table,
  Input,
  Typography,
  Form,
  DatePicker,
  Space,
  Select,
} from "antd";
// import { CustomTimePicker } from "../../../components/CustomTimePicker/CustomTimePicker";
import "./Home.css";
// import { Flex,  } from 'antd';
// import dayjs from "dayjs";
const onChange = (date, dateString) => {
  //console.log(date, dateString);
};
const handleChange = (value) => {
  //console.log(`selected ${value}`);
};
const prefixSelector = <Form.Item name="prefix" noStyle></Form.Item>;

// const data = [
//   {
//     id: 1,
//     avatarImg: AvatarImg,
//     msgTitle: "Blood Results",
//     msgDesc: "All results Normal - No follow up required",
//     msgTimeTitle: "3 mins ago",
//     msgTime: "4:56 PM",
//   },
//   {
//     id: 2,
//     avatarImg: AvatarImg,
//     msgTitle: "Blood Results",
//     msgDesc: "All results Normal - No follow up required",
//     msgTimeTitle: "3 mins ago",
//     msgTime: "4:56 PM",
//   },
//   {
//     id: 3,
//     avatarImg: AvatarImg,
//     msgTitle: "Blood Results",
//     msgDesc: "All results Normal - No follow up required",
//     msgTimeTitle: "3 mins ago",
//     msgTime: "4:56 PM",
//   },
//   {
//     id: 4,
//     avatarImg: AvatarImg,
//     msgTitle: "Blood Results",
//     msgDesc: "All results Normal - No follow up required",
//     msgTimeTitle: "3 mins ago",
//     msgTime: "4:56 PM",
//   },
//   {
//     id: 5,
//     avatarImg: AvatarImg,
//     msgTitle: "Blood Results",
//     msgDesc: "All results Normal - No follow up required",
//     msgTimeTitle: "3 mins ago",
//     msgTime: "4:56 PM",
//   },
//   {
//     id: 6,
//     avatarImg: AvatarImg,
//     msgTitle: "Blood Results",
//     msgDesc: "All results Normal - No follow up required",
//     msgTimeTitle: "3 mins ago",
//     msgTime: "4:56 PM",
//   },
//   {
//     id: 7,
//     avatarImg: AvatarImg,
//     msgTitle: "Blood Results",
//     msgDesc: "All results Normal - No follow up required",
//     msgTimeTitle: "3 mins ago",
//     msgTime: "4:56 PM",
//   },
//   {
//     id: 8,
//     avatarImg: AvatarImg,
//     msgTitle: "Blood Results",
//     msgDesc: "All results Normal - No follow up required",
//     msgTimeTitle: "3 mins ago",
//     msgTime: "4:56 PM",
//   },
//   {
//     id: 9,
//     avatarImg: AvatarImg,
//     msgTitle: "Blood Results",
//     msgDesc: "All results Normal - No follow up required",
//     msgTimeTitle: "3 mins ago",
//     msgTime: "4:56 PM",
//   },
//   {
//     id: 10,
//     avatarImg: AvatarImg,
//     msgTitle: "Blood Results",
//     msgDesc: "All results Normal - No follow up required",
//     msgTimeTitle: "3 mins ago",
//     msgTime: "4:56 PM",
//   },
// ];
// const items = [
//   {
//     key: "1",
//     label: "Primary",
//     children: (
//       <>
//         {data.map((item) => (
//           <div
//             key={item.id}
//             className="d-flex align-items-center custom-tabs-content-wrap"
//           >
//             <div className="avatar-img">
//               <Image src={item.avatarImg} />
//             </div>
//             <div className="w-100 d-flex justify-content-between custom-tabs-details-wrap position-relative">
//               <div className="position-relative me-3">
//                 <span className="small-text d-none d-lg-block msg-time-wrap">
//                   {item.msgTimeTitle}
//                 </span>
//                 <h4 className="text-stratos fw-500 h4 mb-1 text-ellipsis ">
//                   {item.msgTitle}
//                 </h4>
//                 <p className="mb-2 small text-manatee fw-500 text-ellipsis">
//                   {item.msgDesc}
//                 </p>
//                 <span className="small-text d-block d-lg-none">
//
//                   {item.msgTimeTitle}
//                 </span>
//               </div>
//               <div className="flex-shrink-0 d-none d-lg-block">
//                 <span className="p text-stratos mb-0 fw-500">
//
//                   {item.msgTime}
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </>
//     ),
//   },

//   {
//     key: "2",
//     label: "Groups",
//     children: "Groups",
//   },
//   {
//     key: "3",
//     label: "Archive",
//     children: "Archive",
//   },
// ];

const columns = [
  {
    title: (
      <>
        <span>
          <p>Patient ID</p>
          <Image src={down} />
        </span>
      </>
    ),

    dataIndex: "id",
  },
  {
    title: (
      <>
        <span>
          <p>Registered</p>
          <Image src={down} />
        </span>
      </>
    ),
    dataIndex: "registered",
  },
  {
    title: (
      <>
        <span>
          <p>Patient Name</p>
          <Image src={down} />
        </span>
      </>
    ),
    dataIndex: "patient",
  },
  {
    title: (
      <>
        <span>
          <p>Doctor Assgined</p>
          <Image src={down} />
        </span>
      </>
    ),
    dataIndex: "doctor",
  },
  {
    title: (
      <>
        <span>
          <p>GMS/Private</p>
          <Image src={down} />
        </span>
      </>
    ),
    dataIndex: "gms",
  },
  {
    title: (
      <>
        <span>
          <p>Status</p>
          <Image src={down} />
        </span>
      </>
    ),
    dataIndex: "status",
  },
  {
    title: (
      <>
        <span>
          {" "}
          <p>Address</p>
          <Image src={down} />
        </span>
      </>
    ),
    dataIndex: "address",
  },
  {
    title: "Edit",
    dataIndex: "edit",
  },
];

const data = [
  {
    key: "1",
    id: "#p245879",
    registered: "14 April 2021, 10:30 AM",
    patient: "Aaliyah clark",
    doctor: "Dr. Johen Doe",
    gms: "Cold & Flu",
    status: (
      <>
        <span className="new-patient label">New Patient</span>
      </>
    ),
    address: "Woodside Circle, Pensacola",
    edit: (
      <>
        <span className="action">
          <Image src={edit} />
        </span>
        <span className="action">
          <Image src={deletes} />
        </span>
      </>
    ),
  },
  {
    key: "2",
    id: "#p245879",
    registered: "14 April 2021, 10:30 AM",
    patient: "Aaliyah clark",
    doctor: "Dr. Johen Doe",
    gms: "Cold & Flu",
    status: (
      <>
        <span className="recovered label">Recovered</span>
      </>
    ),
    address: "Woodside Circle, Pensacola",
    edit: (
      <>
        <span className="action">
          <Image src={edit} />
        </span>
        <span className="action">
          <Image src={deletes} />
        </span>
      </>
    ),
  },
  {
    key: "3",
    id: "#p245879",
    registered: "14 April 2021, 10:30 AM",
    patient: "Aaliyah clark",
    doctor: "Dr. Johen Doe",
    gms: "Cold & Flu",
    status: (
      <>
        <span className="treatment label">In Treatment</span>
      </>
    ),
    address: "Woodside Circle, Pensacola",
    edit: (
      <>
        <span className="action">
          <Image src={edit} />
        </span>
        <span className="action">
          <Image src={deletes} />
        </span>
      </>
    ),
  },
  {
    key: "4",
    id: "#p245879",
    registered: "14 April 2021, 10:30 AM",
    patient: "Aaliyah clark",
    doctor: "Dr. Johen Doe",
    gms: "Cold & Flu",
    status: (
      <>
        <span className="new-patient label">New Patient</span>
      </>
    ),
    address: "Woodside Circle, Pensacola",
    edit: (
      <>
        <span className="action">
          <Image src={edit} />
        </span>
        <span className="action">
          <Image src={deletes} />
        </span>
      </>
    ),
  },
  {
    key: "5",
    id: "#p245879",
    registered: "14 April 2021, 10:30 AM",
    patient: "Aaliyah clark",
    doctor: "Dr. Johen Doe",
    gms: "Cold & Flu",
    status: (
      <>
        <span className="recovered label">Recovered</span>
      </>
    ),
    address: "Woodside Circle, Pensacola",
    edit: (
      <>
        <span className="action">
          <Image src={edit} />
        </span>
        <span className="action">
          <Image src={deletes} />
        </span>
      </>
    ),
  },
  {
    key: "6",
    id: "#p245879",
    registered: "14 April 2021, 10:30 AM",
    patient: "Aaliyah clark",
    doctor: "Dr. Johen Doe",
    gms: "Cold & Flu",
    status: (
      <>
        <span className="treatment label">In Treatment</span>
      </>
    ),
    address: "Woodside Circle, Pensacola",
    edit: (
      <>
        <span className="action">
          <Image src={edit} />
        </span>
        <span className="action">
          <Image src={deletes} />
        </span>
      </>
    ),
  },
  {
    key: "7",
    id: "#p245879",
    registered: "14 April 2021, 10:30 AM",
    patient: "Aaliyah clark",
    doctor: "Dr. Johen Doe",
    gms: "Cold & Flu",
    status: (
      <>
        <span className="new-patient label">New Patient</span>
      </>
    ),
    address: "Woodside Circle, Pensacola",
    edit: (
      <>
        <span className="action">
          <Image src={edit} />
        </span>
        <span className="action">
          <Image src={deletes} />
        </span>
      </>
    ),
  },
  {
    key: "8",
    id: "#p245879",
    registered: "14 April 2021, 10:30 AM",
    patient: "Aaliyah clark",
    doctor: "Dr. Johen Doe",
    gms: "Cold & Flu",
    status: (
      <>
        <span className="recovered label">Recovered</span>
      </>
    ),
    address: "Woodside Circle, Pensacola",
    edit: (
      <>
        <span className="action">
          <Image src={edit} />
        </span>
        <span className="action">
          <Image src={deletes} />
        </span>
      </>
    ),
  },
  {
    key: "9",
    id: "#p245879",
    registered: "14 April 2021, 10:30 AM",
    patient: "Aaliyah clark",
    doctor: "Dr. Johen Doe",
    gms: "Cold & Flu",
    status: (
      <>
        <span className="treatment label">In Treatment</span>
      </>
    ),
    address: "Woodside Circle, Pensacola",
    edit: (
      <>
        <span className="action">
          <Image src={edit} />
        </span>
        <span className="action">
          <Image src={deletes} />
        </span>
      </>
    ),
  },
  {
    key: "10",
    id: "#p245879",
    registered: "14 April 2021, 10:30 AM",
    patient: "Aaliyah clark",
    doctor: "Dr. Johen Doe",
    gms: "Cold & Flu",
    status: (
      <>
        <span className="new-patient label">New Patient</span>
      </>
    ),
    address: "Woodside Circle, Pensacola",
    edit: (
      <>
        <span className="action">
          <Image src={edit} />
        </span>
        <span className="action">
          <Image src={deletes} />
        </span>
      </>
    ),
  },
  {
    key: "11",
    id: "#p245879",
    registered: "14 April 2021, 10:30 AM",
    patient: "Aaliyah clark",
    doctor: "Dr. Johen Doe",
    gms: "Cold & Flu",
    status: (
      <>
        <span className="recovered label">Recovered</span>
      </>
    ),
    address: "Woodside Circle, Pensacola",
    edit: (
      <>
        <span className="action">
          <Image src={edit} />
        </span>
        <span className="action">
          <Image src={deletes} />
        </span>
      </>
    ),
  },
  {
    key: "12",
    id: "#p245879",
    registered: "14 April 2021, 10:30 AM",
    patient: "Aaliyah clark",
    doctor: "Dr. Johen Doe",
    gms: "Cold & Flu",
    status: (
      <>
        <span className="treatment label">In Treatment</span>
      </>
    ),
    address: "Woodside Circle, Pensacola",
    edit: (
      <>
        <span className="action">
          <Image src={edit} />
        </span>
        <span className="action">
          <Image src={deletes} />
        </span>
      </>
    ),
  },
];
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  // getCheckboxProps: (record) => ({
  //   disabled: record.name === "Disabled User",
  //   name: record.name,
  // }),
};

export const Home = () => {
  const [selectionType, setSelectionType] = useState("checkbox");
  const [mode, setMode] = useState("left");

  // const itemsSet = [
  //   {
  //     key: "1",
  //     label: (
  //       <>
  //         <div>hello</div>
  //       </>
  //     ),
  //     children: "tab1 content",
  //   },
  //   {
  //     key: "2",
  //     label: "E-Referrals",
  //     children: "tab2 content",
  //   },
  //   {
  //     key: "3",
  //     label: "Froms",
  //     children: "tab3 content",
  //   },
  //   {
  //     key: "4",
  //     label: "Letters",
  //     children: "tab4 content",
  //   },
  //   {
  //     key: "5",
  //     label: "STC Claim Forms",
  //     children: "tab4 content",
  //   },
  //   {
  //     key: "6",
  //     label: "Scanned Documents",
  //     children: "tab4 content",
  //   },
  //   {
  //     key: "7",
  //     label: "Private Referrals",
  //     children: "tab4 content",
  //   },
  //   {
  //     key: "8",
  //     label: "Other Documents",
  //     children: "tab4 content",
  //   },
  // ];
  const items = [
    {
      key: "1",
      label: (
        <>
          <div className="list">
            <span className="icons">
              <Image src={icon_white} className="images" />
              <Image src={icons} className="active-image" />
            </span>
            <span className="text"> Search Patient </span>
          </div>
        </>
      ),
      children: (
        <>
          <div className="tabcon section">
            <div className="tablist section">
              <h2 className="h2text"> Patient / Family Search </h2>
              <div className="form section">
                <div className="filed section">
                  <Form.Item
                    label="Family Name*"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter family name" />
                  </Form.Item>
                </div>
                <div className="filed section">
                  <Form.Item
                    label="First name*"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter first name" />
                  </Form.Item>
                </div>
                <div className="filed section">
                  <Form.Item
                    label="Surname name*"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter surname" />
                  </Form.Item>
                </div>
                <div className="filed section">
                  <Form.Item
                    label="Date of Birth*"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Space direction="vertical">
                      <DatePicker
                        onChange={onChange}
                        placeholder="02/07/2001"
                      />
                    </Space>
                  </Form.Item>
                </div>
                <div className="filed section">
                  <Form.Item
                    label="Address"
                    name="username"
                    rules={[
                      {
                        required: false,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter address" />
                  </Form.Item>
                </div>
                <div className="filed section">
                  <Form.Item
                    label="Patient Type*"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please select!",
                      },
                    ]}
                  >
                    <Select
                      defaultValue="lucy"
                      style={{
                        width: 120,
                      }}
                      onChange={handleChange}
                      options={[
                        {
                          value: "jack",
                          label: "Jack",
                        },
                        {
                          value: "lucy",
                          label: "Lucy",
                        },
                        {
                          value: "Yiminghe",
                          label: "yiminghe",
                        },
                        {
                          value: "disabled",
                          label: "Disabled",
                          disabled: true,
                        },
                      ]}
                    />
                  </Form.Item>
                </div>
                <div className="filed section">
                  <Form.Item
                    label="Patient Status*"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please select!",
                      },
                    ]}
                  >
                    <Select
                      defaultValue="lucy"
                      style={{
                        width: 120,
                      }}
                      onChange={handleChange}
                      options={[
                        {
                          value: "jack",
                          label: "Jack",
                        },
                        {
                          value: "lucy",
                          label: "Lucy",
                        },
                        {
                          value: "Yiminghe",
                          label: "yiminghe",
                        },
                        {
                          value: "disabled",
                          label: "Disabled",
                          disabled: true,
                        },
                      ]}
                    />
                  </Form.Item>
                </div>
                <div className="filed section">
                  <Form.Item
                    label="Patient Member Status*"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter patient member" />
                  </Form.Item>
                </div>
                <div className="filed section">
                  <Form.Item
                    label="Family Relationship*"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please select!",
                      },
                    ]}
                  >
                    <Select
                      defaultValue="lucy"
                      style={{
                        width: 120,
                      }}
                      onChange={handleChange}
                      options={[
                        {
                          value: "jack",
                          label: "Jack",
                        },
                        {
                          value: "lucy",
                          label: "Lucy",
                        },
                        {
                          value: "Yiminghe",
                          label: "yiminghe",
                        },
                        {
                          value: "disabled",
                          label: "Disabled",
                          disabled: true,
                        },
                      ]}
                    />
                  </Form.Item>
                </div>
                <div className="filed section">
                  <Form.Item
                    label="Unique Number*"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter unique number" />
                  </Form.Item>
                </div>
              </div>
              {/* <div className="filed section savebtn">
                <Button className="custom_btn">Search</Button>
                </div> */}
            </div>
            <div className="search-result section">
              <div className="section inner">
                <h2 className="h2text textbold">Search Results</h2>
              </div>
              <div className="listresult section"></div>
            </div>
            {/* <Tabs
                                  defaultActiveKey="1"
                                  tabPosition={mode}
                                  value={mode}
                                  items={itemsSet}
                                /> */}
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <div className="list">
          <span className="icons addpatient">
            <Image src={icon_white} className="images" />
            <Image src={icons} className="active-image" />
          </span>
          <span className="text"> Add Patient </span>
        </div>
      ),
      children: (
        <>
          <div>
            <div className="tabcon section">
              <div className="tablist section">
                <h2 className="h2text"> Quick Registration </h2>
                <div className="form section">
                  <div className="filed section">
                    <Form.Item
                      label="First name*"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter first name" />
                    </Form.Item>
                  </div>
                  <div className="filed section">
                    <Form.Item
                      label="Last name*"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter last name" />
                    </Form.Item>
                  </div>

                  <div className="filed section">
                    <Form.Item
                      label="Date of Birth*"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Space direction="vertical">
                        <DatePicker onChange={onChange} />
                      </Space>
                    </Form.Item>
                  </div>
                  <div className="filed section">
                    <Form.Item
                      label="Blood Group*"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter blood group" />
                    </Form.Item>
                  </div>
                  <div className="filed section">
                    <Form.Item
                      label="Address1"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter address" />
                    </Form.Item>
                  </div>
                  <div className="filed section">
                    <Form.Item
                      label="Town"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter town" />
                    </Form.Item>
                  </div>
                  <div className="filed section">
                    <Form.Item
                      label="City"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter city" />
                    </Form.Item>
                  </div>
                  <div className="filed section">
                    <Form.Item
                      label="County"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter county" />
                    </Form.Item>
                  </div>
                  <div className="filed section">
                    <Form.Item
                      label="Eircode*"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter eircode" />
                    </Form.Item>
                  </div>
                  <div className="filed section">
                    <Form.Item
                      label="Sex*"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please select!",
                        },
                      ]}
                    >
                      <Select
                        defaultValue="Please select"
                        style={{
                          width: 120,
                        }}
                        onChange={handleChange}
                        options={[
                          {
                            value: "male",
                            label: "Male",
                          },
                          {
                            value: "female",
                            label: "Female",
                          },
                        ]}
                      />
                    </Form.Item>
                  </div>
                  <div className="filed section">
                    <Form.Item
                      label="PPSN*"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter PPSN" />
                    </Form.Item>
                  </div>
                  <div className="filed section">
                    <Form.Item
                      label="Home Ph*"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter home phone no" />
                    </Form.Item>
                  </div>
                  <div className="filed section">
                    <Form.Item
                      label="HCP*"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please select!",
                        },
                      ]}
                    >
                      <Select
                        defaultValue="Please select!"
                        style={{
                          width: 120,
                        }}
                        onChange={handleChange}
                        options={[
                          {
                            value: "jack",
                            label: "Jack",
                          },
                          {
                            value: "lucy",
                            label: "Lucy",
                          },
                          {
                            value: "Yiminghe",
                            label: "yiminghe",
                          },
                          {
                            value: "disabled",
                            label: "Disabled",
                            disabled: true,
                          },
                        ]}
                      />
                    </Form.Item>
                  </div>
                  <div className="filed section">
                    <Form.Item
                      label="Patient type*"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please select!",
                        },
                      ]}
                    >
                      <Select
                        defaultValue="Please select!"
                        style={{
                          width: 120,
                        }}
                        onChange={handleChange}
                        options={[
                          {
                            value: "jack",
                            label: "Jack",
                          },
                          {
                            value: "lucy",
                            label: "Lucy",
                          },
                          {
                            value: "Yiminghe",
                            label: "yiminghe",
                          },
                          {
                            value: "disabled",
                            label: "Disabled",
                            disabled: true,
                          },
                        ]}
                      />
                    </Form.Item>
                  </div>
                  <div className="filed section">
                    <Form.Item
                      label="GMS Doctor*"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter GMS doctor" />
                    </Form.Item>
                  </div>
                  <div className="filed section">
                    <Form.Item
                      label="GMS Doctor No*"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter GMS doctor no" />
                    </Form.Item>
                  </div>
                  <div className="filed section">
                    <Form.Item
                      label="GMS number*"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter GMS number" />
                    </Form.Item>
                  </div>
                  <div className="filed section">
                    <Form.Item
                      label="Expiry*"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Space direction="vertical">
                        <DatePicker
                          onChange={onChange}
                          placeholder="14 April 2021"
                        />
                      </Space>
                    </Form.Item>
                  </div>
                  <div className="filed section">
                    <Form.Item
                      label="Insurance*"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please select!",
                        },
                      ]}
                    >
                      <Select
                        defaultValue="Please select!"
                        style={{
                          width: 120,
                        }}
                        onChange={handleChange}
                        options={[
                          {
                            value: "jack",
                            label: "Jack",
                          },
                          {
                            value: "lucy",
                            label: "Lucy",
                          },
                          {
                            value: "Yiminghe",
                            label: "yiminghe",
                          },
                          {
                            value: "disabled",
                            label: "Disabled",
                            disabled: true,
                          },
                        ]}
                      />
                    </Form.Item>
                  </div>
                  <div className="filed section">
                    <Form.Item
                      label="Policy Number*"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter policy number" />
                    </Form.Item>
                  </div>
                  <div className="filed section">
                    <Form.Item
                      name={["user", "email"]}
                      label="Email"
                      rules={[
                        {
                          type: "email",
                        },
                      ]}
                    >
                      <Input placeholder="Enter email" />
                    </Form.Item>
                  </div>
                  <div className="filed section">
                    <Form.Item
                      name="phone"
                      label="Mobile Ph*"
                      rules={[
                        {
                          required: true,
                          message: "Please input your phone number!",
                        },
                      ]}
                    >
                      <Input
                        addonBefore={prefixSelector}
                        style={{ width: "100%" }}
                        placeholder="Enter mobile phone"
                      />
                    </Form.Item>
                  </div>
                  <div className="filed section">
                    <Form.Item
                      label="SMS Consent*"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please select!",
                        },
                      ]}
                    >
                      <Select
                        defaultValue="Please select!"
                        style={{
                          width: 120,
                        }}
                        onChange={handleChange}
                        options={[
                          {
                            value: "jack",
                            label: "Jack",
                          },
                          {
                            value: "lucy",
                            label: "Lucy",
                          },
                          {
                            value: "Yiminghe",
                            label: "yiminghe",
                          },
                          {
                            value: "disabled",
                            label: "Disabled",
                            disabled: true,
                          },
                        ]}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="filed section savebtn">
                  <Button className="custom_btn">Save</Button>
                </div>
              </div>

              {/* <Tabs
                                  defaultActiveKey="1"
                                  tabPosition={mode}
                                  value={mode}
                                  items={itemsSet}
                                /> */}
            </div>
          </div>
        </>
      ),
    },
    {
      key: "3",
      label: (
        <div className="list">
          <span className="icons patient">
            <Image src={icon_white} className="images" />
            <Image src={icons} className="active-image" />
          </span>
          <span className="text"> All Patient </span>
        </div>
      ),
      children: (
        <>
          <div className="custom-table">
            <div className="searchsection section">
              <div className="lefts">
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input placeholder="Search Patients" />
                </Form.Item>
              </div>
              <div className="rights">
                <div className="btn">
                  <Button type="primary" className="printer">
                    <Image src={printer} /> Print
                  </Button>
                  <Button type="primary" className="add_blacks">
                    <Image src={add_blacks} /> Add Patient
                  </Button>
                </div>
              </div>
            </div>
            <Table
              rowSelection={{
                type: selectionType,
                ...rowSelection,
              }}
              columns={columns}
              dataSource={data}
            />
          </div>
        </>
      ),
    },
  ];
  return (
    <>
      <section className="dashboard-wrap extrahome-page">
        {/* <div className="py-4 d-flex justify-content-between patient-header-title-wrap">
                                                                            <div className="d-flex  align-items-start home-patient-title">
                                                                              <div className="profile-shortname text-center">
                                                                                <span className="mb-0 h2 text-black fw-600">JT</span>
                                                                              </div>
                                                                              <div className="me-3">
                                                                                <h3 className="small fw-600 mb-2 text-break">
                                                                                  Welcome, James Targaryen
                                                                                </h3>
                                                                                <div className="d-flex">
                                                                                  <h6 className="me-4 mb-0 fw-500">
                                                                                    <span className="me-2">Age</span>
                                                                                    <span className="profile-value">28</span>
                                                                                  </h6>
                                                                                  <h6 className="mb-0 fw-500">
                                                                                    <span className="me-2">Gender</span>
                                                                                    <span className="profile-value">Male</span>
                                                                                  </h6>
                                                                                </div>
                                                                              </div>
                                                                            </div>
                                                                            <Link className="message-box-wrap d-flex align-items-center">
                                                                              <span className="me-4 msg-icon">{SVGIcons.Email}</span>
                                                                              <span className="p  mb-0">Message</span>
                                                                            </Link>
                                                                          </div> */}
        {/* <div className="dashboard-bg">
                                                                            <div>
                                                                              <h2 className="small fw-600 text-stratos mb-5 title-wrap">
                                                                                Start Managing your health, Today
                                                                              </h2>
                                                                              <div className="health-grid-box">
                                                                                <Link
                                                                                  to="/book-appointment"
                                                                                  className="health-grid-item d-flex justify-content-between align-items-center first-item"
                                                                                >
                                                                                  <h3 className="h3 text-stratos fw-600 mb-0">
                                                                                    Book an Appointment
                                                                                  </h3>
                                                                                  <Image src={BookAppointmentImg} />
                                                                                </Link>
                                                                                <Link
                                                                                  to=""
                                                                                  className="health-grid-item d-flex justify-content-between align-items-center second-item"
                                                                                >
                                                                                  <h3 className="h3 text-stratos fw-600 mb-0">
                                                                                    New Repeat Prescriptions
                                                                                  </h3>
                                                                                  <Image src={HealthPrescrptions} />
                                                                                </Link>
                                                                                <Link
                                                                                  to=""
                                                                                  className="health-grid-item d-flex justify-content-between align-items-center third-item"
                                                                                >
                                                                                  <h3 className="h3 text-stratos fw-600 mb-0">Health Records</h3>
                                                                                  <Image src={HealthRecords} />
                                                                                </Link>
                                                                                <Link
                                                                                  to=""
                                                                                  className="health-grid-item d-flex justify-content-between align-items-center fourth-item"
                                                                                >
                                                                                  <h3 className="h3 text-stratos fw-600 mb-0">Lab Results</h3>
                                                                                  <Image src={LabResults} />
                                                                                </Link>
                                                                              </div>
                                                                              <div className="patient-cardbox-wrap">
                                                                                <div className="patient-card">
                                                                                  <div className="d-flex align-items-center card-header position-relative">
                                                                                    <div className="card-box-img appointment-bg">
                                                                                      <Image src={UpcomingAppointments} />
                                                                                    </div>
                                                                                    <h2 className="mid fw-600 text-stratos mb-0">
                                                                                      Upcoming Appontments
                                                                                    </h2>
                                                                                    <Image src={CurveImg} className="curve-img" />
                                                                                  </div>
                                                                                  <div className="patient-card-content">
                                                                                    <Link
                                                                                      to="/appointments"
                                                                                      className="d-flex justify-content-between upcoming-appointments"
                                                                                    >
                                                                                      <div className="me-4 ">
                                                                                        <h4 className="fw-500 confirm-dot text-stratos text-break">
                                                                                          Doctor Consultation
                                                                                        </h4>
                                                                                        <span className="fw-500 text-manatee mb-2 h6">
                                                                                          Monday, 23th Mar 2023
                                                                                        </span>
                                                                                        <CustomTimePicker />
                                                                                      </div>
                                                                                      <div className="flex-shrink-0">
                                                                                        <span className="d-block mb-2 text-royal-blue fw-500 text-break h6">
                                                                                          Dr. John Doe
                                                                                        </span>
                                                                                        <span className="h6 mb-0 d-block text-manatee fw-500">
                                                                                          Test Practice
                                                                                        </span>
                                                                                      </div>
                                                                                    </Link>
                                                                                    <Link
                                                                                      to="/appointments"
                                                                                      className="d-flex justify-content-between upcoming-appointments"
                                                                                    >
                                                                                      <div className="me-4 ">
                                                                                        <h4 className="fw-500 past-dot text-stratos text-break">
                                                                                          Blood Test
                                                                                        </h4>
                                                                                        <span className="fw-500 text-manatee mb-2 h6">
                                                                                          Monday, 23th Mar 2023
                                                                                        </span>
                                                                                        <CustomTimePicker />
                                                                                      </div>
                                                                                      <div className="flex-shrink-0">
                                                                                        <span className="d-block mb-2 h6 text-royal-blue fw-500 text-break">
                                                                                          Nurse Mary
                                                                                        </span>
                                                                                        <span className="d-block text-manatee h6 mb-0 fw-500">
                                                                                          Test Practice
                                                                                        </span>
                                                                                      </div>
                                                                                    </Link>
                                                                                    <Link
                                                                                      to="/appointments"
                                                                                      className="d-flex justify-content-between upcoming-appointments"
                                                                                    >
                                                                                      <div className="me-4 ">
                                                                                        <h4 className="fw-500 past-dot opacity text-stratos text-break">
                                                                                          Nurse Appointment
                                                                                        </h4>
                                                                                        <span className="fw-500 text-manatee mb-2 h6">
                                                                                          Monday, 23th Mar 2023
                                                                                        </span>
                                                                                        <CustomTimePicker />
                                                                                      </div>
                                                                                      <div className="flex-shrink-0">
                                                                                        <span className="d-block mb-2 text-royal-blue fw-500 text-break h6">
                                                                                          Nurse Mary
                                                                                        </span>
                                                                                        <span className="d-block text-manatee fw-500 h6 mb-0">
                                                                                          Test Practice
                                                                                        </span>
                                                                                      </div>
                                                                                    </Link>
                                                                                  </div>
                                                                                </div>
                                                                                <div className="patient-card">
                                                                                  <div className="d-flex align-items-center card-header position-relative">
                                                                                    <div className="card-box-img health-records-bg">
                                                                                      <Image src={MyHealthRecords} />
                                                                                    </div>
                                                                                    <h2 className="mid fw-600 text-stratos mb-0">
                                                                                      My Health Records
                                                                                    </h2>
                                                                                    <Image src={CurveImg} className="curve-img" />
                                                                                  </div>
                                                                                  <div className="patient-card-content health-records-content">
                                                                                    <div
                                                                                      role="button"
                                                                                      className="d-flex align-items-center"
                                                                                      onClick={PdfDownload}
                                                                                    >
                                                                                      <div className="pdf-thumbnail-img flex-shrink-0">
                                                                                        <Image src={PdfThumbnail} alt="pdf" />
                                                                                      </div>
                                                                                      <div className="pdf-content-wrap">
                                                                                        <h4 className="h4 fw-500 text-stratos text-ellipsis">
                                                                                          Cardiology Letter
                                                                                        </h4>
                                                                                        <span className="p text-royal-blue fw-500 text-ellipsis mb-1">
                                                                                          By: Dr. James
                                                                                        </span>
                                                                                        <span className="mb-0 h6 fw-500 text-manatee d-block d-lg-none date-label">
                                                                                          20th Mar 2023
                                                                                        </span>
                                                                                      </div>
                                                                                      <div className="">
                                                                                        <span className="mb-0 fw-500 h6 text-manatee d-none d-lg-block">
                                                                                          20th Mar 2023
                                                                                        </span>
                                                                                      </div>
                                                                                    </div>
                                                                                    <div
                                                                                      role="button"
                                                                                      className="d-flex align-items-center"
                                                                                      onClick={PdfDownload}
                                                                                    >
                                                                                      <div className="pdf-thumbnail-img flex-shrink-0">
                                                                                        <Image src={PdfThumbnail} alt="pdf" />
                                                                                      </div>
                                                                                      <div className="pdf-content-wrap">
                                                                                        <h4 className="h4 fw-500 text-stratos text-ellipsis">
                                                                                          Cardiology Letter
                                                                                        </h4>
                                                                                        <span className="p text-royal-blue fw-500 text-ellipsis mb-1">
                                                                                          By: Dr. James
                                                                                        </span>
                                                                                        <span className="mb-0 h6 fw-500 text-manatee d-block d-lg-none date-label">
                                                                                          20th Mar 2023
                                                                                        </span>
                                                                                      </div>
                                                                                      <div className="">
                                                                                        <span className="mb-0 h6 fw-500 d-none d-lg-block text-manatee">
                                                                                          20th Mar 2023
                                                                                        </span>
                                                                                      </div>
                                                                                    </div>
                                                                                    <div
                                                                                      role="button"
                                                                                      className="d-flex align-items-center"
                                                                                      onClick={PdfDownload}
                                                                                    >
                                                                                      <div className="pdf-thumbnail-img flex-shrink-0">
                                                                                        <Image src={PdfThumbnail} alt="pdf" />
                                                                                      </div>
                                                                                      <div className="pdf-content-wrap">
                                                                                        <h4 className="h4 fw-500 text-stratos text-ellipsis">
                                                                                          Cardiology Letter
                                                                                        </h4>
                                                                                        <span className="p text-royal-blue fw-500 text-ellipsis mb-1">
                                                                                          By: Dr. James
                                                                                        </span>
                                                                                        <span className="mb-0 h6 fw-500 text-manatee d-block d-lg-none date-label">
                                                                                          20th Mar 2023
                                                                                        </span>
                                                                                      </div>
                                                                                      <div className="">
                                                                                        <span className="mb-0 h6 fw-500 text-manatee d-none d-lg-block">
                                                                                          20th Mar 2023
                                                                                        </span>
                                                                                      </div>
                                                                                    </div>
                                                                                  </div>
                                                                                </div>
                                                                                <div className="patient-card item-3">
                                                                                  <div className="d-flex align-items-center card-header position-relative">
                                                                                    <div className="card-box-img new-messages-bg position-relative">
                                                                                      <Image src={NewMessages} />
                                                                                    </div>
                                                                                    <h2 className="mid fw-600 text-stratos mb-0">New Messages</h2>
                                                                                    <Image src={CurveImg} className="curve-img" />
                                                                                  </div>
                                                                                  <div className="new-message-card-content">
                                                                                    <div className="custom-tabs-wrap">
                                                                                      <Tabs defaultActiveKey="1" items={items} />
                                                                                    </div>
                                                                                  </div>
                                                                                </div>
                                                                                <div className="patient-card">
                                                                                  <div className="d-flex align-items-center card-header position-relative">
                                                                                    <div className="card-box-img repeat-prescription-bg">
                                                                                      <Image src={MyRepeatPrescription} />
                                                                                    </div>
                                                                                    <h2 className="mid fw-600 text-stratos mb-0">
                                                                                      My Repeat Prescription
                                                                                    </h2>
                                                                                    <Image src={CurveImg} className="curve-img" />
                                                                                  </div>
                                                                                  <div className="patient-card-content d-flex">
                                                                                    <div className="d-flex flex-column justify-content-between">
                                                                                      <h4 className="fw-500 confirm-dot text-stratos text-break">
                                                                                        No Request Available
                                                                                      </h4>
                                                                                      <div className="btn-wrap">
                                                                                        <Link to="" className="custom_btn">
                                                                                          New Repeat Prescriptions
                                                                                        </Link>
                                                                                      </div>
                                                                                    </div>
                                                                                  </div>
                                                                                </div>
                                                                                <div className="patient-card">
                                                                                  <div className="d-flex align-items-center card-header position-relative">
                                                                                    <div className="card-box-img appointment-bg">
                                                                                      <Image src={MyHealthIndicator} />
                                                                                    </div>
                                                                                    <h2 className="mid fw-600 text-stratos mb-0">
                                                                                      My Health Indicator
                                                                                    </h2>
                                                                                    <Image src={CurveImg} className="curve-img" />
                                                                                  </div>
                                                                                  <div className="patient-card-content helth-card-content">
                                                                                    <div className="d-flex justify-content-between upcoming-appointments flex-wrap">
                                                                                      <div className="me-4 ">
                                                                                        <h4 className="fw-500 confirm-dot text-stratos text-break">
                                                                                          Blood Preasure
                                                                                        </h4>
                                                                                        <span className="fw-500 text-manatee mb-0 h6">
                                                                                          113/73 mm Hg
                                                                                        </span>
                                                                                      </div>
                                                                                    </div>
                                                                                    <div className="d-flex justify-content-between upcoming-appointments flex-wrap">
                                                                                      <div className="me-4 ">
                                                                                        <h4 className="fw-500 confirm-dot text-stratos text-break">
                                                                                          Smoking
                                                                                        </h4>
                                                                                        <span className="fw-500 text-manatee mb-0 h6">
                                                                                          Non Smoker
                                                                                        </span>
                                                                                      </div>
                                                                                    </div>
                                                                                    <div className="d-flex justify-content-between upcoming-appointments flex-wrap">
                                                                                      <div className="me-4 ">
                                                                                        <h4 className="fw-500 confirm-dot opacity text-stratos text-break">
                                                                                          BMI
                                                                                        </h4>
                                                                                        <span className="fw-500 text-manatee mb-0 h6">31</span>
                                                                                      </div>
                                                                                    </div>
                                                                                  </div>
                                                                                </div>
                                                                              </div>
                                                                            </div>
                                                                          </div> */}
        <div className="documents-home">
          <h2 class="h6text"> Patients </h2>
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      </section>
    </>
  );
};
