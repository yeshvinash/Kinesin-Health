import React, { useEffect, useState } from "react";
import "./Home.css";
import { CustomButton } from "../../Components/CustomButton/CustomButton";
import PlusIcon from "../../assets/images/icons/plus.png";
import Image from "react-bootstrap/Image";
import Hero from "../../assets/images/cover/hero.png";
import HeroBg from "../../assets/images/cover/hero-bg.png";
import Physiotherapist from "../../assets/images/icons/physiotherapist.png";
import Podiatrist from "../../assets/images/icons/podiatrist.png";
import Therapist from "../../assets/images/icons/therapist.png";
import Dietician from "../../assets/images/icons/dietician.png";
import AdvancedPractice from "../../assets/images/cover/practice-management.png";
import KeyAdvantages from "../../assets/images/cover/key-advantages.png";
import Checkmark from "../../assets/images/icons/checkmark.png";
import Interactions from "../../assets/images/cover/interactions.png";
import PatientInteractions from "../../assets/images/cover/patient-interactions.png";
import CustomerReview from "../../assets/images/cover/customer-review-new.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import OurMission from "../../assets/images/cover/circle-img.png";
import { CustomerReviewData } from "../../Components/Data/Data";
import { SVGIcons } from "../../Components/Data/SVGIcons";
import MissionImg1 from "../../assets/images/icons/mission5.png";
import MissionImg2 from "../../assets/images/icons/mission1.png";
import MissionImg3 from "../../assets/images/icons/mission4.png";
import MissionImg4 from "../../assets/images/icons/mission3.png";
import MissionImg5 from "../../assets/images/icons/mission2.png";
import StepsLine from "../../assets/images/cover/steps-line.png";
import StepsLineSmall from "../../assets/images/cover/steps-line-small.png";
import CardStarImg from "../../assets/images/icons/stars-fill.svg";
import StarImg from "../../assets/images/icons/star-fill.png";
import { client, urlFor } from "../../Sanity";
import StarRatingComponent from "react-star-rating-component";

