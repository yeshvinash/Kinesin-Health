import React, { useEffect, useState } from "react";
import { createAxiosInstance } from "../../api/axiosConfig";
import { MESSAGE_CONTROLER_URL, SMS_TEMPLATE_CONTROLLER } from "../../api/Service";
import toast, { Toaster } from "react-hot-toast";
import $ from "jquery";

const SmsModal = ({
  tenantVal,
  patientId,
  patientName,

  selectedUsers,
  user_option,
  handleSMSModalClose,
  selectAllChecked,
}) => {

  const [smsTemplates, setSmsTemplates] = useState([]);

  useEffect(() => {
    console.log('kkkkkkkkkkkkk1');
    getSmstemplates();
    setFormData({
      message: '',
      groupName: '',
      smsTemplate: '',
      smsTemplateId: ''
    });
  }, [patientId]);

  const [formData, setFormData] = useState({
    message: '',
    groupName: '',
    smsTemplate: ''
  });

  const getSmstemplates = async () => {
    console.log('getSmstemplates called..');

    try {

      let t = [
        { 'label': 'SMS Templates*', 'value': '' },
        // { 'label': 'SMS Templates1', 'value': '1' },
        // { 'label': 'SMS Templates2', 'value': '2' },
        // { 'label': 'SMS Templates3', 'value': '3' }
      ]

      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${SMS_TEMPLATE_CONTROLLER}`
      );

      console.log(response);
      if (response && response.data) {
        response.data.forEach(element => {
          t.push({ 'label': element.name, 'value': element.id });
        });
      }

      setSmsTemplates(t);

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const [formParam, setFormParam] = useState(
    {
      errors: {
        email: '',
      },
      submitted: false
    }
  );
  const validateForm = () => {
    console.log('validate form called...');
    let formIsValid = true;
    let f = Object.assign({}, formParam);
    f.errors.message = '';
    f.errors.groupName = '';
    f.errors.smsTemplateId = '';
    if (!formData.message) {
      formIsValid = false;
      f.errors.message = "*Please enter message.";
    }
    if (!formData.groupName) {
      formIsValid = false;
      f.errors.groupName = "*Please enter group name.";
    }
    if (!formData.smsTemplateId) {
      formIsValid = false;
      f.errors.smsTemplateId = "*Please select sms template.";
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
  }, [formData.message, formData.groupName, formData.smsTemplateId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (tenantVal, patientId) => {
    console.log('handleSubmit called..' + patientId + ' , ' + formData.message + ',' + formData.groupName + ',' + formData.smsTemplate);
    console.log('formData.smsTemplateId : ' + formData.smsTemplateId);

    formParam.submitted = true;
    if (validateForm()) {
      formParam.submitted = true;
    } else
      return;

    let smsT;
    if (formData.smsTemplateId)
      smsT = smsTemplates.filter(f => f.value == formData.smsTemplateId)[0].label;

    console.log('smst : ' + smsT);

    var obj = {
      'id': patientId,
      "tenant": tenantVal,
      'message': formData.message,
      'template': smsT ? smsT : '',
      "patient": {
        'id': patientId,
        "tenant": tenantVal,
      }
    };


    console.log('request : ' + JSON.stringify(obj));

    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.post(
        `${tenantVal}${MESSAGE_CONTROLER_URL}`,
        obj
      );

      setFormData({
        message: '',
        groupName: '',
        smsTemplate: '',
        smsTemplateId: ''
      });
      toast.success('Sms sent successfully.');
      $('#idClosePopupSendSms').trigger("click");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (

    <div className="modal smamodal custom-modal-wrap" id="sendSma_modal">

      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">

            <h4 className="modal-title">Send SMS</h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              id='idClosePopupSendSms'
              aria-label="Close"
              onClick={resetFormParam}
            ></button>
          </div>

          <div className="modal-body">
            <div className="bodycontdropdown">
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label>Recipient Name</label>
                  <input
                    className="form-control2"
                    name="text"
                    value={patientName}
                    placeholder="Group Name" disabled
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <label className="requiredValidator">SMS Templates</label>
                  <select
                    className="form-control p15"
                    name="smsTemplateId"
                    value={formData.smsTemplateId}
                    onChange={e => {
                      handleChange(e)
                    }}
                  >
                    {smsTemplates.map((option) => {
                      return (
                        <option label={option.label} value={option.value}>
                          {option.label}
                        </option>
                      );
                    })}
                  </select>
                  {formParam.submitted && (
                    <div className="errorMsg text-start">{formParam.errors.smsTemplateId}</div>
                  )}
                </div>
                {/* <div className="col-md-12 mb-3">
                  <select className="form-select form-control" name="smsTemplate" onChange={e => {
                    handleChange(e)
                  }}>
                    <option>SMS Templates</option>
                    <option>SMS Templates</option>
                    <option>SMS Templates</option>
                    <option>SMS Templates</option>
                  </select>
                </div> */}
                <div className="col-md-12 mb-3">
                  <label className="requiredValidator">Group Name</label>
                  <input
                    className="form-control2"
                    name="groupName"
                    placeholder="Group Name"
                    value={formData.groupName}
                    onChange={handleChange}
                  />
                  {formParam.submitted && (
                    <div className="errorMsg text-start">{formParam.errors.groupName}</div>
                  )}

                </div>
              </div>
              <div className="col-md-12 mb-3">
                <label className="requiredValidator">Message</label>
                <textarea
                  className="form-control textareaform-control"
                  rows="5"
                  id="comment"
                  name="message"
                  placeholder="Write here..."
                  onChange={handleChange}
                  value={formData.message}
                ></textarea>
                {formParam.submitted && (
                  <div className="errorMsg text-start">{formParam.errors.message}</div>
                )}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="custom_btn savwidth"
              // data-bs-dismiss="modal"
              aria-label="Close" onClick={() => handleSubmit(tenantVal, patientId)} type="submit">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmsModal;
