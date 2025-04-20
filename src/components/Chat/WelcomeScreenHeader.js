import React, { useRef } from "react";
import { motion } from "framer-motion";

const WelcomeScreen = (props) => {
  const apiInputRef = useRef();
  const systemInputRef = useRef();

  function handleApiSubmit(e) {
    e.preventDefault();
    const enteredAPI = apiInputRef.current.value;
    const enteredSystem = systemInputRef.current.value;

    if (!enteredAPI.includes("sk-")) {
      props.setError(true);
      return;
    }
    props.setCurrentAPI(enteredAPI);
    localStorage.setItem("myAPI", enteredAPI);
    props.setError(false);
    
    if (enteredSystem !== "") {
      props.setCurrentSystemMessage(enteredSystem);
      localStorage.setItem("mySystemMessage", enteredSystem);
    }
    console.log(enteredAPI);
    console.log(props.currentSystemMessage);
    props.setIsInitial(false);
  }

  const container = {
    hidden: {
      opacity: 0,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0 },
    },
    visible: {
      opacity: 1,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 5 },
    },
  };

  return (
    <motion.div
      className="welcome"
      key="welcome"
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="display"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        <h1>Welcome to my ChatGPT Frontend Client</h1>
        <p>
          This is a client that lets you speak to OpenAI's chatGPT chatbot directly via API!
        </p>
        <form className="WelcomeInputForm" onSubmit={handleApiSubmit}>
        <p>Before you start, please enter your OpenAI API key:</p>
            <input className="ApiInput" type="text" name="api" ref={apiInputRef} />
            {props.error && <p>Please enter a valid API-Key</p>}
 
          <p>You can also add how you would like chatGPT to respond?</p>
            <textarea
              type="text"
              className="systemMessageAdd"
              name="system"
              ref={systemInputRef}
              placeholder="You are a friendly AI assistant ready to help with any question."
            />
            <button className="welcomeButton">All set!</button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeScreen;
