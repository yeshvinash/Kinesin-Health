import React from 'react'
import successicon from "../../assets/images/successlogout.svg"
import { useNavigate } from 'react-router-dom'

const SuccessLogout = () => {
    const navigate = useNavigate()
  return (
    <div className="modal warningmodal_box" id="successlogoutModal">
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
            <div className="worningimg success">
              <img src={successicon} alt="" />
            </div>
            <div className="deletext">
              <h5>You’ve successfully logged out.</h5>
            </div>
          </div>

          <div className="modal-footer">
            <button
              className="yesbtn green"
              type="submit"
              // onClick={deleteService}
              data-bs-dismiss="modal"
              onClick={()=> navigate("/")}
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessLogout