import React from "react";
import styles from "./rewardpopup.module.css";
import MoonStarBadge from "../../../../assets/icons/moonstarbadge.svg";

const RewardPopUp = () => {
  return (
    <>
      <h1 className={styles.popUpHead}>Congratulations</h1>
      <div className={styles.secondaryTextContainer}>
        <p className={styles.secondaryText}>
          Here’s a gift for getting the surah correct
        </p>
      </div>
      <div className={styles.badgeContainer}>
        <img src={MoonStarBadge} alt="badge" />
      </div>
    </>
  );
};

export default RewardPopUp;
