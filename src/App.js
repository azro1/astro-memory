import { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';
import Timer from './components/Timer';

const cardImages = [
  { src: '/images/astro1.png', matched: false },
  { src: '/images/astro2.png', matched: false },
  { src: '/images/astro3.png', matched: false },
  { src: '/images/astro4.png', matched: false },
  { src: '/images/astro5.png', matched: false },
  { src: '/images/astro6.png', matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [showTimer, setShowTimer] = useState(false)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards
  const shufffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      // sort fires a function for each pair of items in an array - if we return a number less than 0 the order of those 2 items stays the same, if we return a number greater than 0 then the order of those 2 items that it's comparing is swapped - to get a random order Math.random() - 0.5 returns both negative and positive numbers
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

      setCards(shuffledCards)
      setTurns(0)
      setShowTimer(true)
  }

  // handle a choice
  const handleChoice = (card) => {
     choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  // compare 2 selected cards using useEffect
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      // we want to disable flipping of cards temporarily until the check is completed and the 2 cards are compared
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        // wait for a second before calling resetTurn to hide unmatched cards
        setTimeout(() => resetTurn(), 1000)
      }
    } 
  }, [choiceOne, choiceTwo])


  // reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    // once comparison is done (whether cards match or whether cards do not match and are reset to initial values) we can then resume flipping cards
    setDisabled(false)
  }

  // console.log(turns)


  return (
    <div className='App'>
      <h1>Astro Match</h1>
      <button onClick={shufffleCards}>New Game</button>

      {showTimer && <Timer seconds={60} />}

      <div className='card-grid'>
        {cards.map((card) => (
          <SingleCard
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            key={card.id}
            // we pass the card a dynamic disabled prop
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
