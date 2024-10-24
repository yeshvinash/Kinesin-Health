import React from "react";
import running from "../images/running.svg";
import whitening from "../images/whitening.svg";
import path from "../images/path.svg";
import lifestyle from "../images/lifestyle.svg";
import hearing from "../images/hearing.svg";
import HealthImg1 from "../images/health-img1.png";
import HealthImg2 from "../images/health-img2.png";
import HealthImg3 from "../images/health-img3.png";
import HealthImg4 from "../images/health-img4.png";
import HealthImg5 from "../images/health-img5.png";



const Common = () => {
  return (
    <>
      <div className="cardbox-wrapper card-item1 d-flex align-items-center justify-content-center">
        <div className="iconbox">
          <img src={HealthImg1} alt="" />
        </div>
      </div>
      <div className="cardbox-wrapper card-item2 d-flex align-items-center justify-content-center">
        <div className="iconbox">
          <img src={HealthImg2} alt="" />
        </div>
      </div>
      <div className="cardbox-wrapper card-item3 d-flex align-items-center justify-content-center">
        <div className="iconbox">
          <img src={HealthImg3} alt="" />
        </div>
      </div>
      <div className="cardbox-wrapper card-item4 d-flex align-items-center justify-content-center">
        <div className="iconbox">
          <img src={HealthImg4} alt="" />
        </div>
      </div>
      <div className="cardbox-wrapper card-item5 d-flex align-items-center justify-content-center">
        <div className="iconbox">
          <img src={HealthImg5} alt="" />
        </div>
      </div>
      {/* <div className="flotingbox flotingbox1">
        <div className="iconbox">
          <img src={running} alt="" />
        </div>
        <h6>Running</h6>
      </div> */}

      {/* <div className="flotingbox flotingbox2">
        <div className="iconbox">
          <img src={whitening} alt="" />
        </div>
        <h6>Teeth</h6>
      </div> */}

      {/* <div className="flotingbox flotingbox3">
        <div className="iconbox">
          <img src={path} alt="" />
        </div>
        <h6>Heard</h6>
      </div> */}

      {/* <div className="flotingbox flotingbox4">
        <div className="iconbox">
          <img src={lifestyle} alt="" />
        </div>
        <h6>Lifestyle</h6>
      </div> */}

      {/* <div className="flotingbox flotingbox5">
        <div className="iconbox">
          <img src={hearing} alt="" />
        </div>
        <h6>Hearing</h6>
      </div> */}
    </>
  );
};

export default Common;
