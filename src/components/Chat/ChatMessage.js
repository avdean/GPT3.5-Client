import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import hljs from "highlight.js";
import "./dracula.css";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Utility function to clean up the content
const cleanContent = (content) => {
  // Replace multiple newlines with a single newline
  return content.replace(/\n{2,}/g, '\n');
};

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
            // Clean and render as Markdown if not code block
            return (
              <ReactMarkdown key={i} remarkPlugins={[remarkGfm]}>
                {cleanContent(part)}
              </ReactMarkdown>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ChatMessage;