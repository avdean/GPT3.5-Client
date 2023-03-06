import { HiX, HiPlus, HiSun, HiMoon } from "react-icons/hi";

const SideMenu = (props) => {
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
      </aside>
    </>
  );
};

export default SideMenu;
