import React from "react";
import styles from "./settingspopup.module.css";
import Switch from "react-switch";
import CrossIcon from "../../../../assets/icons/crossicon.svg";

const SettingsPopUp = ({ setShowPopUp }) => {
  const [hardMode, setHardMode] = React.useState(false);

  return (
    <>
      <img
        onClick={() => {
          setShowPopUp(false);
        }}
        className={styles.closeIcon}
        src={CrossIcon}
        alt="close_popup"
      />
      <h1 className={styles.popUpHead}>Settings</h1>
      <div className={styles.optionsContainer}>
        <div className={styles.option}>
          <div className={styles.leftSide}>
            <div className={styles.primaryTextAndBar}>
              <div className={styles.verticalBar}></div>
              <p className={styles.primaryText}>Hard Mode</p>
            </div>

            <p className={styles.secondaryText}>Will have 3 challenges daily</p>
          </div>
          <div className={styles.rightSide}>
            <Switch
              onChange={() => setHardMode(!hardMode)}
              uncheckedIcon={false}
              checkedIcon={false}
              onColor="#008466"
              offColor="#008466"
              height={20}
              width={37}
              handleDiameter={12}
              checked={hardMode}
            />
          </div>
        </div>
        <div className={styles.option}>
          <div className={styles.leftSide}>
            <div className={styles.primaryTextAndBar}>
              <div className={styles.verticalBar}></div>
              <p className={styles.primaryText}>Hints</p>
            </div>
          </div>
          <div className={styles.rightSide}>
            <Switch
              onChange={() => setHardMode(!hardMode)}
              uncheckedIcon={false}
              checkedIcon={false}
              onColor="#008466"
              offColor="#008466"
              height={20}
              width={37}
              handleDiameter={12}
              checked={hardMode}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPopUp;
