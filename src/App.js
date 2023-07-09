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

  // comparing choices using useEffect
  useEffect(() => {
    if (choiceOne && choiceTwo) {

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
        
        resetTurn()
      }
    } 
  }, [choiceOne, choiceTwo])

  console.log(cards)

  // reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
  }

  return (
    <div className="App">
      <h1>Astro Match</h1>
      <button onClick={shufffleCards} >New Game</button> 

      {showTimer && <Timer seconds={60} />}
      
      <div className="card-grid">
          {cards.map((card) => (
            <SingleCard card={card} handleChoice={handleChoice} key={card.id} />
          ))}
      </div>
    </div>
  );
}

export default App;
