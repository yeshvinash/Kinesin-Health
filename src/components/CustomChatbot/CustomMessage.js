import React from "react";

const CustomMessage = (msg) => {
  return (
    <>
      <div className="user-message">
        <p>{msg.text}</p>
      </div>
    </>
  );
};

export default CustomMessage;