export const Home = () => {
  const [rating, setRating] = useState();
  const [data, setData] = useState(null);
  useEffect(() => {
    client
      .fetch('*[_id == "homepage"]{...}')
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
      <section className="hero position-relative header-spacing">
        <div className="container">
          <div className="d-flex position-relative flex-wrap flex-lg-nowrap hero-layout">
            <div className="hero-wrap">
              <h1 className="h1 fw-700 mb-5">{data?.hero_title}</h1>
              <ul className="list-item-wrap mb-5 pb-2">
                <li>
                  <Image src={PlusIcon} alt="plus" className="flex-shrink-0" />
                  <span className="h5 text-black fw-700 mb-0">
                    {data?.hero_key_points[0]}
                  </span>
                </li>
                <li>
                  <Image src={PlusIcon} alt="plus" className="flex-shrink-0" />
                  <span className="h5 text-black fw-700 mb-0">
                    {data?.hero_key_points[1]}
                  </span>
                </li>
                <li>
                  <Image src={PlusIcon} alt="plus" className="flex-shrink-0" />
                  <span className="h5 text-black fw-700 mb-0">
                    {data?.hero_key_points[2]}
                  </span>
                </li>
              </ul>
              <div className="hero-btn-wrap">
                <CustomButton link="/" variant={"dark"}>
                  Book a Demo
                </CustomButton>
                <CustomButton link="/" variant={"bordered"}>
                  Request Quote
                </CustomButton>
              </div>
            </div>
            <Image
              src={urlFor(data?.hero_image?.asset?._ref)}
              alt="hero"
              className="hero-img img-fluid"
            />
          </div>
        </div>
        <Image src={HeroBg} alt="hero" className="hero-bg-img img-fluid" />
      </section>

      <section className="quick-demo">
        <div className="container">
          <div className="quick-demo-wrap">
            <h2 className="h2 text-center fw-700">{data?.quick_demo_title}</h2>
            <div className="d-flex justify-content-between flex-wrap">
              <a
                href="javascript:void(0)"
                className="quick-links-wrap d-inline-flex flex-column align-items-center"
              >
                <span className="link-group-icons link-group-icons-bg-gold">
                  <Image
                    src={urlFor(data?.quick_demo[0]?.demo_image?.asset?._ref)}
                  />
                </span>
                <span className="mb-0 h5 text-black fw-700 text-break">
                  {data?.quick_demo[0]?.alt}
                </span>
              </a>
              <a
                href="javascript:void(0)"
                className="quick-links-wrap d-inline-flex flex-column align-items-center"
              >
                <span className="link-group-icons link-group-icons-bg-pink">
                  <Image
                    src={urlFor(data?.quick_demo[1]?.demo_image?.asset?._ref)}
                  />
                </span>
                <span className="mb-0 h5 text-black fw-700 text-break">
                  {data?.quick_demo[1]?.alt}
                </span>
              </a>
              <a
                href="javascript:void(0)"
                className="quick-links-wrap d-inline-flex flex-column align-items-center"
              >
                <span className="link-group-icons link-group-icons-bg-purple">
                  <Image
                    src={urlFor(data?.quick_demo[2]?.demo_image?.asset?._ref)}
                  />
                </span>
                <span className="mb-0 h5 text-black fw-700 text-break">
                  {data?.quick_demo[2]?.alt}
                </span>
              </a>
              <a
                href="javascript:void(0)"
                className="quick-links-wrap d-inline-flex flex-column align-items-center"
              >
                <span className="link-group-icons link-group-icons-bg-blue">
                  <Image
                    src={urlFor(data?.quick_demo[3]?.demo_image?.asset?._ref)}
                  />
                </span>
                <span className="mb-0 h5 text-black fw-700 text-break">
                  {data?.quick_demo[3]?.alt}
                </span>
              </a>
              <a
                href="javascript:void(0)"
                className="quick-links-wrap d-inline-flex flex-column align-items-center"
              >
                <span className="link-group-icons link-group-icons-bg-green">
                  <Image
                    src={urlFor(data?.quick_demo[4]?.demo_image?.asset?._ref)}
                  />
                </span>
                <span className="mb-0 h5 text-black fw-700 text-break">
                  {data?.quick_demo[4]?.alt}
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg">
        <section className="advanced-practice">
          <div className="container">
            <h2 className="h2 text-center fw-700">
              {data?.advance_practice_management_software_title}
            </h2>
            <div className="d-flex align-items-center flex-wrap flex-lg-nowrap">
              <div className="advanced-practice-img">
                <div>
                  <Image
                    src={urlFor(
                      data?.advance_practice_management_software_image?.asset
                        ?._ref
                    )}
                    alt="Advanced Practice"
                    className=""
                  />
                  <span className="fw-700 mb-0 h1 small text-white advanced-practice-title-text">
                    Improve Patient Care
                  </span>
                </div>
              </div>
              <div className="advanced-practice-wrap">
                <div className="d-inline-flex align-items-center advanced-practice-groups-wrap">
                  <span className="link-group-icons link-group-icons-bg-gold">
                    <Image
                      src={urlFor(
                        data?.advance_practice_management_software_key_points[0]
                          ?.key_point_image?.asset?._ref
                      )}
                    />
                  </span>
                  <span className="mb-0 h4 text-black fw-700">
                    {
                      data?.advance_practice_management_software_key_points[0]
                        ?.key_point_title
                    }
                  </span>
                </div>
                <div className="d-inline-flex align-items-center advanced-practice-groups-wrap">
                  <span className="link-group-icons link-group-icons-bg-pink">
                    <Image
                      src={urlFor(
                        data?.advance_practice_management_software_key_points[1]
                          ?.key_point_image?.asset?._ref
                      )}
                    />
                  </span>
                  <span className="mb-0 h4 text-black fw-700">
                    {
                      data?.advance_practice_management_software_key_points[1]
                        ?.key_point_title
                    }
                  </span>
                </div>
                <div className="d-inline-flex align-items-center advanced-practice-groups-wrap">
                  <span className="link-group-icons link-group-icons-bg-purple">
                    <Image
                      src={urlFor(
                        data?.advance_practice_management_software_key_points[2]
                          ?.key_point_image?.asset?._ref
                      )}
                    />
                  </span>
                  <span className="mb-0 h4 text-black fw-700">
                    {
                      data?.advance_practice_management_software_key_points[2]
                        ?.key_point_title
                    }
                  </span>
                </div>
                <div className="d-inline-flex align-items-center advanced-practice-groups-wrap">
                  <span className="link-group-icons link-group-icons-bg-blue">
                    <Image
                      src={urlFor(
                        data?.advance_practice_management_software_key_points[3]
                          ?.key_point_image?.asset?._ref
                      )}
                    />
                  </span>
                  <span className="mb-0 h4 text-black fw-700">
                    {
                      data?.advance_practice_management_software_key_points[3]
                        ?.key_point_title
                    }
                  </span>
                </div>
                <div className="d-inline-flex align-items-center advanced-practice-groups-wrap">
                  <span className="link-group-icons link-group-icons-bg-green">
                    <Image
                      src={urlFor(
                        data?.advance_practice_management_software_key_points[4]
                          ?.key_point_image?.asset?._ref
                      )}
                    />
                  </span>
                  <span className="mb-0 h4 text-black fw-700">
                    {
                      data?.advance_practice_management_software_key_points[4]
                        ?.key_point_title
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="key-advantages">
          <div className="container">
            <h2 className="h2 fw-700"> {data?.key_advantages_title}</h2>
            <div className="d-flex flex-wrap flex-lg-nowrap">
              <div className="key-advantages-wrap">
                <div className="key-advantages-items d-flex align-items-center">
                  <Image
                    src={Checkmark}
                    alt="Checkmark"
                    className="flex-shrink-0 me-3"
                  />
                  <span className="h5 mb-0 text-mine-shaft fw-700">
                    {data?.key_advantages_key_points[0]}
                  </span>
                </div>
                <div className="key-advantages-items d-flex align-items-center">
                  <Image
                    src={Checkmark}
                    alt="Checkmark"
                    className="flex-shrink-0 me-3"
                  />
                  <span className="h5 mb-0 text-mine-shaft fw-700">
                    {data?.key_advantages_key_points[1]}
                  </span>
                </div>
                <div className="key-advantages-items d-flex align-items-center">
                  <Image
                    src={Checkmark}
                    alt="Checkmark"
                    className="flex-shrink-0 me-3"
                  />
                  <span className="h5 mb-0 text-mine-shaft fw-700">
                    {data?.key_advantages_key_points[2]}
                  </span>
                </div>
                <div className="key-advantages-items d-flex align-items-center">
                  <Image
                    src={Checkmark}
                    alt="Checkmark"
                    className="flex-shrink-0 me-3"
                  />
                  <span className="h5 mb-0 text-mine-shaft fw-700">
                    {data?.key_advantages_key_points[3]}
                  </span>
                </div>
                <div className="key-advantages-items d-flex align-items-center">
                  <Image
                    src={Checkmark}
                    alt="Checkmark"
                    className="flex-shrink-0 me-3"
                  />
                  <span className="h5 mb-0 text-mine-shaft fw-700">
                    {data?.key_advantages_key_points[4]}
                  </span>
                </div>
                <div className="key-advantages-items d-flex align-items-center">
                  <Image
                    src={Checkmark}
                    alt="Checkmark"
                    className="flex-shrink-0 me-3"
                  />
                  <span className="h5 mb-0 text-mine-shaft fw-700">
                    {data?.key_advantages_key_points[5]}
                  </span>
                </div>
              </div>
              <div className="key-advantages-img-wrap">
                <div>
                  <Image
                    src={urlFor(data?.key_advantages_image?.asset?._ref)}
                    alt="Key Advantages"
                    className=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="customer-review">
          <div className="d-flex align-items-center">
            <div className="customer-review-img">
              <Image
                src={CustomerReview}
                alt="Customer Review"
                className="img-fluid"
              />
            </div>
            <div className="customer-review-slider-wrap">
              <h2 className="h2 fw-700">{data?.customer_reviews_title}</h2>
              <Swiper
                className="customer-review-swipper-slider"
                spaceBetween={40}
                slidesPerView={1}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                grabCursor={true}
                loop={true}
                // autoplay={{ delay: 3000 }}
                slidesPerGroup={1}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  576: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                  },
                  768: {
                    slidesPerView: 1.5,
                    spaceBetween: 20,
                  },
                  1200: {
                    slidesPerView: 1.9,
                    spaceBetween: 20,
                  },
                  1440: {
                    slidesPerView: 1.9,
                    spaceBetween: 40,
                  },
                }}
              >
                {data.customer_reviews.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="customer-review-card">
                      <StarRatingComponent
                        name="rate2"
                        editing={false}
                        renderStarIcon={() => <Image src={StarImg} />}
                        starCount={data?.customer_reviews[0]?.rating}
                        value={5}
                      />
                      <p className="h6">{item.review}</p>
                      <div className="d-flex align-items-center customer-review-profile">
                        <div className="">
                          <Image src={urlFor(item.user_image?.asset?._ref)} />
                        </div>
                        <div>
                          <h6 className="fw-700 mb-1">{item.user_name}</h6>
                          <span className="d-inline-block customer-review-subtitle fw-400 p small">
                            {item.user_sub_title}
                          </span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>
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
                    className="our-mision-icon"
                    alt="mission-icon"
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

      <section className="interactions position-relative">
        <div className="container">
          <div className="interactions-wrap text-center interactions-wrapper">
            <Image
              src={Interactions}
              alt="interactions"
              className="d-block img-fluid interactions-img"
            />
            <span className="h1 text-white fw-700">
              Ready to see how Kinesin Health Software Can Improve Your
              Practice?
            </span>
            <div className="btn-wrap">
              <CustomButton link="/" variant={"dark"}>
                Book a Demo
              </CustomButton>
              <CustomButton link="/" variant={"bordered"}>
                Request Quote
              </CustomButton>
            </div>
          </div>
        </div>
        {/* <Image
          src={PatientInteractions}
          alt="interactions"
          className="img-fluid patient-interactions"
        /> */}
      </section>
    </>
  );
};
