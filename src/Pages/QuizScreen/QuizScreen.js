import React from "react";
import Navbar from "./../../Components/Navbar/Navbar";
import styles from "./quizscreen.module.css";
import PopUp from "./../../Components/PopUp/PopUp";
import InstructionPopUp from "./../../Components/PopUp/PopUpContents/InstructionPopUp/InstructionPopUp";
import RewardPopUp from "./../../Components/PopUp/PopUpContents/RewardPopUp/RewardPopUp";
import AnswerDetails from "./../../Components/PopUp/PopUpContents/AnswerDetails/AnwserDetails";
import MoonStarBadge from "../../assets/icons/moonstarbadge.svg";
import KaabaBadge from "../../assets/icons/kaababadge.svg";
import MasjidBadge from "../../assets/icons/kaababadge.svg";
import WomenBadge from "../../assets/icons/womenbadge.svg";
import MenBadge from "../../assets/icons/menbadge.svg";
import SettingsPopUp from "./../../Components/PopUp/PopUpContents/SettingsPopUp/SettingsPopUp";
import StatisticsPopUp from "./../../Components/PopUp/PopUpContents/StatisticsPopUp/StatisticsPopUp";
import { motion } from "framer-motion";
import OnScreenNumpad from "./../../Components/OnScreenNumpad/OnScreenNumpad";
import Surahs from "../../data/surahs.json";
import Questions from "../../data/quran.json";
import PattrenImg from "../../assets/icons/pattrenborder.jpeg";
import {
  generateRandom,
  generateRandomWithAbsentArray,
  zip,
} from "./../../utils/utils";
import AllQuestions from "../../data/data.json";
import moment from "moment/moment";
import Countdown from "react-countdown";

