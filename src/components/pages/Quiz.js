import { useParams } from "react-router-dom";
import Answers from "../Answers";
import MiniPlayer from "../MiniPlayer";
import ProgressBar from "../ProgressBar";
import useQuestions from "../../hooks/useQuestions";
import { useEffect, useReducer, useState } from "react";
import _ from "lodash";
import { useAuth } from "../../context/AuthContext.js";
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

const initialState = null;

const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;

    case "answer":
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked =
        action.value;

      return questions;

    default:
      return state;
  }
};

export default function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, error, questions } = useQuestions(id);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [qna, dispatch] = useReducer(reducer, initialState);

  const { currentUser } = useAuth();

  useEffect(() => {
    dispatch({
      type: "questions",
      value: questions,
    });
  }, [questions]);

  function handleAnswerChange(e, index) {
    console.log(e.target.checked);
    dispatch({
      type: "answer",
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  }

  function nextQuestion() {
    if (currentQuestion >= questions.length - 1) return;
    else {
      setCurrentQuestion((prevCurrent) => prevCurrent + 1);
    }
  }

  function prevQuestion() {
    if (currentQuestion > 0 && currentQuestion <= questions.length - 1) {
      setCurrentQuestion((prevCurrent) => prevCurrent - 1);
    }
  }

  const percentage =
    questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  async function submit() {
    const { uid } = currentUser;
    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);
    await set(resultRef, {
      [id]: qna,
    });

    navigate(`/result/${id}`, {
      state: qna,
    });
  }

  return (
    <>
      {loading && <div>Loading ...</div>}
      {error && <div>There was an error </div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            options={qna[currentQuestion].options}
            handleChange={handleAnswerChange}
          />
          <ProgressBar
            next={nextQuestion}
            prev={prevQuestion}
            progress={percentage}
            submit={submit}
          />
          <MiniPlayer />
        </>
      )}
    </>
  );
}
