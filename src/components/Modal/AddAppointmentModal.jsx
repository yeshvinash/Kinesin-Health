import { Autocomplete, TextField } from "@mui/material";
import dayjs from "dayjs";
import $ from "jquery";
import moment from "moment";
import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  APPOINMENT_ADD_URL,
  PATIENT_SEARCH_AUTOCOMPLETE_URL,
  STAFF_MEMBERS_CONTROLER_URL
} from "../../api/Service";
import { createAxiosInstance } from "../../api/axiosConfig";

import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import toast, { Toaster } from "react-hot-toast";
import { logoutFromHelper } from "../../api/Helper";
import { logout } from "../../redux/auth/AuthSlice";
import { removeuser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import downarrow from "../../assets/images/downarrow.png";
let defaultDurationInMins = "15";

const AddAppointmentModal = ({
  id,
  headerTitle,
  practiceServices,
  startDate,
  startTime,
  staffId,
  setStaffId,
  selectedView,
  selectedDate,
  getbystaffmemberidApi,
  homePageRefreshAppointment,
  getBydatesData,
  patientName,
  notes,
  selectedAppointmentForEdit,
  serviceName,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState("");
  const [options, setOptions] = useState([]);
  const [patient, setPatient] = useState({});
  const [patientId, setPatientId] = useState("");
  let tenantVal = useSelector((state) => state.auth.user?.tenant);
  if (!tenantVal) tenantVal = localStorage.getItem("kinesin-tenant");

  const [value, setValue] = useState(dayjs("2022-04-17T15:30"));
  const [valueStartDate, setValueStartDate] = useState(
    dayjs(new Date().setMinutes(0))
  );
  const [staffMember, setStaffMember] = useState("");

  const [formData, setFormData] = useState({
    patientId: "",
    fullName: "",
    startDate: moment(new Date(dayjs(value))).format("YYYY-MM-DD"),
    startTime: moment(new Date(dayjs(valueStartDate))).format("HH:mm"),
    endDate: "",
    endTime: "",
    reasonDescription: "",
    reasonForVisit: "",
    practiceServiceId: "",
    notes: "",
    durationInMins: defaultDurationInMins,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleChangeSelect = (event) => {
    if (setStaffId) {

      setStaffId(event.target.value);
    }
  };
  const [formParam, setFormParam] = useState({
    errors: {
      email: "",
    },
    submitted: false,
  });

  const handleSave = async () => {
    if(formData.startDate < moment(new Date(dayjs(value))).format("YYYY-MM-DD")){
      toast.error('Please correct the Date before saving.');
    }
    formParam.submitted = true;
    if (validateForm() || !staffId) {
      formParam.submitted = true;
    } else return;

    var startTimeApt = moment(
      formData.startDate + " " + formData.startTime
    ).format("yyyy-MM-DD HH:mm");
    var endTimeApt = moment(formData.startDate + " " + formData.startTime)
      .add(formData.durationInMins, "minutes")
      .format("yyyy-MM-DD HH:mm");

    var startAtApt = moment(startTimeApt).format("HH:mm");
    var endAtApt = moment(endTimeApt).format("HH:mm");

    var obj = {
      id: formData.id,
      tenant: tenantVal,
      patientId: patientId,
      patient: {
        id: patientId,
        tenant: tenantVal,
      },
      startAt: startAtApt,
      endAt: endAtApt,
      startTime: startTimeApt,
      endTime: endTimeApt,
      practiceServiceId: formData.practiceServiceId,
      practiceService: {
        id: formData.practiceServiceId,
        tenant: tenantVal,
      },
      reasonDescription: formData.reasonDescription,
      staffMemberId: staffId,
      durationInMins: formData.durationInMins,
    };

    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.post(
        `${tenantVal}${APPOINMENT_ADD_URL}`,
        obj
      );
      toast.success(
        "Appointment " +
        (id ? "updated" : "saved") +
        " successfully"
      );
    } catch (error) {
      errorHandling(error);
    }

    if (getbystaffmemberidApi)
      getbystaffmemberidApi(selectedView, staffId, selectedDate);

    if (homePageRefreshAppointment)
      homePageRefreshAppointment(selectedDate.getTime());
    if (getBydatesData) {
      getBydatesData();
    }
    setFullName("")
    $("#idClosePopup4").trigger("click");
  };

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
  const fetchUser = async () => {
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${STAFF_MEMBERS_CONTROLER_URL}`
      );

      setStaffMember(response.data);
    } catch (error) {
      errorHandling(error)
    }
  };

  const resetFormParam = () => {
    setFormParam({
      errors: {
        email: "",
      },
      submitted: false,
    });
    
    setFormData(prevState => ({
      ...prevState,
      practiceServiceId: "",
      reasonDescription: "",
      startDate: moment(new Date(dayjs(value))).format("YYYY-MM-DD")
    }));
  setValueStartDate(dayjs(new Date().setMinutes(0)))
    setFullName(null);
    setValue(dayjs(startDate + " " + startTime));
  };

  const getData = async (searchTerm) => {
    try{
    if (!searchTerm) setOptions([]);
    const axiosInstance = createAxiosInstance();
    const response = await axiosInstance.get(
      `${tenantVal}${PATIENT_SEARCH_AUTOCOMPLETE_URL}` + "/" + searchTerm
    );
    if (response && response.data && response.data.length > 0) {
      const updatedOptions = response.data.map((p) => {
        return {
          id: p.id,
          title:
            p.firstName +
            (p.surname ? " " + p.surname : "") +
            (p.dateOfBirth
              ? " (" + moment(p.dateOfBirth).format("DD-MM-YYYY") + ")"
              : ""),
          gender: p.gender,
          dateOfBirth: p.dateOfBirth,
          address: p.address,
        };
      });
      setOptions(updatedOptions);
    } else setOptions([]);
  }catch(error){
    errorHandling(error)
  }
  };

  const onInputChange = (event, value, reason) => {
    if (value && value.length > 0) {
      getData(value);
    } else {
      setTimeout(() => {
        setOptions([]);
      }, 0);
    }
  };
  useEffect(() => {
    const newFormData = {
      startDate,
      startTime: moment(new Date(dayjs(startDate + " " + startTime))).format(
        "HH:mm"
      ),
      durationInMins: defaultDurationInMins,
      patientId: "",
      reasonDescription: "",
      reasonForVisit: "",
      practiceServiceId: "",
    };

    if (selectedAppointmentForEdit) {
      newFormData.id = selectedAppointmentForEdit.id;
      newFormData.reasonDescription =
        selectedAppointmentForEdit.reasonDescription;
      newFormData.patientId = selectedAppointmentForEdit.id;
      newFormData.durationInMins = selectedAppointmentForEdit.durationInMins;
      newFormData.practiceServiceId =
        selectedAppointmentForEdit.practiceServiceId;

      if (selectedAppointmentForEdit.patient) {
        setFullName(
          selectedAppointmentForEdit.patient.firstName +
          " " +
          selectedAppointmentForEdit.patient.surname
        );
        setPatientId(selectedAppointmentForEdit.patient.id);
        setPatient(selectedAppointmentForEdit);
      }
      let sDate = moment(selectedAppointmentForEdit.startTime).format(
        "YYYY-MM-DD"
      );

      setValueStartDate(dayjs(sDate));
      setValue(dayjs(sDate + " " + startTime));

      newFormData.startDate = sDate;
      newFormData.startTime = moment(
        new Date(dayjs(sDate + " " + startTime))
      ).format("HH:mm");
    } else {
      setFullName("");
      setPatient({});
      setPatientId("");
      setValueStartDate(dayjs(startDate));
      setValue(dayjs(startDate + " " + startTime));
    }

    setFormData(newFormData);
  }, [startDate, startTime, selectedAppointmentForEdit]);
  useEffect(() => {
    fetchUser();
  }, [tenantVal]);
  const validateForm = () => {
    let formIsValid = true;
    let f = Object.assign({}, formParam);
    f.errors.patientId = "";
    f.errors.startDate = "";
    f.errors.startTime = "";
    f.errors.staffId = "";
    f.errors.durationInMins = "";
    f.errors.practiceServiceId = "";
    if (!patientId) {
      formIsValid = false;
      f.errors.patientId = "*Please select patient.";
    }
    if (!formData.startTime) {
      formIsValid = false;
      f.errors.startTime = "*Please select start time.";
    } else if (formData.startTime.indexOf(':') > 0) {
      var minutes = formData.startTime.split(':')[1];
      if (!minutes) {
        formIsValid = false;
        f.errors.startTime = "*Please select minutes in start time.";
      } else if (!['00', '15', '30', '45'].includes(minutes)) {
        formIsValid = false;
        f.errors.startTime = "*Please select minutes in 15 minutes interval only.";
      }
    }
    if (!formData.durationInMins) {
      formIsValid = false;
      f.errors.durationInMins = "*Please select time duration.";
    }
    if (!formData.practiceServiceId) {
      formIsValid = false;
      f.errors.practiceServiceId = "*Please select type of consultation.";
    }
    if (!staffId) {
      formIsValid = false;
      f.errors.staffId = "*Please select staff from the top of the page.";
    }
    setFormParam(f);
    return formIsValid;
  };
  useEffect(() => {
    validateForm();
  }, [formData]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div
        className={`modal smamodal addTaskmodal custom-modal-wrap`}
        id="addAppointment_modal"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{headerTitle}</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                id="idClosePopup4"
                aria-label="Close"
                onClick={resetFormParam}
              ></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="col-md-12 mb-3">
                  <Autocomplete
                    disablePortal
                    className="name-input-wrap"
                    id="combo-box-demo"
                    value={fullName || null}
                    options={options}
                    getOptionLabel={(option) =>
                      option && option.title ? option.title : fullName
                    }
                    onInputChange={onInputChange}
                    onChange={(event, newValue) => {
                      setFullName(newValue ? newValue.title : "");
                      setPatientId(newValue ? newValue.id : "");
                      setPatient(newValue);
                      setFormData({
                        ...formData,
                        ["patientId"]: newValue ? newValue.id : "",
                      });
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Full Name" />
                    )}
                  />

                  {formParam.submitted && (
                    <div className="errorMsg text-start">
                      {formParam.errors.patientId}
                    </div>
                  )}
                </div>

                <div className="col-md-12 mb-3">
                  <select
                    as="select"
                    className="form-select form-control custom-select"
                    value={staffId}
                    onChange={handleChangeSelect}
                  >
                    <option value=''>Select</option>

                    {staffMember
                      ? staffMember.map((Staff) => (
                        <option value={Staff.id} key={Staff.id}>
                          {Staff.firstName} {Staff.lastName}
                        </option>
                      ))
                      : ""}
                  </select>
                </div>

                <div className="col-md-12 mb-3">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        format="DD/MM/YYYY"
                        value={valueStartDate}
                        name="startDate"
                        sx={{ width: "100%" }}
                        onChange={(newValue) => {
                          setValueStartDate(newValue);
                          var d = new Date(dayjs(newValue));
                          setFormData({
                            ...formData,
                            ["startDate"]: moment(d).format("YYYY-MM-DD"),
                          });
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  {formParam.submitted && (
                    <div className="errorMsg text-start">
                      {formParam.errors.startDate}
                    </div>
                  )}
                </div>

                <div className="col-md-12 mb-3 position-relative">
                  <select
                    className="form-select form-control custom-select"
                    name="durationInMins"
                    value={formData.durationInMins}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                    <option value="60">1 Hour</option>
                  </select>
                  {formParam.submitted && (
                    <div className="errorMsg text-start">
                      {formParam.errors.durationInMins}
                    </div>
                  )}
                </div>

                <div className="col-md-12 mb-3">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["TimePicker", "TimePicker"]}>
                      <TimePicker
                        value={value}
                        sx={{ width: "100%" }}
                        minutesStep={15}
                        ampm={false}
                        onChange={(newValue) => {
                          setValue(newValue);
                          var d = new Date(dayjs(newValue));
                          setFormData({
                            ...formData,
                            ["startTime"]: moment(d).format("HH:mm"),
                          });
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  {formParam.submitted && (
                    <div className="errorMsg text-start">
                      {formParam.errors.startTime}
                    </div>
                  )}
                </div>

                <div className="col-md-12 mb-3">
                  <input
                    className="form-control"
                    placeholder="Notes"
                    id="floatingInput4"
                    type="text"
                    name="reasonDescription"
                    value={formData.reasonDescription}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12 mb-3 position-relative">
                  <select
                    className="form-select form-control custom-select"
                    name="practiceServiceId"
                    value={formData.practiceServiceId}
                    onChange={handleChange}
                  >
                    {practiceServices.map((option) => {
                      return (
                        <option label={option.label} value={option.value}>
                          {option.label}
                        </option>
                      );
                    })}
                  </select>
                  {formParam.submitted && (
                    <div className="errorMsg text-start">
                      {formParam.errors.practiceServiceId}
                    </div>
                  )}
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                className="custom_btn savwidth"
                type="submit"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAppointmentModal;
