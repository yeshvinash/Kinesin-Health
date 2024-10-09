import React, { useEffect, useState } from "react";
import "./Features.css";
import { Col, Image, Row } from "react-bootstrap";
import FeatureHero from "../../assets/images/cover/feature-hero.png";
import PlusIcon from "../../assets/images/icons/plus.png";
import { CustomButton } from "../../Components/CustomButton/CustomButton";
import { client, urlFor } from "../../Sanity";
import Intelligent from "../../assets/images/icons/intelligent-reporting.png";
import PracticeMetrics from "../../assets/images/icons/practice-metrics.png";
import StaffManagement from "../../assets/images/icons/staff-management.png";
import PosSoftware from "../../assets/images/icons/pos-software.png";
import Stock from "../../assets/images/icons/stock.png";
import RevenueGenerating from "../../assets/images/icons/revenue-generating.png";
import Cost from "../../assets/images/icons/cost-reduction.png";
import Automated from "../../assets/images/icons/automated.png";
import ManagePractice from "../../assets/images/cover/manage-your-practice.png";
import PaymentSolutionsBg from "../../assets/images/cover/payment-solutions-bg.png";
import PaymentSolutions from "../../assets/images/cover/payment-solutions.png";
import Checkmark from "../../assets/images/icons/checkmark.png";
import FeatureManagePractice from "../../assets/images/cover/manage-your-patients.png";

