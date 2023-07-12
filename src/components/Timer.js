import { useEffect, useRef, useState } from "react"
import './Timer.css'

const Timer = ({ seconds, endGame, length }) => {

  const [time, setTime] = useState(seconds)
  const timerId = useRef()
  const msg = useRef()

  useEffect(() => {
    timerId.current = setInterval(() => {
      setTime(prev => prev - 1)
    }, 1000)
    return () => clearInterval(timerId.current)
  }, [])

  useEffect(() => {
    if (time <= 0) {
      endGame()
      clearInterval(timerId.current)
    }
  }, [time, endGame])

  useEffect(() => {
    if (length === 6) {
      msg.current.innerHTML = "YOU WON"
      msg.current.style.color = '#00FF00'
      clearInterval(timerId.current)
    }
  }, [length])

  return (
    <div className="timer">
      {time === 0 ? <h2 className="gameover" >GAME OVER</h2> : <h2 ref={msg}>Time: <span className={time <= 15 ? "danger" : ""}>{time}</span></h2>}
    </div>
  )
}

export default Timer
