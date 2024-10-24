import React, { useEffect, useState } from "react";
import "./Pricing.css";
import { Image } from "react-bootstrap";
import PlusIcon from "../../assets/images/icons/plus.png";
import Check from "../../assets/images/icons/check.png";
import { CustomButton } from "../../Components/CustomButton/CustomButton";
import PriceCardImg1 from "../../assets/images/icons/price-card-img1.png";
import { client, urlFor } from "../../Sanity";

export const Pricing = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    client
      .fetch('*[_id == "pricing"]{...}')
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
      <section className="pricing position-relative">
        <section className="pricing-hero position-relative">
          <div className="container">
            <div className="pricing-hero-content-wrap text-center">
              <h3 className="h3 text-green fw-600 mb-3 pb-1">
                {data.hero_subtitle}
              </h3>
              <h1 className="h1 fw-700">{data.hero_title}</h1>
              <ul className="list-item-wrap mb-5 d-flex align-items-center justify-content-center flex-wrap">
                <li>
                  <Image src={PlusIcon} alt="plus" className="flex-shrink-0" />
                  <span className="h5 text-black fw-600 mb-0">
                    {data.hero_key_points[0]}
                  </span>
                </li>
                <li>
                  <Image src={PlusIcon} alt="plus" className="flex-shrink-0" />
                  <span className="h5 text-black fw-600 mb-0">
                    {data.hero_key_points[1]}
                  </span>
                </li>
                <li>
                  <Image src={PlusIcon} alt="plus" className="flex-shrink-0" />
                  <span className="h5 text-black fw-600 mb-0">
                    {data.hero_key_points[2]}
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
            <div className="pricing-cards-container d-flex flex-wrap align-items-center justify-content-center">
              <a
                href="javascript:void(0)"
                className="pricing-cards yellow-card d-flex flex-column"
              >
                <div className="pricing-cards-header position-relative pricing-card-gradient">
                  <Image
                    src={urlFor(data?.plans[0]?.plan_image?.asset?._ref)}
                  />
                  <h2 className="h2 fw-600 mb-0 mt-4 pt-2">
                    {data.plans[0]?.plan_name}
                  </h2>
                </div>
                <div className="pricing-cards-footer d-flex flex-column justify-content-between">
                  <ul className="list-item-wrap mb-0">
                    <li>
                      <Image src={Check} alt="plus" className="flex-shrink-0" />
                      <span className="h6 text-black fw-600 mb-0">
                        {data.plans[0]?.plan_key_points[0]}
                      </span>
                    </li>
                    <li>
                      <Image src={Check} alt="plus" className="flex-shrink-0" />
                      <span className="h6 text-black fw-600 mb-0">
                        {data.plans[0]?.plan_key_points[1]}
                      </span>
                    </li>
                    <li>
                      <Image src={Check} alt="plus" className="flex-shrink-0" />
                      <span className="h6 text-black fw-600 mb-0">
                        {data.plans[0]?.plan_key_points[2]}
                      </span>
                    </li>
                    <li>
                      <Image src={Check} alt="plus" className="flex-shrink-0" />
                      <span className="h6 text-black fw-600 mb-0">
                        {data.plans[0]?.plan_key_points[3]}
                      </span>
                    </li>
                    <li>
                      <Image src={Check} alt="plus" className="flex-shrink-0" />
                      <span className="h6 text-black fw-600 mb-0">
                        {data.plans[0]?.plan_key_points[4]}
                      </span>
                    </li>
                  </ul>
                  <div>
                    <CustomButton link="/" variant={"dark"}>
                      Request Quote
                    </CustomButton>
                  </div>
                </div>
              </a>
              <a
                href="javascript:void(0)"
                className="pricing-cards purple-card d-flex flex-column"
              >
                <div className="pricing-cards-header position-relative pricing-card-gradient">
                  <Image
                    src={urlFor(data?.plans[1]?.plan_image?.asset?._ref)}
                  />
                  <h2 className="h2 fw-600 mb-0 mt-4 pt-2">
                    {data.plans[1]?.plan_name}
                  </h2>
                </div>
                <div className="pricing-cards-footer d-flex flex-column justify-content-between">
                  <ul className="list-item-wrap mb-0">
                    <li>
                      <Image src={Check} alt="plus" className="flex-shrink-0" />
                      <span className="h6 text-black fw-600 mb-0">
                        {data.plans[1]?.plan_key_points[0]}
                      </span>
                    </li>
                    <li>
                      <Image src={Check} alt="plus" className="flex-shrink-0" />
                      <span className="h6 text-black fw-600 mb-0">
                        {data.plans[1]?.plan_key_points[1]}
                      </span>
                    </li>
                    <li>
                      <Image src={Check} alt="plus" className="flex-shrink-0" />
                      <span className="h6 text-black fw-600 mb-0">
                        {data.plans[1]?.plan_key_points[2]}
                      </span>
                    </li>
                    <li>
                      <Image src={Check} alt="plus" className="flex-shrink-0" />
                      <span className="h6 text-black fw-600 mb-0">
                        {data.plans[1]?.plan_key_points[3]}
                      </span>
                    </li>
                    <li>
                      <Image src={Check} alt="plus" className="flex-shrink-0" />
                      <span className="h6 text-black fw-600 mb-0">
                        {data.plans[1]?.plan_key_points[4]}
                      </span>
                    </li>
                  </ul>
                  <div>
                    <CustomButton link="/" variant={"dark"}>
                      Request Quote
                    </CustomButton>
                  </div>
                </div>
              </a>
              <a
                href="javascript:void(0)"
                className="pricing-cards green-card d-flex flex-column"
              >
                <div className="pricing-cards-header position-relative pricing-card-gradient">
                  <Image
                    src={urlFor(data?.plans[2]?.plan_image?.asset?._ref)}
                  />
                  <h2 className="h2 fw-600 mb-0 mt-4 pt-2">
                    {" "}
                    {data.plans[2]?.plan_name}
                  </h2>
                </div>
                <div className="pricing-cards-footer d-flex flex-column justify-content-between">
                  <ul className="list-item-wrap mb-0">
                    <li>
                      <Image src={Check} alt="plus" className="flex-shrink-0" />
                      <span className="h6 text-black fw-600 mb-0">
                        {data.plans[2]?.plan_key_points[0]}
                      </span>
                    </li>
                    <li>
                      <Image src={Check} alt="plus" className="flex-shrink-0" />
                      <span className="h6 text-black fw-600 mb-0">
                        {data.plans[2]?.plan_key_points[1]}
                      </span>
                    </li>
                    <li>
                      <Image src={Check} alt="plus" className="flex-shrink-0" />
                      <span className="h6 text-black fw-600 mb-0">
                        {data.plans[2]?.plan_key_points[2]}
                      </span>
                    </li>
                    <li>
                      <Image src={Check} alt="plus" className="flex-shrink-0" />
                      <span className="h6 text-black fw-600 mb-0">
                        {data.plans[2]?.plan_key_points[3]}
                      </span>
                    </li>
                    <li>
                      <Image src={Check} alt="plus" className="flex-shrink-0" />
                      <span className="h6 text-black fw-600 mb-0">
                        {data.plans[2]?.plan_key_points[4]}
                      </span>
                    </li>
                    <li>
                      <Image src={Check} alt="plus" className="flex-shrink-0" />
                      <span className="h6 text-black fw-600 mb-0">
                        Secure & smart client cards
                      </span>
                    </li>
                    <li>
                      <Image src={Check} alt="plus" className="flex-shrink-0" />
                      <span className="h6 text-black fw-600 mb-0">
                        Secure & smart client cards
                      </span>
                    </li>
                  </ul>
                  <div>
                    <CustomButton link="/" variant={"dark"}>
                      Request Quote
                    </CustomButton>
                  </div>
                </div>
              </a>
              <a
                  href="javascript:void(0)"
                  className="pricing-cards pink-card d-flex flex-column"
                >
                  <div className="pricing-cards-header position-relative pricing-card-gradient">
                    <Image
                      src={urlFor(data?.plans[3]?.plan_image?.asset?._ref)}
                    />
                    <h2 className="h2 fw-600 mb-0 mt-4 pt-2">
                      {data.plans[3]?.plan_name}
                    </h2>
                  </div>
                  <div className="pricing-cards-footer d-flex flex-column justify-content-between">
                    <ul className="list-item-wrap mb-0">
                      <li>
                        <Image
                          src={Check}
                          alt="plus"
                          className="flex-shrink-0"
                        />
                        <span className="h6 text-black fw-600 mb-0">
                          {data.plans[3]?.plan_key_points[0]}
                        </span>
                      </li>
                      <li>
                        <Image
                          src={Check}
                          alt="plus"
                          className="flex-shrink-0"
                        />
                        <span className="h6 text-black fw-600 mb-0">
                          {data.plans[3]?.plan_key_points[1]}
                        </span>
                      </li>
                      <li>
                        <Image
                          src={Check}
                          alt="plus"
                          className="flex-shrink-0"
                        />
                        <span className="h6 text-black fw-600 mb-0">
                          {data.plans[3]?.plan_key_points[2]}
                        </span>
                      </li>
                      <li>
                        <Image
                          src={Check}
                          alt="plus"
                          className="flex-shrink-0"
                        />
                        <span className="h6 text-black fw-600 mb-0">
                          {data.plans[3]?.plan_key_points[3]}
                        </span>
                      </li>
                      <li>
                        <Image
                          src={Check}
                          alt="plus"
                          className="flex-shrink-0"
                        />
                        <span className="h6 text-black fw-600 mb-0">
                          {data.plans[3]?.plan_key_points[4]}
                        </span>
                      </li>
                    </ul>
                    <div>
                      <CustomButton link="/" variant={"dark"}>
                        Request Quote
                      </CustomButton>
                    </div>
                  </div>
                </a>
                <a
                  href="javascript:void(0)"
                  className="pricing-cards blue-card d-flex flex-column"
                >
                  <div className="pricing-cards-header position-relative pricing-card-gradient">
                    <Image
                      src={urlFor(data?.plans[4]?.plan_image?.asset?._ref)}
                    />
                    <h2 className="h2 fw-600 mb-0 mt-4 pt-2">
                      {" "}
                      {data.plans[4]?.plan_name}
                    </h2>
                  </div>
                  <div className="pricing-cards-footer d-flex flex-column justify-content-between">
                    <ul className="list-item-wrap mb-0">
                      <li>
                        <Image
                          src={Check}
                          alt="plus"
                          className="flex-shrink-0"
                        />
                        <span className="h6 text-black fw-600 mb-0">
                          {data.plans[4]?.plan_key_points[0]}
                        </span>
                      </li>
                      <li>
                        <Image
                          src={Check}
                          alt="plus"
                          className="flex-shrink-0"
                        />
                        <span className="h6 text-black fw-600 mb-0">
                        {data.plans[4]?.plan_key_points[1]}
                        </span>
                      </li>
                      <li>
                        <Image
                          src={Check}
                          alt="plus"
                          className="flex-shrink-0"
                        />
                        <span className="h6 text-black fw-600 mb-0">
                        {data.plans[4]?.plan_key_points[2]}
                        </span>
                      </li>
                      <li>
                        <Image
                          src={Check}
                          alt="plus"
                          className="flex-shrink-0"
                        />
                        <span className="h6 text-black fw-600 mb-0">
                        {data.plans[4]?.plan_key_points[3]}
                        </span>
                      </li>
                      <li>
                        <Image
                          src={Check}
                          alt="plus"
                          className="flex-shrink-0"
                        />
                        <span className="h6 text-black fw-600 mb-0">
                        {data.plans[4]?.plan_key_points[4]}
                        </span>
                      </li>
                    </ul>
                    <div>
                      <CustomButton link="/" variant={"dark"}>
                        Request Quote
                      </CustomButton>
                    </div>
                  </div>
                </a>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};
