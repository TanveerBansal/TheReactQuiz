import { useEffect } from "react"

export default function Timer({ dispatch, secondsRemaining }) {
    const mins = Math.floor(secondsRemaining / 60)
    const seconds = Math.floor(secondsRemaining % 60)
    useEffect(() => {
        const id = setInterval(() => {
            dispatch({ type: "tick" })
        }, 1000)
        return () => { clearInterval(id) }    //this return fn is imp. other the when the timer is finished and we start quiz again every time a new setInterval will added and timer become faster
    }, [dispatch])
    return (
        <div className="timer">{mins < 10 && "0"}{mins}: {seconds < 10 && "0"}{seconds}</div>
    )
} 