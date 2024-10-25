import React, { useEffect, useState, useRef } from "react";
import uploadimg from "../../assets/images/uploadimg.svg";
import { Autocomplete, TextField } from "@mui/material";
import {
  Documentstatus,
  Documenttype,
  TaskPriority,
} from "../../Utils/Constant";
import {
  GET_ALL_DOCUMENT_TYPES,
  PATIENT_DOCUMENTS_CONTROLER_URL,
  PATIENT_DOCUMENTS_UPLOAD,
  PATIENT_SEARCH_AUTOCOMPLETE_URL,
  STAFF_MEMBERS_CONTROLER_URL,
  WHO_AM_I
} from "../../api/Service";
import { createAxiosInstance } from "../../api/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";
import toast, { Toaster } from "react-hot-toast";
import { logoutFromHelper } from "../../api/Helper";
import { logout } from "../../redux/auth/AuthSlice";
import { removeuser } from "../../redux/user/userSlice";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import DrawerPanel from "antd/es/drawer/DrawerPanel";
const DocumentModal = ({
  handleSaveTask,
  patient,
  refreshByPatientIdApi,
  refreshAllApi,
  fromPatient,
  fetchDocumentById
}) => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Staff memebers data
  const [staffMember, setStaffMember] = useState("");
  const [staffMemberId, setStaffMemberId] = useState(null)
  const [showOption, setShowOption] = useState(false);
  const [imageAsPreview, setImageAsPreview] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [fullName, setFullName] = useState('');
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    patientId: '',
    documentType: '',
    otherDocumentType: '',
    status: '',
    staffMemberId: '',
    priority: '-1'
  });

  const [documentTypes, setDocumentTypes] = useState(false);

  let tenantVal = useSelector((state) => state.auth.user?.tenant);
  if (!tenantVal)
    tenantVal = localStorage.getItem('kinesin-tenant');
  const fetchProfileInfo = async () => {
    try {
      const axiosInstance = createAxiosInstance(true);
      const response = await axiosInstance.get(`${WHO_AM_I}`);
      if (
        response &&
        response.data &&
        response.data.staffMember &&
        response.data.staffMember.id
      ) {
        setStaffMemberId(response.data.staffMember.id);
        setFormData({ ...formData, ['staffMemberId']: response.data ? response.data.staffMember.id : null });
      }
    } catch (error) {
      errorHandling(error)
    }
  };
  const fetchDocumentTypes = async () => {
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${GET_ALL_DOCUMENT_TYPES}`
      );
      let docTypes = [];
      if (response && response.data) {

        response.data.forEach(element => {
          if (element && element.id && element.name) {
            docTypes.push({ value: element.id, name: element.name });
          }
        });
      }
      setDocumentTypes(docTypes);
    } catch (error) {
      errorHandling(error)
    }
  };

  const handleCloseModal = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // Reset the file input value to clear the selection
    }
    resetFormParam();
    resetFormState();
  };
  const resetFormState = () => {
    if (fromPatient) {
      setFullName('');
      setFormData({
        id: '',
        name: '',
        patientId: '',
        documentType: '',
        otherDocumentType: '',
        status: '',
        staffMemberId: '',
        priority: '-1'
      });
    }

    setImageFile("");
    setImageAsPreview("");
  };

  // Staff member data//
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

  useEffect(() => {
    setFullName(patient && patient.patient_name ? patient.patient_name : '');

    setImageAsPreview("")
    setImageFile("")
    setFormData({
      id: '',
      name: '',
      patientId: (patient && patient.patient_id ? patient.patient_id : ''),
      documentType: '',
      otherDocumentType: '',
      status: '',
      staffMemberId: '',
      priority: '-1'
    });
    fetchUser();
    fetchDocumentTypes();
    fetchProfileInfo();
  }, [tenantVal, patient]);

  const [options, setOptions] = useState([]);

  const getData = async (searchTerm) => {
    if (!searchTerm) setOptions([]);

    const axiosInstance = createAxiosInstance();
    const response = await axiosInstance.get(
      `${tenantVal}${PATIENT_SEARCH_AUTOCOMPLETE_URL}/${searchTerm}`
    );

    if (response && response.data && response.data.length > 0) {
      const updatedOptions = response.data.map((p) => {
        return {
          id: p.id,
          title: (p.firstName + (p.surname ? " " + p.surname : "") + (p.dateOfBirth ? (' (' + moment(p.dateOfBirth).format("DD-MM-YYYY") + ')') : '')),

        };
      });
      setOptions(updatedOptions);
    } else setOptions([]);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    f.errors.documentType = '';
    f.errors.status = '';
    f.errors.patient = '';
    f.errors.priority = '';
    f.errors.name = '';
    if (!formData.documentType) {
      formIsValid = false;
      f.errors.documentType = "*Please select document type.";
    }
    if (!formData.patientId && !patient && imageFile) {
      formIsValid = false;
      f.errors.patient = "*Please select patient.";
    }
    if (!formData.name) {
      formIsValid = false;
      f.errors.name = "*Please enter document name.";
    }
    setFormParam(f);
    return formIsValid;
  };


  const resetFormParam = () => {
    setImageAsPreview(null);
    setImageFile(null);
    setFormParam({
      errors: {
        email: '',
      },
      submitted: false
    });
  }

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleSave = async () => {
    let id;
    formParam.submitted = true;
    if (validateForm()) {
      formParam.submitted = true;
    } else
      return;

    let documentUrl;
    if (imageFile && formData.documentType) {
      try {
        const data = new FormData();
        data.append('file', imageFile);

        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.post(
          `${tenantVal}${PATIENT_DOCUMENTS_UPLOAD}` + '/' + formData.documentType + '/patient/' + (patient && patient.patient_id ? patient.patient_id : formData.patientId),
          data
        );
        if (response && response.data)
          setFormData({ ...formData, ['id']: response && response.data && response.data.id ? response.data.id : '' });
        id = response && response.data && response.data.id ? response.data.id : '';
        documentUrl = response.data.documentUrl;
      } catch (error) {
        errorHandling(error);
        return;
      }
    }


    let postData = {
      'id': id,
      'tenant': tenantVal,
      'patientId': patient ? patient.patient_id : formData.patientId,
      'patient': {
        'id': patient ? patient.patient_id : formData.patientId,
        'tenant': tenantVal,
        'doctorDetailsId': formData.staffMemberId,
        'doctorDetails': {
          'id': formData.staffMemberId,
          'tenant': tenantVal,
        }
      },
      'reviewedById': formData.staffMemberId,
      'reviewedBy': {
        "id": formData.staffMemberId,
        "tenant": tenantVal
      },
      'documentTypeId': formData.documentType,
      "documentTypes": {
        "id": formData.documentType,
        "tenant": tenantVal
      },
      'status': formData.status,
      'priority': formData.priority,
      'name': formData.name,
      'documentUrl': documentUrl
    }

    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.post(
        `${tenantVal}${PATIENT_DOCUMENTS_CONTROLER_URL}`,
        postData
      );

      toast.success('Document ' + (formData.id ? 'updated' : 'saved') + ' successfully');

      if (refreshByPatientIdApi)
        refreshByPatientIdApi(formData.patientId);

      if (refreshAllApi)
        refreshAllApi();

      if (typeof handleSaveTask === "function") {

        handleSaveTask();
      }
      setFullName(patient && patient.patient_name ? patient.patient_name : '');
      setFormData({
        id: '',
        patientId: (patient && patient.patient_id ? patient.patient_id : ''),
        documentType: '',
        otherDocumentType: '',
        status: '',
        staffMemberId: '',
        priority: '-1',
        name: ''
      });
      setImageFile("")
      setImageAsPreview("")
      if (typeof fetchDocumentById === "function") {

        fetchDocumentById();
      }
      $('#idClosePopup').trigger("click");

    } catch (error) {
      errorHandling(error);
    }


  }
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
  const handleImagePreview = async (e) => {
    let image_as_base64 = URL.createObjectURL(e.target.files[0])
    let image_as_files = e.target.files[0];

    setImageAsPreview(image_as_base64);
    setImageFile(image_as_files);
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="modal warningmodal_box custom-modal-wrap" id="addDocumentModal">
        <div className="modal-dialog add_document-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Document  </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id='idClosePopup'
                onClick={handleCloseModal}
              ></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label>Upload Document</label>
                    <div className="documentUploadbtn">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImagePreview}
                      />
                    </div>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="requiredValidator">Document Name</label>
                    <div className="priorityform">
                      <input
                        className="form-control2"
                        name="name"
                        value={formData.name}
                        placeholder="Document Name"
                        onChange={handleChange}
                      />
                      {formParam.submitted && (
                        <div className="errorMsg text-start">
                          {formParam.errors.name}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Status</label>
                    <select
                      as="select"
                      className="form-select form-control custom-select"
                      name="status"
                      value={formData.status}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      <option value="">Select</option>
                      {Documentstatus.map((Status, id) => (
                        <option value={Status.value} key={id}>
                          {Status.name}
                        </option>
                      ))}
                    </select>
                    {formParam.submitted && (
                      <div className="errorMsg text-start">
                        {formParam.errors.status}
                      </div>
                    )}
                  </div>
                  <div className="col-md-4 mb-3">
                    <label>Patient</label>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      value={fullName || null}
                      // value={patient.patient_name}
                      options={options}
                      getOptionLabel={(option) => (option && option.title ? option.title : fullName)}
                      onInputChange={onInputChange}
                      onChange={(event, newValue) => {
                        setFullName(newValue ? newValue.title : '');
                        setFormData({ ...formData, ['patientId']: newValue ? newValue.id : '' });
                      }}
                      renderInput={(params) => <TextField {...params} label="" />}
                    />
                    {imageFile && !patient && formParam.submitted && (
                      <div className="errorMsg text-start">
                        {formParam.errors.patient}
                      </div>
                    )}

                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Staff member  </label>
                    <select disabled
                      as="select"
                      className="form-select form-control custom-select"
                      name="staffMemberId"
                      value={
                        // formData.staffMemberId
                        staffMemberId
                      }
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      <option value="">Select</option>
                      {staffMember
                        ? staffMember.map((Staff) => (
                          <option value={Staff.id} key={Staff.id}>
                            {Staff.firstName} {Staff.lastName}
                          </option>
                        ))
                        : ""}
                    </select>
                    {formParam.submitted && (
                      <div className="errorMsg text-start">
                        {formParam.errors.staffMemberId}
                      </div>
                    )}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Priority</label>
                    <div className="priorityform">
                      {/* <div className="pridot"></div> */}
                      <div className={formData.priority == 0 ? "pridot" : (formData.priority == 1 ? "pridotYellow" : (formData.priority == 2 ? "pridotGreen" : ""))}></div>
                      <select className="form-select form-control" name="priority" value={formData.priority} onChange={(e) => {
                        handleChange(e);
                      }}>
                        <option value={-1}>Select</option>
                        {TaskPriority.map((Priority, id) => (
                          <option value={Priority.value} key={id}>
                            {Priority.name}
                          </option>
                        ))}
                      </select>
                      {formParam.submitted && (
                        <div className="errorMsg text-start">
                          {formParam.errors.priority}
                        </div>
                      )}
                    </div>
                  </div>


                  <div className="col-md-4 mb-3">
                    <label className="requiredValidator">Document type</label>
                    <select
                      as="select"
                      className="form-select form-control custom-select"
                      name="documentType"
                      value={formData.documentType}
                      onChange={(e) => {
                        if (e.target.value === "Other") {
                          setShowOption(true);
                          handleChange(e);
                        } else {
                          setShowOption(false);
                          handleChange(e);
                        }
                      }}
                    >
                      <option value="">Select</option>
                      {documentTypes && documentTypes.map((Status, id) => (
                        <option value={Status.value} key={id}>
                          {Status.name}
                        </option>
                      ))}
                    </select>
                    {showOption ? (
                      <div className="mt-3 ">
                        <input
                          className="form-control"
                          id="designation"
                          value={formData.otherDocumentType}
                          type="text"
                          name="otherDocumentType"
                          onChange={(e) => handleChange(e)}
                          placeholder="Enter New Document Type"
                          required
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    {formParam.submitted && (
                      <div className="errorMsg text-start">
                        {formParam.errors.documentType}
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>

            <div class="modal-footer">
              <button
                class="custom_btn savwidth"
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
    </>
  );
};

export default DocumentModal;
