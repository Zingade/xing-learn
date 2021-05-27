import { Button } from "@material-ui/core";
import { useState } from "react";
import "./Question.css";
import ErrorMessage from "../ErrorMEssage";

const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);
  const [result, setResult] = useState(false);

  const handleSelect = (i) => {
    if (selected === i && selected === correct) return "select";
    else if (selected === i && selected !== correct) return "wrong";
    else if (i === correct) return "select";
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) setScore(score + 1);
    setError(false);
  };

  const handleNext = () => {
    if (!selected) {
      setError("Please select an option first");
      return;
    }
    if (currQues > (questions.length - 2)) {
      setResult(true);
    } else {
      setCurrQues(currQues + 1);
      setSelected();
    } 
  };

  const handleReset = () => {
    setResult(false)
    setCurrQues(0);
    setSelected();
    setScore(0);
  }

  return (
    (result)?(
      <div className="result">
      <span className="title">Final Score : {(score*100/questions.length).toFixed()}% </span>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        style={{ alignSelf: "center", marginTop: 20 }}
        onClick={handleReset}
      >
        Try Again
      </Button>
    </div>
    ):(
    <div className="question">
      <h2>Question {currQues + 1} of {questions.length}:</h2>

      <div className="singleQuestion">
        <h2>{questions[currQues].question}</h2>
        <div className="options">
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {options &&
            options.map((i) => (
              <button
                className={`singleOption  ${selected && handleSelect(i)}`}
                key={i}
                onClick={() => handleCheck(i)}
                disabled={selected}
              >
                {i}
              </button>
            ))}
        </div>
        <div className="controls">
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}
          >
            {currQues > (questions.length - 2)  ? "Submit" : "Next Question"}
          </Button>
        </div>
      </div>
    </div>
    )
  );
};

export default Question;
