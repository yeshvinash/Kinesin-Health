import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import right_arrowa from "../../../assets/images/right_arrowa.svg";
import Nav from "../../../components/AfterLoginNav/Nav";
import toast, { Toaster } from "react-hot-toast";
import {
  PATIENT_CONTROLER_URL,
  PATIENT_CONTROLER_URL_ID,
  DOCTOR_DETAILS
} from "../../../api/Service";
import { createAxiosInstance } from "../../../api/axiosConfig";
import moment from "moment";
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import downarrow from "../../../assets/images/downarrow.png";
import { logoutFromHelper } from "../../../api/Helper";
import { logout } from "../../../redux/auth/AuthSlice";
import { removeuser } from "../../../redux/user/userSlice";
import { addPatientFullName, addPatientId } from "../../../redux/patient/PatientSlice";

const AddPatient = ({ route, navigation }) => {


  const [value, setValue] = useState(dayjs(new Date().setMinutes(0)));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let tenantVal = useSelector((state) => state.auth.user?.tenant);
  if (!tenantVal)
    tenantVal = localStorage.getItem('kinesin-tenant');
  const patientId = useSelector((state) => state.patient.patientId);
  const previousPageForEditPatient = useSelector((state) => {
    return state.patient.previousPageForEditPatient;
  });
  const [checkedConsentEmail, setCheckedConsentEmail] = React.useState(false);
  const [checkedConsentSms, setCheckedConsentSms] = React.useState(false);
  const [checkedConsentPhone, setCheckedConsentPhone] = React.useState(false);

  const [privateInsuranceProviders, setPrivateInsuranceProviders] = React.useState([
    { 'label': 'Select', 'value': '' },
    { 'label': 'VHI Healthcare', 'value': 'VHI Healthcare' },
    { 'label': 'Laya Healthcare', 'value': 'Laya Healthcare' },
    { 'label': 'Irish life Health', 'value': 'Irish life Health' }
  ]);

  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    dob: moment(new Date(dayjs(value))).format("DD/MM/YYYY"),
    sex: "",
    telephone: "",
    mobileTel: "",
    email: "",
    ppsNumber: "",
    addressId: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    city: "",
    county: "",
    postCode: "",
    country: "",
    medicalCardNumber: "",
    privateInsuranceProvider: "",
    privateInsuranceNumber: "",
    ihiNumber: "",
    gpName: "",
    gpSurgery: "",
    gpTelephoneNumber: "",
    gpCity: "",
    gpAddressLine1: "",
    gpAddressLine2: "",
    gpAddressLine3: "",
    gpPostCode: "",
    gpHealthMail: ""
  });

  const fetchPatientById = async (id) => {
    try {
      if (id) {
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.get(
          `${tenantVal}${PATIENT_CONTROLER_URL_ID}${id}`
        );

        let res = response.data;

        if (res) {
          formData.title = res.title;
          formData.firstName = res.firstName;
          formData.lastName = res.surname;
          if (res.dateOfBirth) {
            let aa = res.dateOfBirth.split('-');
            if (aa && aa.length == 3) {
              let date = new Date();
              date.setDate(aa[2]);
              date.setMonth(aa[1] - 1);
              date.setFullYear(aa[0]);

              formData.dob = moment(new Date(dayjs(date))).format("DD/MM/YYYY");
              setValue(dayjs(date));
            }

          }
          formData.sex = res.gender;
          formData.telephone = res.homePhone;
          formData.mobileTel = res.mobilePhone;
          formData.email = res.email;
          formData.ppsNumber = res.nationalNumber;
          formData.medicalCardNumber = res.medicalCardNumber;
          formData.privateInsuranceNumber = res.privateInsuranceNumber
          formData.privateInsuranceProvider = res.privateInsuranceProvider
          setCheckedConsentEmail(res.contactByEmail);
          setCheckedConsentPhone(res.contactByPhone);
          setCheckedConsentSms(res.contactBySms);
          if (res.address) {
            formData.addressId = res.address.id;
            formData.addressLine1 = res.address.addressLine1;
            formData.addressLine2 = res.address.addressLine2;
            formData.addressLine3 = res.address.addressLine3;
            formData.city = res.address.city;
            formData.county = res.address.county;
            formData.country = res.address.country;
            formData.postCode = res.address.postCode;
          }
          if (res.doctorDetails) {
            formData.gpName = res.doctorDetails.firstName;
            formData.gpSurgery = res.doctorDetails.surgery;
            formData.gpTelephoneNumber = res.doctorDetails.telephone;
            formData.gpHealthMail = res.doctorDetails.healthMail;
            if (res.doctorDetails.address) {
              formData.gpCity = res.doctorDetails.address.city;
              formData.gpAddressLine1 = res.doctorDetails.address.addressLine1;
              formData.gpAddressLine2 = res.doctorDetails.address.addressLine2;
              formData.gpAddressLine3 = res.doctorDetails.address.addressLine3;
              formData.gpPostCode = res.doctorDetails.address.postCode;
            }


          }
          setFormData({ ...formData });
        }
      }
    } catch (error) {
      errorHandling(error);
    }
  };

  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      fetchPatientById(patientId);
    }
  }, []);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const [formParam, setFormParam] = useState(
    {
      errors: {
        email: '',
      },
      submitted: false
    }
  );
  const validateForm = () => {
    let fData = Object.assign({}, formData);
    let formIsValid = true;
    let f = Object.assign({}, formParam);
    f.errors.firstName = '';
    f.errors.lastName = '';
    f.errors.dob = '';
    f.errors.email = '';

    if (!formData.firstName) {
      formIsValid = false;
      f.errors.firstName = "*Please enter first name.";
    }
    if (!formData.lastName) {
      formIsValid = false;
      f.errors.lastName = "*Please enter last name.";
    }
    if (!formData.dob) {
      formIsValid = false;
      f.errors.dob = "*Please enter date of birth.";
    } else if (formData.dob.length < 10) {
      formIsValid = false;
      f.errors.dob = "Please check date of birth";
    } else {
      if (formData.dob.indexOf('/') > 0) {
        let age = calculateAge([formData.dob.split('/')[2], formData.dob.split('/')[1], formData.dob.split('/')[0]]);

        if (age < 0) {
          formIsValid = false;
          f.errors.dob = "Age must be greater than zero";
        }
      }
    }

    if (!formData.email) {
      formIsValid = false;
      f.errors.email = "*Please enter email.";
    } else if (!/.+@.+\.[A-Za-z]+$/.test(formData.email)) {
      formIsValid = false;
      f.errors.email = "Please enter a valid email address.";
    }
    setFormParam(f);
    return formIsValid;
  }

  const calculateAge = (dob) => {
    let age;
    if (dob) {
      const dobDate = new Date(
        dob[0], // Year
        dob[1] - 1, // Month 
        dob[2] // Day
      );
      const today = new Date();
      age = today.getFullYear() - dobDate.getFullYear();
      const monthDiff = today.getMonth() - dobDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < dobDate.getDate())
      ) {
        age--;
      }
    }
    return age;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "dob") {
      formattedValue = formatDob(value);
    } else if (name === "telephone" || name === "mobileTel" || name === "gpTelephoneNumber") {
      // For the "telephone", "mobileTel", and "gpTelephoneNumber" fields, only allow numbers
      formattedValue = value.replace(/\D/g, ""); // Remove all non-numeric characters
    }
    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    formParam.submitted = true;
    if (validateForm()) {
      formParam.submitted = true;
    } else
      return;
    let doctorDetailsId;
    const postDataForDoctorDetails = {
      tenant: tenantVal,
        firstName: formData.gpName,
        surgery: formData.gpSurgery,
        telephone: formData.gpTelephoneNumber,
        healthMail: formData.gpHealthMail,
        address: {
          tenant: tenantVal,
          city: formData.gpCity,
          addressLine1: formData.gpAddressLine1,
          addressLine2: formData.gpAddressLine2,
          addressLine3: formData.gpAddressLine3,
          postCode: formData.gpPostCode
        }
      };
      try {
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.post(
          `${tenantVal}${DOCTOR_DETAILS}`,
          postDataForDoctorDetails
        );
        doctorDetailsId = response && response.data && response.data.id ? response.data.id : '';
      } catch (error) {
        errorHandling(error);
      }
    const postData = {
      title: formData.title,
      firstName: formData.firstName,
      surname: formData.lastName,
      dateOfBirth: formData.dob ? moment(formData.dob, 'DD/MM/YYYY').format("YYYY-MM-DD") : undefined,
      gender: formData.sex && formData.sex !== "Select" ? formData.sex : "",
      homePhone: formData.telephone,
      mobilePhone: formData.mobileTel,
      email: formData.email,
      nationalNumber: formData.ppsNumber,
      medicalCardNumber: formData.medicalCardNumber,
      contactBySms: checkedConsentSms,
      contactByEmail: checkedConsentEmail,
      contactByPhone: checkedConsentPhone,
      address: {
        id: formData.addressId,
        tenant: tenantVal,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        addressLine3: formData.addressLine3,
        city: formData.city,
        county: formData.county,
        country: formData.country,
        postCode: formData.postCode
      },
      doctorDetails: {
        tenant: tenantVal,
        firstName: formData.gpName,
        surgery: formData.gpSurgery,
        telephone: formData.gpTelephoneNumber,
        healthMail: formData.gpHealthMail,
        address: {
          tenant: tenantVal,
          city: formData.gpCity,
          addressLine1: formData.gpAddressLine1,
          addressLine2: formData.gpAddressLine2,
          addressLine3: formData.gpAddressLine3,
          postCode: formData.gpPostCode,
        }
      },
      doctorDetailsId : doctorDetailsId,
      privateInsuranceProvider : formData.privateInsuranceProvider,
      privateInsuranceNumber: formData.privateInsuranceNumber,
    };

    if (patientId)
      postData.id = patientId;

    if (formData.addressId)
      postData.address.id = formData.addressId;
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.post(
        `${tenantVal}${PATIENT_CONTROLER_URL}`,
        postData
      );
      setTimeout(() => {
        customBackButton(true)
      }, 500);
    } catch (error) {
      errorHandling(error);
    }
  };

  const customBackButton = (submit) => {
    if (submit) {

      if (!previousPageForEditPatient)
        navigate("/patient", { state: { ...formData, showToast: true } });
      else if (previousPageForEditPatient == 'patient')
        navigate("/patient", { state: { ...formData, showToast: true } });
      else if (previousPageForEditPatient == 'patient-detail') {
        dispatch(addPatientId(patientId));
        localStorage.setItem("kinesin-patientId", patientId)
        dispatch(addPatientFullName((formData.firstName ? formData.firstName + (formData.lastName ? (' ' + formData.lastName) : '') : '')));
        navigate("/patient-detail", { state: { showToast: true } });
      }
    } else {
      if (!previousPageForEditPatient)
        navigate("/patient", { state: formData });
      else if (previousPageForEditPatient == 'patient')
        navigate("/patient", { state: formData });
      else if (previousPageForEditPatient == 'patient-detail') {
        dispatch(addPatientId(patientId));
        localStorage.setItem("kinesin-patientId", patientId)
        dispatch(addPatientFullName((formData.firstName ? formData.firstName + (formData.lastName ? (' ' + formData.lastName) : '') : '')));
        navigate("/patient-detail", { state: { showToast: false } });
      }
    }
  }
  // DOB format handler
  const formatDob = (dob) => {
    const cleanedValue = dob.replace(/[^\d]/g, ""); // Remove non-numeric characters
    if (cleanedValue.length <= 2) {
      return cleanedValue;
    } else if (cleanedValue.length <= 4) {
      return cleanedValue.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
    } else {
      return cleanedValue.replace(/^(\d{2})(\d{2})(\d{0,4}).*/, "$1/$2/$3");
    }
  };

  const errorHandling = (error) => {
    console.log(error);
    toast.error(error.message);
    if (error && error.response && error.response.status) {
      if (error.response.status == 403) {
        logoutFromHelper();
        dispatch(logout())
        dispatch(removeuser())
        navigate("/logout");
      }
    }
  }

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="dashBcontbody addpatentdashbord">
        <div className="patientsheading">
          <div className="patientsearchbar">
            <div>
              <h3> {patientId ? 'Edit Patient' : "Add Patient"} </h3>
              <button
                className="add_patientsbtn"
                onClick={() =>
                  customBackButton()
                }
              >
                <img src={right_arrowa} alt="" /> 
                {patientId ? (!previousPageForEditPatient || previousPageForEditPatient == 'patient' ? 'All Patients' : 'Patient Details') : "All Patients"}
              </button>
            </div>
          </div>
        </div>
        <div className="signup_threebox addpatientlist mt-0">
          <div className="addpatientlistcontbox">
            <h4>Personal Information</h4>
            <form onSubmit={handleFormSubmit}>
              <div className="row">
                <div className="col-xl-3 col-md-6 mb-3">
                  <label>Title</label>
                  <select
                    className="form-select form-control dpblock"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                  >
                    <option value="">Select</option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Miss">Miss</option>
                  </select>
                </div>

                <div className="col-xl-3 col-md-6 mb-3">
                  <label className="requiredValidator">First Name</label>
                  <input
                    name="firstName"
                    type="text"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  {formParam.submitted && (
                    <div className="errorMsg text-start">{formParam.errors.firstName}</div>
                  )}
                </div>

                <div className="col-xl-3 col-md-6 mb-3">
                  <label className="requiredValidator">Last Name</label>
                  <input
                    name="lastName"
                    type="text"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                  {formParam.submitted && (
                    <div className="errorMsg text-start">{formParam.errors.lastName}</div>
                  )}
                </div>
                <div className="col-xl-3 col-md-6 mb-3">
                  <label>DOB</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                      <DatePicker
                        format="DD/MM/YYYY"
                        value={value}
                        sx={{ width: '100%' }}
                        onChange={(newValue) => {
                          setValue(newValue);
                          var d = new Date(dayjs(newValue));
                          setFormData({ ...formData, ['dob']: moment(d).format("DD/MM/YYYY") });
                        }}

                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  {formParam.submitted && (
                    <div className="errorMsg text-start">{formParam.errors.dob}</div>
                  )}
                </div>


                <div className="col-xl-3 col-md-6 mb-3">
                  <label>Sex </label>
                  <select
                    className="form-select form-control dpblock"
                    name="sex"
                    value={formData.sex}
                    onChange={handleInputChange}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="col-xl-3 col-md-6 mb-3">
                  <label>Telephone</label>
                  <input
                    name="telephone"
                    type="text"
                    className="form-control"
                    value={formData.telephone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-xl-3 col-md-6 mb-3">
                  <label>Mobile Tel</label>
                  <input
                    name="mobileTel"
                    type="text"
                    className="form-control"
                    value={formData.mobileTel}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-xl-3 col-md-6 mb-3">
                  <label>Email </label>
                  <input
                    name="email"
                    type="text"
                    className="form-control"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {formParam.submitted && (
                    <div className="errorMsg text-start">{formParam.errors.email}</div>
                  )}
                </div>

                <div className="col-xl-3 col-md-6 mb-3">
                  <label>PPS Number</label>
                  <input
                    name="ppsNumber"
                    type="text"
                    className="form-control"
                    value={formData.ppsNumber}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-12 mt-3">
                  <h4>Address</h4>
                </div>

                <div className="col-xl-3 col-md-6 mb-3">
                  <label>Address Line 1</label>
                  <input
                    name="addressLine1"
                    type="text"
                    className="form-control"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-xl-3 col-md-6 mb-3">
                  <label>Address Line 2</label>
                  <input
                    name="addressLine2"
                    type="text"
                    className="form-control"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-xl-3 col-md-6 mb-3">
                  <label>Address Line 3</label>
                  <input
                    name="addressLine3"
                    type="text"
                    className="form-control"
                    value={formData.addressLine3}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-xl-3 col-md-6 mb-3">
                  <label>City</label>
                  <input
                    name="city"
                    type="text"
                    className="form-control"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-xl-3 col-md-6 mb-3">
                  <label>County</label>
                  <input
                    name="county"
                    type="text"
                    className="form-control"
                    value={formData.county}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-xl-3 col-md-6 mb-3">
                  <label>Post Code</label>
                  <input
                    name="postCode"
                    type="text"
                    className="form-control"
                    value={formData.postCode}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-xl-3 col-md-6 mb-3">
                  <label>Country</label>
                  <input
                    name="country"
                    type="text"
                    className="form-control"
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-xl-3 col-md-6 mb-3">
                  <label>Medical card number</label>
                  <input
                    name="medicalCardNumber"
                    type="text"
                    className="form-control"
                    value={formData.medicalCardNumber}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-xl-3 col-md-6 mb-3">
                  <label>Private Insurance Provider</label>      
                  <select
                    className="form-select form-control dpblock"
                    name="privateInsuranceProvider"
                    value={formData.privateInsuranceProvider}
                    onChange={handleInputChange}
                  >
                    {privateInsuranceProviders.map((option) => {
                      return (
                        <option label={option.label} value={option.value}>
                          {option.label}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="col-xl-3 col-md-6 mb-3">
                  <label>Private Insurance Number</label>
                  <input
                    name="privateInsuranceNumber"
                    type="text"
                    className="form-control"
                    value={formData.privateInsuranceNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-12 mt-3">
                  <h4>GP Details</h4>
                </div>

                <div className="col-xl-3 col-md-6 mb-3">
                  <label>GP Name</label>
                  <input
                    name="gpName"
                    type="text"
                    className="form-control"
                    value={formData.gpName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-xl-3 col-md-6 mb-3">
                  <label>GP Surgery</label>
                  <input
                    name="gpSurgery"
                    type="text"
                    className="form-control"
                    value={formData.gpSurgery}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-xl-3 col-md-6 mb-3">
                  <label>GP Telephone Number</label>
                  <input
                    name="gpTelephoneNumber"
                    type="text"
                    className="form-control"
                    value={formData.gpTelephoneNumber}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-xl-3 col-md-6 mb-3">
                  <label>GP City</label>
                  <input
                    name="gpCity"
                    type="text"
                    className="form-control"
                    value={formData.gpCity}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-xl-3 col-md-6 mb-3">
                  <label>GP Address Line 1</label>
                  <input
                    name="gpAddressLine1"
                    type="text"
                    className="form-control"
                    value={formData.gpAddressLine1}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-xl-3 col-md-6 mb-3">
                  <label>GP Address Line 2</label>
                  <input
                    name="gpAddressLine2"
                    type="text"
                    className="form-control"
                    value={formData.gpAddressLine2}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-xl-3 col-md-6 mb-3">
                  <label>GP Address Line 3</label>
                  <input
                    name="gpAddressLine3"
                    type="text"
                    className="form-control"
                    value={formData.gpAddressLine3}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-xl-3 col-md-6 mb-3">
                  <label>GP Post Code</label>
                  <input
                    name="gpPostCode"
                    type="text"
                    className="form-control"
                    value={formData.gpPostCode}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-xl-3 col-md-6 mb-3">
                  <label>GP Health Mail</label>
                  <input
                    name="gpHealthMail"
                    type="text"
                    className="form-control"
                    value={formData.gpHealthMail}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-12 mt-3">
                  <h4>Consent communication    </h4>
                </div>

                <div className="col-md-3 mb-3">
                  <div class="form-check custom-checkbox-wrapper">
                    <input type="checkbox" name="consentEmail" class="form-check-input" id="checkboxEmail" checked={checkedConsentEmail}

                      onChange={() => setCheckedConsentEmail((state) => !state)}
                    />
                    <label class="form-check-label" for="checkboxEmail">Email</label>
                  </div>
                </div>

                <div className="col-md-3 mb-3">
                  <div class="form-check custom-checkbox-wrapper">
                    <input type="checkbox" name="consentSMS" class="form-check-input" id="checkboxSms" checked={checkedConsentSms}
                      onChange={() => setCheckedConsentSms((state) => !state)}
                    />
                    <label class="form-check-label" for="checkboxSms">SMS</label>
                  </div>
                </div>

                <div className="col-md-3 mb-3">
                  <div class="form-check custom-checkbox-wrapper">
                    <input type="checkbox" name="consentPhone" class="form-check-input" id="checkboxPhone" checked={checkedConsentPhone}
                      onChange={() => setCheckedConsentPhone((state) => !state)}
                    />
                    <label class="form-check-label" for="checkboxPhone">Phone</label>
                  </div>
                </div>

                <div className="col-md-12 mt-3">
                  <div className="btnxscenter">
                    <button className="custom_btn savwidth" type="submit">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;
