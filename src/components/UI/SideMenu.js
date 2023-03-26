import { useState } from "react";
import { HiX, HiPlus, HiSave, HiSun, HiMoon, HiBeaker } from "react-icons/hi";
import Modal from "./Modal";

const SideMenu = (props) => {
  const [show, setShow] = useState(false);

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
          currentSystemMessage={props.currentSystemMessage}
          setCurrentSystemMessage={props.setCurrentSystemMessage}
          clearChat={props.clearChat}
        />
      )}
    </>
  );
};

export default SideMenu;
