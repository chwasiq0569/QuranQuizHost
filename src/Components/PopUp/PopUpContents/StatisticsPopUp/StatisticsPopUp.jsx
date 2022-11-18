import React from "react";
import styles from "./statisticsPopUp.module.css";
import ShareIcon from "../../../../assets/icons/shareicon.svg";
import CrossIcon from "../../../../assets/icons/crossicon.svg";
import { Pie } from "react-chartjs-2";
import { Chart } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // ADD THIS
import MyTimer from "./../../../MyTimer";

const StatisticsPopUp = ({
  setShowPopUp,
  setQuizSubmitted,
  progress,
  time,
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
}) => {
  const data = {
    labels: [
      "Juz 1",
      "Juz 2",
      "Juz 3",
      "Juz 4",
      "Juz 5",
      "Juz 6",
      "Juz 7",
      "Juz 8",
      "Juz 9",
      "Juz 10",
      "Juz 11",
      "Juz 12",
      "Juz 13",
      "Juz 14",
      "Juz 15",
      "Juz 16",
      "Juz 17",
      "Juz 18",
      "Juz 19",
      "Juz 20",
      "Juz 21",
      "Juz 22",
      "Juz 23",
      "Juz 24",
      "Juz 25",
      "Juz 26",
      "Juz 27",
      "Juz 28",
      "Juz 29",
      "Juz 30",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [...progress],
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    tooltips: {
      mode: "label",
    },
    plugins: {
      legend: {
        display: false,
      },
      labels: {
        render: (args) => {
          return args.label;
        },
      },
      tooltips: {
        callbacks: {
          title: function () {
            return "";
          },
          label: function (item, data) {
            var datasetLabel = data.datasets[item.datasetIndex].label || "";
            var dataPoint = item.yLabel;
            return datasetLabel + ": " + dataPoint;
          },
        },
      },
    },
  };

  React.useEffect(() => {
    // {data.datasets[0].data.length < 0 && <p>HELLO</p>}
    console.log(
      "data.datasets",
      data.datasets[0].data.every((item) => item === 0)
    );
  }, []);

  const [plays, setPlays] = React.useState(
    JSON.parse(localStorage.getItem("userStats"))?.plays || 0
  );
  const [streak, setStreak] = React.useState(
    JSON.parse(localStorage.getItem("userStats"))?.streak || 0
  );

  return (
    <>
      <img
        onClick={() => {
          setShowPopUp(false);
          // setQuizSubmitted(true);
        }}
        className={styles.closeIcon}
        src={CrossIcon}
        alt="close_popup"
      />
      <h1 className={styles.headText}>Statistics</h1>
      <div className={styles.statsNumbers}>
        <div className={styles.statContainer}>
          <p className={styles.statNum}>{plays}</p>
          <p className={styles.statType}>Plays</p>
        </div>
        <div className={styles.statContainer}>
          <p className={styles.statNum}>
            67
            <span style={{ fontFamily: "sans-serif", fontWeight: "bold" }}>
              %
            </span>
          </p>
          <p className={styles.statType}>Win</p>
        </div>
        <div className={styles.statContainer}>
          <p className={styles.statNum}>{streak}</p>
          <p className={styles.statType}>Streak</p>
        </div>
      </div>

      {/* <Pie data={data} /> */}
      {/* {data.datasets[0].data.every((item) => item === 0) && ( */}
      <div className={styles.chartContainer}>
        {" "}
        <Pie options={options} data={data} />
      </div>
      {/* // )} */}

      {/* <div className={styles.secondaryTextContainer}>
      <p className={styles.secondaryText}>Login to link your stats</p>
    </div>
    <div className={styles.spacer}></div>

    <div className={styles.strengthsChart}>
      <p className={styles.strengthsChartHead}>Juz strength</p>
      <div className={styles.strengthsContainer}></div>
    </div> */}
      {JSON.parse(localStorage.getItem("quizEnded")) && (
        <div className={styles.nextChallenge}>
          <span>Next Challenge in : </span>
          <MyTimer
            expiryTimestamp={time}
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
        </div>
      )}
      <div className={styles.shareContainer}>
        <img src={ShareIcon} alt="share-icon" />
        <span>Share This</span>
      </div>
    </>
  );
};

export default StatisticsPopUp;
