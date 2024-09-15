import { useEffect, useReducer } from "react"
import Header from "./Header";
import Main from "./Main"
import Loader from "./Loader"
import Error from "./Error"
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./components/NextButton"
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const initialState = {
  questions: [],
  status: "loading", //loading, error, ready, active, finished
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
}
const SecPerQuestion = 30
function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: "ready"
      }
    case 'dataFailed':
      return {
        ...state,
        status: "error"
      }
    case 'start':
      return { ...state, status: "active", secondsRemaining: state.questions.length * SecPerQuestion }

    case 'newAnswer':
      const question = state.questions.at(state.index)
      // console.log(question)
      return { ...state, answer: action.payload, points: action.payload === question.correctOption ? state.points + question.points : state.points }

    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null }

    case 'finished':
      return { ...state, status: "finished", highscore: state.points > state.highscore ? state.points : state.highscore }

    case 'restart':
      return { ...initialState, questions: state.questions, status: "ready" }
    // return { ...state, status: "active", index: 0, answer: null, points: 0 }
    case 'tick':
      return { ...state, secondsRemaining: state.secondsRemaining - 1, status : state.secondsRemaining === 0 ? "finished" : state.status}

    default:
      throw new Error("Action Unknown");

  }
}
export default function App() {
  // nested destructring the to {question,status}
  const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(reducer, initialState)
  const numQuestions = questions.length
  const maxPossiblePoints = questions.reduce((prev, curr) => (prev + curr.points), 0)
  //  console.log(maxPossiblePoints);

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json()
        .then((data) => dispatch({ type: "dataReceived", payload: data })))
      .catch((err) => dispatch({ type: "dataFailed" }))
  }, [])
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === "active" &&
          <>
            <Progress index={index} numQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer} />
            <Question question={questions[index]} answer={answer} dispatch={dispatch} />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />
            </Footer>
          </>
        }
        {status === "finished" && <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} highscore={highscore} dispatch={dispatch} />}
      </Main>
    </div>
  )
}