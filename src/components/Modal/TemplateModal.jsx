import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import $ from "jquery";
import toast from "react-hot-toast";

const TemplateModal = ({
  modalHeaderTitle,
  createNewTemplate,
  handleSaveTemplate,
  editTemplateId,
  template,
}) => {
  const [service, setService] = useState("");
  const [templateText, setTemplateText] = useState("");

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

  const validateForm = () => {
    console.log('validate form called...');
    let formIsValid = true;
    let f = Object.assign({}, formParam);
    f.errors.service = '';
    f.errors.templateText = '';

    if (!service) {
      formIsValid = false;
      f.errors.service = "*Please enter name.";
    }
    if (!templateText) {
      formIsValid = false;
      f.errors.templateText = "*Please enter template text.";
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
  }, [templateText]);

  useEffect(() => {
    if (editTemplateId) {
      const selectedTemplate = template.find(
        (template) => template.id === editTemplateId
      );
      if (selectedTemplate) {
        setService(selectedTemplate.name);
        setTemplateText(selectedTemplate.template);
      }
    } else {
      setService("");
      setTemplateText("");
    }
  }, [editTemplateId, template]);

  // modal save handler//
  const handleSave = () => {

    formParam.submitted = true;
    if (validateForm()) {
      formParam.submitted = true;
    } else
      return;

    const newTemplate = {
      // id: editTemplateId || Date.now(),
      name: service,
      template: templateText,
    };

    // handleSaveTemplate(newTemplate);
    createNewTemplate(newTemplate);
    setService("");
    setTemplateText("");

    

    $('#idClosePopup').trigger("click");
  };
  // modal save handler//
  return (
    <div>
      <div className="modal smamodal addTaskmodal custom-modal-wrap" id="addTemplate">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{modalHeaderTitle}</h4>
              <button
                type="button"
                id='idClosePopup'
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={resetFormParam}
              ></button>
            </div>

            <div className="modal-body servicemodalbox">
              <form>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label className="requiredValidator">Name</label>
                    <input
                      type="text"
                      placeholder="Name"
                      className=" form-control"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                    />
                     {formParam.submitted && (
                      <div className="errorMsg text-start">{formParam.errors.service}</div>
                    )}
                  </div>
                  <div className="col-md-12 mb-3">
                    <label className="requiredValidator">Template Text</label>
                    {/* <input
                      type="text"
                      placeholder="Hope you have received the file"
                      className="form-select form-control"
                      value={templateText}
                      onChange={(e) => setTemplateText(e.target.value)}
                    /> */}
                    <textarea
                      className="form-control textareaform-control requiredValidator"
                      rows="7"
                      type="text"
                      placeholder="Template"
                      value={templateText}
                      onChange={(e) => setTemplateText(e.target.value)}
                    ></textarea>
                    {formParam.submitted && (
                      <div className="errorMsg text-start">{formParam.errors.templateText}</div>
                    )}
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer">
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
      </div>
    </div>
  );
};

export default TemplateModal;
