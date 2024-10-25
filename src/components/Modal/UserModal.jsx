import React, { useEffect, useRef, useState } from "react";
import camera from "../../assets/images/camera.svg";
import { useSelector } from "react-redux";

import $ from "jquery";


// List of permissions//
const permissionList = [
  {
    id: 1,
    listName: "Home Page",
  },
  {
    id: 2,
    listName: "Patient File",
  },
  {
    id: 3,
    listName: "Tasks",
  },
  {
    id: 4,
    listName: "Referrals",
  },
  {
    id: 5,
    listName: "Prescriptions",
  },
  {
    id: 6,
    listName: "Appointments",
  },
  {
    id: 7,
    listName: "Users",
  },
  {
    id: 8,
    listName: "Payments",
  },
  {
    id: 9,
    listName: "Settings",
  },
  {
    id: 10,
    listName: "SMS",
  },
  {
    id: 11,
    listName: "Email",
  },
];
// List of permissions//

const roles = [
  { 'label': 'Doctor', 'value': 'Doctor' },
  { 'label': 'Nurse', 'value': 'nurse' },
  { 'label': 'Receptionist', 'value': 'receptionist' },
  { 'label': 'Admin', 'value': 'admin' }
];

const UserModal = ({
  headerTitle,
  handleSaveTask,
  showModal,
  setShowModal,
  editTaskId,
  task,
  createNewUser
}) => {
  const closeRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null); //State for take image//
  // States for modal form fields//
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
  // States for modal form fields//


  const [activePermissions, setActivePermissions] = useState([]); //  For toggle switch on/off State//
  let tenantVal = useSelector((state) => state.auth.user?.tenant);
  if (!tenantVal)
    tenantVal = localStorage.getItem('kinesin-tenant');

  //State for permissions//
  const [permissions, setPermissions] = useState({
    provideSystemAccess: false,
    showOnTeamProfilePage: false,
    roster: false
  });

  //Add/Edit user conditionally//
  useEffect(() => {

    if (editTaskId) {
      const selectedTask = task.find((task) => task.id === editTaskId);
      console.log(selectedTask);
      if (selectedTask) {
        console.log("inside selected task");
        setTitle(selectedTask.title ? selectedTask.title : "");
        setFirstName(selectedTask.firstName ? selectedTask.firstName : "");
        setLastName(selectedTask.lastName ? selectedTask.lastName : "");
        setRole(selectedTask.mainRole ? selectedTask.mainRole : roles[0].value);
        setSpecialisation(selectedTask.specialism ? selectedTask.specialism : "");
        setQualifications(selectedTask.qualificationLetters ? selectedTask.qualificationLetters : "");
        setMobile(selectedTask.mobile ? selectedTask.mobile : "");
        setHomeNumber(selectedTask.homeNumber ? selectedTask.homeNumber : "");
        setEmail(selectedTask.email ? selectedTask.email : "");
        setBio(selectedTask.bio ? selectedTask.bio : "");
        setSelectedImage(selectedTask.profilePic ? selectedTask.profilePic : null);
        setPermissions({
          provideSystemAccess: selectedTask.systemAccess,
          roster: selectedTask.roster,
          showOnTeamProfilePage: selectedTask.showOnTeam,
        });
        setActivePermissions(selectedTask.activePermissions || []);
      }
    } else {
      // vishvas
      setTitle("");
      setFirstName("");
      setLastName("");
      setRole(roles[0].value);
      setSpecialisation("");
      setQualifications("");
      setMobile("");
      setHomeNumber("");
      setEmail("");
      setBio("");
      setSelectedImage(null);
      setPermissions({
        provideSystemAccess: false,
        roster: false,
        showOnTeamProfilePage: false,
      });
      setActivePermissions([]);
    }
  }, [editTaskId, task]);
  //Add/Edit user conditionally//


  const [formParam, setFormParam] = useState(
    {
      errors: {
        email: '',
      },
      submitted: false
    }
  );

  const resetFormParam = (e) => {
    setFormParam({
      errors: {
        email: '',
      },
      submitted: false
    });
  }

  const validateForm = () => {
    let formIsValid = true;
    let f = Object.assign({}, formParam);
    f.errors.firstName = '';
    f.errors.lastName = '';
    // f.errors.specialisation = '';
    // f.errors.qualifications = '';
    // f.errors.mobile = '';
    f.errors.email = '';
    // f.errors.homeNumber = '';


    if (!firstName) {
      formIsValid = false;
      f.errors.firstName = "*Please enter first name.";
    }
    if (!lastName) {
      formIsValid = false;
      f.errors.lastName = "*Please enter last name.";
    }
    // if (!specialisation) {
    //   formIsValid = false;
    //   f.errors.specialisation = "*Please enter specialisation.";
    // }
    // if (!qualifications) {
    //   formIsValid = false;
    //   f.errors.qualifications = "*Please enter qualifications.";
    // }
    // if (!mobile) {
    //   formIsValid = false;
    //   f.errors.mobile = "*Please enter mobile.";
    // }
    // if (!homeNumber) {
    //   formIsValid = false;
    //   f.errors.homeNumber = "*Please enter home number.";
    // }
    if (!email) {
      formIsValid = false;
      f.errors.email = "*Please enter email.";
    }
    // if (!homeNumber) {
    //   formIsValid = false;
    //   f.errors.homeNumber = "*Please enter home number.";
    // }
    setFormParam(f);
    return formIsValid;
  }

  useEffect(() => {
    validateForm();
  }, [firstName, lastName, specialisation, qualifications, mobile, email, homeNumber]);

  // Save Handler//
  const handleSave = (e) => {
    e.preventDefault();

    formParam.submitted = true;
    if (validateForm()) {
      formParam.submitted = true;
    } else
      return;

    closeRef.current.click()

    const newUser = {
      id: editTaskId || Date.now(),
      title: title,
      firstName: firstName,
      lastName: lastName,
      role: role,
      specialisation: specialisation,
      qualifications: qualifications,
      mobile: mobile,
      homeNumber: homeNumber,
      email: email,
      bio: bio,
      image: selectedImage,
      permissions: {
        provideSystemAccess: permissions.provideSystemAccess,
        roster: permissions.roster,
        showOnTeamProfilePage: permissions.showOnTeamProfilePage,
      },
      activePermissions: activePermissions,
    };
    const modifiedUser = {
      title: newUser.title,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      mainRole: newUser.role,
      middleNames: "",
      qualification: "",
      qualificationLetters: newUser.qualifications,
      specialism: newUser.specialisation,
      bio: newUser.bio,
      mobile: newUser.mobile,
      email: newUser.email,
      homeNumber: newUser.homeNumber,
      profilePic: selectedImage,
      tenant: tenantVal,
      // practiceId: tenantVal,
      systemAccess: newUser.permissions.provideSystemAccess,
      showOnTeam: newUser.permissions.showOnTeamProfilePage,
      roster: newUser.permissions.roster,
    };
    // handleSaveTask(newUser);
    console.log(modifiedUser, "==>173");
    createNewUser(modifiedUser);

    setSelectedImage(null);
    setTitle("");
    setFirstName("");
    setLastName("");
    setRole("Doctor");
    setSpecialisation("");
    setQualifications("");
    setMobile("");
    setEmail("");
    setBio("");
    setShowModal(false);
    setHomeNumber();
    setPermissions({
      provideSystemAccess: false,
      showOnTeamProfilePage: false,
      roster: false,
    });

    $('#idClosePopup').trigger("click");
  };
  // Save Handler//

  // Take image from System//
  const fileInputRef = useRef(null);
  const handleCameraIconClick = () => {
    // Programmatically trigger the file input dialog
    fileInputRef.current.click();
  };
  const handleFileSelection = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle the selected file (you can store it in state or process it as needed)
      // setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        // e.target.result contains the base64-encoded image data
        setSelectedImage(e.target.result);
      };

      // Read the selected image file as data URL (base64)
      reader.readAsDataURL(file);
    }
  };
  // Take image from System//

  // For Toogle Switch Handler start//
  const handleChange = (itemId) => {
    setActivePermissions((prevActive) => {
      const updatedActive = [...prevActive];
      const index = updatedActive.indexOf(itemId);
      if (index === -1) {
        updatedActive.push(itemId);
      } else {
        updatedActive.splice(index, 1);
      }
      return updatedActive;
    });
  };
  // For Toogle Switch Handler end//

  return (
    <div className="modal userdetailsmodal custom-modal-wrap" id="userModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{headerTitle}</h4>
            <button
              id='idClosePopup'
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={resetFormParam}
              ref={closeRef}
            ></button>
          </div>
          {/* start modal-body */}
          <div className="modal-body">
            <div className="tab-content ptdetalistabcont" id="pills-tabContent">
              <div className=" show active sectflex">
                {/* Top section of modal body */}
                <div className="dtl_uploadimgsect">
                  <div className="upimgbox"
                      onClick={handleCameraIconClick}
                      style={{ cursor: 'pointer' }}
                      >
                    <button
                      type="button"
                      className="imgbtnup"
                      onClick={handleCameraIconClick}
                    >
                      <img src={camera} alt="" />
                    </button>
                    {/* {selectedImage && (
                      <div className="cercelimg">
                        <img
                          src={selectedImage}
                          alt="Selected"
                          className="selected-img"
                        />
                      </div>
                    )} */}
                    {selectedImage && (
                      <div className="cercelimg">
                        <img
                          src={selectedImage}
                          alt="No Profile Picture selected"
                          className="selected-img"
                        />
                      </div>
                    ) }
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleFileSelection}
                  />
                  <ul>
                    <li>
                      <div className="form-group">
                        <label className="agree_check">
                          <input
                            type="checkbox"
                            name="tandc"
                            checked={permissions.provideSystemAccess}
                            onChange={(e) =>
                              setPermissions({
                                ...permissions,
                                provideSystemAccess: e.target.checked,
                              })
                            }
                          />
                          <span className="checkmark"></span>
                          <p>Provide system access</p>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="form-group">
                        <label className="agree_check">
                          <input
                            type="checkbox"
                            name="tandc"
                            checked={permissions.showOnTeamProfilePage}
                            onChange={(e) =>
                              setPermissions({
                                ...permissions,
                                showOnTeamProfilePage: e.target.checked,
                              })
                            }
                          />
                          <span className="checkmark"></span>
                          <p>Show on team profile page</p>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="form-group">
                        <label className="agree_check">
                          <input
                            type="checkbox"
                            name="tandc"
                            checked={permissions.roster}
                            onChange={(e) =>
                              setPermissions({
                                ...permissions,
                                roster: e.target.checked,
                              })
                            }
                          />
                          <span className="checkmark"></span>
                          <p>Show on appointments page</p>
                        </label>
                      </div>
                    </li>
                    <li></li>
                  </ul>
                </div>
                {/* Top section of modal body */}

                {/* Modal form fields */}
                <div className="tabdtformsect signup_threebox addpatientlist">
                  <form>
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
                          <option value="mr.">Dr.</option>
                        </select>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="requiredValidator">First name</label>
                        <input
                          name="firstName"
                          type="text"
                          className="form-control"
                          placeholder="First name"
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
                          name="lastName"
                          type="text"
                          className="form-control"
                          placeholder="Last name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                        {formParam.submitted && (
                          <div className="errorMsg text-start">{formParam.errors.lastName}</div>
                        )}
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="requiredValidator">Role</label>
                        <select
                          type="text"
                          className="form-select form-control"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                        >
                          {roles.map((option) => {
                            return (
                              <option label={option.label} value={option.value}>
                                {option.label}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label 
                        >Specialisation</label>
                        <input
                          name="specialisation"
                          type="text"
                          className="form-control"
                          placeholder="Dermatology"
                          value={specialisation}
                          onChange={(e) => setSpecialisation(e.target.value)}
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label 
                        >Qualifications</label>
                        <input
                          name="qualifications"
                          type="text"
                          className="form-control"
                          placeholder="Medical Doctor"
                          value={qualifications}
                          onChange={(e) => setQualifications(e.target.value)}
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label
                        >Mobile</label>
                        <input
                          name="mobile"
                          type="number"
                          className="form-control"
                          placeholder="Mobile number"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="requiredValidator">Email</label>
                        <input
                          name="email"
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

                          placeholder="Specialist in dermatology etc."
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="col-md-12 mt-3">
                        <div className="btnxscenter">
                          <button
                            className="custom_btn savwidth"
                            type="submit"

                            // data-bs-dismiss="modal"
                            onClick={handleSave}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                {/* Modal form fields */}

                {/* Permission Section */}
                <div className="permissionsbox">
                  <h4>Permissions</h4>
                  <ul className="permissionsList">
                    {permissionList.map((item, i) => (
                      <li key={item.id}>
                        <h5>{item.listName}:</h5>
                        <div className="form-check form-switch onoff_area">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id={`flexSwitchCheckDefault${item.id}`}
                            onChange={() => handleChange(item.id)}
                            checked={activePermissions.includes(item.id)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`flexSwitchCheckDefault${item.id}`}
                          >
                            {activePermissions.includes(item.id) ? "On" : "Off"}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Permission Section */}
              </div>
            </div>
          </div>
          {/* end modal-body */}
        </div>
      </div>
    </div>

  );
};

export default UserModal;
