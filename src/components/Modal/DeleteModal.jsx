import React from "react";
import deleticon from "../../assets/images/deleticon.svg";

const DeleteModal = ({ deleteService, context , itemName }) => {
  const modalText =
    context === "task"
      ? "Are you sure you want to delete the task?"
      : context === "smsTemplate"
      ? "Are you sure you want to delete this SMS template?"
      : context === "document"
      ? "Are you sure you want to delete this Document?"
      : context === "service"
      ? "Are you sure you want to delete the service?"
      : context === "note"
      ? "Are you sure you want to delete the note?"
      :context="user"
      ? `Are you sure you want to delete the ${itemName}?`
      : "Are you sure you want to delete?";

  return (
    <>
      <div className="modal warningmodal_box" id="myModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <div className="worningimg">
                <img src={deleticon} alt="" />
              </div>
              <div className="deletext">
                <h5>{modalText}</h5>
              </div>
            </div>

            <div className="modal-footer justify-content-center">
              <button
                type="button"
                className="cancelbtnlink"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                className="yesbtn"
                type="submit"
                onClick={deleteService}
                data-bs-dismiss="modal"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
