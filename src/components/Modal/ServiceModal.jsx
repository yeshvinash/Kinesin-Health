import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import badicon from "../../assets/images/badicon.svg";
import $ from "jquery";

const ServiceModal = ({
  headerTitle,
  handleSaveTask,
  editTaskId,
  task,
  createNewService,
  error,
  setError,

}) => {
  const [service, setService] = useState("");
  const [price, setPrice] = useState("");
  const [vat, setVat] = useState();
  const [vatStatus, setVatStatus] = useState(false);
  const [duration, setDuration] = useState("");

  let tenantVal = useSelector((state) => state.auth.user?.tenant);
  if (!tenantVal)
    tenantVal = localStorage.getItem('kinesin-tenant');

  const [formParam, setFormParam] = useState(
    {
      errors: {
        email: '',
      },
      submitted: false
    }
  );

  // const validateForm = () => {
  //   console.log('validate form called...');
  //   let formIsValid = true;
  //   let f = Object.assign({}, formParam);
  //   f.errors.service = '';
  //   if (!service) {
  //     formIsValid = false;
  //     f.errors.service = "*Please enter name.";
  //   }
 
  //   setFormParam(f);
  //   return formIsValid;
  // }
  const validateForm = () => {
    console.log('validate form called...');
    let formIsValid = true;
    let f = Object.assign({}, formParam);
    f.errors.service = '';
    f.errors.duration = '';
    f.errors.price = '';

    // Validate service
    if (!service) {
        formIsValid = false;
        f.errors.service = "*Please enter name.";
    }

    // Validate duration
    if (!duration) {
        formIsValid = false;
        f.errors.duration = "*Please enter duration.";
    } else if (!Number(duration)) {
        formIsValid = false;
        f.errors.duration = "*Please enter valid duration (numeric value).";
    }

    // // Validate price
    if (!price) {
        formIsValid = false;
        f.errors.price = "*Please enter price.";
    } else if (!Number(price)) {
        formIsValid = false;
        f.errors.price = "*Please enter valid price (numeric value).";
    }

    setFormParam(f);
    return formIsValid;
}


  const resetFormParam = () => {
    console.log('resetFormParam called..');
    setFormParam({
      errors: {
        email: '',
      },
      submitted: false
    });
  }

  
  useEffect(() => {
    validateForm();
  }, [service]);


  // Condionaly render add and edit//
  useEffect(() => {
    if (editTaskId) {
      const selectedTask = task.find((task) => task.id === editTaskId);
      console.log("selected Task", selectedTask);
      if (selectedTask) {
        setService(selectedTask.name);
        setPrice(selectedTask.price || "");
        setVat(selectedTask.vatRate || "");
        setDuration(selectedTask.duration || "")
        setVatStatus(selectedTask.vat || "")
      }
    } else {
      setService("");
      setPrice("");
      setVat("");
      setDuration("")
      setVatStatus(false)
      setError(null)
    }
  }, [editTaskId, task]);

  // modal save handler//
  const handleSave = () => {

    formParam.submitted = true;
    if (validateForm()) {
      formParam.submitted = true;
    } else
      return;

    // const newTask = {
    //   id: editTaskId || Date.now(),
    //   name: service,
    //   price: price,
    //   vat: vatStatus,
    //   vatRate: vat,
    //   duration: duration,
    // };
    const newTask = {
      id: editTaskId || Date.now(),
      name: service,
      price: parseInt(price),
      vat: vatStatus,
      // vatRate: parseInt(vat),
      vatRate: vat,
      duration: parseInt(duration),
    };
    const modiFiedService = {
      // id:newTask.id,
      name: newTask.name,
      price: newTask.price,
      vat: newTask.vat,
      vatRate: newTask.vatRate,
      duration: newTask.duration,
      practiceId: tenantVal,
      tenant: tenantVal
    }

    // handleSaveTask(newTask);
    createNewService(modiFiedService)
    // createNewService()
    setService("");
    setPrice("");
    setVat("");
    setDuration("")
    setVatStatus(false);
    $('#idClosePopup').trigger("click");
  };
  // modal save handler//
  return (
    <div>
      <div className="modal smamodal addTaskmodal add_service custom-modal-wrap" id="addService">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{headerTitle}</h4>
              <button
                type="button"
                className="btn-close"
                id='idClosePopup'
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                 
                  setService("");
                  setPrice("");
                  setVat("");
                  setDuration("");
                  setVatStatus(false);
                  setError(null);
                  resetFormParam();
                }}
              ></button>
            </div>

            <div className="modal-body servicemodalbox">
              {error && (
                <div className="badiconbox">
                  <div className="badiconimg">
                    <img src={badicon} alt="" />
                  </div>
                  <h6>{error}</h6>
                </div>
              )}

              <form>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label className="requiredValidator">Services Name</label>
                    <input
                      type="text"
                      placeholder="Write Service"
                      className="form-control"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                    />
                    {formParam.submitted && (
                      <div className="errorMsg text-start">{formParam.errors.service}</div>
                    )}
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="requiredValidator">Duration</label>
                    <div className="inputflex">
                      <input
                        type="number"
                        placeholder="Min"
                        className="form-control"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      />
                    </div>
                      {formParam.submitted && (
                      <div className="errorMsg text-start">{formParam.errors.duration}</div>
                    )}
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="requiredValidator">Price</label>
                    <input
                      type="number"
                      placeholder="€ Cost"
                      className="form-control"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                     {formParam.submitted && (
                      <div className="errorMsg text-start">{formParam.errors.price}</div>
                    )}
                  </div>
                  <div className="col-md-1 mb-3">
                    <div className="form-check form-switch onoff_area">
                      <label className="form-check-label">Vat</label>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        value={vatStatus}
                        id={editTaskId}
                        onChange={(e) => {
                          console.log('ccccccccccccc : ' + e.target.checked);
                          setVatStatus(e.target.checked)
                        }}
                        // checked={editTaskId}
                        checked={vatStatus}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label></label>
                    <select
                      className="form-select form-control"
                      name="vat"
                      value={vat}
                      onChange={(e) => setVat(e.target.value)}
                    >
                      <option value="vat">% VAT</option>
                      <option value="N/A">N/A</option>
                      <option value="1">1%</option>
                      <option value="2">2%</option>
                      <option value="3">3%</option>
                      <option value="4">4%</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                className="custom_btn savwidth"
                type="submit"
                onClick={handleSave}
                // data-bs-dismiss="modal"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
