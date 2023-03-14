import { useRef } from 'react';
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import { FaRegPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";

const ChatInput = (props) => {

  return (
    <motion.div className="chat-input-holder">
      <form className="inputForm" onSubmit={props.handleSend}>
        <textarea
          className="chat-input-textarea"
          rows="1"
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
        ) :
          <UseAnimations animation={loading} size={24} strokeColor={props.theme === "light" ? "white" : "black"} />
        }
      </form>
    </motion.div>
  );
};

export default ChatInput;
