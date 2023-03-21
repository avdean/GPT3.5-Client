import { useState } from "react";
import UseAnimations from "react-useanimations";
import TextareaAutosize from "react-textarea-autosize";
import loading from "react-useanimations/lib/loading";
import { FaRegPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";

const ChatInput = (props) => {
  const [currentValue, setCurrentValue] = useState("");

  const handleInputChange = (e) => {
    setCurrentValue(e.target.value);
  };

  const preSendFunction = async (e) => {
    e.preventDefault();
    props.setIsLoading(true);
    setCurrentValue("");
    props.handleSend(currentValue);
  };

  const EnterPress = async (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      props.setIsLoading(true);
      setCurrentValue("");
      props.handleSend(currentValue);
    }
  };

  return (
    <motion.div className="chat-input-holder">
      <form
        className="inputForm"
        onSubmit={preSendFunction}
        onKeyDown={EnterPress}
      >
        <TextareaAutosize
          className="chat-input-textarea noScroll"
          maxRows="6"
          value={currentValue}
          onChange={handleInputChange}
          disabled={props.isLoading}
        />
        {!props.isLoading ? (
          <FaRegPaperPlane
            size="24px"
            style={{ cursor: "pointer" }}
            onClick={preSendFunction}
          />
        ) : (
          <UseAnimations
            animation={loading}
            size={24}
            strokeColor={props.theme === "light" ? "white" : "black"}
          />
        )}
      </form>
    </motion.div>
  );
};

export default ChatInput;
