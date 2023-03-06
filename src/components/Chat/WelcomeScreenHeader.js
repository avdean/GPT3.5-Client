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
    if (!enteredSystem === "") {
      props.setCurrentSystemMessage(enteredSystem);
      localStorage.setItem("mySystemMessage", enteredSystem);
    }
    console.log(enteredAPI);
    console.log(enteredSystem);
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
        <h1>GPT 3.5 Client</h1>
        <p>
          This is a client that lets you speak to a number of OpenAI's models!
          You can read more about the different models at{" "}
          <a href="https://platform.openai.com/docs/models/overview">
            OpenAI's docs
          </a>.
        </p>
        <form className="WelcomeInputForm" onSubmit={handleApiSubmit}>
        <h3>Before you start, please enter your OpenAI API key:</h3>
            <input type="text" ref={apiInputRef} />
            {props.error && <p>Please enter a valid API-Key</p>}
 
          <h3>You can also add how you would like GPT 3.5 to respond?</h3>
            <textarea
              type="text"
              rows="4"
              cols="50"
              ref={systemInputRef}
              placeholder="You are a friendly AI assistant ready to help with any question."
            />
        </form>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeScreen;
