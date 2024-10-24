import React, { useEffect, useMemo, useState } from "react";
import { Modal, Button, Input, Form, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./PaymentModalComponent.css";
import { SVGIcons } from "../../Data/SVGIcons";
import TextArea from "antd/es/input/TextArea";
import { createAxiosInstance } from "../../../api/axiosConfig";
import toast, { Toaster } from "react-hot-toast";
import { logoutFromHelper } from "../../../api/Helper";
import { logout } from "../../../redux/auth/AuthSlice";
import { removeuser } from "../../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import {
  GET_ALL_STAFF,
  PRACTICE_SERVICE_CONTROLER_URL,
  ADD_PATIENT_PAYMENT,
} from "../../../api/Service";
import { Autocomplete, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from 'dayjs';


export const PaymentModalComponent = ({
  visible,
  onClose,
  patientId,
  patientName,
  patient,
  selectedDoctor,
  setSelectedDoctor,
  selectedService,
  setSelectedService,
  value,
  setValue
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [valueError, setValueError] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [practiceServices, setPracticeServices] = useState([]);
  const [serviceError, setServiceError] = useState("");
  const [doctorError, setDoctorError] = useState("");
  const [paymentDate, setPaymentDate] = useState(dayjs());
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [paymentType, setPaymentType] = useState("Cash");
  const [recieptType,setRecieptType] = useState("No")
  let tenantVal = useSelector((state) => state.auth.user?.tenant);
  if (!tenantVal) tenantVal = localStorage.getItem("kinesin-tenant");
  const handleInput = (e) => {
    e.preventDefault();
    const numericValue = parseFloat(e.target.value);
    setValue(isNaN(numericValue) ? "" : numericValue);
  };
  const validateAmount = () => {
    if (!value) {
      setValueError("Amount is required.");
      return false;
    }
    if (isNaN(value) || value <= 0) {
      setValueError("Amount must be a valid positive number.");
      return false;
    }
    setValueError("");
    return true;
  };

  // Validation function for service selection
  const validateService = () => {
    if (!selectedService) {
      setServiceError("Service is required.");
      return false;
    }
    setServiceError("");
    return true;
  };

  // Validation function for charged by selection
  const validateChargedBy = () => {
    if (!selectedDoctor) {
      setDoctorError("Charged By is required.");
      return false;
    }
    setDoctorError("");
    return true;
  };
  useEffect(() => {
    const fetchPracticeServices = async () => {
      try {
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.get(
          `${tenantVal}${PRACTICE_SERVICE_CONTROLER_URL}`
        );
        let t = [{ label: "Type of Consultation*", value: "" }];
        if (response && response.data) {
          response.data.forEach((element) => {
            t.push({ label: element.name, value: element.id });
          });
        }
        setPracticeServices(t);
      } catch (error) {
        errorHandling(error);
      }
    };
    fetchPracticeServices();

    const fetchDoctors = async () => {
      try {
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.get(
          `${tenantVal}${GET_ALL_STAFF}`
        );
        let t = [];
        if (response && response.data) {
          response.data.forEach((element) => {
            t.push({
              label: element.firstName + " " + element.lastName,
              value: element.id,
            });
          });
        }
        setDoctors(t);
      } catch (error) {
        errorHandling(error);
      }
    };
    fetchDoctors();
  }, []);

  const errorHandling = (error) => {
    console.log(error);
    toast.error(error.message);
    if (error && error.response && error.response.status) {
      if (error.response.status == 403) {
        logoutFromHelper();
        dispatch(logout());
        dispatch(removeuser());
        navigate("/logout");
      }
    }
  };
  const addPatientPayment = async (paymentData) => {
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.post(
        `${tenantVal}${ADD_PATIENT_PAYMENT}`,
        paymentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Payment made successfully");
    } catch (error) {
      errorHandling(error);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "-"; // Return "-" if the dateString is not a valid date
    }
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  function calculateAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  
  const handleChange = (selectedOption) => {
    setSelectedDoctor(selectedOption);
  };
  const handleServiceChange = (selectedOption) => {
    setSelectedService(selectedOption);
  };
  const handleDateChange = (date) => {
    setPaymentDate(date);
  };
  const handleNotesChange = (event) => {
    setAdditionalNotes(event.target.value);
  };
  const handlePaymentTypeChange = (selectedOption) => {
    setPaymentType(selectedOption);
  };
  const handleRecieptTypeChange = (selectedOption) =>{
    setRecieptType(selectedOption)
  }
  const handleSave = async () => {
    const isAmountValid = validateAmount();
    const isServiceValid = validateService();
    const isChargedByValid = validateChargedBy();
    if (!isAmountValid || !isServiceValid || !isChargedByValid) return;
    await addPatientPayment({
      tenant: tenantVal,
      paidBy: patientId,
      amountPaid: parseFloat(value),
      paymentMethod: paymentType,
      // consultationId: selectedService ? selectedService : "",
      chargedBy: selectedDoctor,
      notes: additionalNotes,
      paymentDate: paymentDate ? paymentDate.toISOString() : "",
      receiptType : recieptType
    });
    handleModalClose();
  };
  const handleModalClose = () => {
    setSelectedDoctor("");
    setSelectedService("");
    setValue("€20");
    setPaymentDate(null);
    setAdditionalNotes("");
    setPaymentType("Cash");
    onClose(); // Close the modal

  };
  return (
    <>
      <Modal
        title="Payments"
        centered
        visible={visible}
        onCancel={handleModalClose}
        className="payments-modal patient-detail custom-modal"
        footer={[
          <Button key="ok" className="custom_btn" onClick={handleSave}>
            Make Payment
          </Button>,
          <Button key="cancel" onClick={handleModalClose}>
            Cancel
          </Button>,
        ]}
      >
        <Form>
          <div className="d-flex patients-info form-spacing">
            <div className="patients-payments-title d-flex align-items-center justify-content-between">
              <div>
                <h4 className="h4 text-ellipsis text-break fw-600 text-stratos mb-1">
                  {patient.firstName
                    ? patient.firstName + " " + (patient.surname || "")
                    : ""}
                </h4>
                <p className="small text-ellipsis text-break mb-0 fw-500">
                  Medical card no.{" "}
                  {patient.medicalCardNumber ? patient.medicalCardNumber : "-"}
                </p>
              </div>
              <div className="flex-shrink-0">
                <p className="small">
                  <span className="fw-500">
                    {patient.dateOfBirth
                      ? formatDate(patient.dateOfBirth)
                      : "-"}
                  </span>
                  <span className="text-stratos fw-500">
                    {patient.dateOfBirth
                      ? `(${calculateAge(patient.dateOfBirth)} years)`
                      : ""}
                  </span>
                </p>
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
                  value={selectedDoctor}
                  onChange={handleChange}
                  options={doctors}
                  suffixIcon={SVGIcons.DownArrow}
                />
                {doctorError && (
                <p style={{ color: "red", fontSize: "12px" }}>{doctorError}</p>
              )}
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
                  value={selectedService}
                  onChange={handleServiceChange}
                  options={practiceServices}
                  suffixIcon={SVGIcons.DownArrow}
                />
                {serviceError && (
              <p style={{ color: "red", fontSize: "12px" }}>{serviceError}</p>
            )}
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <DatePicker
                    format="DD/MM/YYYY"
                    value={paymentDate || dayjs()} 
                    sx={{ width: "100%" }}
                    onChange={(newValue) => {
                    setPaymentDate(newValue);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
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
                  value={`${patient.firstName || ""} ${patient.surname || ""}`}
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
              <Input placeholder="0" value={value} onChange={handleInput} />
              {valueError && (
              <p style={{ color: "red", fontSize: "12px" }}>{valueError}</p>
            )}
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
                value={additionalNotes}
                placeholder="Enter any additional notes here..."
                onChange={handleNotesChange}
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
                  value={paymentType ? paymentType : "Cash"}
                  onChange={handlePaymentTypeChange}
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
                  suffixIcon={SVGIcons.DownArrow}
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
                  value={recieptType ? recieptType : "Cash"}
                  suffixIcon={SVGIcons.DownArrow}
                  onChange={handleRecieptTypeChange}
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
            <h4 className="h4 mb-0 fw-500">€{value}</h4>
          </div>
        </Form>
      </Modal>
    </>
  );
};
