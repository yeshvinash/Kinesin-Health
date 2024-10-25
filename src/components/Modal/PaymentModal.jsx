import React, { useEffect, useState } from "react";
// import Form from "react-bootstrap/Form";
import { DatePicker, Input,  Select } from "antd";
import { createAxiosInstance } from "../../api/axiosConfig";
import {
  MESSAGE_CONTROLER_URL,
  SMS_TEMPLATE_CONTROLLER,
} from "../../api/Service";
import toast, { Toaster } from "react-hot-toast";
import $ from "jquery";
import { SVGIcons } from "../Data/SVGIcons";
import TextArea from "antd/es/input/TextArea";
import "./PaymentModal.css";

const PaymentModal = ({ tenantVal, patientId, patientName }) => {
  console.log();
  const [smsTemplates, setSmsTemplates] = useState([]);

  useEffect(() => {
    console.log("kkkkkkkkkkkkk1");
    getSmstemplates();
    setFormData({
      message: "",
      groupName: "",
      smsTemplate: "",
      smsTemplateId: "",
    });
  }, [patientId]);

  const [formData, setFormData] = useState({
    message: "",
    groupName: "",
    smsTemplate: "",
  });

  const getSmstemplates = async () => {
    console.log("getSmstemplates called..");

    try {
      let t = [
        { label: "SMS Templates*", value: "" },
        // { 'label': 'SMS Templates1', 'value': '1' },
        // { 'label': 'SMS Templates2', 'value': '2' },
        // { 'label': 'SMS Templates3', 'value': '3' }
      ];

      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${SMS_TEMPLATE_CONTROLLER}`
      );

      console.log(response);
      if (response && response.data) {
        response.data.forEach((element) => {
          t.push({ label: element.name, value: element.id });
        });
      }

      setSmsTemplates(t);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const [formParam, setFormParam] = useState({
    errors: {
      email: "",
    },
    submitted: false,
  });
  const validateForm = () => {
    console.log("validate form called...");
    let formIsValid = true;
    let f = Object.assign({}, formParam);
    f.errors.message = "";
    f.errors.groupName = "";
    f.errors.smsTemplateId = "";
    if (!formData.message) {
      formIsValid = false;
      f.errors.message = "*Please enter message.";
    }
    if (!formData.groupName) {
      formIsValid = false;
      f.errors.groupName = "*Please enter group name.";
    }
    if (!formData.smsTemplateId) {
      formIsValid = false;
      f.errors.smsTemplateId = "*Please select sms template.";
    }
    setFormParam(f);
    return formIsValid;
  };

  const resetFormParam = () => {
    console.log("resetFormParam called..");
    setFormParam({
      errors: {
        email: "",
      },
      submitted: false,
    });
  };

  useEffect(() => {
    validateForm();
  }, [formData.message, formData.groupName, formData.smsTemplateId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (tenantVal, patientId) => {
    console.log(
      "handleSubmit called.." +
        patientId +
        " , " +
        formData.message +
        "," +
        formData.groupName +
        "," +
        formData.smsTemplate
    );
    console.log("formData.smsTemplateId : " + formData.smsTemplateId);

    formParam.submitted = true;
    if (validateForm()) {
      formParam.submitted = true;
    } else return;

    let smsT;
    if (formData.smsTemplateId)
      smsT = smsTemplates.filter((f) => f.value == formData.smsTemplateId)[0]
        .label;

    console.log("smst : " + smsT);

    var obj = {
      id: patientId,
      tenant: tenantVal,
      message: formData.message,
      template: smsT ? smsT : "",
      patient: {
        id: patientId,
        tenant: tenantVal,
      },
    };

    console.log("request : " + JSON.stringify(obj));

    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.post(
        `${tenantVal}${MESSAGE_CONTROLER_URL}`,
        obj
      );

      setFormData({
        message: "",
        groupName: "",
        smsTemplate: "",
        smsTemplateId: "",
      });
      toast.success("Sms sent successfully.");
      $("#idClosePopupPayment").trigger("click");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const [value, setValue] = useState("€20");

  const handleInput = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  return (
    <>
      <div
        className="modal warningmodal_box payments-modal patient-detail"
        id="payment_modal"
      >
        <div className="modal-dialog add_document-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Payments</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="idClosePopup"
                onClick={resetFormParam}
              ></button>
            </div>

            <div className="modal-body">
              <div className="bodycontdropdown">
                {/* <Form> */}
                <div className="d-flex patients-info form-spacing">
                  <div className="patients-payments-title d-flex align-items-center justify-content-between">
                    <div>
                      <h4 className="h4 text-ellipsis text-break fw-600 text-stratos mb-1">
                        James Targary
                      </h4>
                      <p className="small text-ellipsis text-break mb-0 fw-500">
                        Medical card no. 4326328
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <p className="small">
                        <span className="fw-500">09/03/1998</span>
                        <span className="text-stratos fw-500"> (32 years)</span>
                      </p>
                    </div>
                  </div>
                  <div className="patients-payments-desc">
                    <div className="d-flex justify-content-around">
                      <h6 className="h6 mb-0 text-black fw-600">Personal</h6>
                      <h6 className="h6 mb-0 text-black fw-600">Family</h6>
                    </div>
                    <div className="d-flex justify-content-around">
                      <h6 className=" small fw-400 text-manatee">40.00</h6>
                      <h6 className=" small fw-400 text-manatee">0.00</h6>
                    </div>
                  </div>
                </div>
                <div className="grid-item form-spacing">
                  <div className="form-content-wrap flex-column align-items-start">
                    <div className="custom-label-wrap d-flex align-items-center justify-content-between w-100">
                      <span className="h6 small text-black fw-500 primary-font text-break d-inline-block">
                        Charged By
                      </span>
                    </div>
                    <div className="custom-input-wrap">
                      <Select
                        defaultValue="Dr. Darrem McCormack"
                        suffixIcon={SVGIcons.DownArrow}
                        options={[
                          {
                            value: "Dr. Darrem McCormack",
                            label: "Dr. Darrem McCormack",
                          },
                          {
                            value: "Dr. Noel King",
                            label: "Dr. Noel King",
                          },
                          {
                            value: "Dr. John Travers",
                            label: "Dr. John Travers",
                          },
                        ]}
                      />
                    </div>
                  </div>
                  <div className="form-content-wrap flex-column align-items-start">
                    <div className="custom-label-wrap d-flex align-items-center justify-content-between w-100">
                      <span className="h6 small text-black fw-500 primary-font text-break d-inline-block">
                        Select Service
                      </span>
                    </div>
                    <div className="custom-input-wrap">
                      <Select
                        defaultValue="Consultation"
                        suffixIcon={SVGIcons.DownArrow}
                        options={[
                          {
                            value: "Consultation",
                            label: "Consultation",
                          },
                          {
                            value: "Consultation Service",
                            label: "Consultation Service",
                          },
                        ]}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid-item form-spacing">
                  <div className="">
                    <div className="custom-label-wrap d-flex align-items-center justify-content-between w-100">
                      <span className="h6 small text-black fw-500 primary-font text-break d-inline-block">
                        Date
                      </span>
                    </div>
                    <div className="custom-input-wrap">
                      <DatePicker format="DD/MM/YYYY" />
                    </div>
                  </div>
                  <div className="">
                    <div className="custom-label-wrap d-flex align-items-center justify-content-between w-100">
                      <span className="h6 small text-black fw-500 primary-font text-break d-inline-block">
                        Charge To
                      </span>
                    </div>
                    <div className="custom-input-wrap">
                      <Input
                        placeholder="James Targary"
                        value="James Targary"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-spacing">
                  <div className="custom-label-wrap d-flex align-items-center justify-content-between w-100">
                    <span className="h6 small text-black fw-500 primary-font text-break d-inline-block">
                      Amount
                    </span>
                  </div>
                  <div className="custom-input-wrap">
                    <Input
                      placeholder="€20"
                      value={value}
                      onChange={handleInput}
                    />
                  </div>
                </div>
                <div className="form-spacing">
                  <div className="custom-label-wrap d-flex align-items-center justify-content-between w-100">
                    <span className="h6 small text-black fw-500 primary-font text-break d-inline-block">
                      Additional Notes
                    </span>
                  </div>
                  <div className="custom-input-wrap">
                    <TextArea
                      rows={5}
                      placeholder="Lorem Ipsum Dior Dummy Text Of Industry since 1500s Lorem Ipsum Dior Dummy Text Of Industry since 1500sLorem Ipsum Dior Dummy Text Of Industry since 1500s"
                    />
                  </div>
                </div>
                <div className="grid-item form-spacing">
                  <div className="form-content-wrap flex-column align-items-start">
                    <div className="custom-label-wrap d-flex align-items-center justify-content-between w-100">
                      <span className="h6 small text-black fw-500 primary-font text-break d-inline-block">
                        Payment Type
                      </span>
                    </div>
                    <div className="custom-input-wrap">
                      <Select
                        defaultValue="Cash"
                        suffixIcon={SVGIcons.DownArrow}
                        options={[
                          {
                            value: "Cash",
                            label: "Cash",
                          },
                          {
                            value: "Debit Card",
                            label: "Debit Card",
                          },
                          {
                            value: "Credit Card",
                            label: "Credit Card",
                          },
                          {
                            value: "Online Payment",
                            label: "Online Payment",
                          },
                        ]}
                      />
                    </div>
                  </div>
                  <div className="form-content-wrap flex-column align-items-start">
                    <div className="custom-label-wrap d-flex align-items-center justify-content-between w-100">
                      <span className="h6 small text-black fw-500 primary-font text-break d-inline-block">
                        Receipt
                      </span>
                    </div>
                    <div className="custom-input-wrap">
                      <Select
                        defaultValue="No"
                        suffixIcon={SVGIcons.DownArrow}
                        options={[
                          {
                            value: "No",
                            label: "No",
                          },
                          {
                            value: "Yes",
                            label: "Yes",
                          },
                        ]}
                      />
                    </div>
                  </div>
                </div>
                <div className="amount-wrap mb-0">
                  <span className="fw-500 text-stratos mb-1">Amount</span>
                  <h4 className="h4 mb-0 fw-500">{value}</h4>
                </div>
                {/* </Form> */}
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="custom_btn addform_btn"
                // data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleSubmit(tenantVal, patientId)}
                type="submit"
              >
                Make Payment
              </button>
              <button
                className="custom_btn addform_btn"
                // data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleSubmit(tenantVal, patientId)}
                type="submit"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentModal;
