import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/default.css';

const ChatMessage = (props, index) => {
  const messageRef = useRef(null);
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [messageRef]);

  const isFromChatGPT = props.sender === 'ChatGPT';

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

  const regex = /```/g;
  const isCode = regex.test(props.message);

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

  const parts = props.message.split(regex);

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
          if (i % 2 === 1) {
            const highlightedCode = hljs.highlightAuto(part).value;

            return (
              <pre key={i} className="hljs">
                <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
              </pre>
            );
          } else {
            return <span key={i}>{part}</span>;
          }
        })}
      </motion.div>
    </AnimatePresence>
  </div>
);

export default ChatMessage;
