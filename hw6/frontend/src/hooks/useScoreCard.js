import { createContext, useContext, useState } from "react";
import React from "react";
import Typography from "@material-ui/core/Typography";

const ADD_MESSAGE_COLOR = "#3d84b8";
const REGULAR_MESSAGE_COLOR = "#2b2e4a";
const ERROR_MESSAGE_COLOR = "#fb3640";

const ScoreCardContext = createContext({
  messages: [],

  setMessage: () => {},
  addCardMessage: () => {},
  addRegularMessage: () => {},
  addErrorMessage: () => {},
});

const makeMessage = (message, color) => {
  // return { message, color };

  return (
    <Typography variant="body2" style={{ color: color }}>
      {message}
    </Typography>
  );
};

const ScoreCardProvider = (props) => {
  const [messages, setMessages] = useState([]);

  const setMessage = (message) => {
    setMessages([makeMessage(message, REGULAR_MESSAGE_COLOR)]);
  };
  const addCardMessage = (message) => {
    // setMessages([...messages, makeMessage(message, ADD_MESSAGE_COLOR)]);
    return makeMessage(message, ADD_MESSAGE_COLOR);
  };

  const addRegularMessage = (message) => {
    setMessages([
      ...messages,
      // ...ms.map((m) => makeMessage(m, REGULAR_MESSAGE_COLOR)),
      ...message,
    ]);
  };

  const addErrorMessage = (message) => {
    setMessages([...messages, makeMessage(message, ERROR_MESSAGE_COLOR)]);
  };

  return (
    <ScoreCardContext.Provider
      value={{
        messages,
        setMessage,
        addCardMessage,
        addRegularMessage,
        addErrorMessage,
      }}
      {...props}
    />
  );
};

function useScoreCard() {
  return useContext(ScoreCardContext);
}

export { ScoreCardProvider, useScoreCard };
