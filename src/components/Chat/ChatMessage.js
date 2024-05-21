import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import hljs from "highlight.js";
import "./dracula.css";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatMessage = (props, index) => {
  const messageRef = useRef(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      hljs.highlightAll();
    }
  }, [messageRef]);

  // Regular expression to split content by code blocks
  const parts = props.message.split(/(```[\s\S]*?```)/);

  return (
    <div className={`chat-message${props.sender === 'ChatGPT' ? '-gpt' : ''}`}>
      <AnimatePresence>
        <motion.div
          ref={messageRef}
          key={index}
          className={`message${props.sender === 'ChatGPT' ? 'Chatgpt' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: props.sender === 'ChatGPT' ? 3 : 2 }}
        >
          {parts.map((part, i) => {
            // Check if the part is a code block
            if (/^```/.test(part)) {
              const codeContent = part.replace(/^```|```$/g, '');
              return (
                <pre key={i}>
                  <code>{codeContent}</code>
                </pre>
              );
            }
            // Render as Markdown if not code block with added Markdown functionality
            return (
              <ReactMarkdown key={i} remarkPlugins={[remarkGfm]}>{part}</ReactMarkdown>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ChatMessage;