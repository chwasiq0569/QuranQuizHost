import React from "react";
import styles from "./answerdetails.module.css";
import ShareIcon from "../../../../assets/icons/shareicon.svg";
import CrossIcon from "../../../../assets/icons/crossicon.svg";
import Surahs from "../../../../data/surahs.json";
import Questions from "../../../../data/quran.json";
import ClipLoader from "react-spinners/ClipLoader";

const overrideStyles = {
  display: "block",
  margin: "0 auto",
  // borderColor: "red",
};

const AnswerDetails = ({ setShowPopUp, setQuizSubmitted, question }) => {
  const [quesDetails, setQuesDetails] = React.useState({});
  const [surahs, setSurahs] = React.useState([...Surahs]);
  const [questions, setQuestions] = React.useState([...Questions]);

  console.log("questionInsideAD", question);

  let obj = surahs.find((item) => item?.surahNumber == question.Surah);

  React.useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "dd4d03f833mshc64933035fbdf5bp19a425jsndc4add893eca",
        "X-RapidAPI-Host": "al-quran1.p.rapidapi.com",
      },
    };
    // https://api.quran.com/api/v4/quran/translations/131?verse_key=2:286
    // https://api.quran.com/api/v4/quran/translations/131?verse_key=2%3A286

    fetch(
      `https://api.quran.com/api/v4/quran/verses/uthmani?verse_key=${question?.Surah}:${question?.Ayah}`
    )
      .then((response) => response.json())
      .then((res) => {
        console.log("responseVerse", res?.verses[0]?.text_uthmani);

        fetch(
          `https://api.quran.com/api/v4/quran/translations/131?verse_key=${question?.Surah}:${question?.Ayah}`
        )
          .then((response) => response.json())
          .then((response) => {
            console.log("response", response);
            setQuesDetails({
              ...response,
              obj,
              verse: res?.verses[0]?.text_uthmani,
            });
          })
          .catch((err) => console.error(err));
      });
  }, []);

  console.log("surahs11", surahs);
  console.log("surah11", obj);
  console.log("questions11", questions);
  console.log("question11", question);
  console.log("quesDetails11", quesDetails);
  console.log("ASN", obj);

  return Object.keys(quesDetails).length > 0 ? (
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
      <h1 className={styles.surahName}>
        {quesDetails?.obj?.name} ( {quesDetails?.meta?.filters?.verse_key} )
      </h1>
      <div className={styles.bismillahText}>
        <span>بسم الله الرحمن الرحيم</span>
      </div>
      <div className={styles.ayahText}>
        <p>“{quesDetails?.verse}”</p>
      </div>
      <div className={styles.secondaryTextContainer}>
        <p className={styles.secondaryText}>
          {quesDetails?.translations[0]?.text}
        </p>
      </div>
      <div className={styles.shareContainer}>
        <img src={ShareIcon} alt="share-icon" />
        <span>Share This</span>
      </div>
    </>
  ) : (
    <ClipLoader
      color={"black"}
      cssOverride={overrideStyles}
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default AnswerDetails;
