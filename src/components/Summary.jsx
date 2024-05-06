import quizCompletedImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";

function calculateRate(count) {
  return ((count / QUESTIONS.length) * 100).toFixed(2);
}

export default function Summary({ answers, onRestart }) {
  console.log(answers);
  const skippedCount = answers.reduce(
    (count, answer) => (answer === null ? ++count : count),
    0
  );

  const correctAnswerCount = answers.reduce(
    (count, answer, index) =>
      answer === QUESTIONS[index].answers[0] ? ++count : count,
    0
  );

  const wrongAnswerCount = QUESTIONS.length - correctAnswerCount - skippedCount;

  const skippedRate = calculateRate(skippedCount);
  const correctAnswerRate = calculateRate(correctAnswerCount);
  const wrongAnswerRate = calculateRate(wrongAnswerCount);

  return (
    <div id="summary">
      <img src={quizCompletedImg} alt="Thropy icon" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">%{correctAnswerRate}</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">%{wrongAnswerRate}</span>
          <span className="text">answered incorrectly</span>
        </p>
        <p>
          <span className="number">%{skippedRate}</span>
          <span className="text">skipped</span>
        </p>
      </div>
      <ol>
        {answers.map((answer, index) => {
          let cssClass = "user-answer";

          if (answer === null) {
            cssClass += " skipped";
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }
          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>Skipped.</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
