import React, { useState } from "react";
import ProgressStep from "../../../components/ProgressStep";

const SignUp_stepsix = () => {
  // State for card//
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleChange = (e) => {

    if (e.target.name === "serviceName") {
      setName(e.target.value);
    } else if (e.target.name === "cardNumber") {
      setNumber(e.target.value);
    } else if (e.target.name === "expiryDate") {
      setDate(e.target.value);
    } else if (e.target.name === "cvv") {
      setCvv(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Cardholder Name:", name);
    console.log("Card Number:", number);
    console.log("Expiry Date:", date);
    console.log("CVV:", cvv);
  };

  return (
    <>
      <div className="signup_three">
        <div className="container">
          <div className="whitboxbg addservicewhitbox">
            {/* Progress Step */}
            <ProgressStep activeStep={6} />
            {/* Progress Step */}
            <div className="hoursheading">
              <h3>Hours available</h3>
            </div>
            <div className="add_servicesformbox noborder">
              <form action="#" onSubmit={handleSubmit}>
                <div className="addbox">
                  <div className="formfloating">
                    <input
                      name="serviceName"
                      type="text"
                      className="form-control"
                      placeholder="Cardholder"
                      value={name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="formfloating">
                    <input
                      name="cardNumber"
                      type="number"
                      className="form-control"
                      placeholder="Card number"
                      value={number}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="formfloating">
                    <input
                      name="expiryDate"
                      type="text"
                      className="form-control"
                      placeholder="Expiration date"
                      value={date}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="formfloating">
                    <input
                      name="cvv"
                      type="number"
                      className="form-control"
                      placeholder="CVV"
                      value={cvv}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="btnxscenter">
                  <button className="custom_btn addform_btn" type="submit">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp_stepsix;
