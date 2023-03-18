import { useState, useRef } from "react"; 
import UseAnimations from "react-useanimations";
import TextareaAutosize from "react-textarea-autosize";
import loading from "react-useanimations/lib/loading";
import { FaRegPaperPlane } from "react-icons/fa"; 
import { motion } from "framer-motion"; 

const ChatInput = (props) => { 

const [inputValue, setInputValue] = useState(""); 
const [loading, setLoading] = useState(false); 
const timeoutRef = useRef(null); 

function handleInputChange(e) { const value = e.target.value; clearTimeout(timeoutRef.current); timeoutRef.current = setTimeout(() => { setInputValue(value); }, 500); } 

function handleSend(e) { e.preventDefault(); setLoading(true); props.send(inputValue).finally(() => { setLoading(false); setInputValue(""); }); } 

function handleEnterPress(e) { if (e.keyCode === 13 && !e.shiftKey) { e.preventDefault(); handleSend(e); } }

  return (
    <motion.div className="chat-input-holder">
      <form className="inputForm" onSubmit={props.handleSend} onKeyDown={handleEnterPress}>
        <TextareaAutosize
          className="chat-input-textarea noScroll"
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
