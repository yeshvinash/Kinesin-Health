import React, { useEffect, useState } from "react";
import "./WhyKinesin.css";
import { Col, Image, Row } from "react-bootstrap";
import { CustomButton } from "../../Components/CustomButton/CustomButton";
import OurStory from "../../assets/images/cover/our-story.png";
import AimKinesin from "../../assets/images/cover/aim-kinesin-logo.png";
import ArrowCurve from "../../assets/images/cover/arrow-curve.png";
import WhoWeAre from "../../assets/images/cover/who-we-are.png";
import { client, urlFor } from "../../Sanity";
import StepsLine from "../../assets/images/cover/steps-line.png";
import StepsLineSmall from "../../assets/images/cover/steps-line-small.png";
import OurMission from "../../assets/images/cover/circle-img.png";
import Interactions from "../../assets/images/cover/interactions.png";
import CustomerReviewsImg from "../../assets/images/cover/customer-review-card1.png";
import CustomerReviewsImg1 from "../../assets/images/cover/customer-review-card2.png";
import CustomerReviewsImg2 from "../../assets/images/cover/customer-review-card3.png";

export const WhyKinesin = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    client
      .fetch('*[_id == "kinesin"]{...}')
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
      <section className="feature-hero our-story-hero">
        <div className="container">
          <div className="d-flex align-items-center flex-wrap flex-lg-nowrap">
            <div className="feature-hero-wrap">
              <h1 className="h1 fw-700">{data.hero_title}</h1>
              <p className="h5 mb-5">{data.hero_subtitle}</p>

              <div className="btn-wrap">
                <CustomButton link="/" variant={"dark"}>
                  Book Demo
                </CustomButton>
              </div>
            </div>

            {/* <Col lg={5}> */}
            <div className="feature-hero-img-wrap">
              <Image src={urlFor(data?.hero_image?.asset?._ref)} />
            </div>
            {/* </Col> */}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="why-kinesin-about">
            <p className="h2 small fw-600">
              <span className="text-green fw-600">{data.green_text}</span>
              {data.bold_text}
            </p>
            <p className="h6">{data.normal_text}</p>

            {/* <p className="h6">
              They searched for good alternatives and found none. The only
              systems available used old technology that was years behind the
              innovation in other sectors. Together with their developer genius
              friend Noel, they decided to build a better practice management
              system for all healthcare disciplines. Kinesin - designed and
              developed by healthcare professionals for healthcare
              professionals.
            </p> */}
          </div>
        </div>
      </section>

      <section className="aim-kinsin position-relative">
        <div className="container">
          <div className="d-flex align-items-center aim-kinsin-wrap position-relative">
            <div className="d-block d-lg-none aim-kinsin-logo-wrap">
              <Image src={AimKinesin} className="aim-kinesin-img-wrap" />
            </div>
            <div>
              <Image src={ArrowCurve} className="arrow-curve-img-wrap" />
            </div>
            <div className="">
              <p className="h2 small fw-700 mb-0">{data.aim_text}</p>
            </div>
          </div>
        </div>
        <Image src={AimKinesin} className="aim-kinesin-img-wrap" />
      </section>

      <section className="who-we-are">
        <div className="container">
          <div className="d-flex flex-wrap flex-lg-nowrap">
            <div className="who-we-are-img-wrap">
              <Image src={urlFor(data?.who_are_we_image?.asset?._ref)} />
            </div>
            <div className="who-we-are-content-wrap">
              <span className="h1 fw-700 mb-5 d-inline-block">
                {data.who_are_we}
              </span>
              <p className="h6  fw-400 mb-5">{data.who_are_we_description}</p>
              <div className="btn-wrap">
                <CustomButton link="/" variant={"dark"}>
                  Book Demo
                </CustomButton>
                <CustomButton link="/" variant={"bordered"}>
                  Request Quote
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="our-mission">
        <div className="container">
          <h2 className="h2 fw-700 text-center">{data?.our_mission_title}</h2>
          <div className="position-relative our-mission-wrap">
            <Image
              src={OurMission}
              alt="our-mission"
              className="circle-img img-fluid"
            />
            <div className="mission-steps mission-steps-1">
              <div class="mission-steps-inner position-relative">
                <div className="flex-center mission-steps-circle position-relative">
                  <Image
                    src={urlFor(
                      data?.our_mission_key_points[0]?.key_point_image?.asset
                        ?._ref
                    )}
                    alt="mission-icon"
                    className="our-mision-icon"
                  />
                  <Image
                    src={StepsLine}
                    alt="mission-icon"
                    className="steps-line"
                  />
                </div>
                <div className="mission-steps-inner-content">
                  <h5 className="fw-600 h6 mb-0 text-mine-shaft">
                    {data?.our_mission_key_points[0]?.key_point_title}
                  </h5>
                </div>
              </div>
            </div>
            <div className="mission-steps mission-steps-2">
              <div class="mission-steps-inner position-relative">
                <div className="flex-center mission-steps-circle position-relative">
                  <Image
                    src={urlFor(
                      data?.our_mission_key_points[1]?.key_point_image?.asset
                        ?._ref
                    )}
                    alt="mission-icon"
                    className="our-mision-icon"
                  />
                  <Image
                    src={StepsLine}
                    alt="mission-icon"
                    className="steps-line"
                  />
                </div>
                <div className="mission-steps-inner-content">
                  <h5 className="fw-600 h6 mb-0 text-mine-shaft">
                    {data?.our_mission_key_points[1]?.key_point_title}
                  </h5>
                </div>
              </div>
            </div>
            <div className="mission-steps mission-steps-3">
              <div class="mission-steps-inner position-relative">
                <div className="flex-center mission-steps-circle position-relative">
                  <Image
                    src={urlFor(
                      data?.our_mission_key_points[2]?.key_point_image?.asset
                        ?._ref
                    )}
                    alt="mission-icon"
                    className="our-mision-icon"
                  />
                  <Image
                    src={StepsLineSmall}
                    alt="mission-icon"
                    className="steps-line"
                  />
                </div>
                <div className="mission-steps-inner-content">
                  <h5 className="fw-600 h6 mb-0 text-mine-shaft">
                    {data?.our_mission_key_points[2]?.key_point_title}
                  </h5>
                </div>
              </div>
            </div>
            <div className="mission-steps mission-steps-4">
              <div class="mission-steps-inner position-relative">
                <div className="flex-center mission-steps-circle position-relative">
                  <Image
                    src={urlFor(
                      data?.our_mission_key_points[3]?.key_point_image?.asset
                        ?._ref
                    )}
                    alt="mission-icon"
                    className="our-mision-icon"
                  />
                  <Image
                    src={StepsLine}
                    alt="mission-icon"
                    className="steps-line"
                  />
                </div>
                <div className="mission-steps-inner-content">
                  <h5 className="fw-600 h6 mb-0 text-mine-shaft">
                    {data?.our_mission_key_points[3]?.key_point_title}
                  </h5>
                </div>
              </div>
            </div>
            <div className="mission-steps mission-steps-5">
              <div class="mission-steps-inner position-relative">
                <div className="flex-center mission-steps-circle position-relative">
                  <Image
                    src={urlFor(
                      data?.our_mission_key_points[4]?.key_point_image?.asset
                        ?._ref
                    )}
                    alt="mission-icon"
                    className="our-mision-icon"
                  />
                  <Image
                    src={StepsLine}
                    alt="mission-icon"
                    className="steps-line"
                  />
                </div>
                <div className="mission-steps-inner-content">
                  <h5 className="fw-600 h6 mb-0 text-mine-shaft">
                    {data?.our_mission_key_points[4]?.key_point_title}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="interactions position-relative customer-reviews-cards-wrap">
        <section className="interactions-card-wrapper">
          <div className="container">
            <div className="interactions-wrap">
              <Image
                src={Interactions}
                alt="interactions"
                className="d-block img-fluid interactions-img"
              />
              <h2 className="h2 text-white fw-700 text-center">
                {data.customer_reviews_title}
              </h2>
              <div className="customer-reviews-card-container">
                <div className="customer-reviews-card d-flex flex-column">
                  <div className="customer-reviews-card-img">
                    <Image
                      src={urlFor(
                        data?.customer_reviews[0]?.image?.asset?._ref
                      )}
                    />
                  </div>
                  <div className="customer-reviews-card-body">
                    <div className="d-flex align-items-center mb-4 pb-2">
                      <span className="fw-700 small-content">Health</span>
                      <span className="dot-circle"></span>
                      <span className="fw-500 small-content">
                        {" "}
                        {data?.customer_reviews[0]?.date}
                      </span>
                    </div>
                    <h4 className="h4 text-white fw-700 mb-4 pb-2">
                      {data?.customer_reviews[0]?.review}
                    </h4>
                    <p className="text-white fw-400 mb-0">
                      {data?.customer_reviews[0]?.description}
                    </p>
                  </div>
                </div>
                <div className="customer-reviews-card d-flex flex-column">
                  <div className="customer-reviews-card-img">
                    <Image
                      src={urlFor(
                        data?.customer_reviews[1]?.image?.asset?._ref
                      )}
                    />
                  </div>
                  <div className="customer-reviews-card-body">
                    <div className="d-flex align-items-center mb-4 pb-2">
                      <span className="fw-700 small-content">Health</span>
                      <span className="dot-circle"></span>
                      <span className="fw-500 small-content">
                        {" "}
                        {data?.customer_reviews[1]?.date}
                      </span>
                    </div>
                    <h4 className="h4 text-white fw-700 mb-4 pb-2">
                      {data?.customer_reviews[1]?.review}
                    </h4>
                    <p className="text-white fw-400 mb-0">
                      {data?.customer_reviews[1]?.description}
                    </p>
                  </div>
                </div>
                <div className="customer-reviews-card d-flex flex-column">
                  <div className="customer-reviews-card-img">
                    <Image
                      src={urlFor(
                        data?.customer_reviews[2]?.image?.asset?._ref
                      )}
                    />
                  </div>
                  <div className="customer-reviews-card-body">
                    <div className="d-flex align-items-center mb-4 pb-2">
                      <span className="fw-700 small-content">Health</span>
                      <span className="dot-circle"></span>
                      <span className="fw-500 small-content">
                        {" "}
                        {data?.customer_reviews[2]?.date}
                      </span>
                    </div>
                    <h4 className="h4 text-white fw-700 mb-4 pb-2">
                      {data?.customer_reviews[2]?.review}
                    </h4>
                    <p className="text-white fw-400 mb-0">
                      {data?.customer_reviews[2]?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <Image
          src={PatientInteractions}
          alt="interactions"
          className="img-fluid patient-interactions"
        /> */}
        </section>
      </section>
    </>
  );
};
