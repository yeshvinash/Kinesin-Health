import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Form = () => {
    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    //Validation schema for every field//
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),

        password: Yup.string()
            .max(255)
            .min(6, "Password must be at least 6 characters long")
            .required("Password is required"),

        firstname: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("This field is required"),

        lastname: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("This field is required"),

        tandc: Yup.boolean().oneOf([true], "You must accept"),

        country: Yup.string().required("This field is required"),

        eircode: Yup.string().required("This field is required"),

        address: Yup.string().required("This field is required"),

        address2: Yup.string().required("This field is required"),

        mobileNum: Yup.string()
            .matches(phoneRegExp, "Phone number is not valid")
            .required("Mobile number is required"),
            
        passwordConfirmation: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Passwords must match"
        ),
    });

    // Initial Values Register Form //
    const initialValues = {
        firstname: "",
        lastname: "",
        tandc: false,
        address: "",
        address2: "",
        country: "",
        eircode: "",
        mobileNum: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {({ isSubmitting, errors, touched }) => (
                    <Form>

                        {/* First Name */}
                        <div className="form-floating mb-3">
                            <Field
                                type="text"
                                name="firstname"
                                className="form-control"
                                id="floatingInput1"
                                placeholder="First Name"
                            />
                            <label htmlFor="floatingInput1">First Name</label>
                            {errors.firstname && touched.firstname && (
                                <div className="errorstext">{errors.firstname}</div>
                            )}
                        </div>
                        {/* First Name */}


                        {/* Last Name */}
                        <div className="form-floating mb-3">
                            <Field
                                type="text"
                                name="lastname"
                                className="form-control"
                                id="floatingInput2"
                                placeholder="Last Name"
                            />
                            <label htmlFor="floatingInput2">Last Name</label>
                            {errors.lastname && touched.lastname && (
                                <div className="errorstext">{errors.lastname}</div>
                            )}
                        </div>
                        {/* Last Name */}


                        {/* DOB  */}
                        <div className="form-floating mb38">
                            {/* Accordion */}
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseOne"
                                            aria-expanded="true"
                                            aria-controls="collapseOne"
                                            onClick={toggleShowString}
                                        >
                                            {showString
                                                ? "Date of Birth"
                                                : selectedDate.toDateString()}
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseOne"
                                        className=" collapse"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body">
                                            <Calendar
                                                onChange={handleCalendarChange}
                                                value={selectedDate}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Accordion */}
                        </div>
                        {/* DOB  */}


                        {/* Address Line 1 */}
                        <div className="form-floating mb-3">
                            <Field
                                type="text"
                                name="address"
                                className="form-control"
                                placeholder="First Line"
                                id="floatingInput4"
                            />
                            <label htmlFor="floatingInput4">First Line</label>
                            {errors.address && touched.address && (
                                <div className="errorstext">{errors.address}</div>
                            )}
                        </div>
                        {/* Address Line 1 */}


                        {/* Address Line 2 */}
                        <div className="form-floating mb-3">
                            <Field
                                type="text"
                                name="address2"
                                className="form-control"
                                placeholder="Second Line"
                                id="floatingInput5"
                            />
                            <label htmlFor="floatingInput5">Second Line</label>
                            {errors.address2 && touched.address2 && (
                                <div className="errorstext">{errors.address2}</div>
                            )}
                        </div>
                        {/* Address Line 2 */}


                        {/* Country */}
                        <div className="form-floating mb-3">
                            <Field
                                type="text"
                                name="country"
                                className="form-control"
                                placeholder="Country"
                                id="floatingInput6"
                            />
                            <label htmlFor="floatingInput6">Country</label>
                            {errors.country && touched.country && (
                                <div className="errorstext">{errors.country}</div>
                            )}
                        </div>
                        {/* Country */}


                        {/* EIR Code */}
                        <div className="form-floating mb-3">
                            <Field
                                type="text"
                                name="eircode"
                                className="form-control"
                                placeholder="EirCode"
                                id="floatingInput7"
                            />
                            <label htmlFor="floatingInput7">EirCode</label>
                            {errors.eircode && touched.eircode && (
                                <div className="errorstext">{errors.eircode}</div>
                            )}
                        </div>
                        {/* EIR Code */}


                        {/* Mobile Number */}
                        <div className="form-floating mb-3">
                            <Field
                                type="number"
                                className="form-control"
                                name="mobileNum"
                                placeholder="Mobile Number"
                                id="floatingInput8"
                            />
                            <label htmlFor="floatingInput8">Mobile Number</label>
                            {errors.mobileNum && touched.mobileNum && (
                                <div className="errorstext">{errors.mobileNum}</div>
                            )}
                        </div>
                        {/* Mobile Number */}


                        {/* Checkbox */}
                        <div className="form-floating mb38">
                            <div className="form-group">
                                <label className="agree_check">
                                    <Field type="checkbox" name="tandc" />
                                    <span className="checkmark"></span>
                                    <span className="agree_check_txt">
                                        Consent to receieve text messages
                                    </span>
                                </label>
                                {errors.tandc && touched.tandc && (
                                    <div className="errorstext">{errors.tandc}</div>
                                )}
                            </div>
                        </div>
                        {/* Checkbox */}


                        {/* Email */}
                        <p className="head_para">MyAccount</p>
                        <div className="form-floating mb-3">
                            <Field
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Email"
                                id="floatingInput9"
                            />
                            <label htmlFor="floatingInput9">Email</label>
                            {errors.email && touched.email && (
                                <div className="errorstext">{errors.email}</div>
                            )}
                        </div>
                        {/* Email */}


                        {/* Password */}
                        <div className="form-floating mb-3">
                            <Field
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Password"
                                id="floatingInput10"
                            />
                            <label htmlFor="floatingInput10">Password</label>
                            {errors.password && touched.password && (
                                <div className="errorstext">{errors.password}</div>
                            )}
                        </div>
                        {/* Password */}

                        {/* Confirm Password */}
                        <div className="form-floating mb38">
                            <Field
                                type="password"
                                name="passwordConfirmation"
                                className="form-control"
                                placeholder="Confirm password"
                                id="floatingInput11"
                            />

                            <label htmlFor="floatingInput11">Confirm password</label>
                            {errors.passwordConfirmation && touched.passwordConfirmation && (
                                <div className="errorstext">{errors.passwordConfirmation}</div>
                            )}
                        </div>
                        {/* Confirm Password */}


                        {/* Button */}
                        <div className="btnxscenter">
                            <button
                                className="custom_btn login_btn"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Register
                            </button>
                        </div>
                        {/* Button */}
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Form;
