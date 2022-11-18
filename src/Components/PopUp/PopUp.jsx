import React from "react";
import styles from "./popup.module.css";

const PopUp = (props) => {
  return (
    <div className={styles.popUpWrapper}>
      <div className={styles.popUpContainer}>
        {/* <div className={styles.closePopUpContainer}><img src={} alt="close_icon" /></div> */}
        {props.children}
      </div>
    </div>
  );
};

export default PopUp;
