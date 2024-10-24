import React, { useState } from "react";
import { Steps } from "antd";
import "./CustomizedSteps.css";

const steps = [
  {
    title: (
      <>
        <div className="custom-title">
          <h6>Step 1</h6>
          <span className="subtitle">Subtitle for Step 1</span>
        </div>
      </>
    ),
    content: <p>Custom content for Step 1</p>,
  },
  {
    title: (
      <>
        <div className="custom-title">
          <h6>Step 2</h6>
          <span className="subtitle">Subtitle for Step 1</span>
        </div>
      </>
    ),

    content: (
      <div>
        <h3>Custom content for Step 2</h3>
      </div>
    ),
  },
  {
    title: (
      <>
        <div className="custom-title">
          <h6>Step 3</h6>
          <span className="subtitle">Subtitle for Step 1</span>
        </div>
      </>
    ),
    content: <p>Custom content for Step 3</p>,
  },
];

export const Styleguide = () => {
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };


  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrent(value);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  return (
    <>
      <div className="custom-steps-wizard ">
        <Steps
          current={current}
          items={items}
          onChange={onChange}
          direction="vertical"
        />
        <div className="custom-steps-wizard-content-wrap">
          {steps[current].content}
        </div>
      </div>
      {/* {current < steps.length - 1 && (
        <Button type="primary" onClick={() => next()}>
          Next
        </Button>
      )} */}
    </>
  );
};
