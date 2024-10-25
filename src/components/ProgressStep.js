import React from "react";

const ProgressStep = ({ activeStep }) => {
  const option = [
    {
      id: 1,
      stepNo: 1,
      details: "My Details",
    },
    {
      id: 2,
      stepNo: 2,
      details: "Patient Details",
    },
    {
      id: 3,
      stepNo: 3,
      details: "Opening Hours",
    },
    {
      id: 4,
      stepNo: 4,
      details: "Add Services",
    },
    {
      id: 5,
      stepNo: 5,
      details: "Add Doctors",
    },
    {
      id: 6,
      stepNo: 6,
      details: "Payment Setup",
    },
  ];

  // const optionGroups = [];
  // for (let i = 0; i < option.length; i += 2) {
  //   optionGroups.push(option.slice(i, i + 2));
  // }

  return (
    <>
      <div className="col-md-12">
        <ul className="progresssteapes">
        {
  option.map((item, i) => (
    <li
      className={
        item.stepNo === activeStep
          ? "active showActive"
          : item.stepNo === activeStep + 1
          ? "showActive"
          : item.stepNo <= activeStep 
          ? "active"
          : ""
      }
      key={i}
    >
      <span>{item.stepNo}</span> <h6>{item.details}</h6>
    </li>
  ))
}

      {/* {optionGroups.map((group, index) => (
            <div className="progress-step-row" key={index} style={{display:'flex', justifyContent:'center'}}>
              {group.map((item) => (
                <li
                  className={item.stepNo <= activeStep ? "active" : ""}
                  key={item.id}
                  style={{listStyle:'none', flex:'1', textAlign:'center'}}
                >
                  <span>{item.stepNo}</span> <h6>{item.details}</h6>
                </li>
              ))}
            </div>
          ))} */}
    </ul >
      </div >
    </>
  );
};

export default ProgressStep;