const Features = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    client
      .fetch('*[_id == "feature"]{...}')
      .then((response) => {
        console.log(response);
        setData(response[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  if (data === null) return null;
  return (
    <>
      <section className="feature-hero">
        <div className="container">
          <div className="d-flex align-items-center feature-hero-layout">
            <div className="feature-hero-wrap">
              <h1 className="h1 fw-700">{data?.hero_title}</h1>
              <div className="feature-hero-list-wrap">
                <ul className="list-item-wrap mb-5 pb-2">
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data?.hero_key_points[0]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data?.hero_key_points[1]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data?.hero_key_points[2]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data?.hero_key_points[3]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data?.hero_key_points[4]}
                    </span>
                  </li>
                </ul>
                <ul className="list-item-wrap mb-5 pb-2">
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data?.hero_key_points[5]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data?.hero_key_points[6]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data?.hero_key_points[7]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data?.hero_key_points[8]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data?.hero_key_points[9]}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="btn-wrap">
                <CustomButton link="/" variant={"dark"}>
                  Book a Demo
                </CustomButton>
              </div>
            </div>

            {/* <Col lg={5}> */}
            <div className="feature-hero-img-wrap">
              <Image src={FeatureHero} />
            </div>
            {/* </Col> */}
          </div>
        </div>
        {/* <Image
          src={FeatureManagePractice}
          className="feature-manage-practice-wrap"
        /> */}
      </section>

      <section className="manage-your-practice">
        <div className="container">
          <h2 className="h2 text-center fw-700">
            {data?.manage_your_practice_title}
          </h2>
          <div className="text-center manage-practice-img-wrap position-relative d-block d-lg-none">
            <Image src={ManagePractice} />
          </div>
          <div className="d-flex manage-your-practice-wrap position-relative align-items-center justify-content-between">
            <div className="manage-practice-left-wrap position-relative">
              <div className="d-inline-flex align-items-center manage-practice-groups-wrap">
                <span className="link-group-icons link-group-icons-bg-pink">
                  <Image
                    src={urlFor(
                      data?.practice_key_points[0]?.practice_image?.asset?._ref
                    )}
                  />
                </span>
                <span className="mb-0 h4 text-black fw-600 manage-practice-groups-title-wrap">
                  {data?.practice_key_points[0].alt}
                </span>
              </div>
              <div className="d-inline-flex align-items-center manage-practice-groups-wrap">
                <span className="link-group-icons link-group-icons-bg-purple">
                  <Image
                    src={urlFor(
                      data?.practice_key_points[1]?.practice_image?.asset?._ref
                    )}
                  />
                </span>
                <span className="mb-0 h4 text-black fw-600 manage-practice-groups-title-wrap">
                  {data?.practice_key_points[1].alt}
                </span>
              </div>
              <div className="d-inline-flex align-items-center manage-practice-groups-wrap">
                <span className="link-group-icons link-group-icons-bg-blue">
                  <Image
                    src={urlFor(
                      data?.practice_key_points[2]?.practice_image?.asset?._ref
                    )}
                  />
                </span>
                <span className="mb-0 h4 text-black fw-600 manage-practice-groups-title-wrap">
                  {data?.practice_key_points[2].alt}
                </span>
              </div>
              <div className="d-inline-flex align-items-center manage-practice-groups-wrap">
                <span className="link-group-icons link-group-icons-bg-green">
                  <Image
                    src={urlFor(
                      data?.practice_key_points[3]?.practice_image?.asset?._ref
                    )}
                  />
                </span>
                <span className="mb-0 h4 text-black fw-600 manage-practice-groups-title-wrap">
                  {data?.practice_key_points[3].alt}
                </span>
              </div>
            </div>
            <div className="d-none d-lg-block">
              <div className="text-center manage-practice-img-wrap position-relative">
                <Image src={ManagePractice} />
              </div>
            </div>
            <div className="manage-practice-right-wrap position-relative">
              <div className="d-inline-flex align-items-center manage-practice-groups-wrap">
                <span className="mb-0 h4 text-black fw-600 manage-practice-groups-title-wrap">
                  {data?.practice_key_points[4].alt}
                </span>
                <span className="link-group-icons link-group-icons-bg-pink">
                  <Image
                    src={urlFor(
                      data?.practice_key_points[4]?.practice_image?.asset?._ref
                    )}
                  />
                </span>
              </div>
              <div className="d-inline-flex align-items-center manage-practice-groups-wrap">
                <span className="mb-0 h4 text-black fw-600 manage-practice-groups-title-wrap">
                  {data?.practice_key_points[5].alt}
                </span>
                <span className="link-group-icons link-group-icons-bg-purple">
                  <Image
                    src={urlFor(
                      data?.practice_key_points[5]?.practice_image?.asset?._ref
                    )}
                  />
                </span>
              </div>
              <div className="d-inline-flex align-items-center manage-practice-groups-wrap">
                <span className="mb-0 h4 text-black fw-600 manage-practice-groups-title-wrap">
                  {data?.practice_key_points[6].alt}
                </span>
                <span className="link-group-icons link-group-icons-bg-blue">
                  <Image
                    src={urlFor(
                      data?.practice_key_points[6]?.practice_image?.asset?._ref
                    )}
                  />
                </span>
              </div>
              <div className="d-inline-flex align-items-center manage-practice-groups-wrap">
                <span className="mb-0 h4 text-black fw-600 manage-practice-groups-title-wrap">
                  {data?.practice_key_points[7].alt}
                </span>
                <span className="link-group-icons link-group-icons-bg-green">
                  <Image
                    src={urlFor(
                      data?.practice_key_points[7]?.practice_image?.asset?._ref
                    )}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="payment-solutions position-relative">
        <div className="container">
          <div className="payment-solutions-wrap position-relative">
            <h2 className="fw-700 text-white">
              {data?.payment_solutions_title}
            </h2>
            <Row className="">
              <Col lg={6} className="order-2 order-lg-1">
                <div className="payment-solutions-content-wrap">
                  <div className="key-advantages-items d-flex align-items-center">
                    <Image
                      src={Checkmark}
                      alt="Checkmark"
                      className="flex-shrink-0 me-3"
                    />
                    <span className="h5 mb-0 text-white fw-600">
                      {data?.payment_solutions_key_points[0]}
                    </span>
                  </div>
                  <div className="key-advantages-items d-flex align-items-center">
                    <Image
                      src={Checkmark}
                      alt="Checkmark"
                      className="flex-shrink-0 me-3"
                    />
                    <span className="h5 mb-0 text-white fw-600">
                      {data?.payment_solutions_key_points[1]}
                    </span>
                  </div>
                  <div className="key-advantages-items d-flex align-items-center">
                    <Image
                      src={Checkmark}
                      alt="Checkmark"
                      className="flex-shrink-0 me-3"
                    />
                    <span className="h5 mb-0 text-white fw-600">
                      {data?.payment_solutions_key_points[2]}
                    </span>
                  </div>
                  <div className="key-advantages-items d-flex align-items-center">
                    <Image
                      src={Checkmark}
                      alt="Checkmark"
                      className="flex-shrink-0 me-3"
                    />
                    <span className="h5 mb-0 text-white fw-600">
                      {data?.payment_solutions_key_points[3]}
                    </span>
                  </div>
                  <div className="key-advantages-items d-flex align-items-center">
                    <Image
                      src={Checkmark}
                      alt="Checkmark"
                      className="flex-shrink-0 me-3"
                    />
                    <span className="h5 mb-0 text-white fw-600">
                      {data?.payment_solutions_key_points[4]}
                    </span>
                  </div>
                </div>
                <div className="btn-wrap">
                  <CustomButton link="/" variant={"dark"}>
                    Book a Demo
                  </CustomButton>
                  <CustomButton link="/" variant={"bordered"}>
                    Request Quote
                  </CustomButton>
                </div>
              </Col>
              <Col lg={6} className="order-1 order-lg-2">
                <Image
                  src={PaymentSolutions}
                  className="payment-solutions-img img-fluid"
                />
              </Col>
            </Row>
            {/* <Image
              src={urlFor(data?.payment_solutions_image?.asset?._ref)}
              className="payment-solutions-bg"
            /> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
