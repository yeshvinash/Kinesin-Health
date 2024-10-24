import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { createAxiosInstance } from "../../api/axiosConfig";
import {
    PATIENT_SEARCH_AUTOCOMPLETE_URL,
    STAFF_MEMBERS_CONTROLER_URL,
    STAFF_MEMBERS_CONTROLER_URL_ID,
} from "../../api/Service";
import { useSelector } from "react-redux";
import { TaskPriority, Taskstatus } from "../../Utils/Constant";
import $ from "jquery";
import { Autocomplete, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from 'dayjs';

const NoteModal = ({
    headerTitle,
    handleSaveTask,
    showModal,
    setShowModal,
    editTaskId,
    task,
    createNewTask,
}) => {

    const [value, setValue] = useState(dayjs(new Date().setMinutes(0)));
    const [selectedDate, setSelectedDate] = useState(moment(new Date(dayjs(value))).format("DD/MM/YYYY"));
    //const [selectedDate, setSelectedDate] = useState(new Date());

    const [showCalendar, setShowCalendar] = useState(false);
    const [patientName, setPatientName] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const [from, setFrom] = useState("");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [isPatientAutoCompleteDisabled, setIsPatientAutoCompleteDisabled] = useState(false);

    let nameState = useSelector((state) => state.auth.user?.name);
    if (!nameState) {
        nameState = localStorage.getItem('kinesin-name')
      }
    //Date change handler//
    const handleDateChange = (date) => {
        const momentDate = moment(date);
        setSelectedDate(momentDate);
        setShowCalendar(false);
    };
    let tenantVal = useSelector((state) => state.auth.user?.tenant);
    if (!tenantVal)
        tenantVal = localStorage.getItem('kinesin-tenant');
    const taskCreatedBy = useSelector((state) => state.user);
    //select calender date
    const handleDateInputClick = () => {
        setShowCalendar(true);
    };

    const fetchUser = async () => {
        try {
            const axiosInstance = createAxiosInstance();
            const response = await axiosInstance.get(
                `${tenantVal}${STAFF_MEMBERS_CONTROLER_URL}`
            );

            setStaffMember(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchUser();
    }, [tenantVal]);

    // Condionaly render add and edit//
    useEffect(() => {
        if (editTaskId) {
            const selectedTask = task.find((task) => task.id === editTaskId);
            console.log(selectedTask, "==>67");
            if (selectedTask) {
                // handleEditTask(selectedTask.assignedToStaffId);
                // setSelectedDate(moment(selectedTask.dueDate, "DD/MM/YY").toDate());

                //setSelectedDate(new Date(selectedTask.dueDate));

                var d = new Date(dayjs(selectedTask.dueDate));
                setSelectedDate(moment(d).format("DD/MM/YYYY"));
                setValue(dayjs(new Date(selectedTask.dueDate).setMinutes(0)));
                console.log('SSSSSSSS : ' + moment(d).format("DD/MM/YYYY"));

                setPatientName(selectedTask.patient_name);
                setStaffMemberId(selectedTask.assignedToStaffId);
                setAssignedTo(selectedTask.assignedToStaffId);
                setFrom(selectedTask.from);
                setPriority(selectedTask.priority);
                setStatus(selectedTask.status);
                setTaskTitle(selectedTask.title);
                setTaskDescription(selectedTask.description);
            }
        } else {
            setSelectedDate(moment(new Date(dayjs(value))).format("DD/MM/YYYY"));
            setPatientName("");
            setAssignedTo("");
            setFrom("");
            setPriority("-1");
            setStatus("");
            setTaskTitle("");
            setTaskDescription("");
            setFullName(task && task.patient_name ? task.patient_name : '');
            setPatientId(task && task.patient_id ? task.patient_id : '');
            setIsPatientAutoCompleteDisabled(task && task.patient_disabled ? task.patient_disabled : false);
        }
    }, [editTaskId, task]);

    // modal save handler//
    const handleSave = () => {

        console.log('note modal : handleSave..')

        formParam.submitted = true;
        if (validateForm()) {
            formParam.submitted = true;
        } else
            return;

        let obj = {
            tenant: tenantVal,
            note: taskTitle,
            assignedToStaffId: selectedStaffMember ? selectedStaffMember.id : '',
            assignedToStaff: {
                id: selectedStaffMember ? selectedStaffMember.id : '',
                tenant: tenantVal
            },
            patientId: patientId ? patientId : '',
            patient: {
                id: patientId ? patientId : '',
                tenant: tenantVal
            }
        };

        console.log('modifiedTask : ' + JSON.stringify(obj));



        // handleSaveTask(newTask);
        createNewTask(obj);
        setStaffMemberId("");
        setPatient({});
        setPatientName("");

        // setPatientId("");
        // setFullName("");

        setFullName(task && task.patient_name ? task.patient_name : '');
        setPatientId(task && task.patient_id ? task.patient_id : '');

        setAssignedTo("");
        setFrom("");
        setPriority("");

        setValue(dayjs(new Date().setMinutes(0)));
        setSelectedDate(moment(new Date(dayjs(value))).format("DD/MM/YYYY"));


        // setSelectedDate(null);
        setTaskTitle("");
        setStatus("");
        setShowModal(false);
        setTaskDescription("");

        $('#idClosePopupNote').trigger("click");
    };
    // modal save handler//

    // Staff memebers data
    const [staffMember, setStaffMember] = useState("");
    const [staffMemberId, setStaffMemberId] = useState("");
    const [selectedStaffMember, setSelectedStaffMember] = useState();

    // console.log("staff member data", staffMember);
    const handleChangeSelect = (event) => {
        setStaffMemberId(event.target.value);
        handleEditTask(event.target.value);
    };
    const handleEditTask = async (id) => {
        try {
            const axiosInstance = createAxiosInstance();
            const url = `${tenantVal}${STAFF_MEMBERS_CONTROLER_URL_ID}${id}`;
            const response = await axiosInstance.get(url);
            setSelectedStaffMember(response.data);
        } catch (error) {
            console.log(error);
        }
    };

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
        f.errors.staffMemberId = '';

        if (!staffMemberId) {
            formIsValid = false;
            f.errors.staffMemberId = "*Please select assign to.";
        }

        setFormParam(f);
        return formIsValid;
    };

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
    }, [staffMemberId, priority, status, selectedDate]);

    const [options, setOptions] = useState([]);
    const getData = async (searchTerm) => {
        if (!searchTerm)
            setOptions([]);
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.get(
            `${tenantVal}${PATIENT_SEARCH_AUTOCOMPLETE_URL}` + '/' + searchTerm
        );
        //console.log('response : ' + JSON.stringify(response));
        if (response && response.data && response.data.length > 0) {
            const updatedOptions = response.data.map((p) => {
                return {
                    id: p.id,
                    title: (p.firstName + (p.surname ? " " + p.surname : "") + (p.dateOfBirth ? (' (' + moment(p.dateOfBirth).format("DD-MM-YYYY") + ')') : '')),
                  };
                //return { id: p.id, title: (p.firstName + (p.surname ? (' ' + p.surname) : '') + (p.mobilePhone ? (' (' + p.mobilePhone + ')') : '')), gender: p.gender, dateOfBirth: p.dateOfBirth, address: p.address };
            });
            setOptions(updatedOptions);
        } else
            setOptions([]);
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
    const [patient, setPatient] = useState({});
    const [fullName, setFullName] = useState('');
    const [patientId, setPatientId] = useState('');

    return (
        <div className={`modal smamodal addTaskmodal custom-modal-wrap`} id="addNote_modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">{headerTitle}</h4>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            id='idClosePopupNote'
                            aria-label="Close"
                            onClick={resetFormParam}
                        ></button>
                    </div>

                    <div className="modal-body">
                        <form>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Patient name</label>
                                    {/* <input
                    type="text"
                    placeholder="Patient name"
                    className=" form-control"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                  /> */}
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        value={fullName || null}
                                        options={options}
                                        getOptionLabel={(option) => (option && option.title ? option.title : fullName)}
                                        onInputChange={onInputChange}
                                        onChange={(event, newValue) => {
                                            setFullName(newValue ? newValue.title : '');
                                            setPatientId(newValue ? newValue.id : '');
                                            setPatient(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} label="" />}
                                        disabled={isPatientAutoCompleteDisabled}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="requiredValidator">Assigned To</label>

                                    <select
                                        as="select"
                                        className="form-select form-control custom-select"
                                        onChange={handleChangeSelect}
                                        value={staffMemberId}
                                    >
                                        <option>Select</option>
                                        {staffMember
                                            ? staffMember.map((Staff) => (
                                                <option value={Staff.id} key={Staff.id}>
                                                    {Staff.firstName} {Staff.lastName}
                                                </option>
                                            ))
                                            : ""}
                                    </select>
                                    {formParam.submitted && (
                                        <div className="errorMsg text-start">{formParam.errors.staffMemberId}</div>
                                    )}
                                </div>
                                {/* <div className="col-md-6 mb-3">
                                    <label>From</label>
                                    <input
                                        type="text"
                                        placeholder="Mathew"
                                        className="form-control"
                                        value={nameState}
                                        disabled
                                    />
                                </div> */}
                                {/* <div className="col-md-6 mb-3">
                                    <label className="requiredValidator">Priority</label>
                                    <div className="priorityform">
                                        <div className={priority == 0 ? "pridot" : (priority == 1 ? "pridotYellow" : (priority == 2 ? "pridotGreen" : ""))}></div>
                                        <select
                                            className="form-select form-control"
                                            name="vat"
                                            value={priority}
                                            onChange={(e) => setPriority(e.target.value)}
                                        >
                                            <option value={-1}>Select</option>
                                            {TaskPriority.map((Priority, id) => (
                                                <option value={Priority.value} key={id}>
                                                    {Priority.name}
                                                </option>
                                            ))}
                                        </select>
                                        {formParam.submitted && (
                                            <div className="errorMsg text-start">{formParam.errors.priority}</div>
                                        )}
                                    </div>
                                </div> */}
                                {/* <div className="col-md-6 mb-3">
                                    <label className="requiredValidator">Due date</label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                                            <DatePicker
                                                format="DD/MM/YYYY"
                                                // label="DOB"
                                                value={value}
                                                // onChange={(newValue) => setValue(newValue)}
                                                sx={{ width: '100%' }}
                                                // class="form-control"
                                                onChange={(newValue) => {
                                                    setValue(newValue);
                                                    var d = new Date(dayjs(newValue));
                                                    setSelectedDate(moment(d).format("DD/MM/YYYY"));
                                                }}

                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                    {formParam.submitted && (
                                        <div className="errorMsg text-start">{formParam.errors.selectedDate}</div>
                                    )}
                                </div> */}
                                {/* <div className="col-md-6 mb-3">
                                    <label className="requiredValidator">Status</label>
                                    <select
                                        className="form-select form-control"
                                        name="vat"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option>Select</option>
                                        {Taskstatus.map((Status, id) => (
                                            <option value={Status.value} key={id}>
                                                {Status.name}
                                            </option>
                                        ))}
                                    </select>
                                    {formParam.submitted && (
                                        <div className="errorMsg text-start">{formParam.errors.status}</div>
                                    )}
                                </div> */}
                                <div className="col-md-12 mb-3">
                                    <label>Note</label>
                                    <textarea
                                        className="form-control textareaform-control"
                                        rows="3"
                                        id="comment"
                                        name="text"
                                        placeholder="Write here..."
                                        value={taskTitle}
                                        onChange={(e) => setTaskTitle(e.target.value)}
                                    ></textarea>
                                </div>
                                {/* <div className="col-md-12 mb-3">
                  <label>Description</label>
                  <textarea
                    className="form-control textareaform-control"
                    rows="3"
                    id="comment"
                    name="text"
                    placeholder="Write description here..."
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                  ></textarea>
                </div> */}
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button
                            className="custom_btn addform_btn"
                            type="submit"
                            // data-bs-dismiss="modal"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteModal;
