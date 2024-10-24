import React from "react";
import { Image } from "react-bootstrap";
import hamburger from "../../../assets/images/icons/hamburger.png";
import { Button, Tabs } from "antd";
import PlusIcon from "../../../assets/images/icons/PlusIcon.svg";
import Expand from "../../../assets/images/icons/expand1.svg";
import { SVGIcons } from "../../../components/Data/SVGIcons";
import PatientImg from "../../../assets/images/cover/patient.jpg";
import Male from "../../../assets/images/icons/male.svg";
import Diabeties from "../../../assets/images/icons/diabeties.svg";
import CDM from "../../../assets/images/icons/cdm.png";
import CycleOfcare from "../../../assets/images/icons/cycle.png";
import OCF from "../../../assets/images/icons/ocf.png";
import PP from "../../../assets/images/icons/pp.png";
import NewPregnency from "../../../assets/images/icons/pregnency.png";
import AnteNatalVisit from "../../../assets/images/icons/ante-natal-visit.png";
import PostNatalVisit from "../../../assets/images/icons/post-natal-visit.png";
import { Link } from "react-router-dom";
import "./Protocols.css";

export const Protocols = () => {
  const documentDataItems = [
    {
      key: "1",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="icon-wrap">{SVGIcons.Details}</span>
            <span>Consult</span>
          </div>
        </>
      ),
      children: (
        <>
          <h3>Consult</h3>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="icon-wrap">{SVGIcons.Details}</span>
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
            <span className="icon-wrap">{SVGIcons.Details}</span>
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
            <span className="icon-wrap">{SVGIcons.Details}</span>
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
            <span className="icon-wrap">{SVGIcons.Details}</span>
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
            <span className="icon-wrap">{SVGIcons.Details}</span>
            <span>Protocols</span>
          </div>
        </>
      ),
      children: (
        <>
          <div className="protocols-content-wrap d-flex">
            <div className="protocols-wrapper">
              <div className="protocols-items-wrap">
                <div className="d-flex align-items-center justify-content-between documents-title-wrap">
                  <h6 className="h6 fw-600 text-stratos mb-0 text-ellipsis text-break">
                    Patient Profile
                  </h6>
                  <Button className="transaparent-btn d-flex align-items-center justify-content-end">
                    <Image src={Expand} />
                  </Button>
                </div>
                <div className="patient-header-wrap">
                  <div className="d-flex align-items-center flex-sm-nowrap flex-wrap justify-content-center justify-content-sm-start">
                    <div className="patient-profile-img-wrap flex-shrink-0 ">
                      <Image src={PatientImg} />
                    </div>
                    <div className="patient-header-content-wrap">
                      <h6 className="h6 fw-600 text-ellipsis">
                        James Targaryen
                      </h6>
                      <div className="d-flex align-items-center justify-content-center justify-content-sm-start">
                        <div className="d-flex align-items-center patient-summary-wrap">
                          <span className="patient-header-icon-wrap">
                            <Image src={Male} alt="category" />
                          </span>
                          <span className="small-text text-stratos fw-500 mb-0 text-break">
                            Male
                          </span>
                        </div>
                        <div className="d-flex align-items-center patient-summary-wrap">
                          <span className="patient-header-icon-wrap">
                            <Image src={Diabeties} alt="category" />
                          </span>
                          <span className="text-stratos small-text fw-500 mb-0 text-break">
                            Diabeties
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="patient-bottom-wrap d-flex align-items-center">
                  <div>
                    <div className="patient-block-wrap">
                      <span className="text-manatee fw-500 d-inline-block small-text mb-2">
                        Phone no:
                      </span>
                      <span className="small-label text-stratos fw-500 mb-0 d-block">
                        0871234567
                      </span>
                    </div>
                    <div className="patient-block-wrap">
                      <span className="text-manatee fw-500 d-inline-block small-text mb-2">
                        Address:
                      </span>
                      <span className="small-label text-stratos fw-500 mb-0 d-block">
                        42 Rosemount Drive, Dublin 18
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 btn-wrapper">
                    <Button className="custom_btn">Send SMS</Button>
                    <Button className="custom_btn">Add To Task</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="protocols-page-wrap">
              <div className="protocols-grid-box-wrapper">
                <Link
                  to=""
                  className="protocols-grid-item-wrap d-flex align-items-center"
                >
                  <div className="protocols-item-img-wrap d-flex align-items-center justify-content-center cdm-bg flex-shrink-0">
                    <Image src={CDM} />
                  </div>
                  <div className="protocols-item-content-wrap d-flex flex-column justify-content-center">
                    <p className="h6 mb-0 fw-600 text-ellipsis primary-font text-break">
                      CDM
                    </p>
                  </div>
                </Link>
                <Link
                  to=""
                  className="protocols-grid-item-wrap d-flex align-items-center"
                >
                  <div className="protocols-item-img-wrap d-flex align-items-center justify-content-center cycle-of-care-bg flex-shrink-0">
                    <Image src={CycleOfcare} />
                  </div>
                  <div className="protocols-item-content-wrap d-flex flex-column justify-content-center">
                    <p className="h6 mb-0 fw-600 text-ellipsis primary-font text-break">
                      Cycle of Care
                    </p>
                  </div>
                </Link>
                <Link
                  to=""
                  className="protocols-grid-item-wrap d-flex align-items-center"
                >
                  <div className="protocols-item-img-wrap d-flex align-items-center justify-content-center ocf-bg flex-shrink-0">
                    <Image src={OCF} />
                  </div>
                  <div className="protocols-item-content-wrap d-flex flex-column justify-content-center">
                    <p className="h6 mb-0 fw-600 text-ellipsis primary-font text-break">
                      OCF
                    </p>
                  </div>
                </Link>
                <Link
                  to=""
                  className="protocols-grid-item-wrap d-flex align-items-center"
                >
                  <div className="protocols-item-img-wrap d-flex align-items-center justify-content-center pp-bg flex-shrink-0">
                    <Image src={PP} />
                  </div>
                  <div className="protocols-item-content-wrap d-flex flex-column justify-content-center">
                    <p className="h6 mb-0 fw-600 text-ellipsis primary-font text-break">
                      PP
                    </p>
                  </div>
                </Link>
                <Link
                  to="/post-natal-visit"
                  className="protocols-grid-item-wrap d-flex align-items-center"
                >
                  <div className="protocols-item-img-wrap d-flex align-items-center justify-content-center pregnency-bg flex-shrink-0">
                    <Image src={NewPregnency} />
                  </div>
                  <div className="protocols-item-content-wrap d-flex flex-column justify-content-center">
                    <p className="h6 mb-0 fw-600 text-ellipsis primary-font text-break">
                      New Pregnency
                    </p>
                  </div>
                </Link>
                <Link
                  to="/post-natal-visit"
                  className="protocols-grid-item-wrap d-flex align-items-center"
                >
                  <div className="protocols-item-img-wrap d-flex align-items-center justify-content-center pp-bg flex-shrink-0">
                    <Image src={AnteNatalVisit} />
                  </div>
                  <div className="protocols-item-content-wrap d-flex flex-column justify-content-center">
                    <p className="h6 mb-0 fw-600 text-ellipsis primary-font text-break">
                      Ante-Natal Visit
                    </p>
                  </div>
                </Link>
                <Link
                  to="/post-natal-visit"
                  className="protocols-grid-item-wrap d-flex align-items-center"
                >
                  <div className="protocols-item-img-wrap d-flex align-items-center justify-content-center postnatal-visit-bg flex-shrink-0">
                    <Image src={PostNatalVisit} />
                  </div>
                  <div className="protocols-item-content-wrap d-flex flex-column justify-content-center">
                    <p className="h6 mb-0 fw-600 text-ellipsis primary-font text-break">
                      Post-Natal Visit
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      key: "7",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="icon-wrap">{SVGIcons.Details}</span>
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
      <section className="dashboard-wrap">
        <h2 class="h2 text-stratos fw-600 page-title"> Protocols </h2>
        <div className="dashboard-bg">
          <div className="documents-tabs-wrap">
            <Tabs
              defaultActiveKey="1"
              items={documentDataItems}
              moreIcon={<Image src={hamburger} />}
            />
          </div>
        </div>
      </section>
    </>
  );
};
