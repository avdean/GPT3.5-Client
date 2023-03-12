import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

const ChatMessage = (props, index) => {
  const messageRef = useRef(null);
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [messageRef]);

  const isFromChatGPT = props.sender === "ChatGPT";

  if (!isFromChatGPT) {
    return (
      <div className="chat-message">
        <AnimatePresence>
          <motion.div
            ref={messageRef}
            key={index}
            className="message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            {props.message}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // Regular expression to match code blocks
  const regex = /(`{3})([\s\S]*?)(`{3})/g;

  // Check if the message contains code or not
  const isCode = regex.test(props.message);

  // If the message does not contain code, render it as plain text
  if (!isCode) {
    return (
      <div className="chat-message-gpt">
        <AnimatePresence>
          <motion.div
            ref={messageRef}
            key={index}
            className="messageChatgpt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
          >
            {props.message}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // If the message contains code, split it into parts
  const parts = props.message.split(regex);

  // Render each part as plain text or code block
  return (
    <div className="chat-message-gpt">
      <AnimatePresence>
        <motion.div
          ref={messageRef}
          key={index}
          className="messageChatgpt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
        >
          {parts.map((part, i) => {
            if (regex.test(part)) {
              // If part is code block, render it inside SyntaxHighlighter component
              return (
                <SyntaxHighlighter
                  language="javascript"
                  style={dracula}
                  key={i}
                >
                  {part.substring(3, part.length - 3)}
                </SyntaxHighlighter>
              );
            } else {
              // If part is not code block, render it as plain text
              return <span key={i}>{part}</span>;
            }
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ChatMessage;
