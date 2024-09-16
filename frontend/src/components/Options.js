export default function Options({ question, answer, dispatch }) {
    const hasAnswered = answer !== null
    return (
        <div className="options">
            {question.options.map((el, index) => <button className={`btn btn-option ${index === answer ? "answer" : ""} 
            ${hasAnswered ? index === question.correctOption ? "correct" : "wrong" :""}`} onClick={() => dispatch({ type: "newAnswer", payload: index })} disabled={hasAnswered} key={el}>
                {el}
            </button>)}
        </div>
    )
}