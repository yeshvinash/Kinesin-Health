import React, { useState } from "react";
import logouticon from "../../assets/images/logout.svg";
import SuccessLogout from "./SuccessLogout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/AuthSlice";
import { persistor } from "../../redux/Store";
import storage from "redux-persist/lib/storage";
import { removeuser } from "../../redux/user/userSlice";
import { logoutFromHelper } from "../../api/Helper";

const LogOutModal = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const handleLogout=()=>{
    // sessionStorage.removeItem("accessToken");
    // sessionStorage.removeItem("requestId");
    // sessionStorage.removeItem("refreshToken");
    // sessionStorage.removeItem("userId");
    // persistor.pause();
    // persistor.flush().then(() => {
    //   return persistor.purge();
    // });

    logoutFromHelper();
    dispatch(logout())
    dispatch(removeuser())
    navigate("/logout");
   }

  
  return (
    <>
      <div className="modal  warningmodal_box" id="logoutModal">
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
                <img src={logouticon} alt="" />
              </div>
              <div className="deletext">
                <h5>Are you sure you want to logout?</h5>
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
                // onClick={()=> navigate("/logout")} 
                onClick={handleLogout}
                data-bs-dismiss="modal"               
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
       <SuccessLogout />
    </>
  );
};

export default LogOutModal;
