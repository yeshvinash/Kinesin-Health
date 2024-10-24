import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import regImg from "../../../assets/images/image 56.png";
import edit_img from "../../../assets/images/edit_img.svg";
import master from "../../../assets/images/master.png";
import visa from "../../../assets/images/visa.png";
import amex from "../../../assets/images/amex.png";
import cardimg from "../../../assets/images/cardimg.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addProfession,
  removeprofession,
} from "../../../redux/service/ProfessionSlice";

const options = [
  {
    id: 1,
    label: "Dr. Noel Cassidy",
    image: require("../../../assets/images/dr1.png"),
  },
  {
    id: 2,
    label: "Doctor James",
    image: require("../../../assets/images/dr2.png"),
  },
  {
    id: 3,
    label: "Doctor Mary",
    image: require("../../../assets/images/dr3.png"),
  },
  {
    id: 4,
    label: "Dublin Dental",
    image: require("../../../assets/images/dr1.png"),
  },
];
const Payement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Data display operator from previous page//
  const selectedDate = useSelector((state) => state.dateTime.date);
  const selectedTime = useSelector((state) => state.dateTime.time);
  const selectedServices = useSelector(
    (state) => state.service.selectedServices
  );
  const selectedProfessional = useSelector(
    (state) => state.profession.selectedProfessional
  );
  const selectedAddress = useSelector((state) => state.totalAddress.address);
  const selectedCity = useSelector((state) => state.totalAddress.city);
  const selectedZipcode = useSelector((state) => state.totalAddress.zipcode);
  const selectedCountry = useSelector((state) => state.totalAddress.country);
  // Data display operator from previous page//

  // Dropdown section//
  const [isOpen, setIsOpen] = useState(false);
  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };
  const [selectedOption, setSelectedOption] = useState(null);
  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    dispatch(removeprofession());

    dispatch(
      addProfession({
        name: option.label,
        image: option.image,
      })
    );
    setIsOpen(false);
  };
  // Dropdown section//

  // SLider Start//
  const testSettings = {
    dots: false,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    dots: true,
    autoplay: true,
    responsive: [],
  };
  // SLider End//
  return (
    <>
      <section className="signup_section">
        <div className="container">
          <div className="row">
            <div className="col-md-7 ">
              <h2 className="d_name mb38">Rathgar Dental</h2>
              <div className="log_wrap">
                <ul className="editdoct_list">
                  <li>
                    {selectedProfessional.map((profession, i) => (
                      <>
                        <div className="editdoct_img" key={profession.name}>
                          <img src={profession.image} alt="" />
                        </div>
                        <div className="editdetails">
                          <h5>{profession.name}</h5>
                          {selectedServices.map((service, i) => (
                            <h6>{service}</h6>
                          ))}
                        </div>
                      </>
                    ))}
                    <a
                      href="#"
                      className="imgedit dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={edit_img} alt="" onClick={handleButtonClick} />

                      <ul className={`dropdown-menu ${isOpen ? "show" : ""}`}>
                        {options.map((item, i) => (
                          <li key={i}>
                            <a
                              className="dropdown-item"
                              onClick={() => handleOptionClick(item)}
                            >
                              <p>{item.label}</p>
                              <img src={item.image} />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </a>
                  </li>

                  <li>
                    <div className="editdetails">
                      <h4>Your Scheduled date and time</h4>
                      <h3>
                        {selectedDate} {selectedTime}
                      </h3>
                    </div>
                    <a href={(e)=>e.preventDefault() } className="imgedit">
                      <img src={edit_img} alt="" />
                    </a>
                  </li>
                </ul>
                <p className="head_para">Payment method</p>

                <ul className="payementmethodlist">
                  <li>
                    <img src={master} alt="" />
                  </li>
                  <li>
                    <img src={visa} alt="" />
                  </li>
                  <li>
                    <img src={amex} alt="" />
                  </li>
                </ul>

                <div className="cardsilderbox">
                  <div className="use_existing_card">
                    <h6>Use Existing Card</h6>
                    <a href={(e)=>e.preventDefault() } className="imgedit">
                      <img src={edit_img} alt="" />
                    </a>
                  </div>
                  <div className="cardslideitems">
                    <Slider {...testSettings}>
                      <div className="item">
                        <img src={cardimg} alt="" />
                      </div>
                      <div className="item">
                        <img src={cardimg} alt="" />
                      </div>
                      <div className="item">
                        <img src={cardimg} alt="" />
                      </div>
                    </Slider>
                  </div>
                </div>

                <div className="add_new_form">
                  <div className="use_existing_card">
                    <h6>Add New Card</h6>
                  </div>
                  <form>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        name="cardholder"
                        className="form-control"
                        id="floatingInput1"
                        placeholder="Cardholder"
                      />
                      <label for="floatingInput1">Cardholder</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        name="cardnumber"
                        className="form-control"
                        id="floatingInput1"
                        placeholder="Card number"
                      />
                      <label for="floatingInput1">Card number</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        name="expirationdate"
                        className="form-control"
                        id="floatingInput1"
                        placeholder="Expiration date"
                      />
                      <label for="floatingInput1">Expiration date</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        name="cvv"
                        className="form-control"
                        id="floatingInput1"
                        placeholder="CVV"
                      />
                      <label for="floatingInput1">CVV</label>
                    </div>
                  </form>
                </div>

                <div className="btnxscenter">
                  <button className="custom_btn login_btn" type="submit">
                    Save
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="preletiv regImgbox">
                <img src={regImg} className="regImg" alt="" />
              </div>

              <div className="log_wrap mart60">
                <p className="head_para">Your Summary</p>
                <ul className="summarylist">
                  <li>
                    <h5>Service</h5>
                    {selectedServices.map((service, i) => (
                      <h5 key={i}>{service}</h5>
                    ))}
                  </li>
                  <li>
                    <h5>Doctor</h5>
                    {selectedProfessional.map((profession, i) => (
                      <h5 key={i}>{profession.name}</h5>
                    ))}
                  </li>
                  <li>
                    <h5>Price</h5>
                    <h5>56 Euro</h5>
                  </li>
                  <li>
                    <h5>Date and time</h5>
                    <h5>
                      {selectedDate} {selectedTime}
                    </h5>
                  </li>
                  <li>
                    <h5>Location</h5>
                    <h5>{selectedAddress}, {selectedCity}, {selectedZipcode} {selectedCountry}</h5>
                  </li>
                </ul>
                <div className="btnxscenter">
                  <button className="custom_btn pay_now_btn" type="submit">
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Payement;
