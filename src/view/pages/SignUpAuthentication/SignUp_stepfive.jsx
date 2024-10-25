import React, { useState } from "react";
import ProgressStep from "../../../components/ProgressStep";
import Pagination from "../../../components/Pagination";
import camera from "../../../assets/images/camera.svg";
import moment from "moment";

const serviceOption = [
  {
    id: 1,
    serviceName: "GP",
  },
  {
    id: 2,
    serviceName: "Dental",
  },
  {
    id: 3,
    serviceName: "Blood Test",
  },
  {
    id: 4,
    serviceName: "Blood Pressure",
  },
  {
    id: 5,
    serviceName: "Vaccine",
  },
];
const professionalOption = [
  {
    id: 1,
    professionalName: "Doctor",
  },
  {
    id: 2,
    professionalName: "Physio",
  },
  {
    id: 3,
    professionalName: "Nurse",
  },
  {
    id: 4,
    professionalName: "Councillor",
  },
];

const qualificationOption = [
  {
    id: 1,
    qualification: "BSc in Medicine",
  },
  {
    id: 2,
    qualification: "MSc in Medicine",
  },
  {
    id: 3,
    qualification: "Phd FRCPI",
  },
];

const daysOption = [
  {
    id: 1,
    name: "Dr John Travers",
    day: "Monday",
  },
  {
    id: 2,
    name: "Dr John Travers",
    day: "Tuesday",
  },
  {
    id: 3,
    name: "Dr John Travers",
    day: "Wednesday",
  },
  {
    id: 4,
    name: "Dr John Travers",
    day: "Thursday",
  },
  {
    id: 5,
    name: "Dr John Travers",
    day: "Friday",
  },
  {
    id: 6,
    name: "Dr John Travers",
    day: "Saturday",
  },
  {
    id: 7,
    name: "Dr John Travers",
    day: "Sunday",
  },
];

