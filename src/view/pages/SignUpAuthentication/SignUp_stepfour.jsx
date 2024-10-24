import React, { useRef, useState } from "react";
import editicon from "../../../assets/images/editicon.svg";
import removicon from "../../../assets/images/removicon.svg";
import ProgressStep from "../../../components/ProgressStep";
import Pagination from "../../../components/Pagination";
import DeleteModal from "../../../components/Modal/DeleteModal";

const option = [
  {
    id: 1,
    serviceName: "Consultation",
    price: "65",
    vat: "N/A",
  },
  {
    id: 2,
    serviceName: "Nurse Visit",
    price: "65",
    vat: "N/A",
  },
  {
    id: 3,
    serviceName: "Blood Visit",
    price: "65",
    vat: "N/A",
  },
  {
    id: 4,
    serviceName: "Consultation",
    price: "65",
    vat: "N/A",
  },
  {
    id: 5,
    serviceName: "Nurse Visit",
    price: "65",
    vat: "N/A",
  },
  {
    id: 6,
    serviceName: "Blood Visit",
    price: "65",
    vat: "N/A",
  },
  {
    id: 7,
    serviceName: "Consultation",
    price: "65",
    vat: "N/A",
  },
];
const SignUp_stepfour = () => {
  const ref = useRef(null);
  // For Add service State//
  const [services, setServices] = useState(option);
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");
  const [vat, setVat] = useState();
  // For Add service State//

  //  For toggle switch enable/disable State//
  const [active, setActive] = useState([]);
  //  For toggle switch enable/disable State//

  // For pagination state//
  const [currentPage, setCurrentPage] = useState(1);
  // For pagination state//

  //  For Modal State//
  const [showModal, setShowModal] = useState(false);
  //  For Modal State//

  // For Edit data//
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  // For Edit data//

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

  // For new Service handler add//
  const handleAddService = (event) => {
    event.preventDefault();

    const newService = {
      id: services.length + 1,
      serviceName: serviceName,
      price: price,
      vat: vat,
    };

    if (selectedService) {
      // Update the existing service with the edited values
      const updatedServices = services.map((item) => {
        if (item.id === selectedService.id) {
          return { ...selectedService, ...newService };
        }
        return item;
      });

      setServices(updatedServices);
      setSelectedService(null);
    } else {
      // Add a new service
      setServices([...services, newService]);
    }

    setServiceName("");
    setPrice("");
    setVat("");
  };
  // For new Service handler add//

  // For new Service handler delete//
  const handleDeleteService = (id) => {
    setSelectedServiceId(id);
    setShowModal(true); // Show the modal when delete button is clicked
  };
  const deleteService = () => {
    const updatedServices = services.filter(
      (item) => item.id !== selectedServiceId
    );
    setServices(updatedServices);
    setShowModal(false); // Hide the modal after deletion
  };
  // For new Service handler delete//

  // For edit service handler//
  const handleEditService = (id) => {
    // Find the service with the provided id
    const service = services.find((item) => item.id === id);

    // Set the selected service for editing
    setSelectedService(service);

    ref.current?.scrollIntoView({ behavior: "smooth" });
    setServiceName(service.serviceName);
    setPrice(service.price);
    setVat(service.vat);
    // Set the field values in the add service section to the values of the selected service
  };
  // For edit service handler//

  // For Pagination//
  const itemsPerPage = 5; // Number of items to display per page
  // Calculate the total number of pages based on the number of items and itemsPerPage
  const totalPages = Math.ceil(services.length / itemsPerPage);
  // Get the current items to display based on the currentPage
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = services.slice(indexOfFirstItem, indexOfLastItem);
  // For Pagination//

  return (
    <>
      <div className="signup_three">
        <div className="container">
          <div className="whitboxbg addservicewhitbox">
            {/* Progress Step */}
            <ProgressStep activeStep={4} />
            {/* Progress Step */}

            {/* Add service */}
            <div className="add_servicesformbox">
              <div className="add_serviceheading" ref={ref}>
                <h2>{selectedService ? "Edit Services" : "Add Services"}</h2>
              </div>

              <form action="#" onSubmit={handleAddService}>
                <div className="addbox">
                  <div className="formfloating">
                    <label for="floatingInput1">Services</label>
                    <input
                      name="serviceName"
                      type="text"
                      className="form-control"
                      placeholder="Select services"
                      value={serviceName}
                      onChange={(event) => setServiceName(event.target.value)}
                    />
                  </div>
                  <div className="formfloating">
                    <label for="floatingInput4">Price</label>
                    <input
                      name="price"
                      type="text"
                      className="form-control"
                      placeholder="€ Cost"
                      value={price}
                      onChange={(event) => setPrice(event.target.value)}
                    />
                  </div>
                  <div className="formfloating">
                    <label for="floatingSelect">VAT</label>
                    <select
                      className="form-select form-control"
                      value={vat}
                      onChange={(event) => setVat(event.target.value)}
                      name="vat"
                    >
                      <option>€ VAT</option>
                      <option>N/A</option>
                      <option>1%</option>
                      <option>2%</option>
                      <option>3%</option>
                      <option>4%</option>
                    </select>
                  </div>
                </div>

                <div className="btnxscenter">
                  <button className="custom_btn addform_btn" type="submit">
                    {selectedService ? "Update" : "Save"}
                  </button>
                </div>
              </form>
              {/* <!-- Button trigger modal --> */}
              <div className="btnxscenter">
                <button
                  type="button"
                  class="custom_btn addServicesbtn"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Add Services <span className="btnroundicon">+</span>
                </button>
              </div>

              {/* <!-- Button trigger modal --> */}
            </div>
            {/* Add service */}

            {/* My service */}
            <div className="hoursheading">
              <h3>My services</h3>
            </div>
            <div className="signup_threebox my_services_list mt-0">
              <ul>
                <li className="listvat hedoutline">
                  <h6>Services Name</h6>
                </li>
                <li className="listvat hedoutline">
                  <h6>Price</h6>
                </li>
                <li className="listvat hedoutline">
                  <h6>VAT</h6>
                </li>
                <li className="listvat hedoutline">
                  <h6>Status</h6>
                </li>
                <li className="listvat hedoutline">
                  <h6>Edit</h6>
                </li>
                {currentItems.map((item, i) => (
                  <>
                    <li className="coltoutline">
                      <h6 className="h6phone">Services Name</h6>
                      <div className="form-group">
                        <label className="agree_check">
                          <input type="checkbox" name="tandc" />
                          <span className="checkmark"></span>
                          <p>{item.serviceName}</p>
                        </label>
                      </div>
                    </li>
                    <li className="coltoutline">
                      <h6 className="h6phone">Price</h6>
                      <p>€{item.price}</p>
                    </li>
                    <li className="coltoutline">
                      <h6 className="h6phone">VAT</h6>
                      <p>{item.vat}</p>
                    </li>
                    <li className="coltoutline">
                      <h6 className="h6phone">Status</h6>
                      <div className="form-check form-switch onoff_area">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id={`flexSwitchCheckDefault${item.id}`}
                          onChange={() => handleChange(item.id)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`flexSwitchCheckDefault${item.id}`}
                        >
                          {!active.includes(item.id) ? "Disable" : "Enable"}
                        </label>
                      </div>
                    </li>
                    <li className="coltoutline edit hedoutline">
                      <h6 className="h6phone">Edit</h6>
                      <div className="edt_rmviconbox">
                        <button
                          type="button"
                          className="deletebtn"
                          onClick={() => handleEditService(item.id)}
                        >
                          <img src={editicon} alt="" />
                        </button>
                        <button
                          type="button"
                          className="deletebtn"
                          data-bs-toggle="modal"
                          data-bs-target="#myModal"
                          onClick={() => handleDeleteService(item.id)}
                        >
                          <img src={removicon} alt="" />
                        </button>
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
            {/* My service */}
          </div>
        </div>
      </div>

      {/* Modal */}
      <DeleteModal deleteService={deleteService} />
      {/* Modal */}

      {/* <!-- Modal --> */}
      <div class="modal fade custom-modal-wrap" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog addServicesmodal">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Add Services
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form action="#" onSubmit={handleAddService}>
                <div className="addbox">
                  <div className="formfloating">
                    <label for="floatingInput1">Services</label>
                    <input
                      name="serviceName"
                      type="text"
                      className="form-control"
                      placeholder="Select services"
                      value={serviceName}
                      onChange={(event) => setServiceName(event.target.value)}
                    />
                  </div>
                  <div className="formfloating">
                    <label for="floatingInput4">Price</label>
                    <input
                      name="price"
                      type="text"
                      className="form-control"
                      placeholder="€ Cost"
                      value={price}
                      onChange={(event) => setPrice(event.target.value)}
                    />
                  </div>
                  <div className="formfloating">
                    <label for="floatingSelect">VAT</label>
                    <select
                      className="form-select form-control"
                      value={vat}
                      onChange={(event) => setVat(event.target.value)}
                      name="vat"
                    >
                      <option>€ VAT</option>
                      <option>N/A</option>
                      <option>1%</option>
                      <option>2%</option>
                      <option>3%</option>
                      <option>4%</option>
                    </select>
                  </div>
                </div>

                <div className="btnxscenter">
                  <button className="custom_btn addform_btn" type="submit">
                    {selectedService ? "Update" : "Save"}
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

export default SignUp_stepfour;
