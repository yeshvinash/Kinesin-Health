import React from "react";
import Common from "../../../assets/commonImages/Common";
import Checked from "../../../assets/images/checked.svg";

const Reg_Complete = () => {
  return (
    <>
      <section className="log_sec">
        <div className="logwraper">
          <Common />
          <h2>Kinesin My Health</h2>
          <div className="log_wrap plr40">
            <form>
              <span className="login100-form-title mb14">
                Registration is complete
              </span>
              <div className="form-floating text-center">
                <p>Congratulation you have complete your sign up</p>
                <div className="checkiconbox">
                  <img src={Checked} />
                </div>
              </div>
              <div className="frm_btm complete">
                <div className="container-login100-form-btn">
                  <button
                    className="custom_btn login_btn"
                    type="submit"
                  >
                    Home
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Reg_Complete;
