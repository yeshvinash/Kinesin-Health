import React from "react";
import logo from "../assets/images/footer-logo.png";

const Footer = () => {
  return (
    <>
       <footer className="footer">
        <div className="container">
          <div className="top_footer">
            <div className="row">
              <div className="col-lg-4">
                <a href={(e)=>e.preventDefault() } className="footer_logo">
                  <img src={logo} />
                </a>
                <p>We provide a management system to healthcare and wellness professions.</p>
              </div>
              <div className="col-6 col-lg-2">
                <h5>Quick Links</h5>
                <ul className="footer_list">
                  <li>
                    <a href={(e)=>e.preventDefault() }>Home</a>
                  </li>
                  <li>
                    <a href={(e)=>e.preventDefault() }>About Us</a>
                  </li>
                  <li>
                    <a href={(e)=>e.preventDefault() }>Contact Us</a>
                  </li>
                </ul>
              </div>
              <div className="col-6 col-lg-2">
                <h5>Services</h5>
                <ul className="footer_list">
                  <li>
                    <a href={(e)=>e.preventDefault() }>Doctor</a>
                  </li>
                  <li>
                    <a href={(e)=>e.preventDefault() }>Nurse</a>
                  </li>
                  <li>
                    <a href={(e)=>e.preventDefault() }>Dental</a>
                  </li>
                </ul>
              </div>
              <div className="col-6 col-lg-2">

                <h5>Help</h5>
                <ul className="footer_list">
                  <li>
                    <a href={(e)=>e.preventDefault() }>Online Help</a>
                  </li>
                  <li>
                    <a href={(e)=>e.preventDefault() }>Faq</a>
                  </li>
                  <li>
                    <a href={(e)=>e.preventDefault() }>Forums</a>
                  </li>
                </ul>
              </div>
              <div className="col-6 col-lg-2">
                <div className="social_wrap">
                  <h5>Get Social</h5>
                  <ul className="social_list">
                    <li><a href={(e)=>e.preventDefault() }><i className="fa-brands fa-facebook-f"></i></a></li>
                    <li><a href={(e)=>e.preventDefault() }><i className="fa-brands fa-twitter"></i></a></li>
                    <li><a href={(e)=>e.preventDefault() }><i className="fa-brands fa-youtube"></i></a></li>
                    <li><a href={(e)=>e.preventDefault() }><i className="fa-brands fa-instagram"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom_footer">
            © 2023 Kinesin.<span><a href={(e)=>e.preventDefault() }>Terms of Use</a></span><a href={(e)=>e.preventDefault() }>Privacy</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
