import React from "react";
import Common from "../../../assets/commonImages/Common";
import Checked from "../../../assets/images/checked.svg";

const Success_msg = () => {
  return (
    <>
      <section className="log_sec">
        <div className="logwraper">
          <Common />
          <h2>Kinesin My Health</h2>
          <div className="log_wrap plr40">
            <form>
              <span className="login100-form-title mb14">Success</span>
              <div className="form-floating text-center">
                <p>
                  Your password has been successfully reset, can you check your
                  email for the password reset link
                </p>
                <div className='checkiconbox'>
                  <img src={Checked} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Success_msg;
