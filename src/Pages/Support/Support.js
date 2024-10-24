import React from "react";
import { CustomButton } from "../../Components/CustomButton/CustomButton";
import "./Support.css";

export const Support = () => {
  return (
    <section className="support-hero">
      <div className="container">
        <CustomButton link="/" variant={"dark"}>
          Contact US
        </CustomButton>
      </div>
    </section>
  );
};