const SignUp_stepfive = () => {
  //  For toggle switch enable/disable State//
  const [active, setActive] = useState([]);
  //  For toggle switch enable/disable State//

  // For pagination state//
  const [currentPage, setCurrentPage] = useState(1);
  // For pagination state//
  const [selectedImage, setSelectedImage] = useState(null);

  // For time slots start//
  // Start Time slots//
  const startTime = moment("9:00 AM", "h:mm A");
  const endTime = moment("5:00 PM", "h:mm A");
  const timeSlots1 = [];
  const [selectedTime, setSelectedTime] = useState(null);

  const handleTimeSlotClick = (time) => {
    setSelectedTime(time);
    console.log(time);
  };
  while (startTime <= endTime) {
    const time = startTime.format("HH:mm");
    timeSlots1.push(
      <option
        key={time}
        onClick={() => handleTimeSlotClick(time)}
        className={selectedTime === time ? "active" : ""}
      >
        {startTime.format("HH:mm")}
      </option>
    );
    startTime.add(15, "minutes");
  } // Start Time slots//

  //  End Time slots//
  const startTimeone = moment("5:00 PM", "h:mm A");
  const endTimeone = moment("11:59 PM", "h:mm A");

  const endTimeslots = [];
  while (startTimeone <= endTimeone) {
    const time = startTimeone.format("HH:mm");
    endTimeslots.push(
      <option
        key={time}
        // onClick={() => handleTimeSlotClick(time)}
        // className={selectedTime === time ? "active" : ""}
      >
        {startTimeone.format("HH:mm")}
      </option>
    );
    startTimeone.add(15, "minutes");
  } //  End Time slots//

  // For time slots end//

  // For Toogle Switch Handler start//
  const handleChange = (itemId) => {
    setActive((prevActive) => {
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

  const handleImageSelect = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = event.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
    };
    input.click();
  };

  // For Pagination//
  const itemsPerPage = 5; // Number of items to display per page
  // Calculate the total number of pages based on the number of items and itemsPerPage
  const totalPages = Math.ceil(daysOption.length / itemsPerPage);
  // Get the current items to display based on the currentPage
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = daysOption.slice(indexOfFirstItem, indexOfLastItem);
  // For Pagination//

  return (
    <>
      <div className="signup_three">
        <div className="container">
          <div className="whitboxbg addservicewhitbox">
            {/* Progress Step */}
            <ProgressStep activeStep={5} />
            {/* Progress Step */}

            {/* Add Doctor/Staff*/}
            <div className="add_servicesformbox">
              <div className="add_serviceheading">
                <h2>Add Doctor/Staff</h2>
              </div>

              <form action="#">
                <div className="addprofileimg">
                  <div className="imgboxreletiv">
                    <div className="addproimgbox">
                      {selectedImage ? (
                        <img src={selectedImage} alt="Selected Profile" />
                      ) : null}
                    </div>
                    <div className="camaraicon" onClick={handleImageSelect}>
                      <img src={camera} alt="" />
                    </div>
                  </div>

                  <h6>Add profile photo</h6>
                </div>
                <div className="addbox">
                  <div className="formfloating">
                    <label htmlFor="floatingInput1">Title*</label>
                    <input
                      name="serviceName"
                      type="text"
                      className="form-control"
                      placeholder="Travers"
                    />
                  </div>
                  <div className="formfloating">
                    <label htmlFor="floatingInput4">First name*</label>
                    <input
                      name="price"
                      type="text"
                      className="form-control"
                      placeholder="Doe"
                    />
                  </div>
                  <div className="formfloating">
                    <label htmlFor="floatingSelect">Services Offered</label>
                    <select className="form-select form-control" name="vat">
                      <option>Select a Service</option>
                      {serviceOption.map((name, i) => (
                        <option key={name.id}>{name.serviceName}</option>
                      ))}
                    </select>
                  </div>
                  <div className="formfloating">
                    <label htmlFor="floatingSelect">Professional Type</label>
                    <select className="form-select form-control" name="vat">
                      <option>Select a Service</option>
                      {professionalOption.map((type) => (
                        <option key={type.id}>{type.professionalName}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="addbox">
                  <div className="formfloating flex50">
                    <label htmlFor="floatingSelect">Qualifications</label>
                    <select className="form-select form-control" name="vat">
                      <option>Select Qualification</option>
                      {qualificationOption.map((item) => (
                        <option key={item.id}>{item.qualification}</option>
                      ))}
                    </select>
                  </div>

                  <div className="formfloating">
                    <label htmlFor="floatingInput4">Start Time Per Day</label>
                    <input
                      name="price"
                      type="text"
                      className="form-control"
                      placeholder="Start: 10:00"
                    />
                  </div>

                  <div className="formfloating">
                    <label htmlFor="floatingInput4">Finish Time Per Day</label>
                    <input
                      name="price"
                      type="text"
                      className="form-control"
                      placeholder="Finish: 10:00"
                    />
                  </div>
                </div>

                <div className="addbox">
                  <div className="formfloating flex100">
                    <label htmlFor="floatingInput4">Bio</label>
                    <input
                      name="price"
                      type="text"
                      className="form-control"
                      placeholder="Specialist in dermatology etc."
                    />
                  </div>
                </div>

                <div className="btnxscenter">
                  <button className="custom_btn addform_btn" type="submit">
                    Save
                  </button>
                </div>
              </form>
              <div className="btnxscenter">
                <button
                  type="button"
                  class="custom_btn addServicesbtn"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal2"
                >
                  Add Doctor/Staff <span className="btnroundicon">+</span>
                </button>
              </div>
            </div>
            {/* Add Doctor/Staff */}

            {/* Hours available */}
            <div className="hoursheading">
              <h3>Hours available</h3>
            </div>
            <div className="signup_threebox hours_available_list mt-0">
              <ul className="availablelist">
                <li className="listvat hedoutline">
                  <h6>Name</h6>
                </li>
                <li className="listvat hedoutline">
                  <h6>Day</h6>
                </li>
                <li className="listvat hedoutline">
                  <h6>Start time</h6>
                </li>
                <li className="listvat hedoutline">
                  <h6>End time</h6>
                </li>
                <li className="listvat hedoutline">
                  <h6>Status</h6>
                </li>
                {currentItems.map((value) => (
                  <>
                    <li className="coltoutline">
                      <h6 class="h6phone">Name</h6>
                      <p>{value.name}</p>
                    </li>
                    <li className="coltoutline" key={value.id}>
                      <h6 class="h6phone">Day</h6>
                      <p>{value.day}</p>
                    </li>
                    <li className="coltoutline">
                      <h6 class="h6phone">Start time</h6>
                      <select className="timeslot">{timeSlots1}</select>
                    </li>

                    <li className="coltoutline">
                      <h6 class="h6phone">End time</h6>
                      <select className="timeslot">{endTimeslots}</select>
                    </li>
                    <li className="coltoutline edit hedoutline">
                      <h6 class="h6phone">Status</h6>
                      <div className="form-check form-switch onoff_area">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id={`flexSwitchCheckDefault${value.id}`}
                          onChange={() => handleChange(value.id)}
                        />
                        <label
                          className="form-check-label"
                          id={`flexSwitchCheckDefault${value.id}`}
                        >
                          {!active.includes(value.id) ? "Disable" : "Enable"}
                        </label>
                      </div>
                    </li>
                  </>
                ))}
              </ul>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </div>
            {/* Hours available */}
          </div>
        </div>
      </div>
      <div
        class="modal fade custom-modal-wrap"
        id="exampleModal2"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog addServicesmodal">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Add Doctor/Staff
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form action="#">
                <div className="addprofileimg">
                  <div className="imgboxreletiv">
                    <div className="addproimgbox">
                      {selectedImage ? (
                        <img src={selectedImage} alt="Selected Profile" />
                      ) : null}
                    </div>
                    <div className="camaraicon" onClick={handleImageSelect}>
                      <img src={camera} alt="" />
                    </div>
                  </div>

                  <h6>Add profile photo</h6>
                </div>
                <div className="addbox">
                  <div className="formfloating">
                    <label htmlFor="floatingInput1">Title*</label>
                    <input
                      name="serviceName"
                      type="text"
                      className="form-control"
                      placeholder="Travers"
                    />
                  </div>
                  <div className="formfloating">
                    <label htmlFor="floatingInput4">First name*</label>
                    <input
                      name="price"
                      type="text"
                      className="form-control"
                      placeholder="Doe"
                    />
                  </div>
                  <div className="formfloating">
                    <label htmlFor="floatingSelect">Services Offered</label>
                    <select className="form-select form-control" name="vat">
                      <option>Select a Service</option>
                      {serviceOption.map((name, i) => (
                        <option key={name.id}>{name.serviceName}</option>
                      ))}
                    </select>
                  </div>
                  <div className="formfloating">
                    <label htmlFor="floatingSelect">Professional Type</label>
                    <select className="form-select form-control" name="vat">
                      <option>Select a Service</option>
                      {professionalOption.map((type) => (
                        <option key={type.id}>{type.professionalName}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="addbox">
                  <div className="formfloating flex50">
                    <label htmlFor="floatingSelect">Qualifications</label>
                    <select className="form-select form-control" name="vat">
                      <option>Select Qualification</option>
                      {qualificationOption.map((item) => (
                        <option key={item.id}>{item.qualification}</option>
                      ))}
                    </select>
                  </div>

                  <div className="formfloating">
                    <label htmlFor="floatingInput4">Start Time Per Day</label>
                    <input
                      name="price"
                      type="text"
                      className="form-control"
                      placeholder="Start: 10:00"
                    />
                  </div>

                  <div className="formfloating">
                    <label htmlFor="floatingInput4">Finish Time Per Day</label>
                    <input
                      name="price"
                      type="text"
                      className="form-control"
                      placeholder="Finish: 10:00"
                    />
                  </div>
                </div>

                <div className="addbox">
                  <div className="formfloating flex100">
                    <label htmlFor="floatingInput4">Bio</label>
                    <input
                      name="price"
                      type="text"
                      className="form-control"
                      placeholder="Specialist in dermatology etc."
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

export default SignUp_stepfive;
