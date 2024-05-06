import headerImg from "../assets/quiz-logo.png";

export default function Header() {
  return (
    <header>
      <img src={headerImg} alt="quiz app logo" />
      <h1>ReactQuiz</h1>
    </header>
  );
}
