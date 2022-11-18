import React from "react";
import { useTimer } from "react-timer-hook";
import AllQuestions from "../data/data.json";
import { generateRandomWithAbsentArray } from "../utils/utils";

function MyTimer({
  expiryTimestamp,
  setRandonQuesNo,
  setAllQuestions,
  randomQuesNo,
  setQuizEnded,
  setQuestionNo,
  setTodayQuestions,
  createQuestions,
  allQuestions,
  setQuestionsShown,
  setStatisticsPopUpStatus,
  setUserInput,
}) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      //   alert("onExpire called");
      console.log("CALLIONG");
      setRandonQuesNo(
        generateRandomWithAbsentArray(
          1,
          Object.keys(AllQuestions).length,
          JSON.parse(localStorage.getItem("alreadyAttempQues"))
        )
      );
      setAllQuestions(AllQuestions[randomQuesNo]);
      setQuizEnded(false);
      setQuestionNo(0);
      setTodayQuestions(createQuestions(allQuestions));
      setQuestionsShown([]);
      setStatisticsPopUpStatus(false);
      setUserInput("");
      localStorage.setItem("quizEnded", JSON.stringify(false));
    },
  });

  return (
    <>
      <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
      <span>{seconds}</span>
      {/* <p>{isRunning ? "Running" : "Not running"}</p>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
      <button
        onClick={() => {
          // Restarts to 5 minutes timer
          const time = new Date();
          time.setSeconds(time.getSeconds() + 300);
          restart(time);
        }}
      >
        Restart
      </button> */}
    </>
  );
}

export default MyTimer;
