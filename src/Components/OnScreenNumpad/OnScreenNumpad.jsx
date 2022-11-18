import React, { useEffect, useState } from "react";
import styles from "./onscreennumpad.module.css";
import BackSpaceIcon from "../../assets/icons/backspace.svg";

const OnScreenNumpad = ({
  setUserInput,
  question,
  userInput,
  setGuessedSurahName,
  surahs,
  setAnswerStatus,
  selectQuestion,
  questionsShown,
  setQuestionsShown,
  progress,
  setProgress,
}) => {
  const [selectedVal, setSelectedVal] = React.useState("");

  const keys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  console.log(selectedVal);
  let arr = [...progress];
  React.useEffect(() => {
    setUserInput(userInput.trim());
    // setUserInput(selectedVal);
  }, [selectedVal]);

  const refreshValues = () => {
    let updateList = questionsShown.map((item) => {
      return item.Phrase === question.Phrase
        ? {
            ...item,
            status: "unknown",
          }
        : { ...item };
    });

    setQuestionsShown([...updateList]);
  };

  return (
    <div className={styles.onScreenNumpadContainer}>
      <div className={styles.btnsRow}>
        <button
          disabled={!userInput}
          onClick={() => {
            selectQuestion(question, userInput);

            if (question?.Surah == userInput) {
              // alert("CORRECT ANSWER");
              // setProgress(
              //   (progress[question?.Juz] = progress[question?.Juz] + 1)
              // );
              // arr[1]=arr[1]+1
              console.log("pPro", progress[question?.Juz] + 1);
              arr[question.Juz - 1] = arr[question.Juz - 1] + 1;
              console.log("question.Juz", arr[30]);
              setProgress(arr);
              setAnswerStatus("correct");
            } else {
              // alert("WRONG ANSWER");
              setAnswerStatus("wrong");
            }
            console.log("CLICKED");
            // console.log(surahs.find((item) => item?.surahNumber == userInput));
          }}
          className={styles.numpadBtn}
        >
          Enter
        </button>
        {keys.map((item) => (
          <div
            key={item}
            onClick={() => {
              setUserInput((prevVal) => prevVal + item);
              refreshValues();
            }}
            className={styles.numpadBtn}
          >
            {item}
          </div>
        ))}
        <button
          onClick={() => {
            setUserInput(userInput.trim().substr(0, userInput.length - 1));
            refreshValues();
          }}
          className={styles.numpadBtn}
          disabled={!userInput}
        >
          <img src={BackSpaceIcon} alt="remove" />
        </button>
      </div>
      {/* <div className={styles.btnsRow}>
        {keys2.map((item) => (
          <div
            onClick={() => setSelectedVal((prevVal) => prevVal + item)}
            className={styles.numpadBtn}
          >
            {item}
          </div>
        ))}
      </div>
      <div className={styles.btnsRow}>
        {keys3.map((item) => (
          <div
            onClick={() => setSelectedVal((prevVal) => prevVal + item)}
            className={styles.numpadBtn}
          >
            {item}
          </div>
        ))}
      </div> */}
      {/* <div className={styles.btnsRow}>
        <div
          onClick={() => {
            if (question?.Surah == userInput) {
              alert("CORRECT ANSWER");
            } else {
              alert("WRONG ANSWER");
            }
            // console.log(surahs.find((item) => item?.surahNumber == userInput));
            setGuessedSurahName(
              surahs.find((item) => item?.surahNumber == userInput)?.name
            );
          }}
          className={styles.numpadBtn}
        >
          Enter
        </div>
        <div
          onClick={() => setSelectedVal((prevVal) => prevVal + "0")}
          className={styles.numpadBtn}
        >
          0
        </div>
        <div
          onClick={() =>
            setSelectedVal(selectedVal.trim().substr(0, selectedVal.length - 1))
          }
          className={styles.numpadBtn}
        >
          <img src={BackSpaceIcon} alt="remove" />
        </div>
      </div> */}
    </div>
  );
};

export default OnScreenNumpad;
