import { useState } from "react";
import { motion } from "framer-motion";
import useLocalStorage from "use-local-storage";

import "./normal.css";
import "./App.css";

import WelcomeScreen from "./components/Chat/WelcomeScreenHeader";
import ChatMessage from "./components/Chat/ChatMessage";

import SideMenu from "./components/UI/SideMenu";
import ChatInput from "./components/UI/ChatInput";
import TopMenu from "./components/UI/TopMenu";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const [error, setError] = useState(false);
  const [showSidemenu, setShowSidemenu] = useState(false);
  const [currentSystemMessage, setCurrentSystemMessage] = useState(() => {
    const savedSystemMessage = localStorage.getItem("mySystemMessage");
    return savedSystemMessage !== null ? savedSystemMessage : "";
  });

  const [currentModel, setCurrentModel] = useState(() => {
    const savedModel = localStorage.getItem("currentModel");
    return savedModel !== null ? savedModel : "gpt-3.5-turbo";
  });

  const [currentAPI, setCurrentAPI] = useState(() => {
    const savedAPI = localStorage.getItem("myAPI");
    return savedAPI !== null ? savedAPI : "";
  });
  const [messages, setMessages] = useState(() => {
    const savedMessages = JSON.parse(localStorage.getItem("savedMessages"));
    return savedMessages !== null ? savedMessages : [];
  });

  const systemMessage = {
    "role": "system", "content": currentSystemMessage
  }

  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  
 // Boolean Switch
 // const switchModel = () => {
 //   const newModel = currentModel === "gpt-3.5-turbo" ? "gpt-4" : "gpt-3.5-turbo";
 //   setCurrentModel(newModel);
 // };

  // 3 option Switch
  const switchModel = () => {
   let newModel;
   if (currentModel === "gpt-3.5-turbo") {
     newModel = "gpt-4";
   } else if (currentModel === "gpt-4") {
     newModel = "gpt-4-1106-preview";
   } else {
     newModel = "gpt-3.5-turbo";
   }
   setCurrentModel(newModel);
 };

  function clearChat() {
    setMessages([]);
  }

  function saveChat() {
    localStorage.setItem("savedMessages", JSON.stringify(messages));
  }

  function toggleSideMenu() {
    setShowSidemenu(!showSidemenu);
  }

  const handleSend = async (currentValue) => {
    
    console.log("handleSend is being called by ChatInput");
    if (currentValue.trim() === "") {
      console.log("input is empty");
      return;
    }
    const newMessage = {
      message: currentValue,
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsLoading(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });


    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act. 
    const apiRequestBody = {
       "model": currentModel,
      // "model": "gpt-3.5-turbo",
      // "model": "gpt-4",
      "messages": [
        systemMessage,  // The system message DEFINES the logic of our chatGPT
        ...apiMessages // The messages from our chat with ChatGPT
      ]
    }
    

    await fetch("https://api.openai.com/v1/chat/completions", 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + currentAPI,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "ChatGPT"
      }]);
      setIsLoading(false);
    });
  }

  

  return (
    <div className="App" data-theme={theme}>
      {currentAPI !== "" && !error && (
        <SideMenu
          clearChat={clearChat}
          saveChat={saveChat}
          setCurrentModel={setCurrentModel}
          currentModel={currentModel}
          theme={theme}
          switchTheme={switchTheme}
          switchModel={switchModel}
          showSidemenu={showSidemenu}
          toggleSideMenu={toggleSideMenu}
          currentSystemMessage={currentSystemMessage}
          setCurrentSystemMessage={setCurrentSystemMessage}
        />
      )}
      <motion.section className="chatbox">
        <TopMenu
          toggleSideMenu={toggleSideMenu}
          currentModel={currentModel}
          theme={theme}
          switchTheme={switchTheme}
          currentAPI={currentAPI}
          error={error}

        />
        {isInitial && currentAPI === "" && (
          <WelcomeScreen
            setCurrentAPI={setCurrentAPI}
            currentAPI={currentAPI}
            error={error}
            setError={setError}
            setIsInitial={setIsInitial}
            setCurrentSystemMessage={setCurrentSystemMessage}
            currentSystemMessage={currentSystemMessage}
          />
        )}
        <motion.div className="chat-log">

          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.message}
              sender={message.sender}
            />
          ))}
        </motion.div>

        {currentAPI !== "" && !error && (
          <ChatInput
            handleSend={handleSend}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
      </motion.section>
    </div>
  );
}

export default App;
