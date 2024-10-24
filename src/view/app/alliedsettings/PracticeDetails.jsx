import React, { useEffect, useRef, useState } from "react";
import "../../../assets/css/allied_settings.css";
import Nav from "../../../components/AfterLoginNav/Nav";
import camera from "../../../assets/images/camera.svg";
import Tab from "../../../components/SettingsTab/Tab";
import { Formik, Form, Field, useFormik } from "formik";
import * as yup from "yup";
import placeholder from "../../../assets/images/placeholder.svg";
import { createAxiosInstance } from "../../../api/axiosConfig";
import { PRACTCE_DETAILS_CONTROLER_URL } from "../../../api/Service";
import { useDispatch, useSelector } from "react-redux";
import MapContainer from "../../../components/Map/MapContainer";
import { Toaster, toast } from "react-hot-toast";
import { logout } from "../../../redux/auth/AuthSlice";
import { removeuser } from "../../../redux/user/userSlice";
import { logoutFromHelper } from "../../../api/Helper";
import { useNavigate } from "react-router-dom";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const PracticeDetails = () => {
  const [error_image, setError_image] = useState("");
  const [eircode, setEircode] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      country: "",
      type: "",
      county: "",
      city: "",
      address: "",
      address2: "",
      address3: "",
      eircode: "",
      mainPhone: "",
      practiceEmail: "",
      website: "",
      twitter: "",
      facebook: "",
      id: "",
      addressId: "",
      latitude: "",
      longitude: "",
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .min(2, "Too Short!")
        .max(150, "Too Long!")
        .required("This field is required"),
      country: yup.string().required("This field is required"),
      city: yup.string().required("This field is required"),
      county: yup.string().required("This field is required"),
      eircode: yup.string().required("This field is required"),
      address: yup.string().required("This field is required"),
      address2: yup.string().required("This field is required"),
      type: yup.string().required("Practice Type is required"),

      mainPhone: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Mobile number is required"),
      practiceEmail: yup
        .string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
    }),
    onSubmit: (state) => handleSubmit(state),
  });

  let tenantVal = useSelector((state) => state.auth.user?.tenant);
  if (!tenantVal)
    tenantVal = localStorage.getItem('kinesin-tenant');
  const [selectedImage, setSelectedImage] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleCameraIconClick = () => {
    // Programmatically trigger the file input dialog
    fileInputRef.current.click();
  };

  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const handleFileSelection = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setBase64Image(e.target.result);
      };

      reader.readAsDataURL(file);

      setImage(file);
    }
  };
  console.log("selected image", selectedImage);
  console.log("Image", image);
  console.log("Base 64 image", base64Image);
  const handleSubmit = async (state) => {
    console.log("Values", state);
    console.log("result image", selectedImage);

    // if (selectedImage == null) {
    //   setError_image("Upload Image");
    // }

    try {
      const axiosInstance = createAxiosInstance();

      const address = {
        id: state.addressId,
        tenant: tenantVal,
        latitude: state.latitude,
        longitude: state.longitude,
        addressLine1: state.address,
        addressLine2: state.address2,
        addressLine3: state.address3,
        city: state.city,
        postCode: state.eircode,
        county: state.county,
        country: state.country,
      };
      const {
        name,
        type,
        mainPhone,
        practiceEmail,
        website,
        twitter,
        facebook,
        id,
        addressId,
      } = state;
      const requestData = {
        name,
        description: type,
        mainPhone,
        practiceEmail,
        website,
        twitter,
        facebook,
        tenant: tenantVal,
        practicePicture: base64Image, // Include the base64-encoded image as a string
        address: address,
        phone2: "",
        outOfHoursPhone: "",
        addressId,
        id,
      };

      console.log('requestData : ' + requestData);

      const response = await axiosInstance.post(
        `${tenantVal}${PRACTCE_DETAILS_CONTROLER_URL}`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (formik.values.id) {
        toast.success("Details updated successfully");
      } else {
        toast.success("New Details created successfully");
      }
    } catch (error) {
      errorHandling(error);
    }
  };

  console.log("formik", formik);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.get(
          `${tenantVal}${PRACTCE_DETAILS_CONTROLER_URL}`
        );
        console.log("response Data practice details page=>", response);
        const practiceData = response.data;
        const imageData = practiceData[0].practicePicture;
        setBase64Image(imageData);
        setDisplayImage(imageData);
        // formik.setValues(practiceData[0]);
        formik.setFieldValue("name", practiceData[0].name);
        formik.setFieldValue("mainPhone", practiceData[0].mainPhone);
        formik.setFieldValue("type", practiceData[0].description);
        formik.setFieldValue("practiceEmail", practiceData[0].practiceEmail);
        formik.setFieldValue("facebook", practiceData[0].facebook);
        formik.setFieldValue("website", practiceData[0].website);
        formik.setFieldValue("twitter", practiceData[0].twitter);
        formik.setFieldValue("id", practiceData[0].id);
        formik.setFieldValue("addressId", practiceData[0].addressId);
        // description
        formik.setFieldValue("eircode", practiceData[0].address.postCode);
        formik.setFieldValue("address", practiceData[0].address.addressLine1);
        formik.setFieldValue("address2", practiceData[0].address.addressLine2);
        formik.setFieldValue("address3", practiceData[0].address.addressLine3);
        formik.setFieldValue("city", practiceData[0].address.city);
        formik.setFieldValue("country", practiceData[0].address.country);
        formik.setFieldValue("county", practiceData[0].address.county);
      } catch (error) {
        errorHandling(error);
      }
    };
    fetchDetails();
  }, [tenantVal]);

  //  change the eir code value through the changes in map poin
  const handleEircodeChange = (newEircode) => {
    // formik.setValues.eircode(newEircode);
    formik.setFieldValue("eircode", newEircode);
  };
  const handleLocationChange = (newLocation) => {
    formik.setFieldValue("latitude", newLocation.lat);
    formik.setFieldValue("longitude", newLocation.lng);
  };
  console.log("formik latitude", formik.values.latitude);
  console.log("formik longtitude", formik.values.longitude);

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
      {/* <Nav /> */}
      <div className="dashBcontbody">
        <div className="patientsheading">
          <div className="patientsearchbar practice_details">
            <h3 className="name">Settings - Practice Details</h3>
          </div>
        </div>

        {/* start practice_details section */}
        <div className="signup_threebox practice_detailssect mt-0">
          <Tab />
          <div className="tab-content ptdetalistabcont" id="pills-tabContent">
            {/* start Practice Details */}
            <div className=" show active sectflex">
              <div className="dtl_uploadimgsect" >
                <div className="upimgbox" onClick={handleCameraIconClick}>
                  <button
                    type="button"
                    className="imgbtnup"
                    // onClick={handleCameraIconClick}
                  >
                    <img src={camera} alt="" />
                  </button>

                  {base64Image ? (
                    <div className="cercelimg">
                      <img
                        // src={URL.createObjectURL(selectedImage)}
                        src={base64Image}
                        className="selected-img "
                      />
                    </div>
                  ) : (
                    <div className="cercelimg">
                      <img src={displayImage} className="selected-img" />
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleFileSelection}
                />
                {/* {selectedImage == null ? (
                  <div className="errorstext text-center">{error_image}</div>
                ) : (
                  ""
                )}{" "} */}
              </div>

              <div className="tabdtformsect signup_threebox addpatientlist">
                {/* input form start  */}
                <form name="form" onSubmit={formik.handleSubmit} 
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                >
                  <div className="row">
                    <div className="col-xl-6 mb-3">
                      <label className="requiredValidator">Practice Name</label>
                      <input
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder="Practice Name"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                      />
                      {formik.errors.name && formik.touched.name ? (
                        <div className="errorstext">{formik.errors.name}</div>
                      ) : null}
                    </div>
                    <div className="col-xl-6 mb-3 formfloating">
                      <label for="floatingSelect" className="requiredValidator">Practice Type</label>
                      <select
                        as="select"
                        className="form-select form-control custom-select"
                        id="type"
                        name="type"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.type}
                      >
                        <option>Select</option>
                        <option value="General Physician">
                          General Physician
                        </option>
                        <option value="Dentist">Dentist</option>
                        <option value="Physio">Physio</option>
                      </select>
                      {formik.errors.type && formik.touched.type ? (
                        <div className="errorstext">{formik.errors.type}</div>
                      ) : null}
                    </div>
                    <div className="col-md-12">
                      <label className="requiredValidator">Practice Address</label>
                    </div>
                    <div className="col-xl-4 mb-3">
                      <input
                        name="address"
                        type="text"
                        className="form-control"
                        placeholder="First line"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.address}
                      />
                      {formik.errors.address && formik.touched.address ? (
                        <div className="errorstext">
                          {formik.errors.address}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-4 mb-3">
                      <input
                        name="address2"
                        type="text"
                        className="form-control"
                        placeholder="Second line"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.address2}
                      />
                      {formik.errors.address2 && formik.touched.address2 ? (
                        <div className="errorstext">
                          {formik.errors.address2}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-4 mb-3">
                      <input
                        name="address3"
                        type="text"
                        className="form-control"
                        placeholder="Third line"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.address3}
                      />
                    </div>
                    {/* <div className="col-xl-6 mb-3">
                      <label className="requiredValidator">Country</label>
                      <input
                        name="country"
                        type="text"
                        className="form-control"
                        placeholder="Country"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.country}
                      />
                      {formik.errors.country && formik.touched.country ? (
                        <div className="errorstext">
                          {formik.errors.country}
                        </div>
                      ) : null}
                    </div> */}
                     <div className="col-xl-6 mb-3 formfloating">
                      <label for="floatingSelect" className="requiredValidator">County</label>
                      <select
                        className="form-select form-control"
                        as="select"
                        id="county"
                        name="county"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.county}
                      >
                        <option>Select</option>
                        <option
                          value="Dublin"
                          style={{ padding: "18px !important" }}
                        >
                          Dublin
                        </option>
                        <option
                          value="Wicklow"
                          style={{ padding: "18px !important" }}
                        >
                          Wicklow
                        </option>
                        <option value="Wexford">Wexford</option>
                        <option value="Mayo">Mayo</option>
                        <option value="Kildare">Kildare</option>
                      </select>
                      {formik.errors.county && formik.touched.county ? (
                        <div className="errorstext">{formik.errors.county}</div>
                      ) : null}
                    </div>
                    <div className="col-xl-6 mb-3">
                      <label className="requiredValidator">City</label>
                      <input
                        name="city"
                        type="text"
                        className="form-control"
                        placeholder="City"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.city}
                      />
                      {formik.errors.city && formik.touched.city ? (
                        <div className="errorstext">{formik.errors.city}</div>
                      ) : null}
                    </div>
                    <div className="col-xl-6 mb-3">
                      <label className="requiredValidator">Country</label>
                      <input
                        name="country"
                        type="text"
                        className="form-control"
                        placeholder="Country"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.country}
                      />
                      {formik.errors.country && formik.touched.country ? (
                        <div className="errorstext">
                          {formik.errors.country}
                        </div>
                      ) : null}
                    </div>
                    {/* <div className="col-xl-6 mb-3 formfloating">
                      <label for="floatingSelect" className="requiredValidator">County</label>
                      <select
                        className="form-select form-control"
                        as="select"
                        id="county"
                        name="county"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.county}
                      >
                        <option>Select</option>
                        <option
                          value="Dublin"
                          style={{ padding: "18px !important" }}
                        >
                          Dublin
                        </option>
                        <option
                          value="Wicklow"
                          style={{ padding: "18px !important" }}
                        >
                          Wicklow
                        </option>
                        <option value="Wexford">Wexford</option>
                        <option value="Mayo">Mayo</option>
                        <option value="Kildare">Kildare</option>
                      </select>
                      {formik.errors.county && formik.touched.county ? (
                        <div className="errorstext">{formik.errors.county}</div>
                      ) : null}
                    </div> */}
                    <div className="col-xl-6 mb-3">
                      <label className="requiredValidator">Eircode</label>
                      <input
                        name="eircode"
                        type="text"
                        className="form-control"
                        placeholder="Eircode"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.eircode}
                      />
                      {formik.errors.eircode && formik.touched.eircode ? (
                        <div className="errorstext">
                          {formik.errors.eircode}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-6 mb-3">
                      <label className="requiredValidator">Practice phone</label>
                      <input
                        name="mainPhone"
                        type="number"
                        className="form-control"
                        placeholder="Phone"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.mainPhone}
                      />
                      {formik.errors.mainPhone && formik.touched.mainPhone ? (
                        <div className="errorstext">
                          {formik.errors.mainPhone}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-6 mb-3">
                      <label className="requiredValidator">Practice email</label>
                      <input
                        name="practiceEmail"
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.practiceEmail}
                      />
                      {formik.errors.practiceEmail &&
                        formik.touched.practiceEmail ? (
                        <div className="errorstext">
                          {formik.errors.practiceEmail}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-12 mb-3">
                      <label>Practice Website</label>
                      <input
                        name="website"
                        type="text"
                        className="form-control"
                        placeholder="Website"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.website}
                      />
                    </div>
                    <div className="col-xl-12">
                      <label>External Social Links</label>
                    </div>
                    <div className="col-xl-6 mb-3">
                      <input
                        name="twitter"
                        type="text"
                        className="form-control"
                        placeholder="twitter"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.twitter}
                      />
                      {formik.errors.twitter && formik.touched.twitter ? (
                        <div className="errorstext">
                          {formik.errors.twitter}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-6 mb-3">
                      <input
                        name="facebook"
                        type="text"
                        className="form-control"
                        placeholder="facebook"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.facebook}
                      />
                      {formik.errors.facebook && formik.touched.facebook ? (
                        <div className="errorstext">
                          {formik.errors.facebook}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-12 mt-3">
                      <div className="btnxscenter">
                        <button className="custom_btn savwidth" type="submit">
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                {/* input from end */}
              </div>
              {/* start locationdetails */}
              <div className="locationdetails">
                {/* <div className="locationbox">
                  <div className="locationicon">
                    <img src={placeholder} alt="" />
                  </div>
                  <div className="locationtext">
                    <p>Location:</p>
                    <h6>Paco Arcos Beach</h6>
                  </div>
                </div> */}
                {/* <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d58910.57067467575!2d88.4286034!3d22.657119100000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1690179345522!5m2!1sen!2sin"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="mapstyle"
                ></iframe> */}
                <MapContainer
                  eircode={formik.values.eircode}
                  onEircodeChange={handleEircodeChange}
                  onLocationChange={handleLocationChange}
                />
              </div>
              {/* end locationdetails */}
            </div>
            {/* end Practice Details */}
          </div>
        </div>
        {/* end practice_details section */}
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
};

export default PracticeDetails;