const QuizScreen = () => {
  const createQuestions = (questions) => {
    return (
      questions &&
      questions.map((question) => {
        return { status: "unknown", ...question };
      })
    );
  };

  const [showPopUp, setShowPopUp] = React.useState(false);

  const [answerStatus, setAnswerStatus] = React.useState("neutral");

  const [switchPopUp, setSwitchPopUp] = React.useState(false);

  const [quizSubmitted, setQuizSubmitted] = React.useState(false);

  const [firstTime, setFirstTime] = React.useState(true);

  const [settingsPopUpStatus, setSettingsPopUpStatus] = React.useState(false);

  const [statisticsPopUpStatus, setStatisticsPopUpStatus] =
    React.useState(false);

  const [userInput, setUserInput] = React.useState("");

  const [surahs, setSurahs] = React.useState([...Surahs]);

  const [questions, setQuestions] = React.useState(Questions);

  const [question, setQuestion] = React.useState("");

  const [guessedSurahName, setGuessedSurahName] = React.useState("");

  const [quizAnswerPopUp, setQuizAnswerPopUp] = React.useState(false);

  const [showMessageStatus, setShowMessageStatus] = React.useState("");

  const [rewards, setRewards] = React.useState([
    MoonStarBadge,
    KaabaBadge,
    MasjidBadge,
    WomenBadge,
    MenBadge,
  ]);

  const [userRewards, setUserRewards] = React.useState([]);

  const [answerReward, setAnswerReward] = React.useState("");

  const [answersStatus, setAnswersStatus] = React.useState([
    { answer: 1, status: false },
    {
      answer: 2,
      status: false,
    },
    {
      answer: 2,
      status: false,
    },
  ]);

  const [randomQuesNo, setRandonQuesNo] = React.useState(
    generateRandomWithAbsentArray(
      1,
      Object.keys(AllQuestions).length,
      JSON.parse(localStorage.getItem("alreadyAttempQues")) || []
    )
  );
  // Math.floor(Math.random() * Object.keys(AllQuestions).length)

  const [alreadyAttempQues, setAlreadyAttempQues] = React.useState([]);

  const [allQuestions, setAllQuestions] = React.useState(
    AllQuestions[randomQuesNo]
  );

  const [todayQuestions, setTodayQuestions] = React.useState(
    createQuestions(allQuestions)
  );

  const [questionNo, setQuestionNo] = React.useState(0);

  const [questionsShown, setQuestionsShown] = React.useState([]);

  const [quizEnded, setQuizEnded] = React.useState(false);

  const [selectedQuestion, setSelectedQuestion] = React.useState({});

  const [progress, setProgress] = React.useState(
    JSON.parse(localStorage.getItem("alreadyAttempQues", alreadyAttempQues)) &&
      JSON.parse(localStorage.getItem("alreadyAttempQues", alreadyAttempQues))
        ?.length > 0
      ? JSON.parse(localStorage.getItem("progress"))
      : [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0,
        ]
  );
  // 10 minutes timer
  const [time, setTime] = React.useState(0);

  JSON.parse(localStorage.getItem("alreadyAttempQues")) &&
    console.log(
      "genn",
      generateRandomWithAbsentArray(
        1,
        Object.keys(AllQuestions).length,
        JSON.parse(localStorage.getItem("alreadyAttempQues")) || []
      )
    );
  // console.log("KYESLEN", Object.keys(AllQuestions).length);
  console.log(answerStatus);

  const dynamicStylingGuess = () => {
    return styles.ayahContainer;
  };

  React.useState(() => {
    localStorage.setItem("firstTime", true);
    if (!JSON.parse(localStorage.getItem("userStats"))) {
      localStorage.setItem(
        "userStats",
        JSON.stringify({
          plays: 0,
          win_percentage: "",
          streak: 0,
        })
      );
    }

    setSurahs([...Surahs]);
    setQuestions([...Questions]);

    // setQuestion(questions[Math.floor(Math.random() * questions.length)]);

    console.log("QUESTIONS", questions);
  }, []);

  React.useEffect(() => {
    setGuessedSurahName(
      surahs.find((item) => item?.surahNumber == userInput)?.name
    );
  }, [userInput]);

  console.log(
    "guessedSurahName",
    surahs.find((item) => item?.surahNumber == userInput)?.name
  );

  console.log("answerStatus", answerStatus);

  const messagesArray = ["Mashallah", "Great", "Splendid"];
  let newArr = [];
  React.useEffect(() => {
    if (answerStatus == "correct") {
      setShowMessageStatus("success");
    } else if (answerStatus == "wrong") {
      setShowMessageStatus("failure");
    }

    if (showMessageStatus || answerStatus != "neutral") {
      setTimeout(() => {
        setShowMessageStatus("");
        setAnswerStatus("neutral");
      }, 3000);
    }

    if (answerStatus == "correct" || answerStatus == "wrong") {
      setTimeout(() => {
        if (questionNo < 2) {
          setQuestionNo((prevVal) => prevVal + 1);
          setQuestionsShown([
            ...questionsShown,
            todayQuestions[questionNo + 1],
          ]);
          setUserInput("");
        } else if (questionNo >= 2) {
          setQuizEnded(true);
        }
      }, 3000);
    }
    if (answerStatus == "correct") {
      setAnswerReward(rewards[Math.floor(Math.random() * rewards.length)]);
      setTimeout(() => {
        setUserInput("");
        if (questionNo < 2) {
        } else if (questionNo >= 2) {
          setQuizEnded(true);
        }
        setAnswerReward("");
      }, 3000);
    }
    // if (showMessageStatus) {
    // setTimeout(() => {
    //   setShowMessageStatus(false);
    //   setAnswerStatus("neutral");
    //   // setUserInput("");
    //   setGuessedSurahName("");
    //   if (answerStatus == "correct") {
    //     updateQuestion();
    //   }
    // }, 3000);
    // }
  }, [answerStatus]);
  console.log("question||question", question);

  // React.useEffect(() => {
  //   setQuestionsShown([...todayQuestions]);
  // }, [todayQuestions]);

  React.useEffect(() => {
    if (answerStatus == "correct") {
      setUserRewards([...userRewards, answerReward]);
    }
  }, [answerReward]);

  const selectQuestion = (question, inputText) => {
    let updateList = questionsShown.map((item) => {
      return item.Phrase === question.Phrase
        ? {
            ...item,
            status: item.Surah == inputText ? "correct" : "wrong",
          }
        : { ...item };
    });

    setQuestionsShown([...updateList]);
  };

  console.log("answerReward|answerReward", answerReward);
  console.log("userRewards|userRewards", userRewards);
  console.log("questionsShown|questionsShown", questionsShown, todayQuestions);
  console.log("progress|progress", progress);

  const updateQuestion = () => {
    setQuestion(questions[Math.floor(Math.random() * questions.length)]);
  };

  React.useEffect(() => {
    console.log("userInput", userInput.length);
    userInput.length <= 0 && setAnswerStatus("neutral");
  }, [userInput]);

  // let randomsArr = generateRandom(3, surahs.length);

  // console.log("rand", randomsArr);

  // answersStatus.map(item => )
  console.log("todayQuestions", todayQuestions, questionNo);
  console.log("quizEnded", quizEnded);
  console.log(
    "answerStatus|showMessageStatus",
    answerStatus,
    showMessageStatus
  );

  React.useEffect(() => {
    // setQuestionsShown([todayQuestions[questionNo]]);
  }, [todayQuestions]);

  React.useEffect(() => {
    console.log("allQuestions|allQuestions", allQuestions);
  }, []);

  React.useEffect(() => {
    if (quizEnded) {
      const time = new Date();
      time.setSeconds(time.getSeconds() + 30);
      setTime(time);
      // localStorage.setItem("quizEnded", quizEnded);
      console.log("randomQuesNo", randomQuesNo);
      setAlreadyAttempQues([...alreadyAttempQues, randomQuesNo]);
      // if()
      if (!localStorage.getItem("alreadyAttempQues")) {
        localStorage.setItem(
          "alreadyAttempQues",
          JSON.stringify([randomQuesNo])
        );
      } else {
        localStorage.setItem(
          "alreadyAttempQues",
          JSON.stringify([
            ...JSON.parse(localStorage.getItem("alreadyAttempQues")),
            randomQuesNo,
          ])
        );
      }
      localStorage.setItem("progress", JSON.stringify(progress));
      JSON.parse(localStorage.getItem("userStats")) && updateStats();
      localStorage.setItem("lastTimeUsed", JSON.stringify(Date.now()));
      localStorage.setItem("quizEnded", JSON.stringify(true));
      // setUserInput("");
      // setTodayQuestions([]);
      // setQuestionNo(0);

      // localStorage.setItem()
      // if (!localStorage.getItem("lastTimeUsed")) {
      //   localStorage.setItem(
      //     "lastTimeUsed",
      //     JSON.stringify(new Date().getDate())
      //   );
      // }
      setStatisticsPopUpStatus(true);
    }
    // if (localStorage.getItem("lastTimeUsed")) {
    //   console.log(
    //     "Its new day1",
    //     parseInt(JSON.parse(localStorage.getItem("lastTimeUsed"))) <
    //       new Date().getDate()
    //   );
    //   if (
    //     parseInt(JSON.parse(localStorage.getItem("lastTimeUsed"))) <
    //     new Date().getDate()
    //   ) {
    //     console.log("Its new day");
    //     localStorage.removeItem("quizEnded");
    //     localStorage.removeItem("lastTimeUsed");
    //   }
    // }
    // localStorage.setItem("quizEnded", JSON.stringify(quizEnded));
    // setTimeout(() => {
    //   if (
    //     localStorage.getItem("lastTimeUsed") &&
    //     JSON.parse(localStorage.getItem("lastTimeUsed")) < Date.now() + 10000
    //   ) {
    //     setQuizEnded(false);
    //     console.log("CA:L");
    //     setRandonQuesNo(
    //       generateRandomWithAbsentArray(
    //         1,
    //         Object.keys(AllQuestions).length,
    //         JSON.parse(localStorage.getItem("alreadyAttempQues")) || []
    //       )
    //     );
    //     setTodayQuestions(createQuestions(allQuestions));
    //     setUserInput("");
    //     setQuestionNo(0);
    //     // setQuestionNo(0);
    //     // setQuestionsShown([]);
    //     // setTodayQuestions(createQuestions(allQuestions));
    //   }
    // }, 10000);
  }, [quizEnded]);

  const updateStats = () => {
    let stats = JSON.parse(localStorage.getItem("userStats"));

    localStorage.setItem(
      "userStats",
      JSON.stringify({
        ...stats,
        plays: stats?.plays + 1,
        streak: stats?.streak + 1,
      })
    );
  };

  React.useEffect(() => {
    todayQuestions[questionNo] &&
      setQuestionsShown([todayQuestions[questionNo]]);
  }, [todayQuestions]);

  // React.useEffect(() => {
  // setInterval(() => {
  //   if (
  //     localStorage.getItem("lastTimeUsed") &&
  //     JSON.parse(localStorage.getItem("lastTimeUsed")) < Date.now() + 5000
  //   ) {
  //     setQuizEnded(false);
  //     console.log("CA:L");

  //     // localStorage.removeItem("lastTimeUsed");
  //     // // localStorage.setItem("quizEnded", false);
  //     // setRandonQuesNo(
  //     //   generateRandomWithAbsentArray(
  //     //     1,
  //     //     Object.keys(AllQuestions).length,
  //     //     JSON.parse(localStorage.getItem("alreadyAttempQues")) || []
  //     //   )
  //     // );
  //   }
  // }, 5000);
  // }, []);
  // let item = 0;
  // setInterval(() => {
  //   item++;
  //   console.log("120000", item);
  // }, 120000);

  // function startJobAt(hh, mm, code) {
  //   var interval = 0;
  //   var today = new Date();
  //   var todayHH = today.getHours();
  //   var todayMM = today.getMinutes();
  //   if (todayHH > hh || (todayHH == hh && todayMM > mm)) {
  //     var midnight = new Date();
  //     midnight.setHours(24, 0, 0, 0);
  //     interval =
  //       midnight.getTime() -
  //       today.getTime() +
  //       hh * 60 * 60 * 1000 +
  //       mm * 60 * 1000;
  //   } else {
  //     interval = (hh - todayHH) * 60 * 60 * 1000 + (mm - todayMM) * 60 * 1000;
  //   }
  //   return setTimeout(code, interval);
  // }

  // React.useEffect(() => {
  //   startJobAt(12, 00, () => {
  //     console.log("CALLED||F");
  //   });
  // }, []);

  // setInterval(() => {

  // }, [])

  console.log("alreadyAttempQues", alreadyAttempQues);

  return (
    <div>
      <Navbar
        setSettingsPopUpStatus={setSettingsPopUpStatus}
        setFirstTime={setFirstTime}
        setStatisticsPopUpStatus={setStatisticsPopUpStatus}
      />
      {/* {showPopUp && (
        <PopUp>
          {switchPopUp ? (
            <AnswerDetails
              setQuizSubmitted={setQuizSubmitted}
              setShowPopUp={setShowPopUp}
            />
          ) : (
            <RewardPopUp />
          )}
        </PopUp>
      )} */}
      {/* todayQuestions[questionNo] */}
      {quizAnswerPopUp && selectedQuestion && (
        <PopUp>
          <AnswerDetails
            setQuizSubmitted={setQuizSubmitted}
            setShowPopUp={setQuizAnswerPopUp}
            question={selectedQuestion}
          />
        </PopUp>
      )}

      {firstTime && (
        <PopUp>
          <InstructionPopUp setShowPopUp={setFirstTime} />
        </PopUp>
      )}

      {settingsPopUpStatus && (
        <PopUp>
          <SettingsPopUp setShowPopUp={setSettingsPopUpStatus} />
        </PopUp>
      )}

      {statisticsPopUpStatus && (
        <PopUp>
          <StatisticsPopUp
            setShowPopUp={setStatisticsPopUpStatus}
            progress={progress}
            time={time}
            setRandonQuesNo={setRandonQuesNo}
            setAllQuestions={setAllQuestions}
            randomQuesNo={randomQuesNo}
            setQuizEnded={setQuizEnded}
            setQuestionNo={setQuestionNo}
            setTodayQuestions={setTodayQuestions}
            createQuestions={createQuestions}
            allQuestions={allQuestions}
            setQuestionsShown={setQuestionsShown}
            setStatisticsPopUpStatus={setStatisticsPopUpStatus}
            setUserInput={setUserInput}
          />
        </PopUp>
      )}

      <div className={styles.mainContentContainer}>
        <div className={styles.pattrenBorder + " " + styles.topBorder}></div>
        <div className={styles.headTextSoft}>
          <span>بسم الله الرحمن الرحيم</span>
        </div>
        {showMessageStatus == "success" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            transition={{ duration: 1 }}
          >
            <div className={styles.responseTooltip}>
              {messagesArray[Math.floor(Math.random() * messagesArray.length)]}
            </div>
          </motion.div>
        ) : (
          showMessageStatus == "failure" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              transition={{ duration: 1 }}
            >
              <div className={styles.responseTooltip}>Nice Try!</div>
            </motion.div>
          )
        )}
        {!firstTime &&
          questionsShown.map((item) => (
            <motion.div
              className="box"
              // initial={{ opacity: 0, scale: 0.0 }}
              // animate={{ opacity: 1, scale: 1 }}
              initial={{ x: "100%" }}
              animate={{ x: "0" }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <div className={dynamicStylingGuess()}>
                {/* <p>“كِتَـٰبٌ أُنزِلَ إِلَيْكَ فَلَا يَكُن فِى صَدْرِكَ”</p> */}

                {/* answerStatus == "wrong" && */}
                <p
                  onClick={() => {
                    item?.status != "unknown" && setQuizAnswerPopUp(true);
                    // setQuestion(item);
                    console.log("item|item|item", item);
                    setSelectedQuestion(item);
                  }}
                >
                  {item?.Phrase}
                </p>
                {/* <p onClick={() => setQuizAnswerPopUp(true)}>{question?.phrase}</p> */}
              </div>
            </motion.div>
          ))}

        <div className={styles.quizAnswerContainer}>
          <div className={styles.surahNoContainer}>
            <input
              maxLength={3}
              value={userInput}
              onChange={(e) => {
                // setUserInput(e.target.value);
                setGuessedSurahName(
                  surahs.find((item) => item?.surahNumber == e.target.value)
                    ?.name
                );
              }}
              type="number"
            />{" "}
            {guessedSurahName && (
              <motion.div
                className="box"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <p
                  className={
                    answerStatus == "wrong" && styles.wrongAnswerStyles
                  }
                >
                  {" "}
                  : {"  " + guessedSurahName}{" "}
                </p>
              </motion.div>
            )}
          </div>
        </div>
        {/* {answerStatus == "correct" && (
          <> */}
        {answerReward && (
          <div className={styles.badge}>
            <img src={answerReward} alt="" />
          </div>
        )}
        {/* <div className={styles.badge}>
          <img src={RewardIcon} alt="" />
        </div> */}
        {/* <div className={styles.badge}>
              <img src={RewardIcon} alt="" />
            </div> */}
        {/* <div className={styles.badge}>
              <img src={RewardIcon} alt="" />
            </div>  */}
        {/* <div className={styles.badge}>
              <img src={RewardIcon} alt="" />
            </div> */}
        {/* </>
        )} */}
        {/* <div className={styles.badgesContainer}></div> */}
        <div className={styles.pattrenBorder + " " + styles.bottomBorder}></div>
        <div className={styles.badgesRow}>
          {userRewards.map((item) => {
            return (
              <motion.div
                className="box"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 3,
                  delay: 3,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <img src={item} alt="reward_icon" />{" "}
              </motion.div>
            );
          })}
        </div>

        {/* {answerStatus == "correct" &&
          setTimeout(() => {
            return (
              <div className={styles.badgesRow}>
                <img src={MoonStarBadge} alt="" />
              </div>
            );
          }, 3000)} */}
        <OnScreenNumpad
          question={todayQuestions[questionNo]}
          userInput={userInput}
          setUserInput={setUserInput}
          setGuessedSurahName={setGuessedSurahName}
          surahs={surahs}
          setAnswerStatus={setAnswerStatus}
          selectQuestion={selectQuestion}
          questionsShown={questionsShown}
          setQuestionsShown={setQuestionsShown}
          progress={progress}
          setProgress={setProgress}
        />
      </div>
    </div>
  );
};

export default QuizScreen;
