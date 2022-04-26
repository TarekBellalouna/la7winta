import React from "react";
import Chatbot from "react-chatbot-kit";
import 'react-chatbot-kit/build/main.css';

import config from "./config";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessagePerser";

import "./App.css";

function ChatbotComp() {
  return (
    <div className="ChatbotComp">
      <div style={{ maxWidth: "300px" }}>
        <Chatbot
          config={config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
        />
      </div>
    </div>
  );
}

export default ChatbotComp;