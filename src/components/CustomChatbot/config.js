// in the config
import React, { useState } from "react";
import {
  createChatBotMessage,
  createClientMessage,
  createCustomMessage,
} from "react-chatbot-kit";
import CustomMessage from "./CustomMessage";
import CustomInput from "./CustomInput";
import { SVGIcons } from "../Data/SVGIcons";
import CustomChatbot from "./CustomChatbot";

// const [data, setData] = useState("");

const botName = "DocsBot";
const text = "DocsBot";

const config = {
  botName: botName,
  lang: "no",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
  initialMessages: [
    createChatBotMessage(
      `Hi I'm ${botName}. I’m here to help you explain how I work.`
    ),
    // createCustomMessage("Test", "custom"),
  ],
  state: {
    gist: "",
    infoBox: "",
  },
  // customComponents: {
  //   userChatMessage: CustomMessage,
  // },
  // customMessages: {
  //   custom: (props) => <CustomMessage {...props} />,
  // },

  // customComponents: {
  //   userChatMessage: () => <CustomMessage />,
  // },
  // customComponents: {
  //   botChatMessage: (props) => <CustomMessage {...props} />,
  // },

  widgets: [],
};

export default config;
