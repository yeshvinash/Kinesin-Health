import React, { useEffect, useState } from "react";
import "./Solutions.css";
import PlusIcon from "../../assets/images/icons/plus.png";
import HealthProfessional from "../../assets/images/cover/health-professionals.png";
import MentalHealth from "../../assets/images/cover/mental-health.png";
import GeneralPractice from "../../assets/images/cover/general-practice.png";
import Consultant from "../../assets/images/cover/consulant.png";
import Dentist from "../../assets/images/cover/dentist.png";
import { Col, Image, Row } from "react-bootstrap";
import { CustomButton } from "../../Components/CustomButton/CustomButton";
import { client, urlFor } from "../../Sanity";

export const Solutions = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    client
      .fetch('*[_id == "solution"]{...}')
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
          <div className="d-flex align-items-center flex-wrap flex-lg-nowrap">
            <div className="feature-hero-wrap">
              <h1 className="h1 fw-700">{data.solution[0]?.solution_name}</h1>
              <div className="feature-hero-list-wrap">
                <ul className="list-item-wrap mb-5 pb-2">
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[0]?.solution_key_points[0]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[0]?.solution_key_points[1]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[0]?.solution_key_points[2]}
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
                      {data.solution[0]?.solution_key_points[3]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[0]?.solution_key_points[4]}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="btn-wrap">
                <CustomButton link="/" variant={"dark"}>
                  Book a Demo
                </CustomButton>
                <CustomButton link="/" variant={"bordered"}>
                  Request Quote
                </CustomButton>
              </div>
            </div>

            {/* <Col lg={5}> */}
            <div className="flex-shrink-0 feature-hero-img-wrap solutions-hero-img-wrap">
              <Image
                src={urlFor(data?.solution[0]?.solution_image?.asset?._ref)}
              />
            </div>
            {/* </Col> */}
          </div>
        </div>
      </section>

      <section className="mental-health">
        <div className="container">
          <Row className="align-items-center">
            <Col lg={6} className="solutions-img-wrap">
              <Image
                src={urlFor(data?.solution[1]?.solution_image?.asset?._ref)}
                className="mental-health-img"
              />
            </Col>
            <Col lg={6}>
              <div className="solutions-left-spacing title-wrap">
                <ul className="list-item-wrap mb-5 pb-2">
                  <span className="h1 fw-700 d-inline-block">
                    {data.solution[1]?.solution_name}
                  </span>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[1]?.solution_key_points[0]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[1]?.solution_key_points[1]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[1]?.solution_key_points[2]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[1]?.solution_key_points[3]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[1]?.solution_key_points[4]}
                    </span>
                  </li>
                </ul>
                <div className="btn-wrap">
                  <CustomButton link="/" variant={"dark"}>
                    Book a Demo
                  </CustomButton>
                  <CustomButton link="/" variant={"bordered"}>
                    Request Quote
                  </CustomButton>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <section className="">
        <div className="container">
          <Row className="align-items-center">
            <Col lg={5} className="order-2 order-lg-1">
              <div className="solutions-right-spacing title-wrap">
                <span className="h1 fw-700 d-inline-block">
                  {data.solution[2]?.solution_name}
                </span>
                <ul className="list-item-wrap mb-5 pb-2">
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[2]?.solution_key_points[0]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[2]?.solution_key_points[1]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[2]?.solution_key_points[2]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[2]?.solution_key_points[3]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[2]?.solution_key_points[4]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[2]?.solution_key_points[5]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[2]?.solution_key_points[6]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[2]?.solution_key_points[7]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[2]?.solution_key_points[8]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[2]?.solution_key_points[9]}
                    </span>
                  </li>
                </ul>
                <div className="btn-wrap">
                  <CustomButton link="/" variant={"dark"}>
                    Book Demo
                  </CustomButton>
                  <CustomButton link="/" variant={"bordered"}>
                    Request Quote
                  </CustomButton>
                </div>
              </div>
            </Col>
            <Col lg={6} className="order-1 order-lg-2 solutions-img-wrap">
              <Image
                src={urlFor(data?.solution[2]?.solution_image?.asset?._ref)}
                className="general-practice-img"
              />
            </Col>
          </Row>
        </div>
      </section>

      <section className="mental-health">
        <div className="container">
          <Row className="align-items-center">
            <Col lg={6} className="solutions-img-wrap">
              <Image
                src={urlFor(data?.solution[3]?.solution_image?.asset?._ref)}
                className="consultant-img"
              />
            </Col>
            <Col lg={6}>
              <div className="solutions-left-spacing title-wrap">
                <span className="h1 fw-700 d-inline-block">
                  {" "}
                  {data.solution[3]?.solution_name}
                </span>
                <ul className="list-item-wrap mb-5 pb-2">
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[3]?.solution_key_points[0]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[3]?.solution_key_points[1]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[3]?.solution_key_points[2]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[3]?.solution_key_points[3]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[3]?.solution_key_points[4]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[3]?.solution_key_points[5]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[3]?.solution_key_points[6]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[3]?.solution_key_points[7]}
                    </span>
                  </li>
                </ul>
                <div className="btn-wrap">
                  <CustomButton link="/" variant={"dark"}>
                    Book a Demo
                  </CustomButton>
                  <CustomButton link="/" variant={"bordered"}>
                    Request Quote
                  </CustomButton>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <section className="dentist-wrap">
        <div className="container">
          <Row className="align-items-center">
            <Col lg={5} className="order-2 order-lg-1">
              <div className="solutions-right-spacing title-wrap">
                <span className="h1 fw-700 d-inline-block">
                  {data.solution[4]?.solution_name}
                </span>
                <ul className="list-item-wrap mb-5 pb-2">
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[4]?.solution_key_points[0]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[4]?.solution_key_points[1]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[4]?.solution_key_points[2]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[4]?.solution_key_points[3]}
                    </span>
                  </li>
                  <li>
                    <Image
                      src={PlusIcon}
                      alt="plus"
                      className="flex-shrink-0"
                    />
                    <span className="h5 text-black fw-600 mb-0">
                      {data.solution[4]?.solution_key_points[4]}
                    </span>
                  </li>
                </ul>
                <div className="btn-wrap">
                  <CustomButton link="/" variant={"dark"}>
                    Book Demo
                  </CustomButton>
                  <CustomButton link="/" variant={"bordered"}>
                    Request Quote
                  </CustomButton>
                </div>
              </div>
            </Col>
            <Col lg={6} className="order-1 order-lg-2 solutions-img-wrap">
              <Image
                src={urlFor(data?.solution[4]?.solution_image?.asset?._ref)}
                className="dentist-img"
              />
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};
