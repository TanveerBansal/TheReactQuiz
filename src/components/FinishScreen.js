export default function FinishScreen({points, maxPossiblePoints, highscore, dispatch}){
    const percentage =(points /maxPossiblePoints)*100
    let emoji;
    if(percentage === 100) emoji = "🥇"
    if(percentage >= 80 && percentage < 100)  emoji = "🎉"
    if(percentage >= 60 && percentage < 80)  emoji = "👏🏻"
    if(percentage >= 40 && percentage < 60)  emoji = "🤨"
    if(percentage > 0 && percentage < 40 )  emoji = "😑"
    if(percentage === 0 )  emoji = "🤦🏻‍♂️"
    return (
        <>
        <p className="result">
            <span className="emoji">{emoji}</span>You scored <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)}%)
        </p>
        <p className="highscore">(Highscore : {highscore})</p>
        <button className="btn btn-ui" onClick={()=>dispatch({type:"restart"})}>Restart quiz</button>
        </>
        
    )
}