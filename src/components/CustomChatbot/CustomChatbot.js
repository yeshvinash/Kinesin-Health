import React from "react";

const CustomChatbot = ({ message }) => {
  return (
    <>
      <img
        src="https://i.pinimg.com/originals/cf/da/fa/cfdafa4dc6aab40eae1c5315c02b9339.jpg"
        style={{ width: "100%" }}
      />
      <div className="message-content">{message.content}</div>
    </>
  );
};

export default CustomChatbot;
