import React, { useEffect, useState } from "react";
import { Radio, Tabs, Table, Checkbox, Button, Dropdown } from "antd";
import { Link, useLocation } from "react-router-dom";
import { Image } from "react-bootstrap";
import icons from "../../../assets/images/icons/icons.svg";
import sent from "../../../assets/images/icons/Sent.svg";
import recieved from "../../../assets/images/icons/Recieved.svg";
import printer from "../../../assets/images/icons/printer.svg";
import cancel from "../../../assets/images/icons/cancel-c.svg";
import down from "../../../assets/images/icons/right-arrow.svg";
import { SVGIcons } from "../../../components/Data/SVGIcons";
import AvatarImg from "../../../assets/images/icons/avatar4.png";
import hamburger from "../../../assets/images/icons/hamburger.png";
import "./Document.css";

const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};
const columns = [
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "",
    dataIndex: "view",
  },
  {
    title: "Document",
    dataIndex: "document",
  },
  {
    title: "Ordered by",
    dataIndex: "ordered",
  },
  {
    title: "Order Date",
    dataIndex: "order_date",
  },
  {
    title: "",
    dataIndex: "checkbox",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const data = [
  {
    key: "1",
    date: (
      <>
        <span className="text-tuna">24 March 2023</span>
      </>
    ),
    name: "Darren Mc Cormack",
    view: (
      <>
        <Link to="" className="transparent-link">
          View File
        </Link>
      </>
    ),
    document: (
      <>
        <span className="fw-700 text-decoration-underline d-inline-block text-break">
          Cardiology OPD
        </span>
      </>
    ),
    ordered: "Dr. M Doyle",
    order_date: "01/05/23",
    checkbox: (
      <>
        <Checkbox onChange={onChange}></Checkbox>
      </>
    ),
    action: (
      <>
        <div className="actions-btn d-flex align-items-center">
          <Link to="" className="transparent-link">
            Task
          </Link>
          <Link to="" className="transparent-link">
            SMS
          </Link>
        </div>
      </>
    ),
  },
  {
    key: "2",
    date: <span className="text-tuna">24 March 2023</span>,
    name: "Darren Mc Cormack",
    view: (
      <>
        <Link to="" className="transparent-link">
          View File
        </Link>
      </>
    ),
    document: (
      <>
        <span className="fw-700 text-decoration-underline d-inline-block text-break">
          Cardiology OPD
        </span>
      </>
    ),
    ordered: "Dr. M Doyle",
    order_date: "01/05/23",
    checkbox: (
      <>
        <Checkbox onChange={onChange}></Checkbox>
      </>
    ),
    action: (
      <>
        <div className="actions-btn d-flex align-items-center">
          <Link to="" className="transparent-link">
            Task
          </Link>
          <Link to="" className="transparent-link">
            SMS
          </Link>
        </div>
      </>
    ),
  },
  {
    key: "3",
    date: <span className="text-tuna">24 March 2023</span>,
    name: "Darren Mc Cormack",
    view: (
      <>
        <Link to="" className="transparent-link">
          View File
        </Link>
      </>
    ),
    document: (
      <>
        <span className="fw-700 text-decoration-underline d-inline-block text-break">
          Cardiology OPD
        </span>
      </>
    ),
    ordered: "Dr. M Doyle",
    order_date: "01/05/23",
    checkbox: (
      <>
        <Checkbox onChange={onChange}></Checkbox>
      </>
    ),
    action: (
      <>
        <div className="actions-btn d-flex align-items-center">
          <Link to="" className="transparent-link">
            Task
          </Link>
          <Link to="" className="transparent-link">
            SMS
          </Link>
        </div>
      </>
    ),
  },
  {
    key: "4",
    date: <span className="text-tuna">24 March 2023</span>,
    name: "Darren Mc Cormack",
    view: (
      <>
        <Link to="" className="transparent-link">
          View File
        </Link>
      </>
    ),
    document: (
      <>
        <span className="fw-700 text-decoration-underline d-inline-block text-break">
          Cardiology OPD
        </span>
      </>
    ),
    ordered: "Dr. M Doyle",
    order_date: "01/05/23",
    checkbox: (
      <>
        <Checkbox onChange={onChange}></Checkbox>
      </>
    ),
    action: (
      <>
        <div className="actions-btn d-flex align-items-center">
          <Link to="" className="transparent-link">
            Task
          </Link>
          <Link to="" className="transparent-link">
            SMS
          </Link>
        </div>
      </>
    ),
  },
  {
    key: "5",
    date: <span className="text-tuna">24 March 2023</span>,
    name: "Darren Mc Cormack",
    view: (
      <>
        <Link to="" className="transparent-link">
          View File
        </Link>
      </>
    ),
    document: (
      <>
        <span className="fw-700 text-decoration-underline d-inline-block text-break">
          Cardiology OPD
        </span>
      </>
    ),
    ordered: "Dr. M Doyle",
    order_date: "01/05/23",
    checkbox: (
      <>
        <Checkbox onChange={onChange}></Checkbox>
      </>
    ),
    action: (
      <>
        <div className="actions-btn d-flex align-items-center">
          <Link to="" className="transparent-link">
            Task
          </Link>
          <Link to="" className="transparent-link">
            SMS
          </Link>
        </div>
      </>
    ),
  },
  {
    key: "6",
    date: <span className="text-tuna">24 March 2023</span>,
    name: "Darren Mc Cormack",
    view: (
      <>
        <Link to="" className="transparent-link">
          View File
        </Link>
      </>
    ),
    document: (
      <>
        <span className="fw-700 text-decoration-underline d-inline-block text-break">
          Cardiology OPD
        </span>
      </>
    ),
    ordered: "Dr. M Doyle",
    order_date: "01/05/23",
    checkbox: (
      <>
        <Checkbox onChange={onChange}></Checkbox>
      </>
    ),
    action: (
      <>
        <div className="actions-btn d-flex align-items-center">
          <Link to="" className="transparent-link">
            Task
          </Link>
          <Link to="" className="transparent-link">
            SMS
          </Link>
        </div>
      </>
    ),
  },
  {
    key: "7",
    date: <span className="text-tuna">24 March 2023</span>,
    name: "Darren Mc Cormack",
    view: (
      <>
        <Link to="" className="transparent-link">
          View File
        </Link>
      </>
    ),
    document: (
      <>
        <span className="fw-700 text-decoration-underline d-inline-block text-break">
          Cardiology OPD
        </span>
      </>
    ),
    ordered: "Dr. M Doyle",
    order_date: "01/05/23",
    checkbox: (
      <>
        <Checkbox onChange={onChange}></Checkbox>
      </>
    ),
    action: (
      <>
        <div className="actions-btn d-flex align-items-center">
          <Link to="" className="transparent-link">
            Task
          </Link>
          <Link to="" className="transparent-link">
            SMS
          </Link>
        </div>
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
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    // Column configuration not to be checked
    name: record.name,
  }),
};

export const Document = () => {
  const [selectionType, setSelectionType] = useState("checkbox");
  const [mode, setMode] = useState("left");

  const items = [
    {
      key: "1",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="tabs-icon-wrap">{SVGIcons.OPDLetters}</span>
            <span className="fw-500 text-stratos mb-0 d-inline-block">
              Recieved
            </span>
          </div>
        </>
      ),
      children: (
        <>
          <div className="">
            <Table
              pagination={false}
              columns={columns}
              dataSource={data}
              rowSelection={{
                type: selectionType,
                ...rowSelection,
              }}
            />
          </div>
          <div className="print-btn">
            <Button className="custom_btn">Print</Button>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="tabs-icon-wrap">{SVGIcons.Sent}</span>
            <span className="fw-500 text-stratos mb-0 d-inline-block">
              Sent
            </span>
          </div>
        </>
      ),
      children: (
        <>
          <div className="">
            <Table
              pagination={false}
              columns={columns}
              dataSource={data}
              rowSelection={{
                type: selectionType,
                ...rowSelection,
              }}
            />
          </div>
          <div className="print-btn">
            <Button className="custom_btn">Print</Button>
          </div>
        </>
      ),
    },
  ];

  const documentDataItems = [
    {
      key: "1",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="icon-wrap ">{SVGIcons.Details}</span>
            <span>OPD Letters</span>
          </div>
        </>
      ),
      children: (
        <>
          <div className="custom-tabs-wrapper documents-homepage-wrap">
            <Tabs defaultActiveKey="1" tabPosition={mode} items={items} />
            {/* <Tabs defaultActiveKey="1" tabPosition={mode} items={TabItems} /> */}
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="icon-wrap ">{SVGIcons.Details}</span>
            <span>E-Referrals</span>
          </div>
        </>
      ),
      children: (
        <>
          <h3>E-Referrals</h3>
        </>
      ),
    },
    {
      key: "3",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="icon-wrap ">{SVGIcons.Details}</span>
            <span>Forms</span>
          </div>
        </>
      ),
      children: (
        <>
          <h3>Forms</h3>
        </>
      ),
    },
    {
      key: "4",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="icon-wrap ">{SVGIcons.Details}</span>
            <span>Letters</span>
          </div>
        </>
      ),
      children: (
        <>
          <h3>Letters</h3>
        </>
      ),
    },
    {
      key: "5",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="icon-wrap ">{SVGIcons.Details}</span>
            <span>STC Claim Forms</span>
          </div>
        </>
      ),
      children: (
        <>
          <h3>STC Claim Forms</h3>
        </>
      ),
    },
    {
      key: "6",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="icon-wrap ">{SVGIcons.Details}</span>
            <span>Scanned Documents</span>
          </div>
        </>
      ),
      children: (
        <>
          <h3>Scanned Documents</h3>
        </>
      ),
    },
    {
      key: "7",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="icon-wrap ">{SVGIcons.Details}</span>
            <span>Scanned Documents</span>
          </div>
        </>
      ),
      children: (
        <>
          <h3>Scanned Documents</h3>
        </>
      ),
    },
  ];

  const [visible, setVisible] = useState(false);
  const handleMoreClick = (e) => {
    // e.stopPropagation();
    setVisible(!visible);
    console.log(visible);
  };

  useEffect(() => {
    let btn = document.querySelector(".ant-tabs-nav-more");
    btn.addEventListener("click", function () {
      console.log("clicked!");
      btn.classList.remove("ant-tabs-dropdown-open");
    });
  }, []);

  return (
    <>
      <div className="documents-wrap">
        <div className="documents-header btns">
          <div className="d-flex align-items-center profile-wrap">
            <h2 className="h2 fw-600 text-stratos mb-0">Document Homepage</h2>
          </div>
          <div className="d-flex align-items-center  header-menu-wrap">
            <Button>
              <Image src={cancel} /> Attach File
            </Button>
            <Button>
              <Image src={printer} /> Scan
            </Button>
            <Button>
              <Image src={printer} /> Print
            </Button>
          </div>
        </div>
        <div className="dashboard-bg">
          <div className="documents-tabs-wrap">
            <Tabs
              defaultActiveKey="1"
              items={documentDataItems}
              moreIcon={
                <Image src={hamburger}/>
              }
            />
          </div>
        </div>
      </div>
      {/* <div className="documents-section">
        <div className="btns">
          <h2 className="h6text">Document Homepage</h2>
          <div className="btn">
            <Button type="primary" className="printer">
              <Image src={cancel} /> Attach File
            </Button>
            <Button type="primary" className="printer">
              <Image src={printer} /> Scan
            </Button>
            <Button type="primary" className="printer">
              <Image src={printer} /> Print
            </Button>
          </div>
        </div>

        <div className="document section">
          <div className="listpage section">
            <div className="left">
              <Link to="#" className="">
                <span>
                  <Image src={icons} className="active-image" />
                </span>
                OPD Letters
              </Link>
            </div>
            <div className="left">
              <Link to="#" className="">
                <span>
                  <Image src={icons} className="active-image" />
                </span>
                E-Referrals
              </Link>
            </div>
            <div className="left">
              <Link to="#" className="">
                <span>
                  <Image src={icons} className="active-image" />
                </span>
                Forms
              </Link>
            </div>
            <div className="left">
              <Link to="#" className="">
                <span>
                  <Image src={icons} className="active-image" />
                </span>
                Letters
              </Link>
            </div>
            <div className="left">
              <Link to="#" className="">
                <span>
                  <Image src={icons} className="active-image" />
                </span>
                STC Claim Forms
              </Link>
            </div>
            <div className="left">
              <Link to="#" className="">
                <span>
                  <Image src={icons} className="active-image" />
                </span>
                Scanned Documents
              </Link>
            </div>
            <div className="left">
              <Link to="#" className="">
                <span>
                  <Image src={icons} className="active-image" />
                </span>
                Private Referrals
              </Link>
            </div>
            <div className="left">
              <Link to="#" className="">
                <span>
                  <Image src={icons} className="active-image" />
                </span>
                Other Documents
              </Link>
            </div>
          </div>
          <div className="doc-table">
            <Tabs defaultActiveKey="1" tabPosition={mode} items={items} />
          </div>
        </div>
      </div> */}
    </>
  );
};
