import React, { useState } from "react";
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
import "./Home.css";


const onChange = (date, dateString) => {
  //console.log(date, dateString);
};
const handleChange = (value) => {
  //console.log(`selected ${value}`);
};
const prefixSelector = <Form.Item name="prefix" noStyle></Form.Item>;

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
    id: "#q2458",
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
              <h2 className="h2text primary-font"> Patient / Family Search </h2>
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
                        ]}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="filed section savebtn">
                  <Button className="custom_btn">Save</Button>
                </div>
              </div>
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
                <Input placeholder="Search Patients" className="search-input" />
              </div>
              <div className="rights">
                <div className="d-flex align-items-center">
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
        <div className="documents-home">
          <h2 class="h6text"> Patients </h2>
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      </section>
    </>
  );
};
