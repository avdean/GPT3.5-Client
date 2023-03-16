import UseAnimations from "react-useanimations";
import TextareaAutosize from "react-textarea-autosize";
import loading from "react-useanimations/lib/loading";
import { FaRegPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";

const ChatInput = (props) => {

  function EnterPress(e) {
    if (e.keyCode == 13 && e.shiftKey === false) {
      e.preventDefault();
      props.handleSend();
    }
  }

  return (
    <motion.div className="chat-input-holder">
      <form className="inputForm" onSubmit={props.handleSend} onKeyDown={EnterPress}>
        <TextareaAutosize
          className="chat-input-textarea"
          maxRows="6"
          value={props.input}
          onChange={(e) => props.setInput(e.target.value)}
          disabled={props.isLoading}
        />
        {!props.isLoading ? (
          <FaRegPaperPlane
            size="24px"
            style={{ cursor: "pointer" }}
            onClick={props.handleSend}
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
