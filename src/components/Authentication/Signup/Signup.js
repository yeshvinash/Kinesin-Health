import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthenticationLogo from "../../../assets/images/logo/authentication-logo.svg";
import { Checkbox, Steps } from "antd";
import { Button, FloatingLabel, Form, Row, Col, Image } from "react-bootstrap";
import { SVGIcons } from "../../Data/SVGIcons";
import success from "../../../assets/images/cover/success.png";
import { LoginForm } from "../LoginForm";
import CustomDatepicker from "../../CustomDatepicker/CustomDatepicker";
import "../../CustomizedSteps.css";
import "./Signup.css";


export const Signup = () => {
  const [mobileNumber, setMobileNumber] = useState("false");
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const handleClick = (index) => {
    setCurrent(index);
  };

  const handleSendCode = () => {
    setVerificationCodeSent(true);
  };
  const handleVerifyCode = () => {
    setMobileNumber(false);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [current, setCurrent] = useState(0);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrent(value);
  };

  const steps = [
    {
      title: (
        <>
          <div className="custom-title">
            <h6>Practice Details</h6>
            <span className="subtitle">Choose your practice</span>
          </div>
        </>
      ),
      content: (
        <>
          <div className="authentication-title-wrap mb-5 pb-1">
            <h1 className="h1 fw-600 text-stratos">Create an Account</h1>
            <span className="h5 fw-400 mb-0">
              Give us some of your information to get started.
            </span>
          </div>
          <Form>
            <h3 className="fw-600 text-stratos mb-3">Practice Details</h3>
            <FloatingLabel
              controlId="floatingSelect"
              label="Choose your practice"
            >
              <Form.Select aria-label="Floating label select example">
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </FloatingLabel>
            <div className="d-flex align-items-center mt-4 pt-2">
              <span className="text-manatee fw-500 me-3">
                Practice not found?
              </span>
              <Link className="d-block text-end m-0 link fw-500 forgot-password-link ">
                Click here
              </Link>
            </div>
            <Button className="custom_btn w-100 login_btn mb-0">
              Continue
            </Button>
          </Form>
        </>
      ),
    },
    {
      title: (
        <>
          <div className="custom-title">
            <h6>Your Details</h6>
            <span className="subtitle">Some of your information</span>
          </div>
        </>
      ),

      content: (
        <>
          <div className="authentication-title-wrap mb-5 pb-1">
            <h1 className="h1 fw-600 text-stratos">Create an Account</h1>
            <span className="h5 fw-400 mb-0">
              Give us some of your information to get started.
            </span>
          </div>
          <Form>
            <h3 className="h3 fw-600 text-stratos mb-3">Your Details</h3>
            <FloatingLabel controlId="floatingInput" label="First Name">
              <Form.Control type="text" placeholder="Noelhuk" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Surname">
              <Form.Control type="text" placeholder="Noelhuk" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingSelect" label="Gender">
              <Form.Select aria-label="Floating label select example">
                <option value="1">Male</option>
                <option value="2">Female</option>
                <option value="3">Other</option>
              </Form.Select>
            </FloatingLabel>
            <div>
              <CustomDatepicker />
            </div>
            {/* <FloatingLabel controlId="floatingInput" label="Date of Birth">
              <Form.Control type="date" />
              <span class="custom-icon">{SVGIcons.Calendar}</span>
            </FloatingLabel> */}
            <div className="mt-4  pt-2">
              <h5 className="h5 text-stratos fw-600 mb-2">Medical Card</h5>
              <div className="custom-checkbox-wrap d-flex">
                <Checkbox>Yes</Checkbox>
                <Checkbox>No</Checkbox>
              </div>
            </div>
            <Button className="custom_btn w-100 login_btn">Continue</Button>
            <div className="login-platform-link-wrap">
              <a href="javascript:void(0)" className="">
                {SVGIcons.Email}
                <span>Continue with Email</span>
              </a>
              <a href="javascript:void(0)" className="">
                {SVGIcons.MicroSoft}
                <span>Continue with Microsoft</span>
              </a>
              <a href="javascript:void(0)" className="">
                {SVGIcons.Google}
                <span>Continue with Google</span>
              </a>
            </div>
          </Form>
        </>
      ),
    },
    {
      title: (
        <>
          <div className="custom-title">
            <h6>Your Address</h6>
            <span className="subtitle">Provide your location details</span>
          </div>
        </>
      ),
      content: (
        <>
          <div className="authentication-title-wrap mb-5 pb-1">
            <h1 className="h1 fw-600 text-stratos">Create an Account</h1>
            <span className="h5 fw-400 mb-0">
              Give us some of your information to get started.
            </span>
          </div>
          <Form>
            <h3 className="h3 fw-600 text-stratos mb-3">Your Address</h3>
            <FloatingLabel controlId="floatingInput" label="Address line 1">
              <Form.Control type="text" placeholder="Address" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Address line 2">
              <Form.Control type="text" placeholder="Address" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Town">
              <Form.Control type="text" placeholder="Noelhuk" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="City">
              <Form.Control type="text" placeholder="Noelhuk" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Country">
              <Form.Control type="text" placeholder="Noelhuk" />
            </FloatingLabel>
            <Button className="custom_btn w-100 login_btn">Continue</Button>
          </Form>
        </>
      ),
    },
    {
      title: (
        <>
          <div className="custom-title">
            <h6>Your Login</h6>
            <span className="subtitle">Let’s create your login</span>
          </div>
        </>
      ),
      content: (
        <>
          <div className="authentication-title-wrap mb-5 pb-1">
            <h1 className="h1 fw-600 text-stratos">Create an Account</h1>
            <span className="h5 mb-0 fw-400">
              Give us some of your information to get started.
            </span>
          </div>
          <Form>
            <h3 className="h3 fw-600 text-stratos mb-3">
              Let’s Create your Login
            </h3>
            <FloatingLabel controlId="floatingInput" label="Email">
              <Form.Control type="email" placeholder="name@example.com" />
              <div className="inputicon">{SVGIcons.Email}</div>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="New Password">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <div onClick={toggleShowPassword} className="inputicon">
                {showPassword ? (
                  <>{SVGIcons.EyeOpen}</>
                ) : (
                  <>{SVGIcons.EyeClose}</>
                )}
              </div>
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPassword"
              label="Confirm New Password"
            >
              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <div onClick={toggleShowConfirmPassword} className="inputicon">
                {showConfirmPassword ? (
                  <>{SVGIcons.EyeOpen}</>
                ) : (
                  <>{SVGIcons.EyeClose}</>
                )}
              </div>
            </FloatingLabel>

            <Button className="custom_btn w-100 login_btn">Continue</Button>
          </Form>
        </>
      ),
    },
    {
      title: (
        <>
          <div className="custom-title">
            <h6>Verification</h6>
            <span className="subtitle">Verify your mobile</span>
          </div>
        </>
      ),
      content: (
        <>
          {!verificationCodeSent ? (
            <>
              <div className="authentication-title-wrap mb-5">
                <h1 className="h1 fw-600 text-stratos">Create an Account</h1>
                <span className="h5 mb-0 fw-400">
                  Give us some of your information to get started.
                </span>
              </div>
              <div className="mb-4 pb-3 verification-content-wrap">
                <h3 className="h3 mb-3 pb-1 fw-600 text-stratos">
                  Verify your Mobile
                </h3>
                <p className="text-topaz mb-0 p">
                  Please enter your mobile number in the box below. Once you
                  click 'Send Code' you will receive a text with a verification
                  code. Enter that code here and click 'Register' to complete
                  your registration. You will receive an email with a
                  verification link to complete your registration.
                </p>
              </div>
              <Form>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Mobile Number"
                  className="form-number-input"
                >
                  <Form.Control type="text" placeholder="4454456789" />
                  <div className="inputicon">{SVGIcons.Phone}</div>
                </FloatingLabel>
                <Link
                  onClick={handleSendCode}
                  className="custom_btn w-100 login_btn mb-0"
                >
                  Send Code
                </Link>
              </Form>
            </>
          ) : mobileNumber ? (
            <>
              <div className="authentication-title-wrap mb-5">
                <h1 className="h1 fw-600 text-stratos">Create an Account</h1>
                <span className="h5 mb-0 fw-400">
                  Give us some of your information to get started.
                </span>
              </div>
              <div className="mb-4 pb-3 verification-content-wrap">
                <h3 className="h3 mb-3 pb-1 fw-600 text-stratos">
                  Verify your Mobile
                </h3>
                <p className="text-topaz mb-0 p">
                  Please enter your mobile number in the box below. Once you
                  click 'Send Code' you will receive a text with a verification
                  code. Enter that code here and click 'Register' to complete
                  your registration. You will receive an email with a
                  verification link to complete your registration.
                </p>
              </div>
              <Form>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Mobile Number"
                  className="form-number-input"
                >
                  <Form.Control type="text" placeholder="4454456789" />
                  <div className="inputicon">{SVGIcons.Phone}</div>
                  <Link className="link fw-500">Edit</Link>
                </FloatingLabel>

                <Form.Label>Verification Code</Form.Label>
                <Row className="verification-code-wrap">
                  <Col>
                    <Form.Control type="number" />
                  </Col>
                  <Col>
                    <Form.Control type="number" />
                  </Col>
                  <Col>
                    <Form.Control type="number" />
                  </Col>
                  <Col>
                    <Form.Control type="number" />
                  </Col>
                  <Col>
                    <Form.Control type="number" />
                  </Col>
                  <Col>
                    <Form.Control type="number" />
                  </Col>
                </Row>

                <div className="mt-4 pt-2 d-flex align-items-center">
                  <span className="text-manatee fw-500 me-3">
                    Time Left to Verify
                  </span>
                  <span className=" d-block text-end m-0 link fw-500 text-caribbean-green ">
                    58 Seconds
                  </span>
                </div>

                <Link
                  className="custom_btn w-100 login_btn mb-0"
                  onClick={handleVerifyCode}
                >
                  Send Code
                </Link>
              </Form>
            </>
          ) : (
            <>
              <div className="authentication-title-wrap text-center">
                <Image src={success} className="mb-5 pb-1" />
                <div>
                  <h1 className="h1 fw-600 text-stratos mb-3">
                    Registration is complete
                  </h1>
                  <span className="h5">
                    Congratulation you have complete your sign up
                  </span>
                </div>
              </div>
              <Form>
                <Link to="/login" className="custom_btn w-100 login_btn">
                  Home
                </Link>
              </Form>
            </>
          )}
        </>
      ),
    },
  ];
  const items = steps.map((item, index) => ({
    key: item.title,
    title: item.title,
  }));

  useEffect(() => {
    if (mobileNumber) {
      document.body.classList.add("updated");
    } else {
      document.body.classList.remove("updated");
    }
  }, [mobileNumber]);
  return (
    <>
      <section className="authentication-wrapper signup-form-wrapper">
        <div className="d-flex align-items-center justify-content-between authentication-header">
          <Link to="/signup">
            <img src={AuthenticationLogo} />
          </Link>
          <div className="d-flex align-items-center">
            <span className="text-manatee fw-500 me-3">
              Don’t have an account?{" "}
            </span>
            <Link to="/login" className="custom_btn">
              Login
            </Link>
          </div>
        </div>
        <div className="authentication-form-spacing">
          <div className="custom-steps-wizard authentication-form">
            <div className="custom-steps-wizard-content-wrap">
              <div className="authentication-form-content-wrapper">
                {steps[current].content}
              </div>
            </div>
            <div className="custom-steps-wizard-items-wrap">
              <Steps
                current={current}
                items={items}
                onChange={onChange}
                direction="vertical"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
