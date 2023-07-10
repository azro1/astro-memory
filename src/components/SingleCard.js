import './SingleCard.css'

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {

  const handleClick = () => {
    // we pass disabled through as a prop and only when disabled is false will handleChoice fire
    // when it is disabled (while check is going on and cards are bieng compared) we're not going to handle the choice anymore and it's not going to update the choice state
     if (!disabled) {
       handleChoice(card)
     }
  }

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img className="back" src="/images/cover.png" onClick={handleClick} alt="card back" />
      </div>
    </div>
  );
};

export default SingleCard;
