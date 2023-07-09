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
      {time === 0 ? <h2>Game over</h2> : <h2>Time: {time}</h2>}
    </div>
  )
}

export default Timer
