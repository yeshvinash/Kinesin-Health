import React, { useState } from "react";
import {
  Dropdown,
  Radio,
  Tabs,
  Button,
  Checkbox,
  Select,
  Form,
  Table,
} from "antd";
import { SVGIcons } from "../../../components/Data/SVGIcons";
import AvatarImg from "../../../assets/images/icons/avatar4.png";
import recieved from "../../../assets/images/icons/Recieved.svg";
import printer from "../../../assets/images/icons/printer.svg";
import cancel from "../../../assets/images/icons/cancel-c.svg";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import hamburger from "../../../assets/images/icons/hamburger.png";
import { DownOutlined } from "@ant-design/icons";
import "./DocumentPatient.css";

const PdfDownload = () => {
  const pdfUrl = "https://www.africau.edu/images/default/sample.pdf";
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.target = "_blank";
  link.download = "document.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const DocumentPatient = () => {
  const [mode, setMode] = useState("left");

  const columns = [
    {
      title: "XRAY",
      dataIndex: "name",
    },
    {
      title: "12/02/2023",
      dataIndex: "date",
    },
    {
      title: "12/02/2023",
      dataIndex: "date1",
    },
    {
      title: "12/02/2023",
      dataIndex: "date2",
    },
  ];

  const opdData = [
    {
      key: "1",
      name: "Cardiology OPD",
      date: "",
      date1: "",
      date2: (
        <>
          <Link to="" className="link link-red" onClick={PdfDownload}>
            Click To View
          </Link>
        </>
      ),
    },
    {
      key: "2",
      name: "Rheumatology OPD",
      date: "",
      date1: (
        <>
          <Link to="" className="link black fw-500" onClick={PdfDownload}>
            Click To View
          </Link>
        </>
      ),
      date2: "",
    },
  ];
  const dischargeData = [
    {
      key: "1",
      name: "Discharge Letter",
      date: "",
      date1: "",
      date2: (
        <>
          <Link to="" className="link link-red" onClick={PdfDownload}>
            Click To View
          </Link>
        </>
      ),
    },
    {
      key: "2",
      name: "Discharge Letter",
      date: "",
      date1: (
        <>
          <Link to="" className="link black fw-500" onClick={PdfDownload}>
            Click To View
          </Link>
        </>
      ),
      date2: "",
    },
  ];
  const otherData = [
    {
      key: "1",
      name: "Other Letters",
      date: "",
      date1: "",
      date2: (
        <>
          <Link to="" className="link link-red" onClick={PdfDownload}>
            Click To View
          </Link>
        </>
      ),
    },
    {
      key: "2",
      name: "Other Letters",
      date: "",
      date1: (
        <>
          <Link to="" className="link black fw-500" onClick={PdfDownload}>
            Click To View
          </Link>
        </>
      ),
      date2: "",
    },
  ];

  const TabinnerItems = [
    {
      key: "1",
      label: (
        <>
          <span>OPD Letters</span>
        </>
      ),
      children: (
        <>
          <Table columns={columns} dataSource={opdData} pagination={false} />
        </>
      ),
    },
    {
      key: "2",
      label: (
        <>
          <span>Discharge Letter</span>
        </>
      ),
      children: (
        <>
          <Table
            columns={columns}
            dataSource={dischargeData}
            pagination={false}
          />
        </>
      ),
    },
    {
      key: "3",
      label: (
        <>
          <span>Other Letters</span>
        </>
      ),
      children: (
        <>
          <Table columns={columns} dataSource={otherData} pagination={false} />
        </>
      ),
    },
  ];

  const TabItems = [
    {
      key: "1",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="tabs-icon-wrap">{SVGIcons.OPDLetters}</span>
            <span className="fw-500 text-stratos mb-0 d-inline-block text-break">
              OPD Letters
            </span>
          </div>
        </>
      ),
      children: (
        <>
          <div className="d-flex flex-wrap align-items-center justify-content-between tabs-content-header-wrap">
            <div>
              <span className="d-inline-block text-black fw-500 h6 small d-block">
                Select View
              </span>
              <div className="custom-checkbox-wrap d-flex flex-wrap">
                <Checkbox>List</Checkbox>
                <Checkbox>Table</Checkbox>
                <Checkbox>Graph</Checkbox>
              </div>
            </div>
            <div className="custom-select">
              <Select
                suffixIcon={SVGIcons.DownArrow}
                defaultValue="list"
                style={{
                  width: 120,
                }}
                options={[
                  {
                    value: "list",
                    label: "list",
                  },
                  {
                    value: "table",
                    label: "table",
                  },
                  {
                    value: "graph",
                    label: "graph",
                  },
                ]}
              />
            </div>
          </div>
          <div className="documents-table-wrap">
            <Tabs
              defaultActiveKey="1"
              tabPosition={mode}
              items={TabinnerItems}
            />
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="tabs-icon-wrap">{SVGIcons.OPDLetters}</span>
            <span className="fw-500 text-stratos mb-0 d-inline-block text-break">
              E-Referrals
            </span>
          </div>
        </>
      ),
      children: "E-Referrals",
    },
    {
      key: "3",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="tabs-icon-wrap">{SVGIcons.OPDLetters}</span>
            <span className="fw-500 text-stratos mb-0 d-inline-block text-break">
              Forms
            </span>
          </div>
        </>
      ),
      children: "Forms",
    },
    {
      key: "4",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="tabs-icon-wrap">{SVGIcons.OPDLetters}</span>
            <span className="fw-500 text-stratos mb-0 d-inline-block text-break">
              Letters
            </span>
          </div>
        </>
      ),
      children: "Letters",
    },
    {
      key: "5",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="tabs-icon-wrap">{SVGIcons.OPDLetters}</span>
            <span className="fw-500 text-stratos mb-0 d-inline-block text-break">
              STC Claim Forms
            </span>
          </div>
        </>
      ),
      children: "STC Claim Forms",
    },
    {
      key: "6",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="tabs-icon-wrap">{SVGIcons.OPDLetters}</span>
            <span className="fw-500 text-stratos mb-0 d-inline-block text-break">
              Scanned Documents
            </span>
          </div>
        </>
      ),
      children: "Scanned Documents",
    },
    {
      key: "7",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="tabs-icon-wrap">{SVGIcons.OPDLetters}</span>
            <span className="fw-500 text-stratos mb-0 d-inline-block text-break">
              Private Referrals
            </span>
          </div>
        </>
      ),
      children: "Private Referrals",
    },
    {
      key: "8",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="tabs-icon-wrap">{SVGIcons.OPDLetters}</span>
            <span className="fw-500 text-stratos mb-0 d-inline-block text-break">
              Other Documents
            </span>
          </div>
        </>
      ),
      children: "Other Documents",
    },
  ];

  const items = [
    {
      key: "1",
      label: "Profile",
    },
    {
      key: "2",
      label: "Profile",
    },
  ];

  const documentDataItems = [
    {
      key: "1",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="icon-wrap ">{SVGIcons.Details}</span>
            <span>Consult</span>
          </div>
        </>
      ),
      children: (
        <>
          <div className="custom-tabs-wrapper">
            <Tabs defaultActiveKey="1" tabPosition={mode} items={TabItems} />
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
            <span>Details</span>
          </div>
        </>
      ),
      children: (
        <>
          <h3>Details</h3>
        </>
      ),
    },
    {
      key: "3",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="icon-wrap ">{SVGIcons.Details}</span>
            <span>Medications</span>
          </div>
        </>
      ),
      children: (
        <>
          <h3>Medications</h3>
        </>
      ),
    },
    {
      key: "4",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="icon-wrap ">{SVGIcons.Details}</span>
            <span>Documents</span>
          </div>
        </>
      ),
      children: (
        <>
          <h3>Documents</h3>
        </>
      ),
    },
    {
      key: "5",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="icon-wrap ">{SVGIcons.Details}</span>
            <span>Results</span>
          </div>
        </>
      ),
      children: (
        <>
          <h3>Results</h3>
        </>
      ),
    },
    {
      key: "6",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="icon-wrap ">{SVGIcons.Details}</span>
            <span>Protocols</span>
          </div>
        </>
      ),
      children: (
        <>
          <h3>Protocols</h3>
        </>
      ),
    },
    {
      key: "7",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="icon-wrap ">{SVGIcons.Details}</span>
            <span>Private Referrals</span>
          </div>
        </>
      ),
      children: (
        <>
          <h3>Private Referrals</h3>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="documents-wrap">
        <div className="documents-header btns">
          <div className="d-flex align-items-center profile-wrap">
            <h2 className="h2 fw-600 text-stratos mb-0">Documents</h2>
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
              className="custom-dropdown"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Image src={AvatarImg} className="avatar-img" />
                <span>Mary Kenny</span>
                {SVGIcons.DownArrow}
              </a>
            </Dropdown>
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
              moreIcon={<Image src={hamburger} />}
            />
          </div>
        </div>
      </div>
    </>
  );
};
