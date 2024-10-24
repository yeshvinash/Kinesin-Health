import React from "react";
import banner from "../../../assets/images/home_banner.png";
import location from "../../../assets/images/location.svg";
import bannerElipse from "../../../assets/images/banner_elipse.svg";
import bannerRibbonOne from "../../../assets/images/banner_ribbonone.svg";
import bannerRibbonTwo from "../../../assets/images/banner_ribbontwo.svg";
import aboutdoc from "../../../assets/images/about_doctor.png";
import whitening from "../../../assets/images/about_whitening.svg";
import brace from "../../../assets/images/braces.svg";
import checkup from "../../../assets/images/checkup.svg";
import shape from "../../../assets/images/about_shape.svg";
import checkMark from "../../../assets/images/checkmark.svg";
import altImage from "../../../assets/images/altImage.svg";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const teamData = Array.from({ length: 3 });
  const descDetails = ["Whitening", "Braces", "Cleaning", "Checkups"];
  const navigate = useNavigate();

  const details = descDetails.map((item, index) => (
    <div>
      <img src={checkMark} alt="" />
      <span key={index} className="description_details">
        {item}
      </span>
    </div>
  ));

  return (
    <>
      <section className="home_banner">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="home_banner_txt">
                <h1>Rathgar Dental</h1>
                <p>
                  We provide a management system to healthcare professions
                  including doctors, dentists and physios.
                </p>
                <address>
                  <img src={location} alt="" /> 22-26 Sandford Rd, Ranelagh,
                  Dublin 6, D06 KF84
                </address>
                <button className="custom_btn addform_btn" type="submit">
                  Book Now
                </button>
                <button
                    className="custom_btn addform_btn" style= {{ "background": "white", "color": "#05C882", "margin-left": "10px"}}
                    onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <div className="ribons">
                  <img src={bannerElipse} alt="" />
                  <img src={bannerRibbonTwo} alt="" />
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="home_banner_img">
                <img src={banner} alt="" />
                <div className="ribons">
                  <img src={bannerRibbonOne} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="team">
        <div className="container">
          <div className="team_heading">
            <h3>team</h3>
            <h2>Meet The Team</h2>
          </div>

          <div className="team_card">
            {teamData.map((_, index) => (
              <div key={index} className="team_card_outer">
                <div className="team_card_top">
                  <img src={altImage} alt="" />
                  <div className="team_card_tag team_card_tag_1">
                    Doctor Name
                  </div>
                  <div className="team_card_tag team_card_tag_2">Nurse</div>
                </div>
                <div className="team_card_bottom">
                  <p>
                    We provide a management system for healthcare professions
                    including doctors, dentists, and physios.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about_us">
        <div className="container">
          <div className="row">
            <div className="col-md-6 order-2 order-md-2">
              <div className="about_us_img">
                <img src={aboutdoc} alt="" />
                <div className="about_us_img_shape">
                  <img src={shape} alt="" />
                </div>
                <div className="flotingbox flotingbox1">
                  <div className="iconbox">
                    <img src={whitening} alt="" />
                  </div>
                  <h6>Whitening</h6>
                </div>

                <div className="flotingbox flotingbox2">
                  <div className="iconbox">
                    <img src={checkup} alt="" />
                  </div>
                  <h6>Checkups</h6>
                </div>

                <div className="flotingbox flotingbox3">
                  <div className="iconbox">
                    <img src={brace} alt="" />
                  </div>
                  <h6>Braces</h6>
                </div>
              </div>
            </div>

            <div className="col-md-6 order-1 order-md-2">
              <div className="about_us_txt">
                <h3>about us</h3>
                <h2>About Rathgar Dentist</h2>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal
                </p>
                <div className="description_summary">{details}</div>
                <button className="custom_btn addform_btn" type="submit">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact_us">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="contact_us_txt">
                <h3>Contact US</h3>
                <h2>Get In Touch With Us</h2>
                <ul className="contact_dtls_list">
                  <li>
                    <div className="icon">
                      <i className="fa-solid fa-phone-volume"></i>
                    </div>
                    <div>
                      <h5>Phone Number</h5>
                      <a href={(e)=>e.preventDefault() }>0800-123456 (24/7 Support Line)</a>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <div>
                      <h5>Mailing Address</h5>
                      <p>121 King Street, Melbourne Victoria 3000 Australia</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <i className="fa-solid fa-envelope"></i>
                    </div>
                    <div>
                      <h5>Email Info</h5>
                      <a href={(e)=>e.preventDefault() }>info@brandcoin.com</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="contact_us_txt_map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2383.131985997776!2d-6.251232087535078!3d53.32299007216694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670eb02223d179%3A0xccf2d7ffe7d1e0a7!2s22-26%20Sandford%20Rd%2C%20Ranelagh%2C%20Dublin%206%2C%20D06%20A365%2C%20Ireland!5e0!3m2!1sen!2sin!4v1685096703241!5m2!1sen!2sin"
                  allowfullscreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
