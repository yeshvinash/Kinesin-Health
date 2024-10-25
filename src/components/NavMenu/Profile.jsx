import React, { useEffect, useRef, useState } from "react";
import Nav from "../AfterLoginNav/Nav";
import camera from "../../assets/images/camera.svg";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { createAxiosInstance } from "../../api/axiosConfig";
import { STAFF_MEMBERS_CONTROLER_URL, WHO_AM_I } from "../../api/Service";
import toast, { Toaster } from "react-hot-toast";
import { logoutFromHelper } from "../../api/Helper";
import { logout } from "../../redux/auth/AuthSlice";
import { removeuser } from "../../redux/user/userSlice";
const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let tenantVal = useSelector((state) => state.auth.user?.tenant);
  if (!tenantVal)
    tenantVal = localStorage.getItem('kinesin-tenant');

  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState("");

  // States for modal form fields//
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [specialisation, setSpecialisation] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [mobile, setMobile] = useState("");
  const [homeNumber, setHomeNumber] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  const [formParam, setFormParam] = useState(
    {
      errors: {
        email: '',
      },
      submitted: false
    }
  );

  const validateForm = () => {

    let formIsValid = true;
    let f = Object.assign({}, formParam);
    f.errors.firstName = '';
    f.errors.lastName = '';
    f.errors.email = '';

    if (!firstName) {
      formIsValid = false;
      f.errors.firstName = "*Please enter first name.";
    }
    if (!lastName) {
      formIsValid = false;
      f.errors.lastName = "*Please enter last name.";
    }
    if (!email) {
      formIsValid = false;
      f.errors.email = "*Please enter email.";
    }
    setFormParam(f);
    return formIsValid;
  }

  useEffect(() => {
    validateForm();
  }, [firstName, lastName, specialisation, qualifications, mobile, homeNumber, email]);

  const fetchProfileInfo = async () => {
    try {
      const axiosInstance = createAxiosInstance(true);
      const response = await axiosInstance.get(
        `${WHO_AM_I}`
      );
      if (response && response.data) {
        if (response.data.staffMember) {
          setId(response.data.staffMember.id);
          setTitle(response.data.staffMember.title);
          setFirstName(response.data.staffMember.firstName);
          setLastName(response.data.staffMember.lastName);
          setSpecialisation(response.data.staffMember.specialism);
          setQualifications(response.data.staffMember.qualification);
          setMobile(response.data.staffMember.mobile);
          setHomeNumber(response.data.staffMember.homeNumber);
          setEmail(response.data.staffMember.email);
          setBio(response.data.staffMember.bio);
          setBase64Image(response.data.staffMember.profilePic);
        } else {
          setId(response.data.id);
          setTitle(response.data.title);
          setFirstName(response.data.name);
          setLastName(response.data.lastName);
          setSpecialisation(response.data.specialism);
          setQualifications(response.data.qualification);
          setMobile(response.data.mobile);
          setHomeNumber(response.data.homeNumber);
          setEmail(response.data.email);
          setBio(response.data.bio);
          setBase64Image(response.data.profilePic);
        }       
      }
    } catch (error) {
     errorHandling(error)
    }
  };

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const fileInputRef = useRef(null);
  const handleCameraIconClick = () => {
    // Programmatically trigger the file input dialog
    fileInputRef.current.click();
  };
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    formParam.submitted = true;
    if (validateForm()) {
      formParam.submitted = true;
    } else
      return;
    try {
      let obj = {
        'id': id,
        'tenant': tenantVal,
        'mobile': mobile,
        'email': email,
        'homeNumber': homeNumber,
        'qualification': qualifications,
        'firstName': firstName,
        'lastName': lastName,
        'title': title,
        'bio': bio,
        'specialism': specialisation,
        'profilePic': base64Image
      };
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.post(
        `${tenantVal}${STAFF_MEMBERS_CONTROLER_URL}`,
        obj
      );
      setTimeout(() => {
        navigate("/allied_home",{state: {showToast : true}});
      }, 700);
    } catch (error) {
      errorHandling(error)
    }
  };

  const cancelClick = async (e) => {
    navigate("/allied_home",{state: {showToast : false}});
  }
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
  return (
    <div>
      {/* <Nav /> */}
      <Toaster position="top-center" reverseOrder={false} />
      <div className="dashBcontbody">
        <div className="patientsheading dpblock">
          <div className="patientsearchbar">
            <h3 className="name">Profile Settings</h3>
          </div>
        </div>
        <div className="signup_threebox practice_detailssect mt-0">
          <div className=" show active sectflex">
            <div className="dtl_uploadimgsect">
              <div className="upimgbox"  onClick={handleCameraIconClick}>
                <button
                  type="button"
                  className="imgbtnup"
                >
                  <img src={camera} alt="" />
                </button>

                {selectedImage ? (

                  <div className="cercelimg">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      className="selected-img"
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="cercelimg">
                    <img src={base64Image} className="selected-img" alt="" />
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
            </div>

            <div className="tabdtformsect signup_threebox addpatientlist profile-content-wrap">
              <form onSubmit={handleFormSubmit}>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="requiredValidator">Title</label>
                    <select
                      type="text"
                      className="form-select form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    >
                      <option value="mr.">Mr.</option>
                      <option value="ms">Ms.</option>
                      <option value="mrs">Mrs.</option>
                      <option value="miss">Miss.</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="requiredValidator">First name</label>
                    <input
                      name="fullname"
                      type="text"
                      className="form-control"
                      placeholder="Doe"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    {formParam.submitted && (
                      <div className="errorMsg text-start">{formParam.errors.firstName}</div>
                    )}
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="requiredValidator">Last name</label>
                    <input
                      name="fullname"
                      type="text"
                      className="form-control"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    {formParam.submitted && (
                      <div className="errorMsg text-start">{formParam.errors.lastName}</div>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label 
                    >Qualifications</label>
                    <input
                      name="fullname"
                      type="text"
                      className="form-control"
                      placeholder="Medical Doctor"
                      value={qualifications}
                      onChange={(e) => setQualifications(e.target.value)}
                    />
                    {formParam.submitted && (
                      <div className="errorMsg text-start">{formParam.errors.qualifications}</div>
                    )}
                  </div>
                  <div className="col-md-4 mb-3">
                    <label 
                    >Mobile</label>
                    <input
                      name="fullname"
                      type="number"
                      className="form-control"
                      placeholder="Mobile number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                    {formParam.submitted && (
                      <div className="errorMsg text-start">{formParam.errors.mobile}</div>
                    )}
                  </div>
                  <div className="col-md-4 mb-3">
                    <label 
                    >Home Number</label>
                    <input
                      name="fullname"
                      type="number"
                      className="form-control"
                      placeholder="Home Number"
                      value={homeNumber}
                      onChange={(e) => setHomeNumber(e.target.value)}
                    />
                    {formParam.submitted && (
                      <div className="errorMsg text-start">{formParam.errors.homeNumber}</div>
                    )}
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="requiredValidator">Email</label>
                    <input
                      name="fullname"
                      type="email"
                      className="form-control"
                      placeholder="Medical Doctor"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {formParam.submitted && (
                      <div className="errorMsg text-start">{formParam.errors.email}</div>
                    )}
                  </div>
                  <div className="col-md-12 mb-3">
                    <label>Bio</label>
                    <textarea
                      className="form-control textareaform-control"
                      rows="5"
                      id="comment"
                      name="text"
                      placeholder="Specialist in dermatology etc."
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="col-md-12 mt-3">
                    <div className="btnxscenter profile-btn-wrap">
                      <button className="custom_btn savwidth" type="submit">
                        Save
                      </button>
                      <button
                        className="cancelglobal savwidth gap12"
                        onClick={cancelClick}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
