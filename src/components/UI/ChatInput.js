import { useRef } from 'react';
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import { FaRegPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";

const ChatInput = (props) => {
   const myFormRef = useRef();
  const onEnterPress = (e) => {
      if(e.keyCode === 13 && e.shiftKey === false) {
        e.preventDefault();
        myFormRef.requestSubmit();
      }
    }
  
  
  return (
    <motion.div className="chat-input-holder">
      <form className="inputForm" onSubmit={props.handleSend} ref={myFormRef}>
        <textarea
          className="chat-input-textarea"
          onKeyDown={onEnterPress}
          rows="4"
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
