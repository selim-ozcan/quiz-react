import { useCallback, useState, useMemo } from "react";

import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const [answerState, setAnswerState] = useState("");

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);

      if (selectedAnswer === null) return;

      setAnswerState("answered");

      setTimeout(() => {
        if (
          QUESTIONS[activeQuestionIndex].answers.indexOf(selectedAnswer) === 0
        ) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  const shuffledAnswers = useMemo(() => {
    if (activeQuestionIndex === QUESTIONS.length) {
      return [];
    }

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);

    return shuffledAnswers;
  }, [activeQuestionIndex]);

  if (quizIsComplete) {
    return <Summary answers={userAnswers}></Summary>;
  }

  let timeout;
  switch (answerState) {
    case "":
      timeout = 10000;
      break;
    case "answered":
      timeout = 1000;
      break;
    case "correct":
    case "wrong":
      timeout = 2000;
      break;
    default:
      timeout = 10000;
  }

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          timeout={timeout}
          onTimeout={answerState === "" ? handleSkipAnswer : null}
          key={activeQuestionIndex}
          answerState={answerState}
        ></QuestionTimer>
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => {
            let buttonClasses = "";
            if (answer === userAnswers[activeQuestionIndex]) {
              if (answerState === "answered") {
                buttonClasses = "selected";
              } else if (answerState === "correct") {
                buttonClasses = "correct";
              } else if (answerState === "wrong") {
                buttonClasses = "wrong";
              }
            }

            return (
              <li key={answer} className="answer">
                <button
                  className={buttonClasses}
                  onClick={() => handleSelectAnswer(answer)}
                  disabled={answerState !== ""}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
