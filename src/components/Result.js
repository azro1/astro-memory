import './Result.css'

const Result = ({ length, src }) => {
  return (
    <div className="result">
        {length < 6 ? "" : <img src={src} alt="" />}
    </div>
  )
}

export default Result