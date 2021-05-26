import { CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import Question from "../Quiz/Question/Question";
import "./Quiz.css";

const myQuestions = [
  {
    category: "Kannada Swargalu",
    correct_answer: "ಋ",
    difficulty: "easy",
    incorrect_answers: [
      "ಈ",
      "ಒ",
      "ಔ",
    ],
    question:"What comes after ಊ ?",
    type: "multiple"
  },
  {
    category: "Kannada Swargalu",
    correct_answer: "ಋ",
    difficulty: "easy",
    incorrect_answers: [
      "ಈ",
      "ಒ",
      "ಔ",
    ],
    question:"What comes after ಊ ?",
    type: "multiple"
  },
  {
    category: "Kannada Swargalu",
    correct_answer: "ಋ",
    difficulty: "easy",
    incorrect_answers: [
      "ಈ",
      "ಒ",
      "ಔ",
    ],
    question:"What comes after ಊ ?",
    type: "multiple"
  },
  {
    category: "Kannada Swargalu",
    correct_answer: "ಋ",
    difficulty: "easy",
    incorrect_answers: [
      "ಈ",
      "ಒ",
      "ಔ",
    ],
    question:"What comes after ಊ ?",
    type: "multiple"
  },
];

const Quiz = () => {

  const [options, setOptions] = useState();
  const [currQues, setCurrQues] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState(myQuestions);


  useEffect(() => {
    setOptions(
      questions &&
        handleShuffle([
          questions[currQues]?.correct_answer,
          ...questions[currQues]?.incorrect_answers,
        ])
    );
  }, [currQues, questions]);

  //console.log(questions);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="quiz">
      {questions ? (
        <>
          <div className="quizInfo">
            <span>{questions[currQues].category}</span>
            <span>
              {/* {questions[currQues].difficulty} */}
              Score : {score}
            </span>
          </div>
          <Question
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={questions}
            options={options}
            correct={questions[currQues]?.correct_answer}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}
          />
        </>
      ) : (
        <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={150}
          thickness={1}
        />
      )}
    </div>
  );
};

export default Quiz;
