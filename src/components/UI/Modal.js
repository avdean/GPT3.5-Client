import { useRef } from "react";
import { HiX } from "react-icons/hi";
import { motion } from "framer-motion";

const Modal = (props) => {
  const modifiedSystemInputRef = useRef();
  if (!props.show) {
    return null;
  }

  function handleSystemMessageSubmit(e) {
    e.preventDefault();
    props.clearChat();
    const enteredSystem = modifiedSystemInputRef.current.value;
    props.setCurrentSystemMessage(enteredSystem);
    localStorage.setItem("mySystemMessage", enteredSystem);
    props.onClose();
  }
  return (
    <div className="modal">
      <motion.div
        className="modalContent"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="closeCorner">
          <HiX onClick={props.onClose} />
        </div>
        <p>Current Model: {props.currentModel}</p>
        <p>This is your current System Message:</p>
        <div className="SystemMessageDisplay"><p>{props.currentSystemMessage}</p></div>

        <p>You can also add how you would like ChatGPT to respond?</p>
        <form className="sytemMessageForm" onSubmit={handleSystemMessageSubmit}>
          <textarea
            type="text"
            className="systemMessageAddModal"
            name="system"
            ref={modifiedSystemInputRef}
            placeholder="You are a friendly AI assistant ready to help with any question."
          />
          <button className="welcomeButton">Update</button>
        </form>
      </motion.div>
    </div>
  );
};

export default Modal;
