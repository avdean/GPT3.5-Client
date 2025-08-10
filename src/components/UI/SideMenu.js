import { useState } from "react";
import { HiX, HiPlus, HiSave, HiSun, HiMoon, HiBeaker } from "react-icons/hi";
import Modal from "./Modal";

const SideMenu = (props) => {
  const [show, setShow] = useState(false);
    const handleModelChange = (event) => {
    props.setCurrentModel(event.target.value);
  };

  return (
    <>
      <aside
        className={props.showSidemenu ? "sidemenu show" : "sidemenu"}
        initial={{ x: 1 }}
        animate={{ x: 0 }}
        key="aside"
      >
        <div className="sidemenuInner">
          {props.showSidemenu && (
            <button className="sidemenu-button" onClick={props.toggleSideMenu}>
              <HiX />
              Close Menu
            </button>
          )}
          <button className="sidemenu-button" onClick={props.clearChat}>
            <HiPlus />
            New chat
          </button>
          <button className="sidemenu-button" onClick={props.saveChat}>
            <HiSave />
            Save current chat
          </button>
           <select className="dropDown" onChange={handleModelChange} value={props.currentModel}>
              <option value="gpt-4.1-nano">GPT-4.1 Nano</option>
              <option value="gpt-4.1-mini">GPT-4.1 Mini</option>
              <option value="gpt-5">GPT-5</option>
              <option value="gpt-5-nano">GPT-5 Nano</option>
              <option value="gpt-5-mini">GPT-5 Mini</option> 
              <option value="o4-mini">o4 Mini</option>
              <option value="o4">o4</option>
              <option value="o3-mini">o3-Mini</option>
              <option value="o3">o3</option>
              <option value="gpt-4-turbo">GPT-4 Turbo</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            </select>
        </div>
            
        <div className="sidemenuInner">
          <button className="sidemenu-button" onClick={() => setShow(true)}>
            <HiBeaker />
            System Message
          </button>
          {props.theme === "light" ? (
            <button className="sidemenu-button" onClick={props.switchTheme}>
              <HiSun />
              Light Mode
            </button>
          ) : (
            <button className="sidemenu-button" onClick={props.switchTheme}>
              <HiMoon />
              Dark Mode
            </button>
          )}
        </div>
      </aside>
      {show && (
        <Modal
          show={show}
          onClose={() => setShow(false)}
          currentModel={props.currentModel}
          currentSystemMessage={props.currentSystemMessage}
          setCurrentSystemMessage={props.setCurrentSystemMessage}
          clearChat={props.clearChat}
        />
      )}
    </>
  );
};

export default SideMenu;


