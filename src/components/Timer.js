import { useEffect, useRef, useState } from "react"
import './Timer.css'

const Timer = ({ seconds }) => {
  
  const [time, setTime] = useState(seconds)
  const timerId = useRef()

  useEffect(() => {
    timerId.current = setInterval(() => {
      setTime(prev => prev - 1)
    }, 1000)
    return () => clearInterval(timerId.current)
  }, [])

  useEffect(() => {
    if (time <= 0) {
      clearInterval(timerId.current)
    }
  }, [time])

  return (
    <div className="timer">
      {time === 0 ? <h2 className="gameover">GAME OVER</h2> : <h2>Time: <span className={time <= 15 ? "danger" : ""}>{time}</span></h2>}
    </div>
  )
}

export default Timer
