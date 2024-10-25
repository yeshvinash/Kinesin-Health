import React from 'react'
import Common from '../../../assets/commonImages/Common'
import successicon from "../../../assets/images/successlogout.svg"
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const navigate = useNavigate()
    return (
      <>
        <section className="log_sec log_outsect">
          <div className="logwraper">
            <Common />
            <div className="log_wrap">
              <div className="worningimg success">
                <img src={successicon} alt="" />
              </div>
              <h3>Logged Out</h3>
              <h5>You’ve successfully logged out.</h5>
              <div className="container-login100-form-btn">
                <button className="custom_btn login_btn" type="submit" onClick={()=> navigate('/login')}>
                  Back to login
                </button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
}

export default Logout