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
            <div className="sidemenu-button" onClick={props.toggleSideMenu}>
              <HiX />
              Close Menu
            </div>
          )}
          <div className="sidemenu-button" onClick={props.clearChat}>
            <HiPlus />
            New chat
          </div>
          <div className="sidemenu-button" onClick={props.saveChat}>
            <HiSave />
            Save current chat
          </div>
        </div>
        <div className="sidemenuInner">
          <div className="sidemenu-button" onClick={() => setShow(true)}>
            <HiBeaker />
            System Message
          </div>
          {props.theme === "light" ? (
            <div className="sidemenu-button" onClick={props.switchTheme}>
              <HiSun />
              Light Mode
            </div>
          ) : (
            <div className="sidemenu-button" onClick={props.switchTheme}>
              <HiMoon />
              Dark Mode
            </div>
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
