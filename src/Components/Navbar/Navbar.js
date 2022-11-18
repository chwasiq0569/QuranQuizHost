import React from "react";
import styles from "./navbar.module.css";
import MenuIcon from "../../assets/icons/menu.svg";
import ProgessIcon from "../../assets/icons/progress.svg";
import InfoIcon from "../../assets/icons/info.svg";
import SettingsIcon from "../../assets/icons/settings.svg";

const Navbar = ({
  setSettingsPopUpStatus,
  setFirstTime,
  setStatisticsPopUpStatus,
}) => {
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbarLeftSide}>
        {/* <div className={styles.iconsContainer}>
          <img src={MenuIcon} alt="menu" />
        </div> */}
        <p className={styles.logoText}>Quran</p>
      </div>
      {/* <div className={styles.headText}> */}
      {/* <span>بسم الله الرحمن الرحيم</span> */}
      {/* </div> */}
      <div className={styles.navbarRightSide}>
        <div
          onClick={() => setStatisticsPopUpStatus(true)}
          className={styles.iconsContainer}
        >
          <img src={ProgessIcon} alt="menu" />
        </div>
        <div className={styles.iconsContainer}>
          <img onClick={() => setFirstTime(true)} src={InfoIcon} alt="menu" />
        </div>
        {/* <div className={styles.iconsContainer}>
          <img
            onClick={() => setSettingsPopUpStatus(true)}
            src={SettingsIcon}
            alt="menu"
          />
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
